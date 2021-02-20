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

    // map layers
    var airMap = L.tileLayer("https://api.mapbox.com/styles/v1/mfatih72/ck30s2f5b19ws1cpmmw6zfumm/tiles/256/{z}/{x}/{y}?" + 
    "access_token=pk.eyJ1Ijoiand0a25zMDAiLCJhIjoiY2tqeG1nOHF3MDVlaTJwbzR3eXprbG0wMSJ9.h365mIKsJnPNlde7PCtxgA");
  
       
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mfatih72/ck30r72r818te1cruud5wk075/tiles/256/{z}/{x}/{y}?" + 
    "access_token=pk.eyJ1Ijoiand0a25zMDAiLCJhIjoiY2tqeG1nOHF3MDVlaTJwbzR3eXprbG0wMSJ9.h365mIKsJnPNlde7PCtxgA");

        
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mfatih72/ck30rkku519fu1drmiimycohl/tiles/256/{z}/{x}/{y}?" + 
    "access_token=pk.eyJ1Ijoiand0a25zMDAiLCJhIjoiY2tqeG1nOHF3MDVlaTJwbzR3eXprbG0wMSJ9.h365mIKsJnPNlde7PCtxgA");