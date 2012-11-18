
function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}

function setCookie(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function checkCookie() {
    firstName 			= getCookie("firstName");
    lastName  			= getCookie("lastName");
    organizationName	= getCookie("organizationName");
    userEmail			= getCookie("userEmail");
    userRole			= getCookie("userRole");
    userGrade			= getCookie("userGrade");
    userExperience		= getCookie("userExperience");

    if (firstName !=null && firstName != "" && lastName != null && lastName != "")
    {
        document.getElementById('userWelcome').innerHTML = "Welcome, " + firstName + " " + lastName + " <small>(<a href='javascript:clearCookie();' >Not Me?</a>)</small>";
    }
    else
    {
        $("#userModal").modal('show');
    }
}

function clearCookie() {
    setCookie("firstName",'',1);
    setCookie("lastName",'',1);
    setCookie("organizationName",'',1);
    setCookie("userEmail",'',1);
    setCookie("userRole",'',1);
    setCookie("userGrade",'',1);
    setCookie("userExperience",'',1);
    document.getElementById('userWelcome').innerHTML = "You are not logged in.";
    checkCookie();
}


function makeStruct(names) {
    var names = names.split(' ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
}



function updateTimeRequired(){
    boxes = document.checkBoxForm.tagItem.length;
    for (i = 0; i < boxes; i++) {
        if (document.checkBoxForm.tagItem[i].checked) {
            items[i].timeRequired = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";
        }
    }
    updateTextArea();
}


function updateGroupTypeVisibility(){
    if ($('#groupTypeDisplay').is(":hidden")) {
        $('#groupTypeDisplay').show();
    }
    else {
        $('#groupTypeDisplay').hide();
    }
}


function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    //console.log(evt.target.files[0].name);
    //$.twFile.load(evt.target.files[0].name);
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<br><li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
        // Only process image files.
        // if (!f.type.match('csv')) {
        // alert("File is not in CSV format.");
        // $("#saveLoadModalButton").attr('class','btn btn-primary disabled');
        // break;
        // }
        $("#saveLoadModalButton").attr('class','btn btn-primary');
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                var allText = e.target.result;
                var output = $.csv2Array(allText);
                for (var i = 1; i < output.length; i++)
                {

                    if (itemCounter == 0){
                        jQuery("#multiItemSelector").empty();
                    }
                    var timeFormat = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";
                    var educationAlignmentArray = new Array();

                    educationAlignmentArray.push({
                        'educationalAlignment':output[i][17],
                        'alignmentType':output[i][18],
                        'dotNotation':output[i][19],
                        'itemURL':output[i][20],
                        'description':output[i][21],
                        'guid':output[i][22]});

                    items.push({
                        'id':itemCounter,
                        'title':output[i][1],
                        'language':output[i][8],
                        'url':output[i][2],
                        'createdOn':output[i][5],
                        'topic':output[i][4],
                        'createdBy':output[i][6],
                        'usageRightsURL':output[i][10],
                        'publisher':output[i][7],
                        'isBasedOnURL':output[i][11],
                        'endUser':output[i][12],
                        'ageRange':output[i][14],
                        'educationalUse':output[i][13],
                        'interactivityType':output[i][15],
                        'learningResourceType':output[i][16],
                        'mediaType':output[i][9],
                        'groupType':output[i][23],
                        'timeRequired':timeFormat,
                        'educationAlignmentArray':educationAlignmentArray});

                    jQuery("#multiItemSelector").append($("<table style='width:100%;'><tr><td><label name='tagLabel"+itemCounter+"' id='tagLabel"+itemCounter+"' class='checkbox'><input type='checkbox' id='tagItem' name='tagItem'>"+output[i][1]+"</label></td><td><a id='tagURL"+itemCounter+"' class='pull-right' style='display:block;' onclick='updateMainContentBottom(\""+output[i][2]+"\");'><i class='icon-share'></i></a></td><tr/></table>"));
                    jQuery("#mainContentTopLeft").hide();
                    jQuery("#mainContentTopRight").hide();
                    jQuery("#mainContentBottom").hide();
                    itemCounter++;


                    var metaSourceValue1 = output[i][17];
                    var metaSourceValue2 = output[i][18];
                    var metaSourceValue3 = output[i][19];
                    var metaSourceValue4 = output[i][20];
                    var metaSourceValue5 = output[i][21];
                    var metaSourceValue6 = output[i][22];

                    //Check to see if the current Alignment is already Added to the currentAlignmentArray
                    var alreadyExists = false;
                    for (j = 0; j < currentAlignmentArray.length; j++) {
                        if(	(currentAlignmentArray[j].educationalAlignment == metaSourceValue1) &&
                            (currentAlignmentArray[j].alignmentType == metaSourceValue2) &&
                            (currentAlignmentArray[j].dotNotation == metaSourceValue3) &&
                            (currentAlignmentArray[j].itemURL == metaSourceValue4) &&
                            (currentAlignmentArray[j].description == metaSourceValue5 ) &&
                            (currentAlignmentArray[j].guid == metaSourceValue6 )   ){
                            alreadyExists = true;
                        }
                    }

                    if (!alreadyExists) {

                        blankCurrentAlignment();

                        // Add to the currentAlignmentArray
                        currentAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6});

                        //Updates the Alignment Table on the Alignment Tab
                        if (metaSourceValue3 == '') metaSourceValue3 = 'N/A';
                        $('#currentAlignmentTable > tbody:last').append('<tr style="background-color:#F8B93B;color:#ffffff;" id="currentAlignmentRow' + currentAlignmentCounter + '" onclick="updateAlignmentFields(' + currentAlignmentCounter + ');" onMouseOver="currentAlignmentMouseOver(' + currentAlignmentCounter + ');" onMouseOut="currentAlignmentMouseOut(' + currentAlignmentCounter + ');"><td><a id="currentAlignmentSelect' + currentAlignmentCounter + '"><i id="currentAlignmentIcon' + currentAlignmentCounter + '" class="icon-chevron-up icon-white"></i></a></td><td>'+ metaSourceValue3 +'</td></tr>');
                        currentAlignmentItem = currentAlignmentCounter;
                        currentAlignmentCounter++;
                    }

                }
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
    //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
//document.getElementById('files').addEventListener('change', handleFileSelect, false);



function readAlignmentDataFromFiles() {
    $.ajax({
        type: "GET",
        url: "ccss2asn-math.csv",
        dataType: "text",
        success: function(data) {processDataForAlignmentArray(data);}
    });
    $.ajax({
        type: "GET",
        url: "ccss2asn-ela.csv",
        dataType: "text",
        success: function(data) {processDataForAlignmentArray(data);}
    });
}

function processDataForAlignmentArray(allText)	{
    var reader = new FileReader();
    reader.readAsText(allText);
    var output = $.csv2Array(allText);
    for (var i = 1; i < output.length-1; i++)
    {
        alignmentArray.push({'title':output[i][2],'url':output[i][3],'description':output[i][0],'guid':output[i][4]});
        dotNotationDisplayArray.push(output[i][2]);
    }
}

//Update Main Content Bottom with URL iFrame
function updateMainContentBottom(metaSourceValue){
    jQuery('#iframe').attr('src',metaSourceValue);
}

function updateTextArea(){
    var textAreaValue = "";

    $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

        if (items[obj.id].title != "") textAreaValue += "Title:\n"+items[obj.id].title+"\n";
        if (items[obj.id].url != "") textAreaValue += "URL:\n"+items[obj.id].url+"\n";
        if (items[obj.id].language != "") textAreaValue += "Language:\n"+items[obj.id].language+"\n";
        if (items[obj.id].createdOn != "") textAreaValue += "Created On:\n"+items[obj.id].createdOn+"\n";
        if (items[obj.id].topic != "") textAreaValue += "Topic/Subject:\n"+items[obj.id].topic+"\n";
        if (items[obj.id].createdBy != "") textAreaValue += "Created By:\n"+items[obj.id].createdBy+"\n";
        if (items[obj.id].usageRightsURL != "") textAreaValue += "Usage Rights URL:\n"+items[obj.id].usageRightsURL+"\n";
        if (items[obj.id].publisher != "") textAreaValue += "Publisher:\n"+items[obj.id].publisher+"\n";
        if (items[obj.id].isBasedOnURL != "") textAreaValue += "Is Based On URL:\n"+items[obj.id].isBasedOnURL+"\n";
        if (items[obj.id].endUser != "") textAreaValue += "End User:\n"+items[obj.id].endUser+"\n";
        if (items[obj.id].ageRange != "") textAreaValue += "Age Range:\n"+items[obj.id].ageRange+"\n";
        if (items[obj.id].educationalUse != "") textAreaValue += "Educational Use:\n"+items[obj.id].educationalUse+"\n";
        if (items[obj.id].interactivityType != "") textAreaValue += "Interactivity Type:\n"+items[obj.id].interactivityType+"\n";
        if (items[obj.id].learningResourceType != "") textAreaValue += "Learning Res Type:\n"+items[obj.id].learningResourceType+"\n";
        if (items[obj.id].mediaType != "") textAreaValue += "Media Type:\n"+items[obj.id].mediaType+"\n";
        if (items[obj.id].groupType != "") textAreaValue += "Group Type:\n"+items[obj.id].groupType+"\n";
        if (items[obj.id].timeRequired != "P0Y0M0W0DT0H0M0S") textAreaValue += "Time Required:\n"+items[obj.id].timeRequired+"\n\n";

        for (j = 0; j < items[obj.id].educationAlignmentArray.length; j++){
            if (items[obj.id].educationAlignmentArray[j].educationalAlignment != "") textAreaValue += "Educational Alignment:\n"+ items[obj.id].educationAlignmentArray[j].educationalAlignment+"\n";
            if (items[obj.id].educationAlignmentArray[j].alignmentType != "") textAreaValue += "Alignment Type:\n"+ items[obj.id].educationAlignmentArray[j].alignmentType+"\n";
            if (items[obj.id].educationAlignmentArray[j].dotNotation != "") textAreaValue += "Dot Notation:\n"+ items[obj.id].educationAlignmentArray[j].dotNotation+"\n";
            if (items[obj.id].educationAlignmentArray[j].itemURL != "") textAreaValue += "Item URL:\n"+ items[obj.id].educationAlignmentArray[j].itemURL+"\n";
            if (items[obj.id].educationAlignmentArray[j].description != "") textAreaValue += "Description:\n"+ items[obj.id].educationAlignmentArray[j].description+"\n";
            //	if (items[obj.id].educationAlignmentArray[j].guid != "") textAreaValue += "Item GUID:\n"+ items[obj.id].educationAlignmentArray[j].guid+"\n\n";
        }
        textAreaValue += "\n-----------------------\n\n";

    });

    $("#textarea").val(textAreaValue);

}

function updateInputFields(){

    // Check to see if no tags are checked.  If none are checked, blank out all fields.

    var LRMIForm = document.forms.LRMIData.elements;
    var myform = document.checkBoxForm;
    var TempObject;
    var checkedArray = new Array();
    boxes = 0;
    for (var i=0; i<document.checkBoxForm.tagItem.length; i++) {
        if (myform.elements['tagItem'][i].checked) {
            boxes++;
            TempObject = items[i];
            checkedArray.push(items[i]);
        }
    }

    // If no tags, or 1 tag are checked we want to clear out the fields of current data.
    if (boxes == 0 || boxes == 1){ for (var i in LRMIForm){ LRMIForm[i].value = ''; } }

    // If only one tag is checked, set field values to the values of the single tag checked.
    if (boxes == 1){ setupDisplayFieldsForCurrentTagSelection(TempObject); }


    // If tags are checked, compare their values to see if they are the same.
    // If they are the same, set the field to the value. Otherwise, blank out the field.
    // TODO: Finish multiple selection
    else {
        // for (var i in LRMIForm){
        // if(LRMIForm[i].type == 'text'){
        // var LRMIid = LRMIForm[i].id;
        // var undef = false;  //TODO
        // for (var j in checkedArray){
        // if(typeof checkedArray[j][LRMIid] == 'undefined'){
        // LRMIForm[i].value = '';
        // undef = true;
        // }
        // else {
        // console.log(checkedArray[j][LRMIid]);
        // }
        // }
        // count(array_keys(items[j], 'yes')) == count(items[j]);//console.log(LRMIid);
        // console.log(items[j].LRMIid);
        // || LRMIForm[i].type == 'select-one' || LRMIForm[i].type == 'select-multiple'
        // }
        // }
        for (var i in LRMIForm){ LRMIForm[i].value = ''; }
    }
    // boxes = document.checkBoxForm.tagItem.length;

    // for (i = 0; i < boxes; i++) {
    // if (document.checkBoxForm.tagItem[i].checked) {



    // for (j = 0; j < items[i].educationAlignmentArray.length; j++){
    // if (items[i].educationAlignmentArray[j].educationalAlignment != "") $("#textarea").append("Educational Alignment:\n",  items[i].educationAlignmentArray[j].educationalAlignment,"\n");
    // if (items[i].educationAlignmentArray[j].alignmentType != "") $("#textarea").append("Alignment Type:\n",  items[i].educationAlignmentArray[j].alignmentType,"\n");
    // if (items[i].educationAlignmentArray[j].dotNotation != "") $("#textarea").append("Dot Notation:\n",  items[i].educationAlignmentArray[j].dotNotation,"\n");
    // if (items[i].educationAlignmentArray[j].itemURL != "") $("#textarea").append("Item URL:\n",  items[i].educationAlignmentArray[j].itemURL,"\n");
    // if (items[i].educationAlignmentArray[j].description != "") $("#textarea").append("Description:\n",  items[i].educationAlignmentArray[j].description,"\n\n");
    // }
    // $("#textarea").append("\n-----------------------\n\n");
}


function setupDisplayFieldsForCurrentTagSelection(TempObject){

    //Setup General Tab for Single Selection
    if (TempObject.title != "") 						$("#title").attr("value", TempObject.title);
    if (TempObject.url != "")							$("#url").attr("value",TempObject.url);
    if (TempObject.language == "en-US") 						$("#language").attr("value","English");
    if (TempObject.language == "es") 						$("#language").attr("value","Spanish");
    if (TempObject.language == "") 						$("#language").attr("value","");
    if (TempObject.createdOn != "") 					$("#createdOn").attr("value",TempObject.createdOn);
    if (TempObject.topic != "") 						$("#topic").attr("value",TempObject.topic);
    if (TempObject.createdBy != "") 					$("#createdBy").attr("value",TempObject.createdBy);
    if (TempObject.usageRightsURL != "") 				$("#usageRightsURL").attr("value",TempObject.usageRightsURL);
    if (TempObject.publisher != "") 					$("#publisher").attr("value",TempObject.publisher);
    if (TempObject.isBasedOnURL != "") 					$("#isBasedOnURL").attr("value",TempObject.isBasedOnURL);
    if (TempObject.timeRequired != "P0Y0M0W0DT0H0M0S") 	$("#timeRequired").attr("value",TempObject.timeRequired);


    //Setup Education Tab for Single Selection
    setupDisplayFieldsEducationTab(TempObject, 'endUser');
    setupDisplayFieldsEducationTab(TempObject, 'ageRange');
    setupDisplayFieldsEducationTab(TempObject, 'educationalUse');
    setupDisplayFieldsEducationTab(TempObject, 'interactivityType');
    setupDisplayFieldsEducationTab(TempObject, 'learningResourceType');
    setupDisplayFieldsEducationTab(TempObject, 'mediaType');
    setupDisplayFieldsEducationTab(TempObject, 'groupType');

    //Setup Alignment Tab for Single Selection - Defaults to Last Added Educational Alignment
    if (typeof TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1] != 'undefined') {
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].educationalAlignment != "") 	$("#educationalAlignment").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].educationalAlignment);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].alignmentType != "") 		$("#alignmentType").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].alignmentType);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].dotNotation != "") 			$("#dotNotation").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].dotNotation);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].itemURL != "") 				$("#itemURL").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].itemURL);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].description != "") 			$("#description").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].description);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].guid != "") 				$("#itemGUID").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].guid);
    }
}

function setupDisplayFieldsEducationTab(TempObject, selectBox){
    // This code is needed to merge the multiselect field and the "other" input field per
    if (typeof TempObject[selectBox] != 'undefined') {
        if (TempObject[selectBox] != "") {
            var optionsToSelect = TempObject[selectBox];
            var select = document.getElementById( [selectBox] );
            for ( var i = 0, l = select.options.length, o; i < l; i++ ){
                o = select.options[i];
                var tempO = o;
                if ( optionsToSelect.toLowerCase().indexOf( tempO.text.toLowerCase() ) != -1 ) {
                    o.selected = true;
                    optionsToSelect = optionsToSelect.replace(o.text,"");
                    optionsToSelect = optionsToSelect.replace(/,,/g,",");
                    optionsToSelect = optionsToSelect.replace(/^,/g,"");
                }
                else document.getElementById( [selectBox]+'Other' ).value = optionsToSelect;
            }
        }
    }
}


function educationalTabUpdateDataModel(nameBox, nameInput){

    $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
        var found = false;
        var LRMIForm = document.forms.LRMIData;
        var metaSourceValue = "";
        var x = 0;
        for (x=0;x<LRMIForm[nameBox].length;x++) {
            if (LRMIForm[nameBox][x].selected) {
                if (found) {
                    metaSourceValue = metaSourceValue + "," + LRMIForm[nameBox][x].value;
                }
                else {
                    metaSourceValue = LRMIForm[nameBox][x].value;
                    found = true;
                }
            }
        }
        if (LRMIForm[nameInput].value != ''){
            metaSourceValue = metaSourceValue + "," + LRMIForm[nameInput].value;
        }
        items[obj.id][nameBox] = metaSourceValue;
    });

    updateTextArea();

}

function blankCurrentAlignment() {
    for (var k = 0; k < currentAlignmentArray.length; k++){
        document.getElementById('currentAlignmentRow' + k).style.backgroundColor = "#ffffff";
        document.getElementById('currentAlignmentRow' + k).style.color = "#000000";
    }
}

function updateAlignmentFields(id){
    $('#educationalAlignment').val(currentAlignmentArray[id].educationalAlignment);
    $('#alignmentType').val(currentAlignmentArray[id].alignmentType);
    $('#dotNotation').val(currentAlignmentArray[id].dotNotation);
    $('#itemURL').val(currentAlignmentArray[id].itemURL);
    $('#description').val(currentAlignmentArray[id].description);
    $('#itemGUID').val(currentAlignmentArray[id].guid);
    //change all rows to black and white
    blankCurrentAlignment();

    //Change the clicked field to gold and update the currentAlignmentItem to the current row
    document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#F8B93B";
    document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    currentAlignmentItem = id;
    document.getElementById('deleteButton').setAttribute("class","btn btn-warning");

}

function currentAlignmentMouseOver(id){
    document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#3F9FD9";
    document.getElementById('currentAlignmentRow' + id).style.color = "#ffffff";
}

function currentAlignmentMouseOut(id){
    if (id == currentAlignmentItem) {
        document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#F8B93B";
        document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    }
    else {
        document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#ffffff";
        document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    }
}

function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())+'Z'
}


function outputFile(myText, myType){
    var textarea = $('textarea');

}

function saveLocal(str, fileType){
    var date = new Date();
    var form_action = "http://savefile.joshmcarthur.com/"+ firstName + lastName + "_" + ISODateString(date)+ fileType;
    $('<form></form>', { action: form_action, method: 'POST'}).append(
        $('<input></input>', { name: 'content', type: 'hidden', value: str })
    ).submit();
}

function saveServer(str){
    $('<form></form>', { action: 'http://23.23.213.206:81/index.php', method: 'POST'}).append(
        $('<input></input>', { name: 'content', type: 'hidden', value: str })
    ).submit();
}

function saveLearningRegistry(str){
    //TODO:  Completed Learning Registry Submission
}
