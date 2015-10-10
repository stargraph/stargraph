function nodeSortValue( node ) {
  return randomNodeSortValue( node );

  // TODO replace with desired ranking value, on 0 <= val <= 100
  // return node.data('value');
};

// for testing
var randomNodeSortValue = _.memoize(function( node ){
  return Math.round( Math.random() * 100 );
}, function( node ){
  return node.id();
});

function nodeSort( a, b ) {
  var aVal = nodeSortValue( a );
  var bVal = nodeSortValue( b );

  return aVal - bVal;
}

function nodeLevelsSize( nodes ){
  var lvls = nodes.length / 4; // TODO maybe different scaling

  lvls = Math.max( lvls, 4 ); // TODO update clamping?

  return lvls;
}

function nodeLevelWidth( nodes ){
  var min = nodes.min( nodeSortValue ).value;
  var max = nodes.max( nodeSortValue ).value;
  var nLevels = nodeLevelsSize( nodes );

  return ( max - min ) / nLevels;
}

function addNewNodeBinding( cy ){
  cy.on( 'tap', function( event ) {
    var tapOnBg = event.cyTarget === cy;

    if( tapOnBg ) {
        Network.insert({
            group: 'nodes',
            data:{},
            position:{x:100,y:100},
            graphId:Router.current().params._id,
            tags:[]
        });
    } else {
      Network.remove( event.cyTarget.id() );
    }
  } );
}

// TODO call these to enable/disable the feature
var enableZoomFiltering, disableZoomFiltering;

function addZoomFilterBinding( cy ){
  var nodes;
  var enabled = true;

  enableZoomFiltering = function(){
    enabled = true;
    cy.layout(); // apply concentric from init again
  };

  disableZoomFiltering = function(){
    enabled = false;
  };

  function getNodes(){
    nodes = cy.nodes();
  }

  getNodes();

  cy.on( 'add remove', _.debounce(getNodes, 100) );

  function filter(){
    if( !enabled ){ return; }

    var zoomMin = 0.25; // for clamping when filtering occurs ( show minimum case )
    var zoomMax = 4; // for clamping when filtering occurs ( all visible case )
    var zoom = Math.min( zoomMax, Math.max( zoomMin, cy.zoom() ) ); // clamp zoom on [min, max]
    var p = 1 - ( zoom - zoomMin ) / ( zoomMax - zoomMin ); // percent in zoom range

    // avoid div by 0
    p = p < 0 ? 0.01 : p;

    cy.startBatch(); // for perf (only 1 style update and frame)

    var maxNodeP = 0;

    for( var i = 0; i < nodes.length; i++ ){
      var node = nodes[i];
      var nodeP = nodeSortValue( node ) / 100;

      if( nodeP > maxNodeP ){
        maxNodeP = nodeP;
      }
    }

    for( var i = 0; i < nodes.length; i++ ){
      var node = nodes[i];
      var nodeP = nodeSortValue( node ) / 100;

      var scaleFactor = cy.zoom();
      var opacity = nodeP / p * scaleFactor;

      if( nodeP > maxNodeP - 0.05 ){
        opacity += 0.1;
      }

      if( opacity < 0.1 ){
        opacity = 0;
      } else if( opacity > 1 ){
        opacity = 1;
      }

      node.scratch( '_opacity', opacity );
    }

    cy.endBatch();
  }

  cy.on( 'zoom', _.throttle( filter, 250 ) );
  filter(); // initial
}

function addBindings( cy ){
  addNewNodeBinding( cy );
  addZoomFilterBinding( cy );
}

function nodeSize( node ){
  var val = nodeSortValue( node );
  var minVal = 0;
  var maxVal = 100;
  var p = ( val - minVal ) / ( maxVal - minVal );
  var minSize = 5;
  var maxSize = 40;

  return minSize + ( maxSize - minSize ) * p;
}

Template.graphbox.helpers( {
  'cytodata': function() {
    return Network.find();
  },
  'options': function() {
    return {
      style: [
        {
          selector: 'node',
          style: {
            'width': _.memoize( nodeSize, nodeSortValue ),
            'height': _.memoize( nodeSize, nodeSortValue ),
            'opacity': function(n){
              var opacity = n.scratch('_opacity');

              if( null == opacity ){ return 1; }

              return opacity;
            },
            'background-color': '#fff'
          }
        },

        {
          selector: 'edge',
          style: {
            'line-color': '#ccc',
            'width': '3'
          }
        },

        {
          selector: ':active',
          style: {
            'overlay-color': '#fff'
          }
        },

        {
          selector: '.filtered',
          style: {
            'opacity': 0
          }
        },

        {
          selector: 'core',
          style: {
            'active-bg-color': '#fff'
          }
        }
      ],
      layout: {
        name: 'concentric',
        padding: 75,
        concentric: nodeSortValue,
        levelWidth: nodeLevelWidth,
        sort: nodeSort
      },
      ready: function() {
        var cy = this;
        addBindings( cy );
      }
    }
  },
  'collection':function(){
    return Network;
  }
} );
