var functions={};
functions.editingprojectdetails = function(){
    $("#map_viewform").bPopup({
            follow: [false, false], //x, y
            position: ['auto','auto' ] //x, y
        });
}
functions.editproject = function(url){
        console.log("1");
        event.preventDefault();
        function success(data){
            console.log(data);
            $("#map_viewform").bPopup().close();
            if(data.notice)
            {
                toastr.error(data.notice);
            }
            else
            {
                data = JSON.parse(data);
                toastr.success('Project details have been successfully edit');
                document.getElementById("project_name_view").innerHTML = data.name;
            }
        }
        var url = '/project/edit';
        var url_data = {name:$("#name_edit").val(),old_id:$("#old_id_edit").val(),old_name:$("old_name_edit").val(),email:$("#email_edit").val()};
        $.ajax({
            type: "GET",
            url: url,
            data: url_data,
            success: success
        });
}
functions.generateModalOnDbClick = function(node) {
    /*calling bPopup modal*/
    $("#change_node").bPopup({contentContainer:'.content',speed: 750, 
            opacity: 0.6,fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 1500, //can be a string ('slow'/'fast') or int
            modalColor: 'lightblue',
            transition: 'slideBack'});

    /*filling information of task on html page*/
    var title = document.getElementById("info_title").innerHTML=node.name;   
    var body1 = document.getElementById("info_info").innerHTML=node.info;
    var time = document.getElementById("info_date").innerHTML = node.due_date;
    var status = document.getElementById("info_status").innerHTML = node.status;

    /*To display chat messages*/
    var i;                                                      //index of node in map_data
    for(i=0;i<pr_data.data.length;i++)
     {
        if(pr_data.data[i].i_no == node.i_no)
        break;
     }

    var chat = pr_data.data[i].chat;
    //clear the chat box
    var savey = $('#chat-box .ps-scrollbar-y-rail').detach();
    var savex = $('#chat-box .ps-scrollbar-x-rail').detach();
    $('#chat-box').empty().append(savey);
    $('#chat-box').append(savex);

    if(chat)
    {
        for(i=0;i<chat.length;i++)
        {
            var divChat = document.createElement('div');
            divChat.className = 'item';
            divChat.innerHTML="<div class='item'><img src='http://www.gravatar.com/avatar/"+chat[i].gravitar+"' alt='user image' /><p class='message'><a href='#'' class='name'><small class='text-muted pull-right'><i class='fa fa-clock-o'></i>"+chat[i].time+"</small>"+chat[i].username+"</a>"+chat[i].chat_message+"</p></div>";
            document.getElementById('chat-box').appendChild(divChat);
            console.log(divChat);
        }
    }

    /*Create a new sub task*/
    var create = document.getElementById("cr_submit");
    create.onclick = function(){
         functions.create(node);
    }
    /*  
    if(node.due_date){
    body2.innerHTML =  node.due_date;
    } 
    else {
        body2.innerHTML =  "Due Date is not Set";
    }
    var body3 = document.getElementById("h4Fr");
    body3.innerHTML=node.status;

    //to display chat messages
    var i;
    for(i=0;i<pr_data.data.length;i++)
     {
        if(pr_data.data[i].i_no == node.i_no)
            break;
     }
    var chat = pr_data.data[i].chat;
    var voting = pr_data.data[i].voting;
    //clear the chat box

    var savey = $('#chat-box .ps-scrollbar-y-rail').detach();
    var savex = $('#chat-box .ps-scrollbar-x-rail').detach();
    $('#chat-box').empty().append(savey);
    $('#chat-box').append(savex);

    if(chat)
    {
        for(i=0;i<chat.length;i++)
        {
            var divChat = document.createElement('div');
            divChat.className = 'item';
            divChat.innerHTML="<div class='item'><img src='http://www.gravatar.com/avatar/"+chat[i].gravitar+"' alt='user image' /><p class='message'><a href='#'' class='name'><small class='text-muted pull-right'><i class='fa fa-clock-o'></i>"+chat[i].time+"</small>"+chat[i].username+"</a>"+chat[i].chat_message+"</p></div>";
            document.getElementById('chat-box').appendChild(divChat);
        }
    }

    // in order to get user has given like or dislike or none
    //like
    var vote = 0;
    if(voting){
        var email = $('#123').data('mail');
        console.log(email);
        for(i=0;i<voting.like.length;i++)
        {
            if(voting.like[i] == email)
            {
                vote = 1;
                break;
            }
        }
        if(vote != 1)
        {
            for(i=0;i<voting.dislike.length;i++)
            {
                if(voting.dislike[i] == email)
                {
                    vote = -1;
                    break;
                }
            }
        }

        if(vote == 1)
       {
            var like = document.getElementById("node_like");
            like.classList.remove('fa-thumbs-o-up');
            like.classList.add('fa-thumbs-up');
        }
        else if(vote == -1)
        {
            var dislike = document.getElementById("node_dislike");
            dislike.classList.remove('fa-thumbs-o-down');
            dislike.classList.add('fa-thumbs-down');
        }
    }
    var minimize = document.getElementById("minimize");
    minimize.onclick = function(){
        if(!minimize.classList.contains('hidden'))
        {
            $("#chat").fadeOut();
            $("#chat-footer").fadeOut();
            minimize.classList.add('hidden');
        }
    }
    var maximize = document.getElementById("maximize");
    maximize.onclick = function(){
        if(minimize.classList.contains('hidden'))
        {
            $("#chat").fadeIn();
            $("#chat-footer").fadeIn();
            minimize.classList.remove('hidden');
        }
    }

    var like = document.getElementById("node_like");
    var dislike = document.getElementById("node_dislike");

    like.onclick = function(){
        var pvote = vote;
        if(vote == 0)
        {
            like.classList.remove('fa-thumbs-o-up');
            like.classList.add('fa-thumbs-up');
            vote = 1 ;
        }
        else if(vote == 1)
        {
           like.classList.remove('fa-thumbs-up');
            like.classList.add('fa-thumbs-o-up');
            vote = 0;
        }
        else if(vote == -1)
        {
            like.classList.remove('fa-thumbs-o-up');
            like.classList.add('fa-thumbs-up');
            dislike.classList.remove('fa-thumbs-down');
            dislike.classList.add('fa-thumbs-o-down');
            vote = 1;
        }
        functions.send_vote(node,pvote, 1);
    }

    dislike.onclick = function(){
        var pvote = vote;
        if(vote == 0)
        {
            dislike.classList.remove('fa-thumbs-o-down');
            dislike.classList.add('fa-thumbs-down');
            vote = -1;
        }
        else if(vote == 1)
        {
            dislike.classList.remove('fa-thumbs-o-down');
            dislike.classList.add('fa-thumbs-down');
            like.classList.remove('fa-thumbs-up');
            like.classList.add('fa-thumbs-o-up');
            vote = -1;
        }
        else if(vote == -1)
        {
            dislike.classList.remove('fa-thumbs-down');
            dislike.classList.add('fa-thumbs-o-down');
            vote = 0;
        }
        functions.send_vote(node,pvote, -1);
    }

    var crMessage = document.getElementById("send_message");        //to send a message
    crMessage.onclick = function(){
       functions.send_message(node);
    }
    var create = document.getElementById("cr");
    create.onclick = function(){
        $("#f").bPopup().close();
         functions.create(node);
    }
    var edit = document.getElementById("ed");
    edit.onclick = function(){
        $("#f").bPopup().close();
        functions.edit(node);
    }
    var del_node = document.getElementById("del");
    del_node.onclick = function(){
        $("#f").bPopup().close();
        functions.del(node);
    }
    var hide = document.getElementById("hide");
    hide.onclick = function(){
        $("#f").bPopup().close();
        functions.hide(node);
    }
*/
}
functions.upload = function(){
    
}
functions.send_vote = function(node, pvote, vote){
    function success(data){
        console.log(data);
    }
    var email = $('#123').data('mail');
    var i,j;
    for(i=0;i<pr_data.data.length;i++)
     {
        if(pr_data.data[i].i_no == node.i_no)
            break;
     }
     //if voting object is undefined
    if(!pr_data.data[i].voting)
    {
        pr_data.data[i].voting = {
            like:[],
            dislike:[]
        };
    }
    console.log("pvote:"+pvote+"vote:"+vote);
    if(pvote == 0)
    {
        if(vote == 1)
        {
            pr_data.data[i].voting.like.push(email);
        }
        else if(vote == -1)
        {
            pr_data.data[i].voting.dislike.push(email);
        }
    }
    else if(pvote == 1)
    {
        for(j=0;j<pr_data.data[i].voting.like.length; j++)
        {
            if(pr_data.data[i].voting.like[j] == email)
            {
                break;
            }
        }
        pr_data.data[i].voting.like.splice(j,1);
        if(vote == -1)
        {
            pr_data.data[i].voting.dislike.push(email);
        }
    }
    else if(pvote == -1)
    {
        for(j=0;j<pr_data.data[i].voting.dislike.length; j++)
        {
            if(pr_data.data[i].voting.dislike[j] == email)
            {
                break;
            }
        }
        pr_data.data[i].voting.dislike.splice(j,1);
        if(vote == 1)
        {
            pr_data.data[i].voting.like.push(email);
        }
    }

    var url = "/project/maps/editnode";
    var map_name = $('#123').data('m_n') ;
    var url_data = { project_id:$('#123').data('p_i'),i_no:node.i_no,map_name: map_name,chat:pr_data.data[i].chat,name: node.name, info: node.info,status:node.status,due_date:node.due_date,voting:pr_data.data[i].voting};
    $.ajax({
            type: "POST",
            url: url,
            data: url_data,
            success: success
        });
}
functions.send_message = function(node){

    function success(data){
        console.log(data);
    }
   var currentdate = new Date(); 
   var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
   
    var divChat = document.createElement('div');
            divChat.className = 'item';
            divChat.innerHTML="<div class='item'><img src='http://www.gravatar.com/avatar/"+$('#123').data('gravitar')+"' alt='user image' /><p class='message'><a href='#'' class='name'><small class='text-muted pull-right'><i class='fa fa-clock-o'></i>"+datetime+"</small>"+$('#123').data('uname')+"</a>"+$('#user_message').val()+"</p></div>";
            document.getElementById('chat-box').appendChild(divChat);
    var chat = {
        username:$('#123').data('uname'),
        chat_message:$("#user_message").val(),
        gravitar:$('#123').data('gravitar'),
        time:datetime
    };
    var i;
    for(i=0;i<pr_data.data.length;i++)
    {
        if(pr_data.data[i].i_no == node.i_no)
            break;
    }
    if(!pr_data.data[i].chat)
    {
        pr_data.data[i].chat = [];
    }
    pr_data.data[i].chat.push(chat);
    var url = "/project/maps/editnode";
    var map_name = $('#123').data('m_n') ;
    var url_data = { project_id:$('#123').data('p_i'),i_no:node.i_no,map_name: map_name,chat:pr_data.data[i].chat,name: node.name, info: node.info,status:node.status,due_date:node.due_date,voting:pr_data.data[i].voting};
    console.log(url_data);

    $.ajax({
            type: "POST",
            url: url,
            data: url_data,
            success: success
        });
}
functions.create= function(node){
    console.log("creating");
   /* $("#form").unbind('submit');
    $("#form").bPopup({contentContainer:'.content',speed: 750, 
            opacity: 0.6,fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 1500, //can be a string ('slow'/'fast') or int
            modalColor: 'lightblue',
            transition: 'slideBack'});
    */  
      /*  function success(data){
                    console.log(data);
                    $("#change_node").bPopup().close();
                    if(data.notice)
                    {
                        toastr.error(data.notice);
                    }
                    else
                    {
                        pr_data.data = data ;
                        var i = data[(data).length-1];
                        var newNode = {"i_no":i.i_no,"name":i.name, "info":i.info,"childi_no":[],"due_date":i.due_date ,"parenti_no":i.parenti_no,"status":i.status};
                        graph.addNode(data[(data).length-1].i_no,newNode);
                        graph.addLink(node.i_no,data[(data).length-1].i_no);
                        toastr.success('New node has been created');
                    }
        }*/
    var date = document.getElementById("cr_date_picker").value;
    console.log(date);
    var e = document.getElementById("create_dropdown");
    var status = e.options[e.selectedIndex].value;
    var url = "/project/maps/addnode";
    var map_name = $('#123').data('m_n') ;
    if(map_name === "undefined") { map_name = $('#map_name').val() } ;
    var url_data = { name: $('#create_title').val(), info: $('#create_info').val(),project_id:$('#123').data('p_i'),parenti_no: node.i_no,map_name: map_name, due_date: date,status:status };
 //   document.getElementById('create_title').value="";
 //   document.getElementById("create_info").value="";
      console.log(url_data);  
        $.ajax({
            type: "POST",
            url: url,
            data: url_data,
            success: success
        });
}

functions.edit = function(node){
    console.log("editing");
  //  $("#form").reset();

    $("#form").unbind('submit');
    $("#form").bPopup({contentContainer:'.content',speed: 750, 
            opacity: 0.6,fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 1500, //can be a string ('slow'/'fast') or int
            modalColor: 'lightblue',
            transition: 'slideBack'});
    $("#form").submit(function(event) {
        event.preventDefault();

        function success(data){
                    console.log(data);
                if(data.notice)
                {
                        toastr.error(data.notice);
                }
                else
                {
                 //   data = JSON.parse(data);
                    pr_data.data = data;
                    $("#form").bPopup().close();
                    for(var i=0;i<(data).length;i++)
                    {
                        if(data[i].i_no == node.i_no)
                            break;
                    }
                    var newNode = {"i_no":data[i].i_no,"name":data[i].name, "info":data[i].info,"childi_no":data[i].childi_no,"parenti_no":data[i].parenti_no,"due_date":data[i].due_date,"status":data[i].status,voting:pr_data.data[i].voting,chat:pr_data.data[i].chat};
                    graph.removeNode(node.i_no,node);
                    graph.forEachLinkedNode(node.i_no, function(linkedNode, link){
                        graph.removeLink(link);
                    });
             
                    graph.addNode(data[i].i_no,newNode);
                    if(data[i].parenti_no!=0)
                    {
                        graph.addLink(data[i].parenti_no,data[i].i_no);
                    }
                    for(var j=0;j<data[i].childi_no.length;j++)
                    {
                        graph.addLink(data[i].i_no,data[i].childi_no[j]);
                    }
                    toastr.success('Node has been edited');
                }
        }
   var date = document.getElementById("dateForm").value;
    var e = document.getElementById("form_status");
    var status = e.options[e.selectedIndex].value;
    var url = "/project/maps/editnode";
    var map_name = $('#123').data('m_n') ;
    if(map_name === "undefined") { map_name = $('#map_name').val() } ;
    var url_data = { name: $('#name').val(), info: $('#info').val(),project_id:$('#123').data('p_i'),i_no:node.i_no,map_name: map_name,due_date: date,status:status};
   // var input2 = document.getElementById ("name");
     //input2.placeholder = "Enter title for your first note";
      //var input3 = document.getElementById ("info");
     //input3.placeholder = "Enter details about your note";

    document.getElementById('name').value="";
    document.getElementById("info").value="";
        $.ajax({
            type: "POST",
            url: url,
            data: url_data,
            success: success
        });
    });
}
functions.del =function(node){
    console.log("delting");
    $("#d").unbind('submit');
    $("#d").bPopup();
    document.getElementById("cancel_del").onclick = function(){
        $("#d").bPopup().close();
    }
    $("#d").submit(function(event) {
        
        event.preventDefault();
        function success(data){
            pr_data.data= JSON.parse(data);
            console.log(pr_data.data);
        }
        for(i=0;i<pr_data.data.length;i++)
        {
            if(pr_data.data[i].i_no == node.i_no)
            {   
                break;
            }
        }
        functions.deleteChild(pr_data.data[i]);
        var ino = pr_data.data[i].parenti_no;
        if(ino != 0)
        {
            for(var j=0; j<pr_data.data.length;j++)                 // j is the index of the parent of the "node"
            {
                if(pr_data.data[j].i_no== ino)
                {
                    break;
                }
            }
            for(var k=0; k<pr_data.data[j].childi_no.length;k++)
            {
                if(pr_data.data[j].childi_no[k] == node.i_no)
                {
                    break;
                }
            }
        }
        graph.removeNode(pr_data.data[i].i_no,pr_data.data[i]);
        pr_data.data.splice(i,1);
        if(ino != 0)
        {
            pr_data.data[j].childi_no.splice(k,1);
        }
        $("#d").bPopup().close();
        var url = "/project/maps/delete";
        var map_name = $('#123').data('m_n') ;
        if(map_name === "undefined") { map_name = $('#map_name').val() } ;
        var url_data = { map_name: map_name,project_id:$('#123').data('p_i'),data:pr_data.data };

        $.ajax({
            type: "POST",
            url: url,
            data: url_data,
            success: success    
             });  
    });
 }
 functions.deleteChild = function(node){
            var i;
            
            for(i=0;i<node.childi_no.length;i++)
            {
                var j=0;
                while(pr_data.data[j].i_no!=node.childi_no[i])
                {
                    j++;
                }
                functions.deleteChild(pr_data.data[j]);

                    graph.forEachLinkedNode(node.childi_no[i], function(linkedNode, link){
                    graph.removeLink(link);
                    });
                    graph.removeNode(node.childi_no[i],pr_data.data[j]);
                    pr_data.data.splice(j,1);
            }
         }
functions.cr_project = function() {                     //this is used to create first node of a map

   console.log("creating map");
    $("#create_map").unbind('submit');
    $("#create_map").bPopup({
            contentContainer:'.content',speed: 750,//x, y
            opacity: 0.6,fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 1500, //can be a string ('slow'/'fast') or int
            modalColor: 'lightblue',
            transition: 'slideBack'
        });
    
    $("#create_map").submit(function(event) {

    /* stop form from submitting normally */
        event.preventDefault();

        function success(data){
            console.log(data);
            if(data.notice)
            {
                toastr.error(data.notice);
            }
            else
            {
                var pname= $('#old_name_edit_2').data('pname');
                console.log(pname);
                if(pname == undefined)
                {
                    pname = $('#123').data('pname');
                }
                else if(pname==undefined)
                {
                    pname = $('#old_name_edit').data('pname');
                }
                //console.log(pname);
                //if(pname==undefined)
                //{
                 //   pname=$("#old_name_edit").data().pname;
                //}

                $("#create_map").bPopup().close();
                window.location = "http://jutja.com/project/maps/view?name="+map_n+"&pid="+pid+""+"&pname="+pname;
            }   
        }
        var date = document.getElementById("dateCreate").value;
        var e = document.getElementById("create_status");
        var status = e.options[e.selectedIndex].value;
        var map_n = $('#map_name').val();
        var pid = $('#123').data('p_i');
        if(pid==undefined)
        {
            pid = $("#old_id_edit").val();
        }

        var url = "/project/maps/create";
        var url_data = { name: $('#cr_name').val(), info: $('#cr_message').val(),project_id:pid,parenti_no:0,map_name: $('#map_name').val(), due_date: date,status:status }
        

        document.getElementById('cr_name').value="";
        document.getElementById('cr_name').value="";
        document.getElementById('cr_message').value="";
        $.ajax({
            type: "POST",
            url: url,
            data: url_data,
            success: success
            });

    });
};

functions.hide = function(node) {
    console.log("hiding");
    var i;
    var temp = [];
     for(i=0;i<pr_data.data.length;i++)
     {
        if(pr_data.data[i].i_no == node.i_no)
            break;
     }

    functions.hideChild(pr_data.data[i],i,temp);
    for(var j=0; j<temp.length;j=j+2)
    {
        graph.addLink(temp[j],temp[j+1]);
    }
    if(pr_data.data[i].visibility == undefined || pr_data.data[i].visibility == 0)
        pr_data.data[i].visibility = 1 ;
    else
        pr_data.data[i].visibility = 0 ;
}

functions.hideChild = function(){
            var i;
            var index = arguments[1];
            var node = arguments[0];
            for(i=0;i<node.childi_no.length;i++)
            {
                var j=0;
                while(pr_data.data[j].i_no!=node.childi_no[i])
                {
                    j++;
                }
                functions.hideChild(pr_data.data[j],index,arguments[2]);

                if(pr_data.data[index].visibility == 0 || pr_data.data[index].visibility == undefined )
                {
                    console.log("Hide");
                    graph.forEachLinkedNode(node.childi_no[i], function(linkedNode, link){
                    graph.removeLink(link);
                    });
                    graph.removeNode(node.childi_no[i],pr_data.data[j]);
                }
                else
                {
                    console.log("unhide");
                    graph.addNode(node.childi_no[i],pr_data.data[j]);
                    arguments[2].push(pr_data.data[j].parenti_no);
                    arguments[2].push(pr_data.data[j].i_no);
                }
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
            var right = str.substring(width);
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
functions.findColor =  function(date,id){
    var colors = [
            "#D91E18", "#F39C12",
            "#2ECC71", "#9B59B6"
            ];
            if(date)
            {
              var dd = date.split("/");         //day/mm/yyyy
              dd[0] = parseInt(dd[0]);          //dd[2] = date
              dd[1] = parseInt(dd[1]);          //dd[1] = month
              dd[2] = parseInt(dd[2]);          //dd[0] = year
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
