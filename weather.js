var citySt;

  
  function generateCard(result) {
        console.log("Current Condition is " + result.currently.summary); 
        console.log("Current Temp: " + result.currently.temperature);
        console.log("Min Temp: " + result.daily.data["0"].apparentTemperatureMin);
        console.log("Max Temp: " + result.daily.data["0"].apparentTemperatureMax);
        console.log("Chance of Rain: " + result.currently.precipProbability);
        
        var weather = {
        condition: result.currently.summary,
        currentTemp: (result.currently.temperature) + "",
        minTemp: (result.currently.apparentTemperatureMin) + '',
        maxTemp: (result.currently.apparentTemperatureMax) + "",
        rainChance: (result.currently.precipProbability) + ""
        }
    

        var template = $('#templateDiv').html();
        template = template.replace("**currentTemp**", result.currently.temperature);
        template = template.replace("**condition**", result.currently.summary);
        template = template.replace("**minTemp**", result.daily.data["0"].apparentTemperatureMin);
        template = template.replace("**maxTemp**", result.daily.data["0"].apparentTemperatureMax);
        template = template.replace("**rainChance**", result.currently.precipProbability);
        template = template.replace("**citySt**", citySt);
  
       
        $("#cards").append(template);
      };

        
  




    function getLatLong_Complete(result) {
      var lat = result.results["0"].geometry.location.lat;
      var long = result.results["0"].geometry.location.lng;
        citySt = result.results[0].address_components[1].short_name + "," +
              result.results[0].address_components[3].short_name;
             
      var results = {
        url: 'https://api.darksky.net/forecast/833fa8991b5ee77acbfdf88f7d770ee7/' + lat + ',' + long,
        dataType: 'jsonp',
        success: generateCard
       

 };
    
    $.ajax(results);
    console.log('Latitude and Longitude are ' + lat + ", " + long + ".");
    console.log(citySt)
   
}

function getLatLong(city,state,zipcode) {
    var address = "";
    if (zipcode.length !=0) {
        address = zipcode.trim();
    }
    else if ( city.length !=0 && state.length !=0) {
        address = city.trim() + ", " + state;
    }
    else {
        return;
    }




var googleApi = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&keyAIzaSyAJ26HH37c3QHc0Ede-f-ZXA_C1HvL981E";
var getInfo = {
    url: googleApi,
    success: getLatLong_Complete
};

$.ajax(getInfo);
}



function getZip_Click() {
    var zipcode = $("#lookup").val();
    console.log('Location is ' + location);
    console.log('This is your area zipcode ' + zipcode + '.');
    getLatLong('','',zipcode);
    
}
  
   



$(function() {
    $("#add").on("click", getZip_Click)
    
});

