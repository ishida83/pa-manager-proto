/********************************** Project namespace *******************************************/
var demo = (function () {

/************************************* Site Map Settings and Functions ******************************************/



var siteMap = function () {
  // Making solution static.
  var solution = 'Demo', // Dashboards.context.solution,
      debugMode = Dashboards.propertiesArrayToObject( window.location.search.slice(1).split('&').map(function(i){return i.split('=')})).debug,
      debug = ( debugMode == 'true' ) ? "&debug=true" : "";


  return [ {name: "Content 01",  id:"c1",  link: "Render?solution=" + solution + "&path=%2FDashboards&file=Content01.wcdf" + debug, action:function() {Dashboards.log("Link1");}, sublinks: [] }/*,
           {name: "Content 02",  id:"c2",  link:  "Render?solution=" + solution + "&path=%2FDashboards&file=Content02.wcdf" + debug, action:function() {Dashboards.log("Link2");}, sublinks: [] },
           {name: "Content 03",  id:"c3",  link: "Render?solution=" + solution + "&path=%2FDashboards&file=Content03.wcdf" + debug, action:function() {Dashboards.log("Link3");}, sublinks: [] }*/
         ];
}  

/************************************* Colors ******************************************/

var colors = {
  palette: [ "#5F060E", "#B10C1B", "#D75200", "#FF6E14", "#FFAA75", "#282A2E", "#494E54", "#6D737D", "#9A9FA7", "#D1D3D7" ],
  pink: '#9C237D',
  lightPink: '#BD359B',
  lightGrey: '#D1D1D1',
  darkGrey: '#555555',
  background: "#F6F8F7",
};

/************************************* Settings  ******************************************/

var settings = {
  search: { maxResults: 20 },
  date: { 
    sow: 1, //Weeks start on Monday. ISO 8601 weeks.
    formats: { 
      day:"MMM dd, yyyy",  
      week:"MMM dd, yyyy", 
      month:"MMM yyyy",  
      year:"yyyy", 
      daymonth:"MMM dd",
      input: "yyyy-MMM-dd",
      inputFull: "yyyy-MMM-ddTHH",
      chart: { hour:  "HH", day: "dd", week:"W" , month:"MMM", quarter:"MMM", input:"yyyy-MM-dd"},
      datepicker:"",
      headerTable1: "MMM dd",
      headerTable2:"MMM dd yyyy"
    }
  },
  displayBy: {
    // These thresholds refer to number of days in the specified range
    thresholds: { hour: 1 , day:31 , week: 366 , month: 5000 , quarter: 5000 }
  },
  sparkline: { 
    barColor: '#FFFFFF', 
    barWidth: 4, 
    barSpacing: 1  
  },
  pieChart: { 
    colors: colors.palette,
    extensionPoints: [ [ "pie_innerRadius" , "70" ],
                      [ "pie_strokeStyle" , colors.background ],
                      [ "pie_lineWidth"   , "3" ] ]
  },
  barChart: { 
    colors: { pink: colors.pink, darkGrey: colors.darkGrey },
    extensionPoints: { 
      label: function () {
          var maxFontSize = 22,
              minFontSize = 9,
              fontFamily = "Arial, sans-serif",
              minWidthRatio = 3.41;
            /*  minWidthRatio = (function () {
                var testStr = "99.99%",
                    testSpan = $("<span/>").css({ "visibility": "hidden" ,
                                                   "font-family": fontFamily,
                                                   "font-size": "100px",
                                                   "position": "absolute" })
                                            .append(testStr)
                                            .appendTo( $("body") ),
                     w = testSpan.width();
                testSpan.remove();
                return  w  / 100;
              })();*/
          var getFontSize = function ( width ) {
               return parseInt( Math.max( minFontSize, Math.min( width / minWidthRatio , maxFontSize ) ) ) ;
            }

          return  [ [ 'barLabel_top', function () {
                           var fs = getFontSize( this.target.width() - 2*this.target.lineWidth() - 5 );
                           return (  (this.target.height() > fs + 2*fs / minWidthRatio) && (fs > minFontSize)  ) ?
                                  this.target.top() + fs/minWidthRatio :
                                  this.target.top() - (fs + fs / (2*minWidthRatio) + this.target.lineWidth());
                         }],
                       [ 'barLabel_left', null  ],
                       [ 'barLabel_visible', true ],
                       [ 'barLabel_right', function () { 
                           var fs = getFontSize( this.target.width() - 2*this.target.lineWidth() - 5 );
                           return ( (this.target.height() > fs + 2*fs / minWidthRatio) && (fs > minFontSize)  ) ?
                                   this.target.right() + fs / minWidthRatio :                           
                                   this.target.right() ;
                         }   ],                       
                       [ 'barLabel_textBaseline' , 'top' ],
                       [ 'barLabel_textAlign', 'right' ],
                       [ 'barLabel_textStyle' , function () {
                           var fs = getFontSize( this.target.width() - 2*this.target.lineWidth() - 5 );                           
                           return ( (this.target.height() > fs + 2*fs / minWidthRatio) && (fs > minFontSize) ) ?
                                  '#FFFFFF' :
                                  this.target.fillStyle(); 
                         } ],
                       [ 'barLabel_font' , function (d) {
                           var fs = getFontSize( this.target.width() - 2*this.target.lineWidth() - 5 );                            
                            return 'bold ' + fs + 'px ' + fontFamily;

                         }
                       ] 
                    ]
      },
      bar : function () {
              return [ [ 'bar_lineWidth' , 4 ],
                [ 'bar_strokeStyle' , colors.lightGrey ],
                [ 'bar_add' , function () {
                    var panel = new pv.Panel()
                                        .height(20)
                                        .width( function () {
                                          return this.proto.width() + this.proto.lineWidth();
                                        })
                                        .top( function () {
                                          return this.parent.height()-3;
                                        })
                                        .left( function () {
                                          return this.proto.left() - this.proto.lineWidth()/2;
                                        })
                                        .strokeStyle('none')
                                        .fillStyle (function() {
                                          return this.proto.fillStyle().darker(0.95);
                                        });
                    panel.add( function () {
                        var bar = new pv.Bar()
                                          .left(0)
                                          .width( function () {
                                            return this.parent.proto.lineWidth();
                                          })
                                          .fillStyle( function() {
                                            return this.parent.proto.strokeStyle();
                                          });
                        return bar;
                    } );
                    panel.add( function () {
                        var bar = new pv.Bar()
                                          .left(null)
                                          .right(0)
                                          .width( function () {
                                            return this.parent.proto.lineWidth();
                                          })
                                          .fillStyle( function() {
                                            return this.parent.proto.strokeStyle();
                                          });
                        return bar;
                    } );

                    return panel;
                } ] ]
        },
        xAxis: function (dateFormat) {
                return [[ 'xAxisRule_lineWidth' , 0 ],
                        [ 'xAxisRule_strokeStyle', 'none' ],

                [ 'xAxisLabel_textBaseline' , 'bottom'],
                [ 'xAxisLabel_textStyle' , '#FFFFFF' ],
                [ 'xAxisLabel_font' , '10px Arial, sans-serif' ],
                [ 'xAxisLabel_top' ,  null ],
                [ 'xAxisLabel_bottom', 5  ],
                [ 'xAxisLabel_fillStyle', colors.darkGrey ],
                [ 'xAxisLabel_text' , cccGetChangeFormatFunction( dateFormat )] 
              ]
        }
      }
  },

  processingImgPath: "res/Demo/files/img/processing_transparent.gif",
  defaultCoverPath: "res/Demo/files/img/covers/default.png",
  expand: { bar: { bgColor: colors.lightGrey , color: '#676767', height: 15, width:620 } }


};

/************************************ Date Settings and Functions ************************************/

var pvChangeFormat = function (str, fin, fout ) {
  var pvFin  = pv.Format.date( fin  || "%Y-%m-%d" ),
      pvFout = pv.Format.date( fout || "%b %d, %Y" ),
      d = pvFin.parse( str );

  return pvFout.format(d)
};   

var pvLastYear = function (str, format ) {
  var pvFormat  = pv.Format.date( format  || "%Y-%m-%d" )
      d = pvFormat.parse( str );
  d.setFullYear( d.getFullYear() - 1 );

  return pvFormat.format(d)
};




var getChangeFormatFunction = function (fout) {
  var sow = settings.date.sow || 0;

  if ( fout == 'quarter' ) {
    return function(d) { return "Q" + Date.parse(d).getQuarter(); }
  }else if ( fout == 'week' ) {
    return function (d) { return "w" + Date.parse(d).getWeek(sow); }
  }else if ( fout == 'hour') {
    return function (d) { return Date.parse(d).toString( settings.date.formats.chart[fout]) + "h"; }
  }    
  
  return function (d) { return Date.parse(d).toString( settings.date.formats.chart[fout]); }
  
};

var cccGetChangeFormatFunction = function (fout) {
  return function(d) { return (getChangeFormatFunction(fout))(d.value) }
}


var appendHeaderDate = function (obj, date) {
  var monthDay = date.toString( settings.date.formats.headerTable1 ),                        
      year = date.getFullYear();

      obj.append(  $('<span/>').addClass('monthDay').append(monthDay) );
      obj.append(  $('<span/>').addClass('year').append(year) );
}

var appendHeaderRange = function (obj, startDate, endDate ) {
      
        appendHeaderDate( obj, startDate );

        if ( !startDate.equals( endDate ) ){
          obj.append( " - " );
          appendHeaderDate(obj, endDate);
        } 
}


/******************* Dashboards updating functions ******************************/
var addToExecList = function (parameter, component) {
    var execList = Dashboards.getParameterValue( parameter ),
        component = component || this;
        
    execList[component.name] = true;
    Dashboards.setParameter( parameter, execList );  
};

var readyToExec_p = function ( parameter, list ) {
  var execList = Dashboards.getParameterValue( parameter );
  for (var i=0; i < list.length ; i++){
    if ( !( execList[list[i]] ) ){
      return false;
    }
  }
  return true;
};

var updateAll = function (components){
    for (var i=0; i < components.length; i++){
        var comp = Dashboards.getComponentByName(components[i]);
        Dashboards.update( comp );
    }
};

var fireAll = function (events) {
    for (var i=0; i< events.length; i++){
        Dashboards.fireChange.apply( Dashboards, events[i] );
    }
};


/*********************** customExportChart *******************************************/

var customExportChart  = function(det){
         var effectiveExportType = det == undefined ? this.chartExportType : det ;   
         
        // Get query
        Dashboards.log("Exporting to " + effectiveExportType);

        var parameters = this.dataComponent.parameters;
        var cd = ( this.dataComponent.chartDefinition ) ? this.dataComponent.chartDefinition : this.dataComponent.queryDefinition;
        var dataAccess = cd.dataAccessId;
        var path = cd.path;
       
        var loc = (Dashboards.getQueryParameter("solution") + "/" + Dashboards.getQueryParameter("path") + "/").replace(/\/\//g,"/");
    
        var url = "../cgg/draw?script="+ loc +  this.dataExportComponent + ".js&outputType=" + effectiveExportType;
        var param;
        // Get parameter values; metadata is a special parameter, carries important
        // info for dashboard operation but has no data so isn't exported
        for(var i=0; i<parameters.length; i++){
          param = Dashboards.ev(Dashboards.getParameterValue(parameters[i][1]));
          if( param !== undefined ){
            url += "&param" + parameters[i][0] + "=" + (parameters[i][0] != 'metadata' ? encodeURIComponent( param ) : 'false');
          }
        }
        var dimensions = [800, 800*(this.dataComponent.chartDefinition.height/this.dataComponent.chartDefinition.width)];            
     
          var _exportIframe =  $('<iframe style="display:none">');
          _exportIframe.detach();
          _exportIframe[0].src = url + "&attachmentName=chart." + effectiveExportType + "&paramwidth=" + dimensions[0] + '&paramheight=' + dimensions[1];
          _exportIframe.appendTo($('body'));     
  }



return { siteMap: siteMap, 
         colors: colors, 
         settings: settings, 
         appendHeaderRange: appendHeaderRange,
         getChangeFormatFunction: getChangeFormatFunction,
         customExportChart: customExportChart
       } ;
})();




