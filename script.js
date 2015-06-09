function executeOnSubmit() {
    //get input
    var input = document.getElementById('city').value;

    //search text file
    var location = input.charAt(0).toUpperCase() + input.substring(1);
    var answer = 'dd';
    loadXMLDoc();

    //print to div
    document.getElementById('results').innerHTML = answer;
}


function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("invisible").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "cities.txt", true);
    xmlhttp.send();
    console.log('smthg is happening');
    searchFile();
}