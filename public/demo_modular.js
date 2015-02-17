var last=0;
function display_map(){
  var date = new Date();
  date = date.toDateString();
	var data = [{i_no:10001,name:"Hello",info:"interact with me",childi_no:[10002],due_date:date,status:"Incomplete"},{i_no:10002,name:"Hi",info:"stay away from me",childi_no:[],due_date:date,status:"Ongoing"}];
	last = 10002;
	map(data);
}
function map(data){
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
            var groupId = node.data.group;
            nodeUI.style.background = "#9edae5";
            return nodeUI;z
        });
          
        var graphics = Viva.Graph.View.svgGraphics(),
            nodeSize = 120,  
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
                  var color = "#227ED4";
            //      var color = functions.findColor(date,node.data.i_no);
                  functions.stringDivide(node.data.info, 15, arr,0);
                  functions.stringDivide(node.data.name, 13, head, 0);
                  if(head.length>1)
                    functions.wrapHead(head,13);
                  if(arr.length > 3)
                  {
                   functions.wrapBody(arr,15);
                  }
              	   var ui = Viva.Graph.svg('g'),
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
        		$(ui).dblclick(function() { 
                 	functions.create(node.data,data);
                });
         		ui.addEventListener('click', function () {
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
}
functions = function(){
	function generateModal(node,data){
      document.getElementById("info_title").innerHTML = node.name;
      document.getElementById("info_info").innerHTML = node.info;
      document.getElementById("info_date").innerHTML = node.due_date;
      document.getElementById("info_status").innerHTML = node.status;
    
			$("#node_form").bPopup({contentContainer:'.content',speed: 750, 
            opacity: 0.6,fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 1500, //can be a string ('slow'/'fast') or int
            modalColor: 'lightblue',
            transition: 'slideDown'
      });
			document.getElementById("cr_submit").onclick = function(){
				  last++;

	    		var info=document.getElementById("create_info").value;
          var title=document.getElementById("create_title").value;
          var dueDate = document.getElementById("cr_date_picker").value;
          var dropdown = document.getElementById("create_dropdown");
          var status = dropdown.options[dropdown.selectedIndex].value;
          var newNode = {"i_no":last,"name":title, "info":info,"childi_no":[], due_date:dueDate , status:status};
        		data.push(newNode);
            node.childi_no.push(last);
        		graph.addNode(last,newNode);
        		graph.addLink(node.i_no,last);	
        		$("#node_form").bPopup().close();
      }
	}
	function stringDivider(str, width,arr,jdex){
        if (str.length>width) {
            var p=width;
            for (;p>=0 && str[p]!=' ';p--) {
          }
          if (p>0) {
            var left = str.substring(0, p);
                arr[jdex] = left;
                jdex++;
            var right = str.substring(p+1);
            stringDivider(right,width,arr,jdex);
          }
          else if(p<0){                                                 //if length of word is more than width
            var left = str.substring(0, width-1);
            var trim = left.replace(/^\s+|\s+$/g, '');
              left = trim.concat("-");
            arr[jdex] = left;
                jdex++;
            var right = str.substring(width);
         	stringDivider(right,width,arr,jdex);
          }
        }
        else
        {
          arr[jdex] = str;
        }
      }
	function wrapString(arr,width){
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
            	for (; str[p]!=' ';p--) {
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
	function wrapHead(arr,width){       
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
	return{
		stringDivide : stringDivider,
		    wrapBody : wrapString,
		    wrapHead : wrapHead,
		    create :  generateModal
	}
}();

