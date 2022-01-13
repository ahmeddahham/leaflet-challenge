let url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
let  myMap = L.map("map", {
    center: [40.03, -94.64],
    zoom: 5
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json(url).then(function (response) {
    z = []
    for (let i = 0; i < response.features.length; i++) {
        // Conditionals for country points
        let color = "";
        let zCord = response.features[i].geometry.coordinates[2]
        if (zCord > -10 && zCord < 10) {
            color = "#4efc03";
        }
        else if (zCord >= 10 && zCord < 30) {
            color = "#bafc03";
        }
        else if (zCord >= 30 && zCord < 50) {
            color = "#fcec03";
        }
        else if (zCord >= 50 && zCord < 70) {
            color = "#fc9003";
        }
        else if (zCord >= 70 && zCord < 90) {
            color = "#fc4903";
        }
        else {
            color = "#fc0303";
        }
        cord = [
            response.features[i].geometry.coordinates[1],
            response.features[i].geometry.coordinates[0],
            response.features[i].geometry.coordinates[2]
        ];
        z.push(cord[2]);
        
        L.circle(cord, {
            fillOpacity: 0.75,
            color: color,
           
            radius: Math.sqrt(Math.abs(zCord)) * 10000
        }).bindPopup(`<h1>${response.features[i].properties.place}</h1> <hr> <h3>Magnitude * 10 = ${response.features[i].properties.mag * 10}</h3>`).addTo(myMap);
    };

    legend.addTo(map);
};
addLegend(myMap);