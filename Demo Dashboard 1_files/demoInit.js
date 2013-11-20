/********************************** Project namespace *******************************************/
(function () {

/************************************ Date Settings and Functions ************************************/


Date.prototype.getQuarter = function ( ) {
    var m  = this.getMonth();
    return (m - m%3)/3 + 1;
};

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

	dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
	var newYear = new Date(this.getFullYear(),0,1);
	var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() - 
	(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	//if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
			nYear = new Date(this.getFullYear() + 1,0,1);
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of
 			  the week, it is week #1 of that year*/
			weeknum = nday < 4 ? 1 : 53;
		}
	}
	else {
		weeknum = Math.floor((daynum+day-1)/7);
	}
	return weeknum;
};


     
/*********************************************  AddIns ************************************/

var imageLink = {
    name: "imageLink",
    label: "Image Link",
    defaults: {
      includeValue: false,
      valueFormat: function(v,format,st) {
        return st.rowIdx + 1;
      },
      defaultSrc: undefined
    },
    init: function(){
    },
    implementation: function(tgt, st, opt) {
      var ph = $(tgt),
          imgPh = $('<div class="image"></div>');

      var img = (st.value === null || st.value === "") ? 
        (opt.defaultSrc === undefined ) ? "" : ( '<img src=' + opt.defaultSrc + ' />'): ( '<img src=' + st.value + ' />');
      imgPh.append(img);     

      ph.empty();
      if(opt.includeValue) {
        var valph = $("<div class='value'></div>").append(opt.valueFormat(st.value, st.colFormat, st));
        valph.appendTo(ph);
      }
      ph.append(imgPh);
    }
  };
  Dashboards.registerAddIn("Table", "colType", new AddIn(imageLink));



/*********************************** Change Loader ***********************************/
/*
$.blockUI.defaults.message = '<div style="padding: 0px;"><img src=' + 'res/Demo/files/img/processing_transparent.gif' +' />';
$.blockUI.defaults.overlayCSS = { backgroundColor: "#FFFFFF", opacity: 0.8, cursor: "wait"};
$.blockUI.defaults.css.border = "none";



Dashboards.blockUIwithDrag = function() {

  $.blockUI();
  var blockui = $("div.blockUI.blockMsg").attr('title','Click to unblock, drag to move');
  blockui.css("background", "none").css("border", "none");
  blockui.draggable({
    handle:"div.blockUI.blockMsg"
  });
  blockui.bind('click',function(){
    $.unblockUI();
  });
  
};
*/


/****************************** Custom dataTables pagination plugin *******************/
$.fn.dataTableExt.oPagination.custom = {
	/*
	 * Function: oPagination.icrossing.fnInit
	 * Purpose:  Initalise dom elements required for pagination with input textbox
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *           node:nPaging - the DIV which contains this pagination control
	 *           function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnInit": function ( oSettings, nPaging_, fnCallbackDraw )
	{
    var nPaging = $(nPaging_);
		var nPrevious = $(document.createElement( 'div' )).addClass("paginate_button previous");
		var nNext = $(document.createElement( 'div' )).addClass("paginate_button next");
		var nPage = $(document.createElement( 'div' )).addClass("paginate_page paginate_option selected");
    var nAll = $(document.createElement( 'div' )).addClass( "paginate_all paginate_option");
		
    nAll.append("View All");
    
    var initialPageSize = oSettings._iDisplayLength;

		if ( oSettings.sTableId !== '' )
		{
			nPaging.attr( 'id', oSettings.sTableId+'_paginate' );
			nPrevious.attr( 'id', oSettings.sTableId+'_previous' );
			nNext.attr( 'id', oSettings.sTableId+'_next' );
		}
			
    nPaging.append( nPage, nAll, nPrevious, nNext );
		
		nPrevious.click( function() {
			oSettings.oApi._fnPageChange( oSettings, "previous" );
			fnCallbackDraw( oSettings );
		} );
		
		nNext.click( function() {
			oSettings.oApi._fnPageChange( oSettings, "next" );
			fnCallbackDraw( oSettings );
		} );

    nPage.click( function() {
      if ( !($(this).hasClass('selected'))){
        nPaging.find('.paginate_option').removeClass('selected');
        $(this).addClass('selected');        
			  oSettings._iDisplayLength = initialPageSize;
        oSettings._iDisplayStart = 0;
			  fnCallbackDraw( oSettings );
      }
		} );

    nAll.click( function() {
      if ( !($(this).hasClass('selected'))){      
        nPaging.find('.paginate_option').removeClass('selected');
        $(this).addClass('selected');  
        oSettings._iDisplayLength = oSettings.fnRecordsDisplay();
        oSettings._iDisplayStart = 0;
			  fnCallbackDraw( oSettings );
      }
		} );
		
		
		/* Take the brutal approach to cancelling text selection */
		$('span', nPaging).bind( 'mousedown', function () { return false; } );
		$('span', nPaging).bind( 'selectstart', function () { return false; } );
	},
	
	/*
	 * Function: oPagination.input.fnUpdate
	 * Purpose:  Update the input element
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *           function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnUpdate": function ( oSettings, fnCallbackDraw )
	{
		if ( !oSettings.aanFeatures.p )
		{
			return;
		}
		var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
		
		/* Loop over each instance of the pager */
		var an = oSettings.aanFeatures.p;
		for ( var i=0, iLen=an.length ; i<iLen ; i++ )
		{
			var pageOption = $(an[i]).find('.paginate_page');
			pageOption.empty().append("Page " + iCurrentPage + " of " + iPages);
      pageOption.detach().prependTo( $(an[i]) );
		}
          
          
    var an = oSettings.aanFeatures.p;
		for ( var i=0, iLen=an.length ; i<iLen ; i++ )
		{
			var ctn = $(an[i]);
      var firstPage_p = ( oSettings._iDisplayStart === 0 ),
          lastPage_p = ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() );

      ctn.find('.paginate_button.previous').toggleClass('disabled', firstPage_p);
      ctn.find('.paginate_button.next').toggleClass('disabled', lastPage_p);
		}
	}

}

})();




