function executeOnSubmit() {
    //get input
    var input = document.getElementById('city').value;

    //search text file
    var location = input.charAt(0).toUpperCase() + input.substring(1);
    console.log(location);
    loadCityList(location);

}

function loadCityList(location) {
    $.ajax({
        type: "GET",
        dataType: "text",
        url: "cities.txt",
        success: function(data) {
            search(data, location)
        },
        error: function(err) {
            console.log("uh oh spaghettis " + err);
        }
    });
}

function search(data, location) {
    var cityInList = data.search(location);
    if (cityInList >= 0) {
        //print relevant info
        showCityInfo(data, cityInList);
    } else if (cityInList < 0) {
        display('are you sure that ' + location + ' exists?')
    } else {
        display('Im not really sure whats going on...')
    };
}

function showCityInfo(list, positionOfCityInList) {
    display('it\'s in there somewhere! in fact, at position ' + positionOfCityInList);
    var isNotEndOfCityName = true;
    var searchPosition = positionOfCityInList
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