var real = new Primus();
	real.on('open', function open() {
		console.log("OPEN");							//check if map is already present or not
		var a =" <a ><i class='fa fa-circle text-success' ></i> Online</a>"
	  document.getElementById("online").innerHTML = a;
	});

	real.on('offline', function () {
	  console.log('offline');
	  var a =" <a ><i class='fa fa-circle text-success' style='color:#c93330;'></i> Offline</a>"
	  document.getElementById("online").innerHTML = a;
	  toastr.error("You are offline now. Please check your internet connection");

	});
	real.on('data', function(data) {
		console.log(data);
		switch (data.action){
			case "notice":
				realtime.notice(data.data);
				break;
			case "new_project":
				realtime.project_made(data.data);
				$("#createProjForm").fadeOut(); 
				break;
			case "view_project":
				realtime.view_proj(data.data);
				break;
			case "user_task":
				realtime.user_task(data.data);
				break;
			case "new_map":
				realtime.new_map(data);
				break;
			case "open_map":
				realtime.open_map(data);
				break;
			case "get_id":
				call.ini_uid(data.id);
				break;
			case "delete_project":
				realtime.delete_project(data.data);
				break;
			case "add_node":
				realtime.add_node(data);
				break;
			case "edit_node":
				realtime.edit_node(data);
				break;
			case "del_node":
				realtime.del_node(data);
				break;
			case "user_info":
				realtime.user_info(data.data);
				break;
			case "user_projects":
				realtime.user_projects(data.data);
				break;
			case "chat":
				realtime.chat(data);
				break;
			case "get_chat":
				realtime.get_chat(data);
				break;
			case "vote":
				realtime.vote(data);
				break;
			case "get_vote":
				realtime.get_vote(data.data);
				break;
			case "collaborator":
				realtime.collaborator(data.data);
				break;
			case "add_users":
				realtime.add_users(data);
				break;
			case "remove_users":
				realtime.remove_users(data);
				break;
		}
	});

call = function(){
	
	var udetails = {};
	var nodedetails = {};
	var collaborators = {};
	var project = {};
	var email = "";

	function ini_uid(data){
		udetails["id"] = data;
	}
	
	function ret_uid(){
		return udetails["id"];
	}

	function ini_project(data){
		project =  data;
	}

	function ch_project(data ,action){
		if(action=="add"){
			if(project.hasOwnProperty('maps')){
				project.maps[data] = "null";
			}
			else{
				project["maps"]={};
				project.maps[data]="null";
			}
		}
		console.log(project);
	}

	function ini_collaborators(data ,id){
		collaborators = data;
		console.log(collaborators);
	}

	function ret_collaborators(){
		return collaborators;
	}

	function return_nodedetails(){
		return nodedetails;
	}
	
	function initialise_nodedetails(data){
		nodedetails["pin"] = 0 ;
		nodedetails.data = {};
		for ( var key in data ){
            if(data.hasOwnProperty(key)){
            	nodedetails.data[key] = data[key];
            	nodedetails.data[key].visibility = 1;
        	}
        }
	}

	function change_nodedetails(data, type){
		if(type == 'pin')
		{
			nodedetails.pin = data;
		}
		else if(type == 'hide')
		{
			var id = data.id;
			nodedetails.data[id].visibility = data.value;
		}
		else if( type == 'add' )
		{
			var id = data.i_no;
			nodedetails.data[id] = data ; 
			nodedetails.data[id].visibility = 1;
			nodedetails.data[data.parenti_no].childi_no.push(data.i_no);
		}
		else if( type == 'edit')
		{
			var visibility = nodedetails.data[data.i_no].visibility;
			nodedetails.data[data.i_no]  = data ; 
			nodedetails.data[data.i_no].visibility = visibility;
		}
		else if( type == 'delete')
		{
			var i;
			for( i=0 ; i< data.deleted.length ; i++)
			{
		//		if(nodedetails.data[data[i]].parenti_no)
				delete nodedetails.data[data.deleted[i]];
			}
			if(data){
				for( i=0; i< nodedetails.data[data.parenti_no].childi_no.length ; i++ )
				{
					if( nodedetails.data[data.parenti_no].childi_no[i] == data.i_no)
						break;
				}
			}
			nodedetails.data[data.parenti_no].childi_no.splice(i,1);
		}
	}
	////////////////////////////////////////////////////////
 	function chat(i_no){
 		if(!udetails.hasOwnProperty("name"))
 		{
 			udetails["name"] = $('#user_name').data().name;
 			udetails["gravatar"] = $('#user_gravatar').data().gravatar;
 		}
 		var currentdate = new Date(); 
 		var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
        var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');
        if($("#user_message").val().length)
        {
        	var chat = {
    	    	username : udetails.name,
    	    	msg : $("#user_message").val(),
        		gravatar : udetails.gravatar,
        		time : datetime
    		};
    		$("#user_message").val('');
    		real.write({action:"chat" , scope: {pid : id[0] , m_n : id[1] } ,  data :{ chat : chat ,pid : id[0] , m_n : id[1] , i_no : i_no } });
 		}
 	}
	//////////////////////////////////////////////////////
	/*Creation of a new Map */
	function cr_map(){
		var title = document.getElementById("modal_title");
		title.innerHTML = "Create a new Map";

		var body = document.getElementById("modal_body");
		var a = "<div class='form-group'><label for='title' class='col-sm-2 control-label'>Name</label>"+
					"<div class='col-sm-10' style='margin-left:5px;'><input required  type='text' class='form-control' id='map_name' placeholder='Map Name'></div>"+
                "</div>" + 
                "<div class='form-group'><div class='col-sm-offset-2 col-sm-10'>"+
 					"<button  class='btn btn-success' onclick = 'call.newMap()'>Submit</button>"+
 					"<button  class='btn btn-primary' style = 'margin-left: 10px;' onclick = 'call.closeModal()'>Cancel</button></div>"+
  				"</div>";
  		body.innerHTML = a;

  		$("#modal_form").bPopup();
	}

	function newMap(){
		if( $("#map_name").val()==""){
			toastr.error("Please provide a map name");
			
		}

		else if( $("#map_name").val()!=""){
			real.write({action : "new_map", scope: { pid: window.location.hash.substring(1).split('/')[1] } ,data : { m_n : $("#map_name").val() ,pid : window.location.hash.substring(1).split('/')[1] } });
			$("#map_name").val('');
		}
	}
	/*end of calling real.write for a new map*/
	//////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////
	/*To edit project details inside the viw project page i.e. when you are viewing maps*/

	function add_collab(){
        $("#add_collab").bPopup();
	}

	function submit_addCollab(){
		var st_owner = $("#add_owner").val();
		var st_editor = $("#add_editor").val();
		var st_viewer = $("#add_viewer").val();

		var owner = st_owner.split(',');
		var editor = st_editor.split(',');
		var viewer = st_viewer.split(',');
		var members = {};
		var i;
		if(owner){
			for(i = 0 ; i < owner.length ; i++){
				members[owner[i]] = "owner";
			}
		}
		if(editor){
			for(i = 0 ; i < editor.length ; i++){
				members[editor[i]] = "editor";
			}
		}
		if(viewer){
			for(i = 0 ; i < viewer.length ; i++){
				members[viewer[i]] = "viewer";
			}
		}

		if(owner || editor || viewer)
		{
			console.log({action:"add_users", data : {pid : window.location.hash.substring(1).split('/')[1], users : members }});
			real.write({action:"add_users", data : {pid : window.location.hash.substring(1).split('/')[1], users : members }});
			$("#add_collab").bPopup().close();
		}
		else
		{
			toastr.error("Add some collaborators");
		}
		 $("#add_collab").bPopup().close();
		 $("#add_owner").val('');
		 $("#add_editor").val('');
		 $("#add_viewer").val('');
	}

	function del_collab(){
	
		var owner = [];
		var editor = [];
		var viewer = [];
		var a = "";var i;
  		var collab_list = collaborators;
 		var uid = call.ret_uid();
 		delete collab_list[uid];
 		for (var key in collab_list) {
   			if (collab_list.hasOwnProperty(key)) {
   				if(collab_list[key].status == "owner")
   					owner.push(collab_list[key].email);
   				else if(collab_list[key].status == "editor")
   					editor.push(collab_list[key].email);
   				else if(collab_list[key].status == "viewer")
   					viewer.push(collab_list[key].email);
    			}
    		}
  		if(owner.length+viewer.length+editor.length)
  		{
			var title = document.getElementById("modal_title");
			title.innerHTML = "Delete Collaborators";

			var body = document.getElementById("modal_body");
			if(owner.length)
			{
				a = a + "<div class='form-group' style='text-align:center;'>Owner</div><ul class='list-group'>";
				for(i=0 ; i < owner.length ; i++){
					a = a + "<li id='"+owner[i]+"'class='list-group-item' style='font-size:13px'><a class='remove-users' onclick='call.delete_user(\""+owner[i]+"\",\"owner\")'><span style='float:right;'>x</span></a>"+owner[i]+"</li>";
				}
				a = a + "</ul></div>";
			}
			if(editor.length)
			{
				a = a + "<div class='form-group' style='text-align:center;'>Editor</div><ul class='list-group'>";
				for(i=0 ; i < editor.length ; i++){
					a = a + "<li id='"+editor[i]+"'class='list-group-item' style='font-size:13px'><a class='remove-users' onclick='call.delete_user(\""+editor[i]+"\",\"editor\")'><span style='float:right;'>x</span></a>"+editor[i]+"</li>";
				}
				a = a + "</ul></div>";
			}
			if(viewer.length)
			{
				a = a + "<div class='form-group' style='text-align:center;'>Viewer</div><ul class='list-group'>";
				for(i=0 ; i < viewer.length ; i++){
					a = a + "<li id='"+viewer[i]+"'class='list-group-item' style='font-size:13px'><a class='remove-users' onclick='call.delete_user(\""+viewer[i]+"\",\"viewer\")'><span style='float:right;'>x</span></a>"+viewer[i]+"</li>";
				}
				a = a + "</ul></div>";
			}
			body.innerHTML = a ;
  			$("#modal_form").bPopup();
		}
		else
		{
			toastr.error("Currently there are no collaborators in this project");
		}
	}

	function delete_user(user ,right){
		var users = {};
		users[user] = right;
		real.write({ action : "remove_users" , data: { pid : window.location.hash.substring(1).split('/')[1], users : users }});
	}

	function new_projModal(){
			var i;
			var tags = document.getElementsByClassName("bootstrap-tagsinput");
			for( i = 0 ; i<tags.length ; i++){
				tags[i].childNodes[0].size ="30";
			}
  			$("#createProjForm").bPopup();
	}
	//details of a particular project
	function prDetail(){
		var link = window.location.hash.substring(1) ;
		var owner = [];
		var editor = [];
		var viewer = [];
		var a = "";var i;
		for (var key in collaborators) {
  			if (collaborators.hasOwnProperty(key)) {
  				if(collaborators[key].status == "owner")
  					owner.push(collaborators[key].email);
  				else if(collaborators[key].status == "editor")
  					editor.push(collaborators[key].email);
  				else if(collaborators[key].status == "viewer")
  					viewer.push(collaborators[key].email);
  			}
  		}
  		if(project.description=="")
  			project.description = "Not provided";
		var title = document.getElementById("right-title");
 		 	title.innerHTML = "Info";
 		var addr= document.getElementById("right-address");
 		 	addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
 		 					'<li> <a href="#">Projects</a></li><li> <a style="cursor:pointer" onclick="call.viewProject(\''+link+'\')">Maps</a></li><li class="active">Info</li>';
 		var side = document.getElementById("left_sidebar");
  				side.innerHTML = "";
  				var bar =   "<li class='active'><a class='item_l'><i class='fa fa-edit'></i> <span>Info</span></a></li>"+
  							"<li><a class='item_l' onclick='call.viewProject(\""+link+"\")'><i class='fa fa-tasks'></i> <span>"+project.name+"</span></a></li>" +
		                   "<li ><a class='item_l' href='#'><i class='fa fa-book'></i> <span>Go back to Projects</span></a></li>" +
        		           "<li ><a class='item_l' href='#profile'><i class='fa fa-user'></i> <span>View Your Profile</span></a></li>";
		       	side.innerHTML = bar ;
	
  		var mydiv = document.getElementById("tile");
		  	mydiv.innerHTML = "";
		  	mydiv.className = "";
		var body =	"<div class='row hover-tab' style='margin-top:15px;margin-left: 10%;margin-right: 10%;'><div class='col-xs-3' style='font-size: 22px;color: #545559;padding-left: 6%;'>Project</div><div class='col-xs-7' style=' text-align:center;font-size: 22px;'>"+project.name+"</div></div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.6;'>"+
					"<div class='row hover-tab' style='margin-top:15px;margin-left:10%;margin-right: 10%;'><div class='col-xs-3' style='font-size:20px;padding-left: 6%;color:#545559;'>Description</div><div class='col-xs-7' style='text-align:center;font-size: 22px;'>"+project.description+"</div></div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.6;'>"+
					"<div class='row hover-tab' style='margin-top:15px;margin-left:10%;margin-right: 10%;'><div class='col-xs-3' style='font-size:20px;padding-left: 6%;color: #545559;'>Collaborators</div></div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.3;'>"+
					"<div class='row hover-tab' style='margin-top:10px;margin-left: 12%;margin-right: 12%;'><div class='col-xs-3' style='font-size:19px;padding-left: 6%;color: gray;'><i class='fa fa-circle' style='color: gray; margin-right: 4%;font-size: 10px;'></i>Owner</div>";
			if(owner.length)
			{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>"+owner[0];
				for( i= 1 ;i<owner.length;i++)
				{
					body = body + "<br>"+owner[i];
				}
				body=body+"</div>";
			}
			else{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
			}	
			body = body + "</div><hr style='margin-left: 15%;margin-right: 15%;opacity:0.3;'>";	
			body = body +  "<div class='row hover-tab' style='margin-top:10px;margin-left: 12%;margin-right:12%'><div class='col-xs-3' style='font-size:19px;padding-left: 6%;color: gray;'><i class='fa fa-circle' style='color: gray; margin-right: 4%;font-size: 10px;'></i>Editor</div>";
			
			if(editor.length)
			{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>"+editor[0];
				for( i= 1 ;i<editor.length;i++)
				{
					body = body + "<br>"+editor[i];
				}
				body=body+"</div>";
			}
			else{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
			}	
			body = body + "</div><hr style='margin-left: 15%;margin-right: 15%;opacity:0.3;'>";			
			body = body +  "<div class='row hover-tab' style='margin-top:10px;margin-left: 12%;margin-right:12%'><div class='col-xs-3' style='font-size:19px;padding-left: 6%;color: gray;'><i class='fa fa-circle' style='color: gray; margin-right: 4%;font-size: 10px;'></i>Viewer</div>";
			
			if(viewer.length)
			{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>"+viewer[0];
				for( i= 1 ;i<viewer.length;i++)
				{
					body = body + "<br>"+viewer[i];
				}
				body=body+"</div>";
			}
			else{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
			}	
			body = body + "</div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.6;'>";
			body = body + "<div class='row hover-tab' style='margin-top:15px;margin-left:10%;margin-right: 10%;'><div class='col-xs-3' style='font-size:20px;padding-left: 6%;color:#545559;'>Maps</div>";
			
			if(project.hasOwnProperty('maps'))
  				{
  					body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>";
		  			for (var key in project.maps) {
  						if (project.maps.hasOwnProperty(key)) {
    						body = body + key+"<br>";
  						}
					}
					body=body+"</div>";
				}
			else{
				body = body + "<div class='col-xs-7' style='text-align: center;font-size: 17px;'>None</div>";
			}
			body = body + "</div><hr style='margin-left: 10%;margin-right: 10%;opacity:0.8;'>";
			mydiv.innerHTML = body;

	}

	function analyseProject(){
		var link = window.location.hash.substring(1) ;
		var title = document.getElementById("right-title");
 		 	title.innerHTML = "Analytics";
 		var addr= document.getElementById("right-address");
 		 	addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
 		 					'<li> <a href="#">Projects</a></li><li> <a style="cursor:pointer" onclick="call.viewProject(\''+link+'\')">Maps</a></li><li class="active">Analystics</li>';
 		var side = document.getElementById("left_sidebar");
  				side.innerHTML = "";
  				var bar =   "<li class='active'><a class='item_l'><i class='fa fa-edit'></i> <span>Analytics</span></a></li>"+
  							"<li><a class='item_l' onclick='call.viewProject(\""+link+"\")'><i class='fa fa-tasks'></i> <span>"+project.name+"</span></a></li>" +
		                   "<li ><a class='item_l' href='#'><i class='fa fa-book'></i> <span>Go back to Projects</span></a></li>" +
        		           "<li ><a class='item_l' href='#profile'><i class='fa fa-user'></i> <span>View Your Profile</span></a></li>";
		       	side.innerHTML = bar ;
	
  		var mydiv = document.getElementById("tile");
		  	mydiv.innerHTML = "";
		  	mydiv.className = "";

		var analytics = {};
		var analytics_date = {};
		var today = new Date();
		today.setHours(0,0,0,0);
		today = Date.parse(today);
		if(project.hasOwnProperty('maps'))
  		{
		  	for (var key in project.maps) {
  				if (project.maps.hasOwnProperty(key)) {
    				analytics[key] = { Completed : [] , Incomplete : [] , Ongoing : [] , Not_Started : [] , Not_Set :[] };
    				analytics_date[key] = { Today : [] , Tomorrow : [] , Week : [] , Later : [] , Gone : [], Not_Set :[] };
    				var map = project.maps[key] ;
    				delete map.length;
    				for(var task in map){
    					if (map.hasOwnProperty(task)) {
    						console.log(map[task]);
    						var status = map[task].status;

    						if(status.split(" ").length==2)
    							status = status.split(" ")[0]+"_"+status.split(" ")[1];
    						if(analytics[key].hasOwnProperty(status))
    							analytics[key][status].push(task);

    						var due_date = map[task].due_date;
    						due_date = Date.parse(due_date);
    						if(isNaN(due_date))
    							analytics_date[key]["Not_Set"].push(task);
    						else{
    							console.log(due_date-today);
    							if(due_date-today<0)
    							{
    								analytics_date[key]["Gone"].push(task);
    							}
    							else {
    							if(due_date-today == 0)
    							{
    								analytics_date[key]["Today"].push(task);
    							}
    							if(due_date-today == 86400000)
    							{
    								analytics_date[key]["Tomorrow"].push(task);
    							}
    							if(due_date-today <= 518400000)
    							{
    								analytics_date[key]["Week"].push(task);
    							}
    							if(due_date-today > 518400000)
    							{
    								analytics_date[key]["Later"].push(task);
    							}
    						   }
    						}
    					}
    				}
  				}
			}
		}
		console.log(analytics);
		console.log(analytics_date);
		var project_status = { Completed : 0 , Incomplete : 0 , Ongoing : 0 , Not_Started : 0 , Not_Set : 0 };
		for(var key in analytics){
			if(analytics.hasOwnProperty(key)){
				project_status.Completed = project_status.Completed + analytics[key].Completed.length;
				project_status.Incomplete = project_status.Incomplete + analytics[key].Incomplete.length;
				project_status.Ongoing = project_status.Ongoing + analytics[key].Ongoing.length;
				project_status.Not_Started = project_status.Not_Started + analytics[key].Not_Started.length;
				project_status.Not_Set = project_status.Not_Set + analytics[key].Not_Set.length;
			}
		}
		if(project_status["Completed"]+project_status["Incomplete"]+project_status["Ongoing"]+project_status["Not_Set"]+project_status["Not_Started"] == 0 ){
			toastr.error("No tasks in this project to show analytics");
			call.viewProject(link);
		}
		else{
			var doughnutData_status = [
				{
					value: project_status.Completed ,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Completed"
				},
				{
					value: project_status.Incomplete,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Incomplete"
				},
				{
					value: project_status.Ongoing,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Ongoing"
				},
				{
					value: project_status.Not_Started,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Not Started"
				},
				{
					value: project_status.Not_Set,
					color: "#4D5360",
					highlight: "#616774",
					label: "Not Set"
				}

			];

			var body = "<div class='row' style='margin-top:15px;'><div class='col-xs-6 responsive-small'><div class='analyse_head'>Status of Tasks</div><br><div id='canvas-holder' style='width:60%;'><canvas id='chart-area' width='500' height='500'/></div></div>";

			var project_date = { Not_Set : 0 , Today : 0 ,Tomorrow : 0 , Week : 0 , Later : 0,Gone: 0};
			for(var key in analytics_date){
				if(analytics_date.hasOwnProperty(key)){
					project_date.Not_Set = project_date.Not_Set + analytics_date[key].Not_Set.length;
					project_date.Today = project_date.Today + analytics_date[key].Today.length;
					project_date.Tomorrow = project_date.Tomorrow + analytics_date[key].Tomorrow.length;
					project_date.Week = project_date.Week + analytics_date[key].Week.length;
					project_date.Later = project_date.Later + analytics_date[key].Later.length;
					project_date.Gone = project_date.Gone + analytics_date[key].Gone.length;
				}
			}
			console.log(project_date);

			var doughnutData_date = [
				{
					value: project_date.Not_Set ,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Not set"
				},
				{
					value: project_date.Today,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Today"
				},
				{
					value: project_date.Tomorrow,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Tomorrow"
				},
				{
					value: project_date.Week,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "This Week"
				},
				{
					value: project_date.Later,
					color: "#4D5360",
					highlight: "#616774",
					label: "After this week"
				},
				{
					value: project_date.Gone,
					color: "#454a71",
					highlight: "#363a58",
					label: "Gone"
				}

			];
			body = body+ "<div class='col-xs-6 responsive-small' ><div class='analyse_head'>Due Date of Tasks</div><br><div id='canvas-date' style='width:60%;'><canvas id='chart-date' width='500' height='500'/></div></div></div>"
			mydiv.innerHTML = body;
			var ctx_status = document.getElementById("chart-area").getContext("2d");
			var moduleDoughnut_status = new Chart(ctx_status).Doughnut(doughnutData_status, {responsive : true});

			var helpers = Chart.helpers;
			var legendHolder = document.createElement('div');
			legendHolder.innerHTML = moduleDoughnut_status.generateLegend();
			// Include a html legend template after the module doughnut itself
			helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
				helpers.addEvent(legendNode, 'mouseover', function(){
					var activeSegment = moduleDoughnut_status.segments[index];
					activeSegment.save();
					activeSegment.fillColor = activeSegment.highlightColor;
					moduleDoughnut_status.showTooltip([activeSegment]);
					activeSegment.restore();
				});
			});
			helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
				moduleDoughnut_status.draw();
			});

			document.getElementById("chart-area").parentNode.parentNode.appendChild(legendHolder.firstChild);


			var ctx_date = document.getElementById("chart-date").getContext("2d");
			var moduleDoughnut_date = new Chart(ctx_date).Doughnut(doughnutData_date, {responsive : true});

			var helpers = Chart.helpers;
			var legendHolder = document.createElement('div');
			legendHolder.innerHTML = moduleDoughnut_date.generateLegend();
			// Include a html legend template after the module doughnut itself
			helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
				helpers.addEvent(legendNode, 'mouseover', function(){
					var activeSegment = moduleDoughnut_date.segments[index];
					activeSegment.save();
					activeSegment.fillColor = activeSegment.highlightColor;
					moduleDoughnut_date.showTooltip([activeSegment]);
					activeSegment.restore();
				});
			});
			helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
				moduleDoughnut_date.draw();
			});
			document.getElementById("chart-date").parentNode.parentNode.appendChild(legendHolder.firstChild);
		}
	}

	function viewProject(link){
		window.location.hash ="";
		routie(link);
	}
	//////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////
	/*To delete a project from view_project*/
	//Here first function pops up the modal in order to confirm and second one deletes it
	function delPrModal(){
		var title = document.getElementById("modal_title");
		title.innerHTML = "Delete Project ";

		var body = document.getElementById("modal_body");
		var a = "<div class='form-group' style='text-align:center;'>Do you want to delete this project?</div>"+
				"<div class='form-group'><div class='col-sm-offset-2 col-sm-10'>"+
 					"<button  class='btn btn-danger' onclick = 'call.delProject()'>Delete</button>"+
 					"<button  class='btn btn-primary' style = 'margin-left: 10px;' onclick = 'call.closeModal()'>Cancel</button></div>"+
  				"</div>"
  		body.innerHTML = a ;
  		$("#modal_form").bPopup();
	}

	function delProject(){
		real.write({action : "delete_project", data : { pid : window.location.hash.substring(1).split('/')[1] } });
		$('#modal_form').bPopup().close();
	}
	/*----*/
	/////////////////////////////////////////////////////////////////
	function closeModal(){
		$('#modal_form').bPopup().close();
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////

	function genModal(node){
		$("#change_node").bPopup();

		document.getElementById("change_node").setAttribute("data-id", node.i_no);

		var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');

        var paras = document.getElementsByClassName('chatitems');
	 	while(paras[0]) {
		    paras[0].parentNode.removeChild(paras[0]);
		}
		real.write({action:"get_vote" , data : { i_no : node.i_no , m_n :id[1] , pid :id[0]  }, scope : { pid : id[0] , m_n : id[1] }});
    //    real.write({action : "get_vote" , data : {i_no : node.i_no , m_n :id[1] , pid :id[0] } })
		real.write({action : "get_chat" , scope : { pid : id[0] , m_n : id[1] } , data : {i_no : node.i_no , m_n :id[1] , pid :id[0]  } });
		//Displaying info of node
		document.getElementById("info_title").innerHTML = node.name;
		document.getElementById("info_info").innerHTML = node.info;
		document.getElementById("info_date").innerHTML = node.due_date;
		document.getElementById("info_status").innerHTML = node.status;
		var uid = call.ret_uid();
		if(node.assign){
			if(node.assign == collaborators[uid].email)
				document.getElementById("info_assign").innerHTML = "Myself";
			else 
				document.getElementById("info_assign").innerHTML = node.assign;
		}
		else{
			document.getElementById("info_assign").innerHTML = "None";
		}

		if(nodedetails.data[node.i_no].visibility == 1)
		{
			document.getElementById("node_hide").innerHTML = "Hide";
		}
		else{
			document.getElementById("node_hide").innerHTML = "Unhide";
		}
		document.getElementById('create_assign').options.length = 0;
		var assignment = [ "None", "Myself" ];
		var i = 0; 
		$('#create_title').val('');
		$('#create_info').val('');
		$('#cr_date_picker').val('');
		for( i=0 ; i < 2 ; i++ ){
			var option = document.createElement("option");
				option.text = assignment[i];
				option.value = assignment[i];
				var select = document.getElementById("create_assign");
				select.appendChild(option);
		}
		for( var key in collaborators){
			if(collaborators.hasOwnProperty(key) && uid!=key){
				var option = document.createElement("option");
				option.text = collaborators[key].email;
				option.value = collaborators[key].email;
				var select = document.getElementById("create_assign");
				select.appendChild(option);
			}
		}
		document.getElementById('edit_assign').options.length = 0;
		$('#edit_title').val(node.name);
		$('#edit_info').val(node.info);
		$('#ed_date_picker').val(node.due_date);
		var mySelect = document.getElementById('edit_dropdown');

		for(var i, j = 0; i = mySelect.options[j]; j++) {
    		if(i.value == node.status) {
        		mySelect.selectedIndex = j;
        		break;
    		}
		}

		for( i=0 ; i < 2 ; i++ ){
			var option = document.createElement("option");
				option.text = assignment[i];
				option.value = assignment[i];
				var select = document.getElementById("edit_assign");
				select.appendChild(option);
		}
		for( var key in collaborators){
			if(collaborators.hasOwnProperty(key) && uid!=key){
				var option = document.createElement("option");
				option.text = collaborators[key].email;
				option.value = collaborators[key].email;
				var select = document.getElementById("edit_assign");
				select.appendChild(option);
			}
		}
		var mySelect = document.getElementById('edit_assign');
		console.log(collaborators);
		console.log(uid);
		console.log(collaborators[uid].email);
		var assign;
		if(node.assign == collaborators[uid].email)
			assign = "Myself" ;
		else
			assign = node.assign;
		console.log(assign);
		for(var i, j = 0; i = mySelect.options[j]; j++) {
    		if(i.value == assign) {
        		mySelect.selectedIndex = j;
        		break;
    		}
		}

		document.getElementById("cr_submit").onclick = function (){
			call.add_node(node);
		}
		document.getElementById("ed_submit").onclick = function(){
			call.edit_node(node);
		}
		document.getElementById("task_delete").onclick =function(){
			var del = [];
			del.push(node.i_no);
			call.del_node(node.i_no , del);
			real.write({action : "del_node", scope : { pid : id[0] , m_n : id[1] }, data : {pid : id[0] , m_n : id[1] , deleted:del , i_no : node.i_no , parenti_no : node.parenti_no }});
		}
		document.getElementById("task_cancel").onclick = function(){
			$("#change_node").bPopup().close();
		}
		document.getElementById("send_message").onclick = function(){
			call.chat(node.i_no);
		}
		document.getElementById("node_like").onclick = function(){
			real.write({action : "vote", scope : { pid : id[0] , m_n : id[1] },data : {pid : id[0] , m_n : id[1] , i_no : node.i_no ,name : $('#user_name').data().name, vote : 1 }});
		}
		document.getElementById("node_dislike").onclick = function(){
			real.write({ action : "vote" , scope : { pid : id[0] , m_n : id[1] }, data : { pid : id[0] , m_n : id[1] , i_no : node.i_no ,name : $('#user_name').data().name, vote : 0 }});
		}

		document.getElementById("node_hide").onclick = function(){
			var visibility = nodedetails.data[node.i_no].visibility;
			console.log(visibility);
			if(visibility)
			{
				var data = {
					id : node.i_no,
					value : 0
				}
				call.hideNode(node.i_no);
				call.change_nodedetails(data,"hide");
			}
			else
			{
				var linkid = [];
				call.unhideNode(node.i_no,linkid);
				var data = {
					id : node.i_no,
					value : 1
				}
				console.log(linkid);
				for( var i = 0; i< linkid.length ; i++)
				{
					graph.addLink(nodedetails.data[linkid[i]].parenti_no,linkid[i] );
				}
				call.change_nodedetails(data,"hide");
			}
			$("#change_node").bPopup().close();
		}
	}

	function add_node(node){
		var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');
		var date = document.getElementById("cr_date_picker").value;
		var dropdown = document.getElementById("create_dropdown");
    	var status = dropdown.options[dropdown.selectedIndex].value;

    	var assign_dropdown = document.getElementById("create_assign");
    	var assign = assign_dropdown.options[assign_dropdown.selectedIndex].value;
    	if(assign == "Myself")
    		assign = collaborators[call.ret_uid()].email ;
   		if( $('#create_title').val().length == 0)
   		{
   			toastr.error("Please give a title to new task");
   		}
   		else if($('#create_info').val().length == 0)
   		{
   			toastr.error("Please give info to new task");
   		}
   		else if(date.length == 0 )
   		{
   			toastr.error("Please select deadline for the task");
   		}
   		else
   		{
    		real.write({ action : "add_node" , scope : { pid : id[0] , m_n : id[1] }, data : { pid : id[0] , m_n : id[1] , name: $('#create_title').val(), info: $('#create_info').val(),parenti_no: node.i_no, due_date: date,status:status, assign:assign }});
    	}
	}
	
	function edit_node(node){
		var id = window.location.hash.substring(1).split('/')[1];
        id = id.split('_');
		var date = document.getElementById("ed_date_picker").value;
		var dropdown = document.getElementById("edit_dropdown");
    	var status = dropdown.options[dropdown.selectedIndex].value;
  		
  		var assign_dropdown = document.getElementById("edit_assign");
    	var assign = assign_dropdown.options[assign_dropdown.selectedIndex].value;
    	if(assign == "Myself")
    		assign = collaborators[call.ret_uid()].email ;
  		if( $('#edit_title').val().length == 0)
   		{
   			toastr.error("Please give a title to task");
   		}
   		else if($('#edit_info').val().length == 0)
   		{
   			toastr.error("Please give info to task");
   		}
   		else if(date.length == 0 )
   		{
   			toastr.error("Please select deadline for the task");
   		}
   		else
   		{
    		real.write({ action : "edit_node" ,scope : { pid : id[0] , m_n : id[1]}, data : { pid : id[0] , m_n : id[1] ,i_no:node.i_no, name: $('#edit_title').val(), info: $('#edit_info').val(), due_date: date,status:status ,assign:assign}});
    	}
	}

	function del_node(id, del){
		if(nodedetails.data[id])
		{
			for( var i = 0 ; i< nodedetails.data[id].childi_no.length ; i++)
			{
					del.push(nodedetails.data[id].childi_no[i]);
					call.del_node(nodedetails.data[id].childi_no[i] , del);
			}
		}
	}

	function hideNode(id){
		if(nodedetails.data[id])
		{
			for( var i = 0 ; i< nodedetails.data[id].childi_no.length ; i++)
			{
					call.hideNode(nodedetails.data[id].childi_no[i]);
					graph.removeNode(nodedetails.data[id].childi_no[i]);
			}
		}
	}

	function unhideNode(id , linkid){
		if(nodedetails.data[id])
		{
			for( var i = 0 ; i< nodedetails.data[id].childi_no.length ; i++)
			{
					call.unhideNode(nodedetails.data[id].childi_no[i],linkid);
					var nodeid = nodedetails.data[id].childi_no[i];
					var data = nodedetails.data[nodeid];
					delete data.visibility;
					graph.addNode(nodeid , data);
					linkid.push(nodeid);
			}
		}
	}
	//////////////////////////////////////////////////////////
	function modal_upassword(){
		$("#new_password").fadeIn();
		document.getElementById("update_password").onclick = function(){
			console.log("Update password");
			if($("#profile_repassword").val().length> 6 )
			{
				function success(data){
            		console.log(data);
        		}
        		console.log("up Password");
        		var url = "/change-password";
        		var url_data = {p:$("#profile_repassword").val()};
         		$.ajax({
            		type: "POST",
        		    url: url,
        		    data: url_data,
            		success: success
        		});
        		$("#new_password").fadeOut();
			}
			else
			{
				$("#profile_repassword").val('');
				toastr.error("Please type a password of minimum 6 characters");
			}
		}
		document.getElementById("pro_passcancel").onclick = function(){
			$("#new_password").fadeOut();
		}
	}

	function modal_ugravitar(){
		$("#gravatar_id").fadeIn();
		document.getElementById("update_gravatar").onclick = function(){
			var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var gid = $("#gravatar_mail").val();
            if(emailRegExp.test(gid))
			{
				console.log("Update gravitar");
				function success(data){
            		console.log(data);
        		}
    			console.log("up gravatar");
       			var url = "/gravatar";
        		var url_data = {mail:gid};
         		$.ajax({
            		type: "GET",
        		    url: url,
            		data: url_data,
            		success: success
        		});
        	}
			$("#gravatar_id").fadeOut();
		}
		document.getElementById("cancel_gravatar").onclick = function(){
			$("#gravatar_id").fadeOut();
		}
	}
	//////////////////////////////////////////////////////////////////
	//close new project made
	
	function submit_newProj(){
		var pname = $("#p_name").val();
		var st_owner = $("#member_owner").val();
		var st_editor = $("#member_editor").val();
		var st_viewer = $("#member_viewer").val();
		var desc = $("#project_desc").val();

		var owner = st_owner.split(',');
		var editor = st_editor.split(',');
		var viewer = st_viewer.split(',');

		var members = {};
		var i = 0;
		for( i = 0 ; i < owner.length ; i++ )
		{
			if(owner[i].length > 0 )
			members[owner[i]] = "owner";
		}
		for( i = 0 ; i < editor.length ; i++ )
		{
			if( editor[i].length > 0 )
			members[editor[i]] = "editor";
		}
		for( i = 0 ; i < viewer.length ; i++ )
		{
			if(viewer[i].length > 0)
			members[viewer[i]]= "viewer";
		}
		$('#createProjForm').children('textarea').val('');	

		if(pname.length)
		{
			$('#p_name').val('');
			$("#member_owner").val('');
		    $("#member_editor").val('');
		    $("#member_viewer").val('');
			real.write({action : "new_project", data : { name: pname, desc:desc, members: members} });
		}

		else
		toastr.error("Enter the name of the project");
	}

	function close_newProj(){
		$("#createProjForm").bPopup().close();
	}
	function closecollab(){
		$("#add_collab").bPopup().close();
	}
	return{
		ini_uid : ini_uid,
		ret_uid	: ret_uid,
		ini_collaborators : ini_collaborators,
		ret_collaborators : ret_collaborators,
		ini_project : ini_project,
		ch_project : ch_project,
		return_nodedetails : return_nodedetails,
		change_nodedetails : change_nodedetails,
		initialise_nodedetails : initialise_nodedetails,
		cr_map : cr_map,
		closeModal : closeModal,
		new_projModal : new_projModal,
		newMap : newMap,
		add_collab : add_collab,
		del_collab : del_collab,
		delete_user : delete_user,
		submit_addCollab : submit_addCollab,
		delPrModal : delPrModal,
		delProject : delProject,
		genModal : genModal,
		add_node : add_node,
		edit_node : edit_node,
		del_node : del_node,
		modal_upassword : modal_upassword,
		modal_ugravitar : modal_ugravitar,
		chat : chat,
		close_newProj : close_newProj,
		closecollab : closecollab,
		submit_newProj : submit_newProj,
		hideNode : hideNode,
		unhideNode : unhideNode,
		prDetail :  prDetail,
		viewProject : viewProject,
		analyseProject : analyseProject
	}
}();


realtime = function(){

  		function notice(data){
  			toastr.error("Error: "+data );
  		}

  		//called when a new project is made
		function project_made(data){
  				console.log(data.status);
  				$("#createProjForm").bPopup().close();
	    		var mydiv = document.getElementById("tile");
				var tdTag = document.createElement('div');
				tdTag.className = 'pure-u-1-4';
				tdTag.setAttribute("style", " float: left; margin-top: 10px; margin-left: 10px; ");
				var a = "<a class='metro-tile' id='"+data.proj._id+"'style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: deepSkyBlue; color: #fff;' href='#project/"+data.proj._id+"'>"+data.proj.name+"</a>";
				tdTag.innerHTML = a;
				mydiv.appendChild(tdTag);
			    toastr.success("Project "+data.proj.name+ " has been created.");
  			}
  	//////////////////////////////////////////////////////////////////////////////////////
  	//first fun open all the maps in project , second creates a new map	
  		//To view the a particular project i.e. maps in the project . It will also make maps metro tiles as well on thre same page
	    function view_proj(data){
  				data = JSON.parse(data);
 		 		//store pid
 		 		console.log(data);
 		 		call.ini_collaborators(data.users , data.createdby );
 		 		call.ini_project(data);

 		 		var title = document.getElementById("right-title");
 		 		title.innerHTML = data.name;
 		 		var addr= document.getElementById("right-address");
 		 		addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
 		 		'<li> <a href="#">Projects</a></li><li class="active">Maps</li>';

  				//Change the left-sidebar menu
 		 		var side = document.getElementById("left_sidebar");
  				side.innerHTML = "";
  				var bar =  "<li class='active'><a class='item_l'><i class='fa fa-tasks'></i> <span>Maps(Current)</span></a></li>" +
  				           "<li onclick='call.cr_map()'><a class='item_l'><i class='fa fa-plus'></i> <span>Create New Map</span> </a></li>" +
  							"<li onclick='call.prDetail()'><a class='item_l'><i class='fa fa-edit'></i> <span>Info</span></a></li>"+
  							"<li onclick='call.add_collab()'><a class='item_l'><i class='fa fa-plus-circle'></i> <span>Add Collaborators</span> </a></li>" +
  							"<li onclick='call.del_collab()'><a class='item_l'><i class='fa fa-trash'></i> <span>Delete Collaborators</span> </a></li>" +
		                   "<li onclick='call.delPrModal()'><a class='item_l'><i class='fa fa-trash-o'></i> <span>Delete Current Project</span></a></li>"+
		                   "<li ><a class='item_l' href='#'><i class='fa fa-book'></i> <span>Go back to Projects</span></a></li>" +
  		                   "<li ><a class='item_l' onclick='call.analyseProject()'><i class='fa fa-book'></i> <span>Analyse</span></a></li>" +
        		           "<li ><a class='item_l' href='#profile'><i class='fa fa-user'></i> <span>View Your Profile</span></a></li>";
		       	side.innerHTML = bar ;

  				//Change the main content 
		  		if($('#tile'))
  				{
  					$('#tile').remove();
  				}
		  		var mydiv = document.getElementById("main_content");
  				var tag = document.createElement('div');
  				tag.className = 'pure-g';
  				tag.id = "tile";

		  		var a = "";
  				if(data.hasOwnProperty('maps'))
  				{
		  			for (var key in data.maps) {
  						if (data.maps.hasOwnProperty(key)) {
    						a = a + "<div class='pure-u-1-4' style='margin-top: 10px; margin-left: 10px;'><a class='metro-tile' style='text-align:center;cursor: pointer; width: 98%; height: 110px; display: block; background-color: deepSkyBlue; color: #fff;' href='#map/"+window.location.hash.substring(1).split('/')[1]+"_"+key+"' id='"+key+"'>"+key+"</a></div>";
  						}
					}
				}
				tag.innerHTML = a ;
				mydiv.appendChild(tag);
				var tileElements = document.getElementsByClassName( 'metro-tile' );
				var i;
				// Apply tile functions 
				for ( i = 0; i < tileElements.length; i++ ) {
					Tile( tileElements[i] );
				}
  		}

  		function collaborator(data){
  			data = JSON.parse(data);
  			call.ini_collaborators(data.users);
  		}

  		//To create a new Map. It will create the metro tile of the new map
		function new_map(data){
				var id = window.location.hash.substring(1).split('/')[1];
				if(data.scope.pid == id){
	  				$('#modal_form').bPopup().close();

	  				call.ch_project(data.map,"add");

			  		var mydiv = document.getElementById("tile");
					var tdTag = document.createElement('div');
					tdTag.className = 'pure-u-1-4';
					tdTag.setAttribute("style", " float: left; margin-top: 10px; margin-left: 10px; ");
					var a = "<a class='metro-tile' id='"+data.map+"'style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: deepSkyBlue; color: #fff;' href='#map/"+window.location.hash.substring(1).split('/')[1]+"_"+data.map+"'>"+data.map+"</a>";
					tdTag.innerHTML = a;
					mydiv.appendChild(tdTag);
	    			toastr.success("Map "+data.map+ " has been created.");
	    		}
	    		else{
	    			//add to notifications
	    			var notification = "<li><a href='#map/"+data.scope.pid+"'><i class='fa fa-plus success'></i>Task "+" is added to "+data.map+" </a></li>";
	    	    	$("#notific").prepend(notification);

	    		}
	    }

	    function delete_project(data){
  			toastr.success("Project "+data.name+ " has been successfully deleted.");
	    	routie('#');
	    }
	    /*To open a map */
	    function open_map(data){
	    	var pid = window.location.hash.substring(1).split('/')[1];
	    	pid = pid.split('_')[0];
	  		var title = document.getElementById("right-title");
 		 		title.innerHTML = "Map Name: " + data.info.m_n;
 		 		var addr= document.getElementById("right-address");
 		 		addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
 		 		'<li><a href="#">Projects</a></li>'+'<li ><a href="#project/'+pid+'">Maps</a></li>'+'<li class="active">'+data.info.m_n+'</li>';

	    	
	    	var side = document.getElementById("left_sidebar");
  				side.innerHTML = "";
  				var bar = "<li class='active'><a class='item_l' ><i class='fa fa-sitemap'></i> <span>Notes(current)</span> </a></li>"+
                		   "<li><a class='item_l' id='center'><i class='fa fa-bullseye'></i> <span>Center </span> </a></li>" +
		                   "<li><a class='item_l' id='pin'><i class='fa pin icon'></i> <span>Pin/Unpin</span> </a></li>" +
		                   "<li><a class='item_l' id='reset'><i class='fa pin icon'></i> <span>Reset graph</span> </a></li>" +
		                    "<li><a class='item_l' href='#project/"+pid+"'><i class='fa fa-reply'></i> <span>Maps</span></a></li>" +
		                   "<li ><a class='item_l' href='#'><i class='fa fa-book'></i> <span>Projects</span></a></li>"+
        		           "<li ><a class='item_l' href='#profile'><i class='fa fa-user'></i> <span> Profile</span></a></li>";
        		side.innerHTML = bar ;
	    	if($('#tile'))
  			{
  					$('#tile').remove();
  			}
		  	var mydiv = document.getElementById("main_content");
		  	var tag = document.createElement('div');
  			tag.className = 'map_graph';
  			tag.id = "tile";
  			tag.setAttribute("style", "height:100%");
  			mydiv.appendChild(tag);
  			delete data.data.length;
  			call.initialise_nodedetails(data.data);

	    	main(data.data);
	    }
	    
	    function add_node(data){
	    	var id = window.location.hash.substring(1);
	    	if(id.search('/')>0&&id.search('_')>0){
	    		id = id.split('/')[1];
        		id = id.split('_');
		    	if(data.scope.pid == id[0] && data.scope.m_n == id[1]){
			    	$("#change_node").bPopup().close();
					graph.addNode(data.data.node.i_no,data.data.node);
        		    graph.addLink(data.data.node.parenti_no,data.data.node.i_no);
            		toastr.success('Task :'+data.data.node.name +' has been created');
	            	call.change_nodedetails(data.data.node, "add");
	        	}
	        }
	        else{
	        	//add in to notification
	        /*	var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-plus success'></i>Task "+data.data.node.name+" is added to "+data.scope.m_n+" </a></li>";
	        	console.log(notification);
	        	$("#notific").prepend(notification);*/
	        }
	    }

	    function edit_node(data){
	    	var id = window.location.hash.substring(1);
	    	if(id.search('/')>0&&id.search('_')>0){
	    		id = id.split('/')[1];
        		id = id.split('_');	
		    	if(data.scope.pid == id[0] && data.scope.m_n == id[1]){
			    	$("#change_node").bPopup().close();
			    	graph.removeNode(data.data.node.i_no);
	    			graph.addNode(data.data.node.i_no,data.data.node);
	    			if(data.data.node.parenti_no!=0)
		            {
    		            graph.addLink(data.data.node.parenti_no,data.data.node.i_no);
        		    }
            		for(var j=0;j<data.data.node.childi_no.length;j++)
            		{
                		graph.addLink(data.data.node.i_no,data.data.node.childi_no[j]);
            	}
	            	toastr.success('Task :'+data.data.node.name +' has been edited');

	    	        call.change_nodedetails(data.data.node, "edit");
		    	}
		    }
		   	else{
		    		//add to notifications
		    /*	var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-edit success'></i>Task "+data.data.node.name+" has been edited to "+data.scope.m_n+" </a></li>";
		    	$("#notific").prepend(notification);*/
		    }
		}
	    function del_node(data){
	    	var id = window.location.hash.substring(1);
	    	if(id.search('/')>0&&id.search('_')>0){
	    		id = id.split('/')[1];
        		id = id.split('_');
	    		if(data.scope.pid == id[0] && data.scope.m_n == id[1]){
		    		$("#change_node").bPopup().close();
			    	if(data.data.deleted)
		    		{
	    				for(var i=0; i<data.data.deleted.length ; i++)
	    				{
	    					graph.removeNode(data.data.deleted[i]);
	    				}
	    			}

		    		call.change_nodedetails(data.data, "delete");
		    	}
		    }
	    	else{
	    		//add to notifications
	    	/*		var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-trash danger'></i>Task has been deleted in "+data.scope.m_n+" </a></li>";
	    			$("#notific").prepend(notification);*/
	    	}
	    }

	    function chat(data){
	    	var id = window.location.hash.substring(1);
	    	var flag = 1;
	    	if(id.search('/')>0&&id.search('_')>0){
	    		id = id.split('/')[1];
        		id = id.split('_');
        		var ino = document.getElementById("change_node").getAttribute("data-id");
		    	if(data.scope.pid == id[0] && data.scope.m_n == id[1] && ino == data.i_no){
		    		var flag =0;
			    	var divChat = document.createElement('div');
    		        divChat.className = 'chatitems';
        		    divChat.innerHTML="<div class='item' style='margin-bottom: 20px;margin-top:5px;'><img style='border-radius: 20px;height: 40px;border: 2px solid rgba(0, 90, 166, 1);' src='https://www.gravatar.com/avatar/"+data.data.gravatar+"?d=identicon"+"' alt='user image' /><div class='message'"
            		+ "style='margin-left: 50px;margin-top: -45px;'><a class='name'><small style='margin-right:25px' class='text-muted pull-right'><i class='fa fa-clock-o'></i>"+data.data.time+"</small>"+data.data.name+"</a>"+"<br>"+data.data.msg+"</div></div>";
           			document.getElementById('chat-box').appendChild(divChat);
           			console.log(data.data.time);
           		}
           	}
            if(flag){
	    		//add to notifications
	    	/*	var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-trash success'></i>Message received from "+data.data.name+" : "+data.data.msg+" </a></li>";
	    		$("#notific").prepend(notification);*/
	    	}

	    }

	   	function get_chat(data){
	   		var id = window.location.hash.substring(1);
	    	if(id.search('/')>0&&id.search('_')>0){
	    		id = id.split('/')[1];
        		id = id.split('_');
	        	if(data.scope.pid == id[0] && data.scope.m_n == id[1]){
			   		var divChat = document.createElement('div');
    		        divChat.className = 'chatitems';
        		    var a = ""; 
	 				for( var i = 0 ; i < data.data.length ; i++ ){
	 					a = a + "<div class='item' style='margin-bottom: 20px;margin-top:5px;'><img style='border-radius: 20px;height: 40px;border: 2px solid rgba(0, 90, 166, 1);' src='https://www.gravatar.com/avatar/"+data.data[i].gravatar+"?d=identicon"+"' alt='user image' /><div class='message' style='margin-left: 50px;"
						+"margin-top: -45px;'><a class='name'><small style='margin-right:25px' class='text-muted pull-right'><i class='fa fa-clock-o'></i>"+data.data[i].time+"</small>"+data.data[i].name+"</a>"+"<br>"+data.data[i].msg+"</div></div>";
	 				}
	 				divChat.innerHTML = a ;
					document.getElementById('chat-box').appendChild(divChat);
					           			console.log(data.data.time);

				}
			}
			else{
				//add to notifications
			/*	var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-trash success'></i>A message is delivered to "+data.scope.m_n+" </a></li>";
	    		$("#notific").prepend(notification);	*/
			}
	 	}

	 	function vote(data){
	 		//removing like/button icon in case if there
	 		document.getElementById("node_like").innerHTML = "<i class='fa fa-thumbs-o-up thumbs-up fa-2x'></i>";
	 		document.getElementById("node_dislike").innerHTML ="<i class='fa fa-thumbs-o-down thumbs-down fa-2x'></i>";
	 		var id = window.location.hash.substring(1);
	    	if(id.search('/')>0&&id.search('_')>0){
	    		id = id.split('/')[1];
        		id = id.split('_');
        		var uvote = 0;		//mark the user vote
        		var likes = []; var dislike = [];		//like and dislike users
        		var ino = document.getElementById("change_node").getAttribute("data-id");
	        	if(data.scope.pid == id[0] && data.scope.m_n == id[1]  && ino == data.data.data.i_no ){
	        		var uid = call.ret_uid();
			 		var voter = $('#user_name').data().name+"#"+uid;
	 				if(data.data.votes.hasOwnProperty(voter))
	 				{
	 					if(data.data.votes[voter])
	 					{
	 						document.getElementById("node_like").innerHTML = "<i class=' fa fa-thumbs-up thumbs-up  fa-2x'></i>";
	 						uvote = 1;
	 					}
	 					else
	 					{
	 						document.getElementById("node_dislike").innerHTML = "<i class=' fa fa-thumbs-down fa-2x'></i>";
	 						uvote = -1;
		 				}
		 				delete data.data.votes[voter];
	 				}
	 				//getting user votes
	 				for (var key in data.data.votes) {
	 					if(data.data.votes.hasOwnProperty(key)){
	 						if(data.data.votes[key] == 1)
	 							likes.push(key.split("#")[0]);
	 						else if(data.data.votes[key] == 0)
	 							dislike.push(key.split("#")[0]);
	 					}
	 				}

	 				var likehtml = document.getElementById("likes");
		 			var i;var a="";
		 			if(uvote == 1)
	 				{
			 			likehtml.innerHTML = likes.length + 1;
		 				a = "You <br />";
	 				}
	 				else
			 		{	
	 					likehtml.innerHTML = likes.length ;
	 				}
			 		if(likes.length){
	 					for(var i=0 ; i < likes.length - 1 ; i++ ){
	 						a = a + likes[i] + "<br />";
	 					}
						a = a + likes[i];
	 				}
			 		else{
	 					if(uvote!=1)
						a = "No likes yet";
 					}
			 		likehtml.onmouseover = function(){
	 					tooltip.show(a);
	 				}
			 		likehtml.onmouseout = function(){
	 					tooltip.hide();
	 				}

	 				//dislike
			 		var b = "";
		 			var dislikehtml = document.getElementById("dislikes");
			 		if(uvote== -1)
	 				{
	 					dislikehtml.innerHTML = dislike.length +1 ;
			 			b = "You <br />"
	 				}
	 				else
			 		{
	 					dislikehtml.innerHTML = dislike.length;
	 				}
			 		if(dislike.length){
	 					for(var i=0 ; i < dislike.length - 1 ; i++ ){
	 						b = b + dislike[i] + "<br />";
	 					}
						b = b + dislike[i];
	 				}
	 				else{
			 			if(uvote!=-1)
						b = "No dislikes";
 					}
			 		dislikehtml.onmouseover = function(){
	 					tooltip.show(b);
	 				}
			 		dislikehtml.onmouseout = function(){
	 					tooltip.hide();
	 				}
	 			}
	 		}
	 		else{
	 			//add to notifications
	 		/*	var notification = "<li><a href='#project/"+data.scope.pid+"_"+data.scope.m_n+"'><i class='fa fa-star success'></i>A vote is delivered to "+data.scope.m_n+" </a></li>";
	    		$("#notific").prepend(notification);	*/
	 		}
	 	}

	 	function get_vote(data){
	 		//removing like/button icon in case if there
	 		document.getElementById("node_like").innerHTML = "<i class='fa fa-thumbs-o-up thumbs-up fa-2x'></i>";
	 		document.getElementById("node_dislike").innerHTML ="<i class='fa fa-thumbs-o-down thumbs-down fa-2x'></i>";
	 		var likes = []; var dislike = [];		//like and dislike users
			//searching if current user has liked it
			var uid = call.ret_uid();
	 		var user = $('#user_name').data().name + "#" + uid;
	 		var uvote = 0;		//mark the user vote
	 		if(data.votes.hasOwnProperty(user)){
	 			if(data.votes[user] == 1)
	 			{
	 				document.getElementById("node_like").innerHTML = "<i class=' fa fa-thumbs-up  fa-2x'></i>";
	 				uvote = 1;
	 			}
	 			else
	 			{
	 				document.getElementById("node_dislike").innerHTML = "<i class=' fa fa-thumbs-down fa-2x'></i>";
		 			uvote = -1;
		 		}
		 		delete data.votes[user];
	 		}
	 		//getting user votes
	 		for (var key in data.votes) {
	 			if(data.votes.hasOwnProperty(key)){
	 				if(data.votes[key] == 1)
	 					likes.push(key.split("#")[0]);
	 				else if(data.votes[key] == 0)
	 					dislike.push(key.split("#")[0]);
	 			}
	 		}
	 		var likehtml = document.getElementById("likes");
	 		var i;var a="";
	 		if(uvote == 1)
	 		{
	 			likehtml.innerHTML = likes.length + 1;
	 			a = "You <br />";
	 		}
	 		else
	 		{	
	 			likehtml.innerHTML = likes.length ;
	 		}
	 		if(likes.length){
	 			for(var i=0 ; i < likes.length - 1 ; i++ ){
	 				a = a + likes[i] + "<br />";
	 			}
				a = a + likes[i];
	 		}
	 		else{
	 			if(uvote!=1)
				a = "No likes yet";
 			}
	 		likehtml.onmouseover = function(){
	 			tooltip.show(a);
	 		}
	 		likehtml.onmouseout = function(){
	 			tooltip.hide();
	 		}
	 		//dislike
	 		var b = "";
	 		var dislikehtml = document.getElementById("dislikes");
	 		if(uvote== -1)
	 		{
	 			dislikehtml.innerHTML = dislike.length +1 ;
	 			b = "You <br />"
	 		}
	 		else
	 		{
	 			dislikehtml.innerHTML = dislike.length;
	 		}
	 		if(dislike.length){
	 			for(var i=0 ; i < dislike.length - 1 ; i++ ){
	 				b = b + dislike[i] + "<br />";
	 			}
				b = b + dislike[i];
	 		}
	 		else{
	 			if(uvote!=-1)
				b = "No dislikes";
 			}
	 		dislikehtml.onmouseover = function(){
	 			tooltip.show(b);
	 		}
	 		dislikehtml.onmouseout = function(){
	 			tooltip.hide();
	 		}
	 	}

	    function user_info(data){

	    	var title = document.getElementById("right-title");
 		 		title.innerHTML = "User Info <small>Control Panel</small>";
 		 		var addr= document.getElementById("right-address");
 		 		addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
 		 		'<li class="active">Profile</li>';

	    	var side = document.getElementById("left_sidebar");
  				side.innerHTML = "";
  				var bar =  "<li class='active'><a href='#profile'><i class='fa fa-user'></i> <span>Profile(Current)</span></a></li>"+
                        "<li ><a href='#'><i class='fa fa-book'></i> <span>View Your Projects</span></a></li>";
		       	side.innerHTML = bar ;


		  	var mydiv = document.getElementById("tile");
		  	mydiv.innerHTML = "";
		  	mydiv.className = "";
		  	
		  	var tag = document.createElement('div');
		  	tag.setAttribute("style", "padding-left:10px;margin-top: 10px;float: left;");
		  	var a = "<img src='https://www.gravatar.com/avatar/"+data.gravatar+"?s=200&d=identicon' alt='User Image'>";
		  	tag.innerHTML = a;
		  	mydiv.appendChild(tag);

		  	var info_tag = document.createElement('div');
		  	info_tag.setAttribute("style","float: left;margin-left: 20%;");
		  		a = "<h3 class='hl'><i class='fa fa-map-marker'></i> Contact Information</h3>"+
	    			"<table class='table'><tbody>"+
                       	"<tr><td class='text-muted'>Name</td>"+
                             "<td>"+data.fname+" "+data.lname+"</td>"+
                        "</tr>"+
                        "<tr><td class='text-muted'>Email</td>"+
     						 "<td>"+data.email+"</td>"+
                        "</tr>"+
                        "<tr><td class='text-muted' colspan='2'>Payment Info</td></tr>"+
                  	"<tr><td class='text-muted'>Cards</td>"+
     						 "<td>"+data.payment.cards+"</td>"+
                        "</tr>"+
                        "<tr><td class='text-muted'>Type</td>"+
     						 "<td>"+data.payment.type+"</td>"+
                        "</tr>"+
                        "<tr><td class='text-muted'>Validity</td>"+
     						 "<td>"+data.payment.validity.split('T')[0]+"</td>"+
                        "</tr>"+
                        "</tbody>"+
                    "</table>"+
                    "<div id='profile_password'><button id='udetails_repassword' class='btn-primary' style='padding:6px;' onclick='call.modal_upassword()'>Reset Password</button><br>"+
                    	"<div id='new_password' style='display:none;margin-top:12px;'><label for='password' style='margin-right:10px'>Enter Your New Password</label>"+
                        "<input required  type='password' id='profile_repassword' name='p'><br><br>"+
                        	"<button id='update_password' >Update Password</button>"+
                        	"<button id='pro_passcancel'  style='margin-left:15px;'>Cancel</button>"+
                    	"</div>"+
                	"</div>"+
                	"<br><div id='profile_gravatar'><button id='reset_gravatar' class='btn-primary' style='padding:6px;' onclick='call.modal_ugravitar()'>Reset Gravatar</button><br>"+
                  		"<div id='gravatar_id' style='display:none;margin-top:12px;margin-bottom:10px;'><label for='gravatar' style='margin-right:10px'>Enter a Gravatar email</label>"+
                       		"<input required  type='email' id='gravatar_mail' name='mail'><br><br>"+
                        	"<button id='update_gravatar' >Update Gravatar</button><button id='cancel_gravatar' style='margin-left:15px;'>Cancel</button>"+
                  	"</div><br>"+
              		"<a  target='_blank' href='https://en.gravatar.com/'>What is gravatar? How to Use it. </a>";
               	info_tag.innerHTML = a;
            mydiv.appendChild(info_tag);
	    }

		function user_projects(data){

			var title = document.getElementById("right-title");
 		 	title.innerHTML = "Projects<small>Control Panel</small>";
 		 	var addr= document.getElementById("right-address");
	 		addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
	 		'<li class="active">Projects</li>';

			var side = document.getElementById("left_sidebar");
  				side.innerHTML = "";
  				var bar = "<li class='active item_l'><a><i class='fa fa-book'></i> <span>Projects(Current)</span></a></li>" +
  						  "<li><a class='item_l' onclick='call.new_projModal()'><i class='fa fa-tasks'></i> <span>Create a New Project</span></a></li>"+
  						  "<li><a class='item_l' href='#tasks'><i class='fa fa-tasks'></i> <span>Assigned Tasks</span></a></li>"+
  						  "<li><a class='item_l' href='#profile'><i class='fa fa-user'></i> <span>View Your Profile</span></a></li>";
		       	side.innerHTML = bar ;
			//Change the main content 
		  	if($('#tile'))
  			{
  				$('#tile').remove();
  			}
		  	var mydiv = document.getElementById("main_content");
  			var tag = document.createElement('div');
  			tag.className = 'pure-g';
 			tag.id = "tile";

	  		var a = "";
			for (var key in data.projects) {
  				if (data.projects.hasOwnProperty(key)) {
  					a = a + "<div class='pure-u-1-4' style='float: left; margin-top: 10px; margin-left: 10px;'>"+
                            	"<a class='metro-tile' style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: deepSkyBlue; color: #fff;' id='"+key+"' href='#project/"+key+"'>"+data.projects[key]+
                             "</a></div>";
  				}
		    }
		    for (var key in data.oproj) {
  				if (data.oproj.hasOwnProperty(key)) {
  					a = a + "<div class='pure-u-1-4' style='float: left; margin-top: 10px; margin-left: 10px;'>"+
                            	"<a class='metro-tile' style='text-align:center; cursor: pointer; width: 98%; height: 110px; display: block; background-color: #28A85C; color: #fff;' id='"+key+"' href='#project/"+key+"'>"+data.oproj[key]+
                             "</a></div>";
  				}
		    }
		    tag.innerHTML = a;
		    mydiv.appendChild(tag);

		    var tileElements = document.getElementsByClassName( 'metro-tile' );
			var i;

			// Apply tile functions 
			for ( i = 0; i < tileElements.length; i++ ) {
				Tile( tileElements[i] );
			}
		}	

		function user_task(data){
  			var sortable = [];
  			for(var key in data){
  				sortable.push([key , Date.parse(data[key].task.due_date)] );
  			}
  			var sorted;
  			sorted = sortable.sort(function(a, b) {return a[1] - b[1]});
  			console.log(sorted);
  			var today = new Date();
				today.setHours(0,0,0,0);
  			if(sorted.length == 0)
  			{
  				toastr.error("No Task assigned to you yet");
  				routie('#');
  			}
  			else{
  				var index_today = 0,i;
  				for( i=0 ;i<sorted.length ;i++){
  					if(sorted[i][1] >= today)
  					{
  						index_today = i;
  						break;
  					}
  				}
	  			var title = document.getElementById("right-title");
 			 	title.innerHTML = "Assigned Tasks";
 			 	var addr= document.getElementById("right-address");
	 			addr.innerHTML= '<li><a href="https://jutja.com"><i class="fa fa-home"></i> Home</a></li>'+
		 		'<li class="active">Tasks</li>';

		 		var side = document.getElementById("left_sidebar");
  					side.innerHTML = "";
  					var bar = "<li class='active item_l'><a><i class='fa fa-tasks'></i> <span>Assigned-Tasks</span></a></li>" +
  							  "<li><a class='item_l' href='#'><i class='fa fa-book'></i> <span>View Projects</span></a></li>"+
  							  "<li><a class='item_l' href='#profile'><i class='fa fa-user'></i> <span>View Profile</span></a></li>";
			       	side.innerHTML = bar ;

	  			var mydiv = document.getElementById("main_content");
			  	mydiv.innerHTML = "";
			  	
		  		var tag = document.createElement('div');
			  	tag.id = "tile";
			  	var a = "";var i;
			  	a = "<div class='main'><ul class='cbp_tmtimeline'>";
		  		for(i=0; i < index_today ; i++ ){
		  			a = a + "<li><time class='cbp_tmtime'><span>"+data[sorted[i][0]].task.due_date+"</span></time>"+
							"<div class='cbp_tmicon fa fa-circle' style='font-family:FontAwesome'></div><div class='cbp_tmlabel'>"+
								"<h3>"+data[sorted[i][0]].task.name+"</h3>"+
								"<h5>"+data[sorted[i][0]].task.info+"</h5>"+
							"</div></li>";
				}
				a = a + "<li class='date_display'><div class='tldate'>Today</div></li>";
				for(i=index_today; i < sorted.length ; i++ ){
		  			a = a + "<li><time class='cbp_tmtime'><span>"+data[sorted[i][0]].task.due_date+"</span></time>"+
							"<div class='cbp_tmicon fa fa-circle' style='font-family:FontAwesome'></div><div class='cbp_tmlabel'>"+
								"<h3>"+data[sorted[i][0]].task.name+"</h3>"+
								"<h5>"+data[sorted[i][0]].task.info+"</h5>"+
							"</div></li>";
				}
				a = a + "</ul></div>"
				tag.innerHTML = a ;
			  	mydiv.appendChild(tag);
		  		if(sorted.length == 1){
		  				var css='.cbp_tmtimeline:before{width:0px}';
						style=document.createElement('style');
						if (style.styleSheet)
						    style.styleSheet.cssText=css;
						else 
						    style.appendChild(document.createTextNode(css));
						style.id="css_style";
						document.getElementsByTagName('head')[0].appendChild(style);
		  		}
	  		}
	 	}
		function add_users(data){
			call.ini_collaborators(data.data , data.info.id);
			call.closecollab();
		}

		function remove_users(data){
			call.ini_collaborators(data.data , data.info.id);
			call.closeModal();
		}

  		return{
    		notice : notice,
		   	project_made : project_made,
		   	view_proj : view_proj,
		   	delete_project : delete_project,
   			new_map : new_map,
   			open_map : open_map,
   			add_node : add_node,
   			edit_node : edit_node,
   			del_node : del_node,
   			user_info : user_info,
   			user_projects : user_projects,
   			chat : chat,
   			get_chat : get_chat,
   			vote : vote,
   			get_vote : get_vote,
   			add_users : add_users,
   			remove_users : remove_users,
   			collaborator : collaborator,
   			user_task : user_task
  		}

}();

//routie
routie({
	'project/:id': function(id){
		real.write({action : "view_project", data : { pid: id} });
		real.write({action : "get_id"});
	},
	'map/:id': function(id){
		var params = id.split("_"); 
		real.write({action: "open_map", data : { pid : params[0] , m_n : params[1] }});
		real.write({action : "get_id"});
		real.write({ action: "collaborator" , data: { pid :params[0] }});

	},
	'profile': function(){
		if($('#css_style'))
  		{
  				$('#css_style').remove();
  		}
		real.write({action : "user_info"});
	},
	'': function(){
		if($('#css_style'))
  		{
  				$('#css_style').remove();
  		}
		real.write({action : "user_projects"});
	},
	'_=_': function(){
		if($('#css_style'))
  		{
  				$('#css_style').remove();
  		}
		real.write({action : "user_projects"});
	},
	'tasks': function(){
		real.write({action : "user_tasks"});
	}

});
