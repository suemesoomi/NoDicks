//var stamps = [];
function stamp(){
  //CREATE STAMPS
  
  var $stampContainer = $("#stampContainer");
  var $currentStamp;
  
  $("#buttonSwitcher img").click(function(){
    var $stamp = $('<img>', {src: this.src});
    stamps.push($stamp);
    $stampContainer.append($stamp);
    stampSelected($stamp);
    
    $stamp.click(function(){
      stampSelected($stamp);    
    });
    
    $stamp.hammer();
    $stamp.data("hammer"). get("rotate").set({enable:true});
    $stamp.data("hammer"). get("pinch").set({enable:true});
    var startRotation = 0;
    var rotation = 0;
    var startScale = 1;
    var scale = 0;
    var startX = 0;
    var startY = 0;
    var x = 0;
    var y = 0;
    
    
    $stamp.bind("rotate","pinch", function(e){
      stampSelected($stamp);
      rotation = e.gesture.rotation + startRotation;
      scale = e.gesture.scale-1 + startScale;
      x = startX + e.gesture.deltaX;
      y = startY + e.gesture.deltaY;
      
      $stamp.css({
        "transform": "translate("+x+"px,"+y+"px) rotate("+rotation+"deg) scale("+scale+","+scale+")",
        "-webkit-transform": "translate("+x+"px,"+y+"px) rotate("+rotation+"deg) scale("+scale+","+scale+")"  
      });
      
    });
    $stamp.bind("rotateend", "pinchend", function(e){
      startRotation = rotation;
      startScale = scale;
      startX = x;
      startY = y;
      
      $stamp.data("transform", {
        rotation: startRotation,
        scale: startScale,
        x: startX,
        y: startY
      });
    });
    
    
    $stamp.bind("pan", function(e){
      stampSelected($stamp);
      x = startX + e.gesture.deltaX;
      y = startY + e.gesture.deltaY;
    
      $stamp.css({
        "transform": "translate("+x+"px,"+y+"px) rotate("+startRotation+"deg) scale("+startScale+","+startScale+")",
        "-webkit-transform": "translate("+x+"px,"+y+"px) rotate("+startRotation+"deg) scale("+startScale+","+startScale+")"  
      });
    });
    $stamp.bind("panend", function(e){
      startX = x;
      startY = y;
      
      $stamp.data("transform", {
        rotation: startRotation,
        scale: startScale,
        x: startX,
        y: startY
      });
    });
  });  

  function stampSelected($stamp){
    $("#tools").removeClass().addClass("stampAdjust");
    $currentStamp = $stamp;    
  };
  
  $('#delete').click(function(){
      stamps.splice(stamps.indexOf($currentStamp), 1);
      $currentStamp.remove();
      $("#stampButton").click();
  });

};