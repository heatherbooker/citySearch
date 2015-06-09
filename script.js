var cityList = "";

function executeOnSubmit() {
    //get input
    var input = document.getElementById('city').value;

    //search text file
    var location = input.charAt(0).toUpperCase() + input.substring(1);
    console.log(location);

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
        //a gazillion new cities
    }

    function City(id, name, lat, long, country) {
        this.id = id;
        this.name = name;
        this.latitude = lat;
        this.longitude = long;
        this.country = country;
    }
}

loadCityList();

function search(data, location) {
    var cityInList = data.search(location);
    if (cityInList >= 0) {
        showCityInfo(data, cityInList);
    } else if (cityInList < 0) {
        display('are you sure that ' + location + ' exists?')
    };
}

function showCityInfo(list, positionOfCityInList) {
    var isNotEndOfCityName = true;
    var searchPosition = positionOfCityInList;
    var ANumber = 0;
    for (searchPosition; isNotEndOfCityName; searchPosition++) {
        ANumber = Number(list.charAt(searchPosition));
        if (!isNaN(ANumber)) {
            console.log('found the end!');
            isNotEndOfCityName = false;
        } else if (searchPosition === positionOfCityInList + 50) {
            isNotEndOfCityName = false;
        }
    };
    var info = list.substring(positionOfCityInList, searchPosition)
    display(info);
}

function display(results) {
    document.getElementById('results').innerHTML = results;
}