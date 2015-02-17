/*edit needs to be reviewed*/  
function display_map() {
    var p_id=$('#123').data('p_i');
    var m_id=$('#123').data('m_n') || $('#map_name').val();
    var url = "/project/maps/find?pid="+p_id+"&name="+m_id;
    function success_map(data){
        if(m_id && p_id ) {

          pr_data.data = data;
            main(data);
            }
        }
     $.ajax({
      type: "GET",
      url: url,
      success: success_map
      });
}
function main(data) {
    console.log(data); 
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
            return nodeUI;z
        });
          
        var graphics = Viva.Graph.View.svgGraphics(),
                nodeSize = 120,
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
                };      
        
         renderer = Viva.Graph.View.renderer(graph, {
          container : document.getElementById('graph1'),
                    graphics : graphics,
                    layout   : layout,
                    prerender: 20,
                    renderLinks : true
                
                });
            renderer.run();
                 
          graphics.node(function(node) {
                  var arr = []; var head = [];
                  var date = node.data.due_date;
                  var color = functions.findColor(date,node.data.i_no);
                  functions.stringDivider(node.data.info, 15, arr,0);
                  functions.stringDivider(node.data.name, 13, head, 0);
                  if(head.length>1)
                    functions.wrapHead(head,13);
                  if(arr.length > 3)
                  {
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
        
        $(ui).dblclick(function() { // mouse over
                 functions.generateModalOnDbClick(node.data);
                });
         ui.addEventListener('click', function () {
                        // toggle pinned mode
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
        
        $(ui).click(function() { // mouse over
                    alert("test");
                });
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
              for (var i = 0; i < data.length; ++i){
                graph.addNode(data[i].i_no,data[i]);
              }
              for (i = 0; i < data.length; i++){
                for(var j=0; j<data[i].childi_no.length; j++){
                  graph.addLink(data[i].i_no, data[i].childi_no[j]);
                }
              }
            }

            $("#center").click(function(){
              if(pr_data.data[0])
              {
                var nodeId = pr_data.data[0].i_no;
                if (graph.getNode(nodeId)) {
                  var pos = layout.getNodePosition(nodeId);
                renderer.moveTo(pos.x, pos.y);
                }
              }
              else
              {
                console.log("Please create a map");
              }
          });

            functions.pin = function(){
              graph.forEachNode(function(n){
               var node = {
                   id: n.id,
                   data: n.data
                  };
              if(pr_data.pin)
              {
                  layout.pinNode(node, true);
              }
              else
              {
                layout.pinNode(node, false);
              } 
            });
              pr_data.pin = ! pr_data.pin;
            }
}