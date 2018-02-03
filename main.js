var mini=10000000000;
var ic=0;
var mc=0;
var dc = "";
var tras="";
var nc=0;
var che=0;
$(function() {


  function calculateDistance(origin, destination,na) {
    localStorage.setItem("lastname", "Smith");
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      drivingOptions: {
          departureTime: new Date(Date.now()+na),
          trafficModel: 'bestguess'
       },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
    }, callback);
  }

  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $('#result').html(err);
    } else {
      ic++;
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $('#result').html("Better get on a plane. There are no roads between "
                          + origin + " and " + destination);
      } else {
        var distance = response.rows[0].elements[0].distance;
        var distance_value = distance.value;
        var distance_text = distance.text;
        var duration_text = response.rows[0].elements[0].duration;

        var dur = duration_text.text;
        var durv = duration_text.value;
        var traffic = response.rows[0].elements[0].duration_in_traffic;
        var tra = traffic.text;
        var tran = traffic.value;
        console.log(tra)
        console.log(tran);
        if(tran<mini)
        {
             mini=tran;
             tras=tra;
             var x=ic*1200000;
             dc = new Date(Date.now()+x);
        }
        console.log(ic);
        console.log(mc);
        var miles = distance_text.substring(0, distance_text.length - 3);
        if(mc==0)
        {
          localStorage.clear();
          var origin = $('#origin').val();
          var destination = $('#destination').val();
          localStorage.setItem("ori",origin);
          localStorage.setItem("des",destination);
          $('#result').html("It is " + miles + " miles from " + origin + " to " + destination + ". And the journey time is " + dur);

        }
        else if(ic==mc)
         {
          localStorage.clear();
          var origin = $('#origin').val();
          var destination = $('#destination').val();
          localStorage.setItem("ori",origin);
          localStorage.setItem("des",destination);

           if(durv<=mini)
           {
            $('#result').html("It is " + miles + " miles from " + origin + " to " + destination + ". And the journey time is " + dur + ".<br> Start the journey now or " + "Start the journey at " + dc + ". So that the jouney time is " + tras);
           }
           else
           {
            $('#result').html("It is " + miles + " miles from " + origin + " to " + destination + ". And the journey time is " + dur + "<br>" + "Start the journey at " + dc + ". So that the jouney time is " + tras);
           }

         }
      }
    }
  }
  $("#ar").click(function(){
    $("#result").hide();
    $("#distance_form").fadeIn(3000);
    $("#ar").fadeOut(1000);
    $("#mac").fadeOut();
    $("#route").fadeOut();
  });

  $('#distance_form').submit(function(e){

      $("#distance_form").fadeOut("slow");
      $("#ar").show();
      $("#result").fadeIn(2000);
      $("#mac").show();
      $("#route").show();
      event.preventDefault();
      var origin = $('#origin').val();
      var destination = $('#destination').val();
      var hr = $('#hour').val();
      var min = $('#min').val();
      var mi=parseInt(min);
      var h=parseInt(hr);
      mi = mi+(h*60);
      mi/=20;
      var k=1200000;
      mc=mi;
      if(mi==0)
      {
        var distance_text = calculateDistance(origin,destination,0)
      }
      else
      {
      for(var i=1;i<=mi;i++)
      {

      var distance_text = calculateDistance(origin, destination, 1200000*i);
      }
    }
  });


});
function activatePlacesSearch()
  {
    var input=document.getElementById('origin');
    var autocomplete= new google.maps.places.Autocomplete(input);
  }
  function activatePlacesSearchA()
  {
      var inp=document.getElementById('destination');
      var autocomplete=new google.maps.places.Autocomplete(inp);
  }
