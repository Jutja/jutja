function main() {
    data = {"nodes":[{"i_no":10000,"name": "Head", "info": "Guidelines for today" ,"childi_no":[10001,10002],"value":[1,2]}, {"i_no":10001,"name": "Subhead", "info": "Be on time" ,"childi_no":[],"value":[]},{"i_no":10002,"name": "Twinsubhead", "info": "Dress neatly" ,"childi_no":[],"value":[]}]};
    var d3Sample = function(){
         var g = Viva.Graph.graph();
         g.Name = "Jutja project graph";
        for (var i = 0; i < data.nodes.length; ++i){
            var k=data.nodes[i];
            g.addNode(k.i_no, data.nodes[i]);
        }
         for (i = 0; i < data.nodes.length; ++i){
            var link = data.nodes[i];
            for(var j=0; j<link.childi_no.length; ++j){
            g.addLink(link.i_no, link.childi_no[j]);
        }}
            return g;
         };
    
     var colors = [
            "#1f77b4", "#aec7e8",
            "#ff7f0e", "#ffbb78",
            "#2ca02c", "#98df8a",
            "#d62728", "#ff9896",
            "#9467bd", "#c5b0d5",
            "#8c564b", "#c49c94",
            "#e377c2", "#f7b6d2",
            "#7f7f7f", "#c7c7c7",
            "#bcbd22", "#dbdb8d",
            "#17becf", "#9edae5"
            ];

     var example = function() {
        graph = d3Sample();
        
        var layout = Viva.Graph.Layout.forceDirected(graph, {
            springLength : 120,
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
            nodeUI.style.background = "#17becf";
            return nodeUI;
        });
         
          generateModalOnDbClick = function(node) {
              var head = document.getElementById("head");
              head.innerHTML=node.name;
              var info = document.getElementById("info");
              info.innerHTML=node.info;
              var b1= document.getElementById("b1");
              b1.innerHTML="x";
              var b2= document.getElementById("b2");
              b2.innerHTML="Edit";
              b2.onclick = function(){
                  $('#myModal').trigger('reveal:close');
                  edit(node);
              };
              var b3= document.getElementById("b3");
              b3.innerHTML="Create new node";
              b3.onclick=function(){
                  $('#myModal').trigger('reveal:close');
                  create(node);
              }
              var b4= document.getElementById("b4");
              b4.innerHTML="Delete this node";
              b4.onclick=function(){
                  $('#myModal').trigger('reveal:close');
                  del(node);
              }
             $('#myModal').reveal({
     animation: 'fade',                   //fade, fadeAndPop, none
     animationspeed: 10,                       //how fast animtions are
     closeonbackgroundclick: true,              //if you click background will modal close?
     dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
});
          };
         
        var svgGraphics = Viva.Graph.View.svgGraphics();
         
         svgGraphics.node(function(node){
        	nodeSize = 120;
           //  console.log(node.data.i_no);
              var ui = Viva.Graph.svg('g'),
             // Create SVG text element with user id as content
                  svgText = Viva.Graph.svg('text')
                    .attr('y', '20px')
                .attr('id', node.data.i_no)
                    .attr('id', node.data.i_no)
                    .attr('x','2px')
                    .attr('font-size','17px')
                     .attr('font-weight','bold')
                    .text(node.data.name),
                  svgBody = Viva.Graph.svg('text')
                    .attr('y', '50')
                    .attr('id', node.data.i_no)
                     .attr('x','0px')
                    .text(node.data.info),
                  rectangle = Viva.Graph.svg("rect")
                     .attr('width', nodeSize)
                    .attr('id', node.data.i_no)
                     .attr('height', nodeSize)
                    .attr("fill", "#17becf")
                    .attr('opacity',0.5);
                    
              $(ui).dblclick(function() {
            	generateModalOnDbClick(node.data);
            });

               ui.append(rectangle);
              ui.append(svgText);
             ui.append(svgBody);
              return ui;
            }).placeNode(function(nodeUI, pos) {
                // 'g' element doesn't have convenient (x,y) attributes, instead
                // we have to deal with transforms: http://www.w3.org/TR/SVG/coords.html#SVGGlobalTransformAttribute
                nodeUI.attr('transform',
                            'translate(' +
                                  (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) +
                            ')');
            });
         
        svgGraphics.link(function(link){
            return Viva.Graph.svg('line')
                    .attr('stroke', '#999')
                    .attr('stroke-width', Math.sqrt(link.data));
        });

               var renderer = Viva.Graph.View.renderer(graph, {
            container : document.getElementById('graph1'),
            layout : layout,
            graphics : svgGraphics,
            prerender: 20,
          renderLinks : true
               });

        renderer.run();
    }();
//    var element=document.getElementById("modal");
  //  element.innerHTML="";
}