# leaflet-challenge

This challenge aims to look at earthquake data and visualize it. The data is comprised of the last 7 days worth of earthquakes. The data was pulled in from the USGS website in GeoJSON format. The data is pulled in initially using d3.json in order to see the actual data and be able to createFeatures from it. From here, 2 functions are created to generate how the data will be shown. The first function handles the size of the earthquake marker (based on magnitude), while the second handles the color (based on depth). From here, a popup is bound to the individual earthquakes, so that clicking on any given marker on the map will display the magnitude as well as the date and time of the earthquake. Next, the openstreetmaps tile is pulled in to be a basemap for the visualization. The map is set to display the entire world map which can then be zoomed in on. A legend is created in the bottom right corner showing the color that corresponds to the depth of the earthquake. The reason for 0 to 1000 being the legend parameters came from the data source. The values that are expected by USGS range from 0 to 1000, so 5 buckets were created to visualize this.
