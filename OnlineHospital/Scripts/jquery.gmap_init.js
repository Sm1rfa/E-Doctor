

$(function() {
    $("#map").gMap({
        markers: [
            {
                latitude: 55.703976,
                longitude: 12.537666,
                html: 'KEA <br />Lygten 37<br /> 2400 København NV',
                icon: {
                    image: '/Content/Images/loc1.png',
                    iconsize: [26, 46],
                    iconanchor: [12, 46],
                    infowindowanchor: [12, 0]
                }
            }
        ],
        zoom: 15
    });


});