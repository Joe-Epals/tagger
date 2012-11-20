$(function() {

    $("#newbutton").click(function() {

        // Uncheck everything when you add a new tag
        jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
            obj.checked = false;
        });
        // Update the form
        updateInputFields();

        if (itemCounter == 0){
            jQuery("#multiItemSelector").empty();
        }
        jQuery("#multiItemSelector").append($("<a href='#itemTag"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag"+itemCounter+"' id='itemTag"+itemCounter+"URL' style='display:none;' class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag"+itemCounter+"Label' class='checkbox'><input id='itemTag"+itemCounter+"' type='checkbox' name='tagItem'/><span>New Item "+itemCounter+"</span></label>"));
        $('#itemTag'+itemCounter).prop('checked', true);

        var timeFormat = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";

        var educationAlignmentArray = new Array();

        items['itemTag' + itemCounter] = {
            'id':itemCounter,
            'title':'',
            'language':'',
            'url':'',
            'createdOn':'',
            'topic':'',
            'createdBy':'',
            'usageRightsURL':'',
            'publisher':'',
            'isBasedOnURL':'',
            'endUser':'',
            'ageRange':'',
            'educationalUse':'',
            'interactivityType':'',
            'learningResourceType':'',
            'mediaType':'',
            'groupType':'',
            'timeRequired':timeFormat,
            'educationAlignmentArray':educationAlignmentArray
        };

        itemCounter++;

        updateMainContentBottom('');
    });

});