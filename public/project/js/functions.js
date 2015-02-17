        function edit(node){
            var head = document.getElementById("h1");
            head.innerHTML=node.name;   
            var button= document.getElementById("submit");
            button.onclick = function(){
                  var body=document.getElementById("message");
                    node.info=body.value;
                    graph.beginUpdate();
                    graph.endUpdate();
                    console.log(body.value);
                    $('#form').trigger('reveal:close');
                    };
            $('#form').reveal({
                animation: 'fade',                   //fade, fadeAndPop, none
                animationspeed: 10,                       //how fast animtions are
                closeonbackgroundclick: true,              //if you click background will modal close?
                dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
            });
         }
        function create(node){
             var min = 10000;
            var max = 99999;
             var i_no = Math.floor(Math.random() * (max - min + 1)) + min;
            var head = document.getElementById("h1");
            head.innerHTML="New Node";   
            var button= document.getElementById("submit");
            button.onclick = function(){
                  var body=document.getElementById("message");
                var title=document.getElementById("name").value;
                    var info=body.value;
                    $('#form').trigger('reveal:close');
                
                 var newNode = {"i_no":i_no,"name":title, "info":info,"childi_no":[]};
        	data.nodes.push(newNode);
             node.childi_no.push(i_no);
        	graph.addNode(i_no,newNode);
        	graph.addLink(node.i_no,i_no);
                    };
            $('#form').reveal({
                animation: 'fade',                   //fade, fadeAndPop, none
                animationspeed: 10,                       //how fast animtions are
                closeonbackgroundclick: true,              //if you click background will modal close?
                dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
            });
         }
         function delChild(node){
            var i;
            for(i=0;i<node.childi_no.length;i++)
            {
               // delChild(node.childi_no[i]);
                var j=0;
                while(data.nodes[j].i_no!=node.childi_no[i])
                {
                    j++;
                }
                delChild(data.nodes[j]);
                graph.removeNode(node.childi_no[i],data.nodes[j]);
            }
         }
         function del(node){
            delChild(node);
             graph.forEachLinkedNode(node.i_no, function(linkedNode, link){
                 graph.removeLink(link);
             });
             graph.removeNode(node.i_no,node);
         }
