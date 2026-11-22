
const mapElement = document.getElementById("map");

if (mapElement) {
    const maptilerApiKey = mapElement.dataset.maptilerKey;
    const coordinates = JSON.parse(mapElement.dataset.coordinates);
    const listingTitle = mapElement.dataset.title;

    const map = new maplibregl.Map({
        container: "map",
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerApiKey}`,
        center: coordinates,
        zoom: 10
    });

    map.addControl(new maplibregl.NavigationControl());

    new maplibregl.Marker()
        .setLngLat(coordinates)
        .setPopup(
            new maplibregl.Popup().setText(listingTitle)
        )
        .addTo(map);
}
