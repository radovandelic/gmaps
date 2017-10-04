//var api_key = "AIzaSyDs992A3on2XHonZZVGudiBiABCHTNF7fo";
var api_key = "AIzaSyCkj-PAfXG31sBojyxU1agiRle41jas8cI";
function initMap() {
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position["coords"]);
                var latlong = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                reverseGeocode(latlong, printPosition);
                var map = createMap(document.getElementById("googleMap"), latlong, 15)
                addMarker(latlong, map);
                initListeners(map);
                //showCurrentLocation(latlong);
                //printPosition(position);
            });
        }
    }

    function showLocation(latlong) {
        reverseGeocode(latlong, printPosition);
        var map = createMap(document.getElementById("googleMap"), latlong, 15)
        addMarker(latlong, map);
        //printPosition(position);
        initListeners(map);
    }

    function reverseGeocode(latlong, display) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': latlong }, function (results, status) {
            if (status == "OK") {
                display(results);
            } else {
                alert("Error");
                console.log(status);
            }
        });
    }

    function printPosition(position) {/*
        document.getElementById("location").innerHTML = "";
        for (var key in position.coords) {
            document.getElementById("location").innerHTML += key + ": " + position.coords[key] + "<br>";
        }
        //  document.getElementById("location").appendChild(document.createElement("h2"));*/
        //console.log(JSON.stringify(position[0]));
        for (var index = 0; index < position.length; index++) {
            //console.log(position[index].formatted_address);
        }
        document.getElementById("location").innerHTML = position[0].formatted_address;
    }

    function createMap(mapHolder, latlong, zoomLevel) {
        return new google.maps.Map(mapHolder, { center: latlong, zoom: zoomLevel });
    }

    function addMarker(location, map) {
        var newMarker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.BOUNCE
        })
    }

    function initListeners(map) {
        google.maps.event.addListener(map, "click", function (event) {
            var latlong = event.latLng;
            showLocation(latlong);
        });
    }

    document.getElementById("locationButton").onclick = function () {
        getCurrentLocation();
    };
}