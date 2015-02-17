var real = new Primus();

real.on('open', function open() {
	var pid=$('#123').data('p_i');												//project id		
    var mid=$('#123').data('m_n') || $('#map_name').val();						//map name
    var data = {p_id: pid, m_name: mid};
    real.write({action: "open_map", data: data });								//check if map is already present or not
});

real.on('data', function(data) {
	console.log(data);
	switch (data.action){
		case "notice":
			console.log(data.action+"notice");
			break;
		case "display_map":
			console.log("display");
			break;
	}
});

action : new_project, data{name,members:{emailid: val,..}}