// Store the given API endpoint inside queryUrl
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Get request for data
d3.json(earthquakeURL, function(data) {
    developDataFeatures(data.features);
});
// Define function to run "onEach" feature 
function developDataFeatures(earthquakeData) {
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2>" + feature.properties.place +
            "</h2><h3>Magnitude: " + feature.properties.mag + "</h3>" +
            "<p>" + new Date(feature.properties.time) + "</p>");},

          pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
              {radius: defineRadius(feature.properties.mag),
              fillColor: defineColor(feature.properties.mag),
              fillOpacity: .8,
              color: "grey",
              stroke: true,
              weight: .5
          })
        }
        });

    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Map layer from in class assignments        
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mfatih72/ck30rkku519fu1drmiimycohl/tiles/256/{z}/{x}/{y}?" + 
    "access_token=pk.eyJ1Ijoiand0a25zMDAiLCJhIjoiY2tqeG1nOHF3MDVlaTJwbzR3eXprbG0wMSJ9.h365mIKsJnPNlde7PCtxgA");
    
// Tectonic layer
var tectonicPlates = new L.LayerGroup();


// Generate map
L.map("mapid", {
    center: [33.7, -118.19],
    zoom: 4,
    layers: [lightMap, earthquakes, tectonicPlates]
});

// Add tectonic plates 
d3.json(tectonicPlatesURL, function(tectonicData) {
    L.geoJson(tectonicData, {
        color: "black",
        weight: 2
    })
    .addTo(tectonicPlates);
});

}

// color function w help from class
function defineColor(magnitude) {
if (magnitude > 5) {
    return 'lightblue'
} else if (magnitude > 4) {
    return 'pink'
} else if (magnitude > 3) {
    return 'green'
} else if (magnitude > 2) {
    return 'orange'
} else if (magnitude > 1) {
    return 'blue'
} else {
    return 'red'
}
};

// radius function
function defineRadius(magnitude) {
return magnitude * 30000;
};