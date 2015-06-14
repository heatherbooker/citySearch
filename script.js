var cityList = "";

function executeOnSubmit() {
    //get input
    var input = document.getElementById('city').value;

    //search text file
    var location = input.charAt(0).toUpperCase() + input.substring(1);

    search(cityList, location);

}

function loadCityList() {
    $.ajax({
        type: "GET",
        dataType: "text",
        url: "cities.txt",
        success: function(data) {
            cityList = data;
            organize(data);
        },
        error: function(err) {
            console.log("uh oh spaghettis " + err);
        }
    });

    function organize(data) {
        var regex = '\n';
        var arrayOfCities = data.split(regex);
        var endOfArray = arrayOfCities.length;
        makeCityObjects(0, endOfArray, arrayOfCities);
    }

    function City(arrayOfProperties) {
        this.id = arrayOfProperties[0];
        this.name = arrayOfProperties[1];
        this.latitude = arrayOfProperties[2];
        this.longitude = arrayOfProperties[3];
        this.country = arrayOfProperties[4];
    }


    function makeCityObjects(start, end, arrayOfCities) {
        for (var i = start; i < end; i++) {
            arrayOfCities[i] = arrayOfCities[i].split('	');
            arrayOfCities[i] = new City(arrayOfCities[i]);
        };
        cityList = arrayOfCities;
    }
}

loadCityList();

function search(cityList, location) {
    var isNotFound = true;

    for (var i = 0; isNotFound; i++) {

        if (cityList[i].name === location) {
            display(cityList[i]);
            isNotFound = false;
        } else if (cityList[i].name === undefined) {
            document.getElementById('results').innerHTML = "City '" + location + "' Not Found";
            isNotFound = false;
        } else if (i === cityList.length) {
            document.getElementById('results').innerHTML = "City '" + location + "' Not Found";
            isNotFound = false;
        }
    }
}

function display(results) {
    var showThis = 'City ID: ' + results.id;
    showThis += '<br>City Name: ' + results.name;
    showThis += '<br>City Latitude: ' + results.latitude;
    showThis += '<br>City Longitude: ' + results.longitude;
    showThis += '<br>Country Code: ' + results.country;
    document.getElementById('results').innerHTML = showThis;
}