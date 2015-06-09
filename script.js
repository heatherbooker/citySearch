function executeOnSubmit() {
    //get input
    var input = document.getElementById('city').value;

    //search text file
    var location = input.charAt(0).toUpperCase() + input.substring(1);
    var answer = 'dd';
    loadCityList();

    //print to div
    document.getElementById('results').innerHTML = answer;
}

function loadCityList() {
    $.ajax({
        type: "GET",
        dataType: "text",
        url: "cities.txt",
        success: function(data) {

        },
        error: function(err) {
            console.log("uh oh spaghettis " + err);
        }
    });
}