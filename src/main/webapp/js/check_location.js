/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let map = new OpenLayers.Map("Map");
let mapnik = new OpenLayers.Layer.OSM();
let markers = new OpenLayers.Layer.Markers("Markers");
let mar = null;
map.addLayer(markers);
map.addLayer(mapnik);

function setPosition(lat, lon) {
    var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    return position;
}

function handler(position, message) {
    var popup = new OpenLayers.Popup.FramedCloud("Popup",
            position, null,
            message, null,
            true // <-- true if we want a close (X) button, false otherwise
            );
    map.addPopup(popup);
}

function map_shower(obj) {
    if (mar != null) {
        markers.removeMarker(mar);
    }
    document.getElementById('Map').style.display = 'block';
    var position = setPosition(obj[0].lat, obj[0].lon);

    document.getElementById('lat').value = obj[0].lat;
    document.getElementById('lon').value = obj[0].lon;

    mar = new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register('mousedown', mar, function (evt) {
        handler(position, 'You are here');
    }
    );
    const zoom = 11;
    map.setCenter(position, zoom);
}


function ifObjectIsEmpty(object) {
    var isEmpty = true;
    if (JSON.stringify(object) == JSON.stringify({})) {
        // Object is Empty
        isEmpty = true;
    } else {
        //Object is Not Empty
        isEmpty = false;
    }
    return isEmpty;
}



function location_checker() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(xhr.responseText);
            if (ifObjectIsEmpty(obj)) {
                document.getElementById('Error').innerHTML = ("This location does not exist");
                document.getElementById('submit').style.display = 'none';
            } else {
                if (obj[0].address.state != "Region of Crete" && !ifObjectIsEmpty(obj)) {
                    document.getElementById('Error').innerHTML = ("This location is outside of Crete");
                    document.getElementById('submit').style.display = 'none';
                } else {
                    document.getElementById('Error').innerHTML = ("");
                    map_shower(obj);
                }
                document.getElementById('submit').style.display = 'block';
            }
            console.log(this.responseText);
        }
    });



    var address = document.getElementById('addr').value.replace(/ /g, '%20');
    var city = document.getElementById('city').value.replace(/ /g, '%20');
    var country = document.getElementById('country');
    var text = country.options[country.selectedIndex].text.replace(/ /g, '%20');

    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?format=json&street=" + address + "&city=" + city + "&country=" + text + "&addressdetails=1&accept-language=en&polygon_threshold=0.0");
    xhr.setRequestHeader("X-RapidAPI-Key", "2303c9c676msh66495b54f3abfbep13827bjsnb9eecb83c236");
    xhr.setRequestHeader("X-RapidAPI-Host", "forward-reverse-geocoding.p.rapidapi.com");

    xhr.send(data);
}

function hide_map() {
    document.getElementById('Map').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
}


