var col={
	"Skin":"skin-table",
	"Eye":"eye-table",
	"ENT":"ent-table",
	"Oral":"oral-table",
	"General":"general-table"
};

var tab={
	"skin-table":"Skin",
	"eye-table":"Eye",
	"ent-table":"ENT",
	"oral-table":"Oral",
	"general-table":"General"
};

function begin(){
	setDetails();
	getSkinTable();
	getEyeTable();
	getEntTable();
	getOralTable();
	getGeneralTable();
	buttons.innerHTML +="<button class='btn btn-success btn-md' id='diag-add' style='float:right; margin-left:10px; width:100px;'  onclick='addDiagRow()'>Add</button> <button class='btn btn-danger btn-md' id='diag-delete' style='float:right; margin-left:0px; width:100px;'  onclick='deleteDiagRow()'>Delete</button>";

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

	today = dd+'/'+mm+'/'+yyyy;
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

	getData("queryDetails.php", sid);
	var tempdata = dataReceived.split('$');
	//console.log(tempdata);

	school_name.innerHTML = tempdata[0];
	school_mobile.innerHTML = tempdata[1];

	child_name.innerHTML = tempdata[2];
	child_age.innerHTML = getAge(tempdata[7]);
	child_gender.innerHTML = getGender(tempdata[6]);
	parent_mobile.innerHTML = tempdata[8];
	height.innerHTML = tempdata[9]+" cm";
	weight.innerHTML = tempdata[10]+" Kg";
	date.innerHTML = currentDate();

	if(tempdata[5].length > 0){
		parent_name.innerHTML = tempdata[5];
	}else if(tempdata[3].length > 0){
		parent_name.innerHTML = tempdata[3];
	}else if(tempdata[4].length > 0){
		parent_name.innerHTML = tempdata[4];
	}
}

//function to create a Table
function creatTable(tableName){
	var table = "<span class='tableHead' id='"+col[tableName]+"Head'>"+tableName+":</span> <br> <table class='table dia-table table-bordered' id='"+col[tableName]+"'><thead><tr><th class='firstCol'><center>Disease Name</center></th><th><center>Observation</center></th><th><center>Comment</center></th><th><center>Select</center></th></tr></thead></table>";
	diagnosis.innerHTML +=table;
}

//function to insert a row into a table
function insertRowRef(tableName,diseaseName){
	if(document.getElementById(tableName)==null){
		//console.log(tab[tableName]);
		creatTable(tab[tableName]);
	}
	dataReceived="";
	getData("getColumnName.php",diseaseName);
	dName=tab[tableName].toLowerCase()+dataReceived;
	dataReceived="";

	var obs="<div class='form-group'> <div class='radio'><label><input type='radio' name='optionsRadios"+dName+"' id='optionsRadios"+dName+"' value='option1' checked>"+option1+"</label></div><div class='radio'><label><input type='radio' name='optionsRadios"+dName+"' id='optionsRadios"+dName+"' value='option2'>"+option2+"</label></div></div>";
	var comm="<div class='form-group'><input class='form-control' id=\"comment"+dName+"\" placeholder='Enter Comment'></div>";
	var checkBox = "<input type='checkbox' class='treatBox' name=\"diagCheckBoxes\" id='check"+dName+"' style='width:20px;' > ";
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
	cell2.innerHTML = obs;	
	cell3.innerHTML = comm;	
	cell4.innerHTML = checkBox;	
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
function addDiagRow(){
	vex.dialog.open({
	  message: 'Select Group Name and Disease Name:',
	  input: "<div class=\"form-group\"><label for=\"selectTable\">Select Group:</label><select name=\"table\" class=\"form-control\" id=\"selectTable\" onInput=\"showHint(this.value)\" ><option>Select Table</option><option>Skin</option><option>Eye</option><option>ENT</option><option>Oral</option><option>General</option></select></div><br><div class=\"form-group\"><label for=\"diseaseName\">Disease Name:</label><select class=\"form-control\" id=\"diseaseName\" name=\"disease\"></div>",
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
					insertRowRef(col[data.table],data.disease);
					return;	
				}
			  }
		});
}

function deleteDiagRow(){
	var checkboxes = document.getElementsByName("diagCheckBoxes");
	// loop over them all
	for (var i=0; i<checkboxes.length; i++) {
		// And stick the checked ones onto an array...
		if (checkboxes[i].checked) {
			var checkBoxID = checkboxes[i].id.split("check").pop();
			var row = document.getElementById(checkBoxID);
			var tableID = row.parentNode.parentElement.id;
			//console.log(tableID);
    		row.parentNode.removeChild(row);
			removeTableIfNoRow(tableID);
		}
	}
}

function removeTableIfNoRow(tableID){
	var table = document.getElementById(tableID);
	var head=document.getElementById(tableID+"Head");
	var length = table.rows.length;
	if(length <= 1)
		{
			diagnosis.removeChild(table);
			diagnosis.removeChild(head);
		}
	return;
}


//function to move to the next student
function newStudent(){
	vex.dialog.prompt({
		message: 'Enter Student ID',
		value: sid,
		callback: function(studentID) {
			dataReceived = '';
			getData("checkStudent.php",studentID);
			if (studentID != null && dataReceived.localeCompare('sucessfull') == 0) {
				sid = studentID;
				diagnosis.innerHTML="";
				buttons.innerHTML="";
				begin();
				return;
			}
			else if(studentID == false){
					return;
				}
			else{
				newStudent();
				vex.dialog.alert("Invalid Student ID..Please try again");
			}
		}
		});
}


var sl = 1;
function getTreat(){
	dataReceived = "";
	getData("treat.php", sid);
	var treatData = dataReceived.split('$');
	console.log(treatData);
	for(var i = 0; i < 4; i++){
		if(treatData[i] != 0){
			var medData = treatData[i].split('@');
			var checkBox = "<input type='checkbox' class='treatBox' id='treat"+sl+"' style='width:50px;'> ";
			insertRowTreat(medData[1],medData[2],medData[3],checkBox);
		}
	}
}

function addTreat(){
	var checkBox = "<input type='checkbox' class='treatBox' id='treat"+sl+"' style='width:50px;' > ";
	insertRowTreat("","","",checkBox);
}

function insertRowTreat( c1, c2, c3, c4){

	var  treatTableRef = document.getElementById('treat-table');
	var row = treatTableRef.insertRow(-1);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	// Add some text to the new cells:
	cell1.innerHTML = "<input type='text' id='treat-med-"+sl+"' value='"+c1+"'>";	
	cell2.innerHTML = "<input type='number' id='treat-dur-"+sl+"' value='"+c2+"' style='width:100px'>";
	cell3.innerHTML = "<input type='text' id='treat-per-"+sl+"' value='"+c3+"' style='width:100px'>";
	cell4.innerHTML = c4;
	sl++;
}

function deleteTreat(){
	var  treatTableRef = document.getElementById('treat-table');
	var x = document.getElementsByClassName("treatBox");
	//console.log("checked box: "+x);
	for(var i = 0; i < x.length; i++){
		var temp = x[i].id;
		//console.log("checked box ID: "+temp);
		if(document.getElementById(temp).checked){
			for (var j = 1; j < treatTableRef.rows.length ; j++) {								
				//console.log("Row cells:"+treatTableRef.rows[j].cells[4].children[0].id);
				if(temp.localeCompare(treatTableRef.rows[j].cells[3].children[0].id) == 0){
					//console.log("Row cells selected:"+treatTableRef.rows[j].cells[4].children[0].id);
					treatTableRef.deleteRow(j);
				}  
			}	
		}
	}

}

function saveStudent(){
	//console.log("Save Student");
	dataReceived = '';
	getData("saveStudent.php",sid);
	if(dataReceived.localeCompare('sucessfull') == 0){
		cleanTreat();
		window.print();
		var tempSID = parseInt(sid) + 1 ;
		//console.log(tempSID);
		sid = tempSID;
		var studentID = prompt("Please enter next student ID", sid);
		dataReceived = '';
		getData("checkStudent.php",studentID);
		if (studentID != null && dataReceived.localeCompare('sucessfull') == 0) {
			sid = studentID;
			deleteRows();
			begin();
		}else{
			alert("Invalid Student ID..Please try again");
			sid = parseInt(sid) - 1;
		}				
	}else{
		alert("Error Saving..Please try again");
	}
	//console.log(dataReceived);
}

function deleteRows(){
	var tab1 = document.getElementById('med-table');
	var tab2 = document.getElementById('treat-table');
	for(var i = tab1.rows.length - 1; i > 0; i-- ){
		tab1.deleteRow(i);
	}
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
		console.log(col.children[0].value);
		   if(col.children[0].value.length > 0){
			   //break;
			}else{
				//console.log("del: "+col.children[0].value.length);
			   table.deleteRow(i);
			   break;
		   }
	   }  
	}
}

//function to get diseases for an organ system
function showHint(table) {
	if(table.localeCompare("Select Table") !=0){

		// Create a new XMLHttpRequest.
		var request = new XMLHttpRequest();

		// Handle state changes for the request.
		request.onreadystatechange = function(response) {

		if (request.readyState === 4 && request.status === 200) {
			//creating new datalist for every new query to ensure no repeatition
			//document.getElementById('data').innerHTML="<datalist id=\"columns\"></datalist>";
			var dataList = document.getElementById('diseaseName');
			//dataList.innerHTML="";
			console.log(request.responseText);
			// Parse the JSON
			var jsonOptions = JSON.parse(request.responseText);

			//clearing select
			for (i = dataList.options.length-1; i >=0; i--) {
				dataList.remove(dataList.i);
			}

			// Loop over the JSON array.
			jsonOptions.forEach(function(item) {
				// Create a new <option> element.
				var option = document.createElement('option');
				// Set the value using the item in the JSON array.
				option.text = item;
				// Add the <option> element to the <datalist>.
				dataList.add(option);
			});

		} 
		};

		// Set up and make the request.
		request.open('POST', "http://"+ip_address+"/follow_up/php/gethint.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send("t="+table);	
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
