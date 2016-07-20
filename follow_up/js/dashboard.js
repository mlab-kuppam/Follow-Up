var option1 = "Cured";
var option2 = "Improving";
var option3 = "Worsening";
var option4 = "Other";
var newDisease = false;
var dateToday = "";
var tablename = "";

var col={
	"Skin" : "skin-table",
	"Eye" : "eye-table",
	"ENT" : "ent-table",
	"Oral" : "oral-table",
	"General" : "general-table"
};

var tab={
	"skin-table" : "Skin",
	"eye-table" : "Eye",
	"ent-table" : "ENT",
	"oral-table" : "Oral",
	"general-table" : "General"
};

function begin(){
	setDetails();
	getSkinTable();
	getEyeTable();
	getEntTable();
	getOralTable();
	getGeneralTable();

	getTreat();
}

//function to get Age of the Student
function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
		}
		return age+" years";
}

//function to get Gender of the Student
function getGender(gen){
	var gender="";
	switch(gen){
		case '1': gender="Male";
			break;
		case '2': gender="Female";
			break;
		case '3': gender="Other";
			break;
	}
	return gender;		
}

//function to get the Current Date
function currentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
			dd='0'+dd
	} 

	if(mm<10) {
			mm='0'+mm
	} 

	dateToday = yyyy+'-'+mm+'-'+dd;
	today = dd+'-'+mm+'-'+yyyy;
	return today;
}

//function to display basic details of the Student
function setDetails(){
	document.getElementById("student_id").innerHTML = sid;
	document.getElementById("student_id_pre").innerHTML = sid;
	var child_name = document.getElementById("cname");
	var parent_name = document.getElementById("pname");
	var school_name = document.getElementById("sname");
	var child_gender = document.getElementById("cgender");
	var child_age = document.getElementById("cage");
	var parent_mobile = document.getElementById("pmobile");
	var school_mobile = document.getElementById("smobile");
	var date = document.getElementById("date");
	var height = document.getElementById("height");
	var weight = document.getElementById("weight");
	var dateIE = document.getElementById("dateIE");

	getData("queryDetails.php", sid);
	var tempdata = dataReceived.split('$');
	//console.log(tempdata);

	school_name.innerHTML = tempdata[0];
	school_mobile.value = tempdata[1];

	child_name.innerHTML = tempdata[2];
	child_age.innerHTML = getAge(tempdata[7]);
	child_gender.innerHTML = getGender(tempdata[6]);
	parent_mobile.value = tempdata[8];
	height.innerHTML = tempdata[9]+" cm";
	weight.innerHTML = tempdata[10]+" Kg";
	dateIE.innerHTML = tempdata[11];
	date.innerHTML = currentDate();

	if(tempdata[5].length > 0){
		parent_name.innerHTML = tempdata[5];
	}else if(tempdata[3].length > 0){
		parent_name.innerHTML = tempdata[3];
	}else if(tempdata[4].length > 0){
		parent_name.innerHTML = tempdata[4];
	}
}

function newTable(){
	vex.dialog.open({
	  message: 'Select Group Name and Disease Name:',
	  input: "<div class=\"form-group\"><label for=\"selectTable\">Select Group:</label><select name=\"table\" class=\"form-control\" id=\"selectTable\" onInput=\"storeTable(this.value)\"><option>Select Table</option><option>Skin</option><option>Eye</option><option>ENT</option><option>Oral</option><option>General</option></select></div><br><div id=\"auto\"><input type=\"text\" class=\"form-control\" id=\"diseaseName\" placeholder=\"Enter Disease Name\" name=\"disease\" list='columns' onkeyup=\"showHint(this.value)\"></div>",
		/*div id=\"auto\"><input type=\"text\" class=\"form-control\" id=\"diseaseName\" placeholder=\"Enter Disease Name\" name=\"disease\" onkeyup=\"showHint(this.value)\"><input id=\"autocomplete\" type=\"text\" disabled=\"disabled\"/></div></div>*/
		buttons: [
			$.extend({}, vex.dialog.buttons.YES, {
			  text: 'Add'
			}), $.extend({}, vex.dialog.buttons.NO, {
			  text: 'Cancel'
			})
	  ],
	  callback: function(data) {
				if (data === false) {
				  return console.log('Cancelled');
				}
				else if(data.table.localeCompare("Select Table")==0){
					addDiagRow();
					vex.dialog.alert("Please Select A Table");
				}
				else{
					//console.log(data.table+" "+col[data.table]+" "+data.disease);
					newDisease = true;
					insertRowRef(col[data.table],data.disease);
					return;	
				}
			  }
		});
}

//function to create a Table
function creatTable(tableName){
						
	var followUp = "<div class='form-group' style=\"float: right;\"><lable style='float: left;'>Next Follow Up Date : &emsp; </lable> <input type='date' class='datePicker' min='"+dateToday+"' id=\"date-"+tableName.toLowerCase()+"\"></div>";
	var table = "<table name='diagTables' class='table dia-table table-bordered' id='"+col[tableName]+"'><thead><tr><th class='firstCol'><center>Disease Name</center></th><th><center>Complaint</center></th><th><center>Comment</center></th><th><center>Select</center></th></tr></thead></table>";
	var addButton = "<button class='btn btn-success btn-md diagButtons' style='float:right; margin-left:10mm ; width:100px;'  onclick='addDiagRow(\""+tableName+"\")'>Add</button>";
	var panel= "<div class=\"panel panel-default diagPanel\" id='"+col[tableName]+"FollowUp' style=\"margins:0px\"><div class=\"panel-heading\"><div id='"+col[tableName]+"Content'><div class='tableHead' id='"+col[tableName]+"Head'>"+tableName+" "+addButton+" "+followUp+"</div></div></div><div class=\"panel-body\">"+table+"</div></div>";
	
	diagnosis.innerHTML +=panel;
}

//function to insert a row into a table
function insertRowRef(tableName,diseaseName){
	if(document.getElementById(tableName)==null){
		//console.log(tab[tableName]);
		creatTable(tab[tableName]);
	}
	dName = tab[tableName].toLowerCase()+"_"+diseaseName;
	
	var checkingIfRowExists = checkIfRowExists(tableName,dName);
	
	if(!checkingIfRowExists)
		{
			var comp = "<div class='form-group'><input class='form-control' id=\"complaint-"+dName+"\" placeholder='Enter Complaint'></div>";

			var obs = "<div class='form-group obsRadioGroup' id='radioBoxes"+dName+"'><div class='radio'><label><input type='radio' name='optionsRadios-"+dName+"' id='optionsRadios-"+dName+"0' value='"+option1+"' checked>"+option1+"</label></div><div class='radio'><label><input type='radio' name='optionsRadios-"+dName+"' id='optionsRadios-"+dName+"1' value='"+option2+"'>"+option2+"</label></div><div class='radio'><label><input type='radio' name='optionsRadios-"+dName+"' id='optionsRadios-"+dName+"2' value='"+option4+"'>"+option3+"</label></div><div class='radio'><label><input type='radio' name='optionsRadios-"+dName+"' id='optionsRadios-"+dName+"3' value='"+option4+"'>"+option4+"</label></div></div>";

			if(newDisease)
				obs = "<span style=\"font-size: 16px;\"><center><b>New Diagnosis<br></b></center></span>";

			obs += "<div class='form-group'><input class='form-control' id=\"obsCom-"+dName+"\" placeholder='Enter Comments'></div>"

			var deleteBut = "<center><button class='btn btn-danger btn-md' style='width:100px;'  onclick='deleteDiagRow(\""+dName+"\")'>Delete</button></center>";

			//var checkBox = "<center><input type='checkbox' class='treatBox' name=\"diagCheckBoxes\" id='check-"+dName+"' style='width:20px;' > </center>";

			var  diaTableRef = document.getElementById(tableName);
			//console.log("Table name : "+tableName);
			//console.log(diaTableRef);
			var row = diaTableRef.insertRow(-1);
			row.id=dName;

			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);

			// Add some text to the new cells:
			cell1.innerHTML = diseaseName;
			cell2.innerHTML = comp;	
			cell3.innerHTML = obs;	
			if(newDisease)
				cell4.innerHTML = deleteBut;	

		}
	else
		{
			vex.dialog.alert("Row Already Exists! Try Again");
		}
	
	newDisease = false;
}

function checkIfRowExists(tableName,rowId){
	var table = document.getElementById(tableName);
	var isPresent = false;
	for(var i=1,row; row = table.rows[i];i++)
		{
			if(row.id.localeCompare(rowId) == 0)
				{
					isPresent = true;
				}
		}
	return isPresent;
}

//function to generate the Skin Table
function getSkinTable(){
	dataReceived = "";
	getData("skin.php", sid);
	var skinData = JSON.parse(dataReceived);
	//console.log(skinData);
	if(skinData['ref'] != null && skinData['check']!=0){
		creatTable("Skin");
		for(var i = 0; i < skinData['colNames'].length; i++){
			var diseaseName = skinData['colNames'][i];
			insertRowRef('skin-table',diseaseName);
		}
	}
}

//function to generate the Eye table
function getEyeTable(){
	dataReceived = "";
	getData("eye.php", sid);
	var eyeData = JSON.parse(dataReceived);
	//console.log(eyeData);
	if( eyeData['ref'] != null && eyeData['check']!=0){
		creatTable("Eye");
		for(var i = 0; i < eyeData['colNames'].length; i++){
			var diseaseName = eyeData['colNames'][i];
			insertRowRef('eye-table',diseaseName);
		}

	}
}

//function to generate the ENT table
function getEntTable(){
	dataReceived = "";
	getData("ent.php", sid);
	var entData = JSON.parse(dataReceived);
	//console.log(entData);
	if(entData['ref'] != null && entData['check']!=0){
		creatTable("ENT");
		for(var i = 0; i < entData['colNames'].length; i++){
			var diseaseName = entData['colNames'][i];
			insertRowRef('ent-table',diseaseName);
		}

	}
}

//function to generate the General table
function getGeneralTable(){
	dataReceived = "";
	getData("general.php", sid);
	var genData = JSON.parse(dataReceived);
	//console.log(genData);
	if(genData['check']!=0 && genData['ref'] != null){
		creatTable("General");
		//console.log("REferal : "+genData['ref']);
		for(var i = 0; i < genData['colNames'].length; i++){
			var diseaseName = genData['colNames'][i];
			insertRowRef('general-table',diseaseName);
		}

	}
}

//function to generate the Oral table
function getOralTable(){
	dataReceived = "";
	getData("oral.php", sid);
	var oralData = JSON.parse(dataReceived);
	//console.log(oralData);
	if(oralData['ref'] != null && oralData['check']!=0){
		creatTable("Oral");
		for(var i = 0; i < oralData['colNames'].length; i++){
			var diseaseName = oralData['colNames'][i];
			insertRowRef('oral-table',diseaseName);
		}

	}
}

//function to Add another Row in a table
function addDiagRow(tableName){
	tablename = tableName;
	vex.dialog.open({
	  message: 'Select Disease Name:',
	  input: "<div class='form-control' name='table' value='"+tableName+"'>Table Name : "+tableName+"</div><br><div id=\"auto\"><input type=\"text\" class=\"form-control\" id=\"diseaseName\" placeholder=\"Enter Disease Name\" name=\"disease\" list='columns' onkeyup=\"showHint(this.value)\"></div>",
		/*div id=\"auto\"><input type=\"text\" class=\"form-control\" id=\"diseaseName\" placeholder=\"Enter Disease Name\" name=\"disease\" onkeyup=\"showHint(this.value)\"><input id=\"autocomplete\" type=\"text\" disabled=\"disabled\"/></div></div>*/
		buttons: [
			$.extend({}, vex.dialog.buttons.YES, {
			  text: 'Add'
			}), $.extend({}, vex.dialog.buttons.NO, {
			  text: 'Cancel'
			})
	  ],
	  callback: function(data) {
				if (data === false) {
				  return console.log('Cancelled');
				}
				else{
					//console.log(data.table+" "+col[data.table]+" "+data.disease);
					newDisease = true;
					insertRowRef(col[tableName],data.disease);
					return;	
				}
			  }
		});
}

function storeTable(tableName){
	tablename = tableName;
}

function deleteDiagRow(rowID){
	var row=document.getElementById(rowID);
	//console.log(row.id);
	var diseaseName = row.id.split("_")[1];
	vex.dialog.confirm({
	  message: "Are you sure you want to delete <b>"+diseaseName+"</b> ?",
	  callback: function(value) {
		  if(value != false){
			  	var tableID = row.parentNode.parentElement.id;
				//console.log(tableID);
				row.parentNode.removeChild(row);
				removeTableIfNoRow(tableID);
			  	return;
		  }
		  else{
			  return;
		  }
	  }
	});
	
	/*var checkboxes = document.getElementsByName("diagCheckBoxes");
	// loop over them all
	for (var i=0; i<checkboxes.length; i++) {
		// And stick the checked ones onto an array...
		if (checkboxes[i].checked) {
			
			var checkBoxID = checkboxes[i].id.split("check-").pop();
			
			var row = document.getElementById(checkBoxID);
			
			var tableID = row.parentNode.parentElement.id;
			
			//console.log(tableID);
    		row.parentNode.removeChild(row);
			removeTableIfNoRow(tableID);
			deleteDiagRow();
		}
	}*/
}

function removeTableIfNoRow(tableID){
	var content = document.getElementById(tableID+"FollowUp");
	var length = document.getElementById(tableID).rows.length;
	if(length <= 1)
		{
			diagnosis.removeChild(content);
		}
	return;
}

//function to validate
function validate(){
	var output = 0;
	var everythingOkay = true;
	var organs = Object.keys(checkValidate());
	//console.log(organs.length);
	for(var i=0; i < organs.length; i++)
	{
		//console.log(organs[i]);
		var followD = document.getElementById("date-"+organs[i]).value;
		//console.log(followD);
		if(followD.length == 0)
		{	
			everythingOkay = false;
			output = 2;
			vex.dialog.alert("Please Select Next Follow Up Date for "+ organs[i].toUpperCase());	
			break;
		}
	}
	if(everythingOkay)
		output = saveStudent();
	return output;
}

//function to move to the next student
function newStudent(){
	var saved = validate();
	console.log(saved);
	if(saved == 1)
	{
		vex.dialog.alert({
			message: 'Saved Successfully',
			callback: function(data) {
					if(data != false){
						enterStudentID();
						return;
					}
					else{
						return;
					}
				}
		});
	}
	else if(saved == 2)
		return;
	else
	{
		vex.dialog.alert("A Problem Occured While Saving! Please Try Again Later!");
		return;
	}
}

function enterStudentID(){
	vex.dialog.prompt({
		message: 'Enter Student ID',
		value: parseFloat(sid) + 1,
		callback: function(studentID) {
			dataReceived = '';
			getData("checkStudent.php",studentID);
			if (studentID != null && dataReceived.localeCompare('sucessfull') == 0) {
				sid = studentID;
				diagnosis.innerHTML="";
				deleteRows();
				begin();
				return;
			}
			else if(studentID == false){
					return;
				}
			else{
				enterStudentID();
				vex.dialog.alert("Invalid Student ID..Please try again");
				return;
			}
		}
	});
}

//function to save data to the database
function saveStudent(){
	var tables = document.getElementsByName("diagTables");
	var allData = {"child_id" : sid,
				  "phone" : document.getElementById("pmobile").value,
				  "school" : document.getElementById("smobile").value};
	var tableData={};
	for(var i = 0; i < tables.length ; i++){
		var table = tables[i];
		var tableName = tab[table.id].toLowerCase();
		//console.log(tableName);
	
		var date = document.getElementById("date-"+tableName).value;
		
		var dataArray = [];
		for (var a = 0, row; row = table.rows[a]; a++) {
			var rowID = row.id;

			if(rowID != ""){
				var data = retrieveDataFromRowID(rowID);
				dataArray.push(data);
			}
		}
		//console.log(dataArray);
		tableData[tableName] = {
			"data" : dataArray,
			"followUpDate" : date
			};
	}
	cleanTreat();
	tableData["treatment"] = retrieveTreatData();
	//console.log(tableData);
	allData["data"]=JSON.stringify(tableData);
	//console.log(allData);
	dataReceived = "";
	getData("saveData.php",JSON.stringify(allData));
	var output = dataReceived;
	//console.log(dataReceived);
	dataReceived = "";
	return output;
}

//function to retrieve data from row
function retrieveDataFromRowID(rowID){
	var disease = rowID.split("_")[1];

	var complaint = document.getElementById("complaint-"+rowID).value;

	var observation = "";

	var radios = document.getElementsByName("optionsRadios-"+rowID);
	for(var b = 0; b < radios.length; b++){
		var radio = radios[b];
		if(radio.checked){
			observation = radio.id.slice(-1);
			break;
		}
	}

	var comment = document.getElementById("obsCom-"+rowID).value;
	
	var json_data={
		"disease" : disease,
		"complaint" : complaint,
		"observation" : observation,
		"comment" : comment};
	//console.log(json_data);
	
	return json_data;
}

//function to retrieve data from treatment table
function retrieveTreatData(){
	var treat_table = document.getElementById("treat-table");
	var treatdataArray = [];
	for (var a = 0, row; row = treat_table.rows[a]; a++) {
		var rowID = row.id.split("-")[2];
		//console.log(rowID);
		if(rowID != 0){
			var treat_name = document.getElementById("treat-med-"+rowID).value;

			var frequency =  document.getElementById("treat-freq-"+rowID).value;

			var duration =  document.getElementById("treat-dur-"+rowID).value;

			treatdataArray.push({
				"treat_name" : treat_name,
				"frequency" :  frequency,
				"duration" : duration});		
		}
	}
	return treatdataArray;
}

//function to check which organ needs follow up
function checkValidate(){
	var radioGroups = document.getElementsByClassName("obsRadioGroup");
	var fValidate = {};
	for(var i = 0;i < radioGroups.length; i++)
	{
		var radioGroup = radioGroups[i];
		//console.log(radioGroup);
		var groupID = radioGroup.id;
		var dName = groupID.split("radioBoxes")[1];
		var oName = dName.split("_")[0];
		//console.log(dName);
		var radios = document.getElementsByName("optionsRadios-"+dName);
		//console.log(radios);
		for(var j = 0;j < radios.length; j++)
		{
			if(radios[j].checked && radios[j].id.slice(-1).localeCompare('0')!=0)
			{
				fValidate[oName] = true;
				break;
			}
		}
	}
	//console.log(fValidate);
	return(fValidate);
}

var sl = 1;
function getTreat(){
	dataReceived = "";
	getData("treat.php", sid);
	var treatData = dataReceived.split('$');
	//console.log(treatData);
	for(var i = 0; i < 4; i++){
		if(treatData[i] != 0){
			var medData = treatData[i].split('@');
			var checkBox = "<center><input type='checkbox' class='treatBox' id='treat"+sl+"' style='width:50px;'></center> ";
			insertRowTreat(medData[1],medData[2],medData[3],checkBox);
		}
	}
}

function addTreat(){
	var checkBox = "<center><input type='checkbox' class='treatBox' id='treat"+sl+"' style='width:50px;' ></center> ";
	insertRowTreat("","","",checkBox);
}

function insertRowTreat( c1, c2, c3, c4){

	var  treatTableRef = document.getElementById('treat-table');
	var row = treatTableRef.insertRow(-1);
	row.id = "treat-row-"+sl;

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	// Add some text to the new cells:
	cell1.innerHTML = "<input type='text' id='treat-med-"+sl+"' value='"+c1+"'>";	
	cell2.innerHTML = "<center><input type='number' id='treat-freq-"+sl+"' value='"+c2+"' style='width:100px'></center>";
	cell3.innerHTML = "<center><input type='text' id='treat-dur-"+sl+"' value='"+c3+"' style='width:100px'></center>";
	cell4.innerHTML = c4;
	sl++;
}

function deleteTreat(){
	vex.dialog.confirm({
		message: 'Are you sure you want to delete the selected medicines?',
		callback: function(value) {
			if(value != false){					
				var  treatTableRef = document.getElementById('treat-table');
				//console.log(treatTableRef.rows);
				var x = document.getElementsByClassName("treatBox");
				//console.log("checked box: "+x);
				for(var i = 0; i < x.length; i++){
					var temp = x[i].id;
					//console.log("checked box ID: "+temp);
					if(document.getElementById(temp).checked){
						for (var j = 1; j < treatTableRef.rows.length ; j++) {								
							//console.log("Row cells:"+treatTableRef.rows[j].cells[3].children[0].children[0].id);
							if(temp.localeCompare(treatTableRef.rows[j].cells[3].children[0].children[0].id) == 0){
								//console.log("Row cells selected:"+treatTableRef.rows[j].cells[3].children[0].children[0].id);
								treatTableRef.deleteRow(j);
							}  
						}	
					}
				}
				return;
			}
			else{
				return;
			}
		}
	});
}

function deleteRows(){
	var tab2 = document.getElementById('treat-table');
	for(var i = tab2.rows.length - 1; i > 0; i-- ){
		tab2.deleteRow(i);
	}
}

function cleanTreat(){
	var table = document.getElementById("treat-table");
	var row;
	for (var i = table.rows.length - 1; i > 0; i--) {
		row = table.rows[i];
		for (var j = 0, col; col = row.cells[j]; j++) {
			//console.log(col.children[0] + " "+j);
			if(col.children[0].value !=""){
				//break;
			}
			else{
				//console.log("del: "+col.children[0].value.length);
				table.deleteRow(i);
				break;
			}
		}  
	}
}

//function to get diseases for an organ system
function showHint(table) {
	if(tablename.localeCompare("Select Table") !=0){

		// Create a new XMLHttpRequest.
		var request = new XMLHttpRequest();

		// Handle state changes for the request.
		request.onreadystatechange = function(response) {

		if (request.readyState === 4 && request.status === 200) {
			//creating new datalist for every new query to ensure no repeatition
			document.getElementById('data').innerHTML="<datalist id=\"columns\"></datalist>";
			var dataList = document.getElementById('columns');
			dataList.innerHTML="";
			console.log(request.responseText);
			// Parse the JSON
			var jsonOptions = JSON.parse(request.responseText);

			/*
			//clearing select
			for (i = dataList.options.length-1; i >=0; i--) {
				dataList.remove(dataList.i);
			}
			*/

			// Loop over the JSON array.
			jsonOptions.forEach(function(item) {
				// Create a new <option> element.
				var option = document.createElement('option');
				// Set the value using the item in the JSON array.
				option.value = item;
				// Add the <option> element to the <datalist>.
				dataList.appendChild(option);
			});

		} 
		};

		// Set up and make the request.
		request.open('POST', "http://"+ip_address+"/follow_up/php/gethint.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send("t="+tablename+"&q="+table);	
	}
}

// Function to get Data from DB
function getData(phpName, stud_id) {
	var xhttp,data;
	if (window.XMLHttpRequest){
		xhttp = new XMLHttpRequest();
	}
	else{
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function ()
	{
		if(xhttp.readyState==4 && xhttp.status==200)
		{
			data = xhttp.responseText;
			if(!data.includes("Unsuccessful")){
				dataReceived = data;
				//console.log(data);
			}
			else{
				console.error("Unsuccessful retrieval");
			}
		}
	};
	xhttp.open("POST","http://"+ip_address+"/follow_up/php/"+phpName,false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("s="+stud_id);
}
