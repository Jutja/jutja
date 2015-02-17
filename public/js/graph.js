var functions = {};
function main(data) {
        graph = Viva.Graph.graph();
        graph.name = "Jutja project graph";
        
        var layout = Viva.Graph.Layout.forceDirected(graph, {
              springLength : 180,
              springCoeff : 0.00055,
              dragCoeff : 0.09,
              gravity : -100
          });

        var cssGraphics = Viva.Graph.View.cssGraphics();
        
        cssGraphics.node(function(node){
            var nodeUI = document.createElement('div');
            nodeUI.setAttribute('class', 'node');
            //nodeUI.title = node.data.name;
            var groupId = node.data.group;
            nodeUI.style.background = "#9edae5";
            return nodeUI;
        });
          
        var graphics = Viva.Graph.View.svgGraphics(),
            nodeSize = 120,
          /*
                // we use this method to highlight all realted links
                // when user hovers mouse over a node:
              highlightRelatedNodes = function(nodeId, isOn) {
                   // just enumerate all realted nodes and update link color:
                   graph.forEachLinkedNode(nodeId, function(node, link){
                       var linkUI = graphics.getLinkUI(link.id);
                       if (linkUI) {
                           // linkUI is a UI object created by graphics below
                           linkUI.attr('stroke', isOn ? 'gray':'red');
                       }
                   });
                };      */
        
            renderer = Viva.Graph.View.renderer(graph, {
                  container : document.getElementById('tile'),
                  graphics : graphics,
                  layout   : layout,
                  prerender: 20,
                  renderLinks : true
                
            });
            renderer.run();
                 
            graphics.node(function(node) {
                  var arr = []; 
                  var head = [];
                  var date = node.data.due_date;
                  var color = functions.findColor(date,node.data.i_no);
                  functions.stringDivider(node.data.info, 15, arr,0);
                  functions.stringDivider(node.data.name, 13, head, 0);
                  if(head.length>1)
                    functions.wrapHead(head,13);
                  if(arr.length > 3)
                  {
                    
                      console.log(arr);
                
                    functions.wrapString(arr,15);
                  }
                  var ui = Viva.Graph.svg('g'),
                  // Create SVG text element with user id as content
                  svgText = Viva.Graph.svg('text')
                            .attr('y', '20px')
                            .attr('id', node.data.i_no)
                            .attr('x','2px')
                            .attr('font-size','18px')
                            .attr('font-weight','bold')
                            .attr('fill','#fff')
                            .text(head[0]);
                  // create svg text for the info part of node
                  var svgBody = [];         
                  for(var i=0; i<arr.length && i<3; i++)
                  {
                      var h = 50 + 15 *i;
                      svgBody[i] = Viva.Graph.svg('text')
                                    .attr('y', h)
                                    .attr('id', node.data.i_no)
                                    .attr('font-size','15px')
                                    .attr('x','1px')
                                    .attr('fill','#fff')
                                    .text(arr[i]);
                  }
                  var rectangle = Viva.Graph.svg('rect')
                            .attr('width', nodeSize)
                            .attr('height', nodeSize)
                            .attr('fill', color);

                    var status = Viva.Graph.svg('text')
                            .attr('y', '115px')
                            .attr('id', node.data.i_no)
                            .attr('x','2px')
                            .attr('font-size','17px')
                            .attr('font-weight','bold')
                            .attr('fill','#fff')
                            .text(node.data.status);

                  ui.append(rectangle); 
                  ui.append(svgText);
                  ui.append(status);
                  for(var i=0; i<arr.length && i<3; i++)
                  {
                      ui.append(svgBody[i]);
                  }
        
             //     $(ui).dblclick(function() { // mouse dbl click
               //           call.genModal(node.data);
               //   });
                  var hammertime = new Hammer(ui);
                  hammertime.on('doubletap', function(ev) {
                    console.log(ev);
                     call.genModal(node.data);
                  });
                  ui.addEventListener('click', function () {
                        // toggle pinned mode
                        console.log(node.data.i_no);
                        layout.pinNode(node, !layout.isNodePinned(node));
                  });
                
                  return ui;
            }).placeNode(function(nodeUI, pos) {
                nodeUI.attr('transform',
                            'translate(' +
                                  (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) +
                            ')');
            }); 
      
          var createMarker = function(id) {
                    return Viva.Graph.svg('marker')
                               .attr('id', id)
                               .attr('viewBox', "0 0 10 10")
                               .attr('refX', "10")
                               .attr('refY', "5")
                               .attr('markerUnits', "strokeWidth")
                               .attr('markerWidth', "20")
                               .attr('markerHeight', "10")
                               .attr('orient', "auto");
          },

            marker = createMarker('Triangle');
            marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z');
      
          var defs = graphics.getSvgRoot().append('defs');
              defs.append(marker);
          var geom = Viva.Graph.geom();
        
          graphics.link(function(link){
                var ui= Viva.Graph.svg('path')
                        .attr('stroke', 'gray')
                        .attr('marker-end', 'url(#Triangle)');
        
                var svgText = Viva.Graph.svg('text').attr('y', '-4px').text("deneme");  
                    ui.text("svgText");
        
            /*    $(ui).click(function() { // mouse over
                    alert("test");
                });*/
              return ui;                   
          }).placeLink(function(linkUI, fromPos, toPos) {
                // Here we should take care about
                //  "Links should start/stop at node's bounding box, not at the node center."

                // For rectangular nodes Viva.Graph.geom() provides efficient way to find
                // an intersection point between segment and rectangle
                var toNodeSize = nodeSize,
                    fromNodeSize = nodeSize;

                var from = geom.intersectRect(
                        // rectangle:
                                fromPos.x - fromNodeSize / 2, // left
                                fromPos.y - fromNodeSize / 2, // top
                                fromPos.x + fromNodeSize / 2, // right
                                fromPos.y + fromNodeSize / 2, // bottom
                        // segment:
                                fromPos.x, fromPos.y, toPos.x, toPos.y)
                           || fromPos; // if no intersection found - return center of the node

                var to = geom.intersectRect(
                        // rectangle:
                                toPos.x - toNodeSize / 2, // left
                                toPos.y - toNodeSize / 2, // top
                                toPos.x + toNodeSize / 2, // right
                                toPos.y + toNodeSize / 2, // bottom
                        // segment:
                                toPos.x, toPos.y, fromPos.x, fromPos.y)
                            || toPos; // if no intersection found - return center of the node

                var data = 'M' + from.x + ',' + (from.y) +
                           'L' + to.x + ',' + (to.y);

                linkUI.attr("d", data);
            });
            // Finally we add something to the graph:
          if(data)
          {
              //add the node 
              for ( var key in data ){
                if(data.hasOwnProperty(key)){
                  graph.addNode( key , data[key] );
                }
              }
              //add the links
              for( var key in data ){
                  if(data.hasOwnProperty(key)){
                      var child = data[key].childi_no;
                      for (var i = 0; i < child.length ; i++ )
                      {
                          graph.addLink( key , child[i] );
                      }
                  }
              }
          }
          //center the nodes
          document.getElementById('center').onclick = function(){
                var calculator = Viva.Graph.centrality();
                var betweenness = calculator.betweennessCentrality(graph);
                if (graph.getNode(betweenness[0].key)) {
                  var pos = layout.getNodePosition(betweenness[0].key);
                  console.log(pos);
                  renderer.moveTo(pos.x, pos.y);
                }
                else
                {
                    console.log("Please create a map");
                }
          }
          //pinning of nodes
           document.getElementById('pin').onclick = function(){
              var pin = call.return_nodedetails().pin;
              console.log(pin);
              graph.forEachNode(function(n){
                  var node = {
                    id: n.id,
                    data: n.data
                  };
                  if(!pin)
                  {
                      layout.pinNode(node, true);
                  }
                  else
                  {
                    layout.pinNode(node, false);
                  } 
              });
              call.change_nodedetails(!pin , "pin");
           }
}
functions.stringDivider = function(str, width,arr,jdex){
        if (str.length>width) {
            var p=width;
            for (;p>=0 && str[p]!=' ';p--) {
          }
          if (p>0) {
            var left = str.substring(0, p);
                arr[jdex] = left;
                jdex++;
            var right = str.substring(p+1);
            functions.stringDivider(right,width,arr,jdex);
          }
          else if(p<0){                                                 //if length of word is more than width
            var left = str.substring(0, width-1);
            var trim = left.replace(/^\s+|\s+$/g, '');
              left = trim.concat("-");
            arr[jdex] = left;
                jdex++;
            var right = str.substring(width-1);
            functions.stringDivider(right,width,arr,jdex);
          }
        }
        else
        {
          arr[jdex] = str;
        }
      }
functions.wrapString = function(arr,width){
    if(arr[2])
    {
        if(arr[2].length<12)
        {
            var trim = arr[2].replace(/^\s+|\s+$/g, '');
              arr[2] = trim.concat(" ...");
        }
        else
        {
            var p = arr[2].length;
            var str = arr[2];
            for (;p>0&& str[p]!=' ';p--) {
          }
            if(p>0)
            {
                var left = str.substring(0, p);
                var trim = left.replace(/^\s+|\s+$/g, '');
                    arr[2] = trim.concat(" ...");
            }
            else
            {
                arr[2]= " ...";
            }
        }
    }
}
functions.findColor =  function(date,id){
    var colors = [
            "#D91E18", "#F39C12",
            "#2ECC71", "#9B59B6"
            ];
    var month = {"Jan":1 , "Feb" : 2,"Mar" : 3 , "Apr" : 4 , "May" : 5 , "Jun": 6, "Jul": 7, "Aug": 8 , "Sep" : 9, "Oct" : 10, "Nov" : 11, "Dec" : 12};
            if(date)
            {
              var dd = date.split(" ");         //day/mm/yyyy
              dd[0] = parseInt(dd[2]);          //dd[2] = date        
              dd[1] = month[dd[1]];             //dd[1] = month
              dd[2] = parseInt(dd[3]);          //dd[0] = year
              var today = new Date();
              var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
              if(dd[0]==today.getDate() && dd[1] == today.getMonth()+1 && dd[2] == today.getFullYear())
              {
                index = 0;
              }
              else if(dd[0]==tomorrow.getDate() && dd[1] == tomorrow.getMonth()+1 && dd[2] == tomorrow.getFullYear())
              {
                index = 1;
              }
              else 
              {
                if((dd[2] >= tomorrow.getFullYear()) && ((dd[1] > tomorrow.getMonth()+1 )|| (dd[0] > tomorrow.getDate() && dd[1] == tomorrow.getMonth()+1) || (dd[2] > tomorrow.getFullYear()) ))
                {
                  index = 2;
                }
                else
                {
                  index =3;
                }
              }
          }
          else
          {
            index = id%4;
          }
          return (colors[index]);
} 
functions.wrapHead = function(arr,width){       
   if(arr[0])
   {
    if(arr[0].length<10)
        {
            var trim = arr[0].replace(/^\s+|\s+$/g, '');
              arr[0] = trim.concat(" ...");
        }
    else
    {
        if(arr[0].indexOf(' ') >= 0)
        {
            var p = arr[0].length;
            var str = arr[0];
            for (; str[p]!=' ';p--) {
            }
            if(p>0)
            {
                var left = str.substring(0, p);
                var trim = left.replace(/^\s+|\s+$/g, '');
                    arr[0] = trim.concat(" ...");
            }
        }
        else
        {
            var left = arr[0].substring(0, 10);
             var trim = left.replace(/^\s+|\s+$/g, '');
            arr[0] = trim.concat("...");
        }
    }
  } 
}
