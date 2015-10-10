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
  var size = nodes.length / 4; // TODO maybe different scaling

  size = Math.max( size, 4 ); // TODO update clamping?

  return size;
}

function nodeLevelWidth( nodes ){
  var min = nodes.min( nodeSortValue );
  var max = nodes.max( nodeSortValue );
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

function addZoomFilterBinding( cy ){
  var nodes;

  function getNodes(){
    nodes = cy.nodes();
  }

  getNodes();

  cy.on( 'add remove', _.debounce(getNodes, 100) );

  cy.on( 'zoom', _.debounce( function(e){
    var zoom = cy.zoom();
    var zoomMin = 0.25; // for clamping when filtering occurs ( show minimum case )
    var zoomMax = 4; // for clamping when filtering occurs ( all visible case )
    var p = ( zoom - zoomMin ) / ( zoomMax - zoomMin ); // percent in zoom range

    cy.batch(); // for perf (only 1 style update and frame)

    for( var i = 0; i < nodes.length; i++ ){
      var node = nodes[i];
      var nodeP = nodeSortValue( node ) / 100;

      node.toggleClass( 'filtered', nodeP < p );
    }

    cy.endBatch();
  }, 250) );
}

function addBindings( cy ){
  addNewNodeBinding( cy );

  // TODO enable this and test
  //addZoomFilterBinding( cy );
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
            'background-color': '#fff',

            // disable these for performance if animation is slow
            'transition-property': 'opacity',
            'transition-duration': '100ms'
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
          selector: '.filtered',
          style: {
            'opacity': 0
          }
        }
      ],
      layout: {
        name: 'concentric',
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
