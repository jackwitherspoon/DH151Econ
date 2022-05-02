// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;

let highpoverty_markers = L.featureGroup();
let lowpoverty_markers = L.featureGroup();


// path to csv data
let path = "https://raw.githubusercontent.com/jackwitherspoon/DH151Econ/main/midterm/econdataset.csv";

// global variables
let markers = L.featureGroup();



// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
	readCSV(path);
});





// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}






// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}







function mapCSV(data){

	//Red: High Levels of Poverty
    let circleOptionsHigh = {
        radius: 5,
        weight: 1,
        color: 'white',
        fillColor: '#FF6962',
        fillOpacity: 1,
        
    }

	//Green: Lower Levels of Poverty
    let circleOptionsLow = {
        radius: 5,
        weight: 1,
        color: 'white',
        fillColor: '#5EA777',
        fillOpacity: 1,
        
    }

   

data.data.forEach(function(item,index){
    if(item.Poverty == 3.00){
        
        
        let highpoverty_marker = L.circleMarker([item.Latitude,item.Longitude], circleOptionsLow).bindPopup(`${item.Country}`).on('mouseover',function(){

    })

    highpoverty_markers.addLayer(highpoverty_marker)

    
    
}

else{
    
    
    let lowpoverty_marker = L.circleMarker([item.Latitude,item.Longitude], circleOptionsHigh).bindPopup(`${item.Country}`).on('mouseover',function(){
        this.openPopup()
})

lowpoverty_markers.addLayer(lowpoverty_marker)

}

highpoverty_markers.addTo(map);
lowpoverty_markers.addTo(map);


})

let addLayers = {
    "High Poverty": highpoverty_markers,
    "Lower Poverty": lowpoverty_markers,
}

L.control.layers(null,addLayers).addTo(map);

map.fitBounds(lowpoverty_markers.getBounds());

}


