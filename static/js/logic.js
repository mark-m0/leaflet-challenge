//Save URL for the data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Call in the data from the url, create the createFeatures function here as well
d3.json(url).then(function (data) {
    console.log(data);
    createFeatures(data.features);
});

//Create function to handle the marker size for each earthquake based on magnitude
function markerSize(magnitude) {
    return magnitude * 2500;
};


//Create function that generates a color based on the depth of the earthquake
function depthColor(feature) {
    for (let i=0; i < feature.length; i++) {
        let depth = feature[i].geometry.coordinates[2];

        if (depth <= 200) {
            return "#41D80A"
        }
        else if (depth <= 400 && depth > 200) {
            return "#FFC300"
        }
        else if (depth <= 600 && depth > 400) {
            return "#FF5733"
        }
        else if (depth <= 800 && depth > 600) {
            return "#C70039"
        }
        else {
            return "#900C3F"
        }
    }
    
};

//Create function that takes in the data, and binds a popup to it based on features
function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude and date/time: 
        ${feature.properties.mag}, ${new Date(feature.properties.time)}</p>`);
    };

    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(earthquakeData, latLng) {
            return L.circle(latLng, {
                radius: markerSize(earthquakeData.properties.mag),
                fillOpacity: 0.5,
                color: depthColor(earthquakeData)
            });
        },
        onEachFeature: onEachFeature
    });

    createMap(earthquakes);
};

//Create the map that will be used
function createMap(earthquakes) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    };

    let overlayMaps = {
        Earthquakes: earthquakes
    };

    let myMap = L.map("map", {
        center: [0, 0],
        zoom: 2,
        layers: [streetmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

};


