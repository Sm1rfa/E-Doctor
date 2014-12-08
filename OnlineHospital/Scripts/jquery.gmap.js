/**
 * jQuery gMap v3
 *
 * @url         http://www.smashinglabs.pl/gmap
 * @author      Sebastian Poreba <sebastian.poreba@gmail.com>
 * @version     3.3.2
 * @date        16.03.2011
 */
(function(i) {
    var n = function() {
        this.markers = [];
        this.mainMarker = !1;
        this.icon = "http://www.google.com/mapfiles/marker.png";
    };
    n.prototype.dist = function(a) { return Math.sqrt(Math.pow(this.markers[0].latitude - a.latitude, 2) + Math.pow(this.markers[0].longitude - a.longitude, 2)); };
    n.prototype.setIcon = function(a) { this.icon = a; };
    n.prototype.addMarker = function(a) { this.markers[this.markers.length] = a; };
    n.prototype.getMarker = function() {
        if (this.mainmarker)return this.mainmarker;
        var a, b;
        1 < this.markers.length ? (a = new e.MarkerImage("http://thydzik.com/thydzikGoogleMap/markerlink.php?text=" + this.markers.length + "&color=EF9D3F"), b = "cluster of " + this.markers.length + " markers") : (a = new e.MarkerImage(this.icon), b = this.markers[0].title);
        return this.mainmarker = new e.Marker({ position: new e.LatLng(this.markers[0].latitude, this.markers[0].longitude), icon: a, title: b, map: null });
    };
    var e = google.maps,
        o = new e.Geocoder,
        k = 0,
        p = 0,
        f = {},
        f = {
            init: function(a) {
                var b, c = i.extend({}, i.fn.gMap.defaults, a);
                for (b in i.fn.gMap.defaults.icon)c.icon[b] || (c.icon[b] = i.fn.gMap.defaults.icon[b]);
                return this.each(function() {
                    var a = i(this), b = f._getMapCenter.apply(a, [c]);
                    "fit" == c.zoom && (c.zoomFit = !0, c.zoom = f._autoZoom.apply(a, [c]));
                    var g = { zoom: c.zoom, center: b, mapTypeControl: c.mapTypeControl, mapTypeControlOptions: {}, zoomControl: c.zoomControl, zoomControlOptions: {}, panControl: c.panControl, panControlOptions: {}, scaleControl: c.scaleControl, scaleControlOptions: {}, streetViewControl: c.streetViewControl, streetViewControlOptions: {}, mapTypeId: c.maptype, scrollwheel: c.scrollwheel, maxZoom: c.maxZoom, minZoom: c.minZoom };
                    c.controlsPositions.mapType && (g.mapTypeControlOptions.position = c.controlsPositions.mapType);
                    c.controlsPositions.zoom && (g.zoomControlOptions.position = c.controlsPositions.zoom);
                    c.controlsPositions.pan && (g.panControlOptions.position = c.controlsPositions.pan);
                    c.controlsPositions.scale && (g.scaleControlOptions.position = c.controlsPositions.scale);
                    c.controlsPositions.streetView && (g.streetViewControlOptions.position = c.controlsPositions.streetView);
                    g.mapTypeControlOptions.style = c.controlsStyle.mapType;
                    g.zoomControlOptions.style = c.controlsStyle.zoom;
                    g = new e.Map(this, g);
                    c.log && console.log("map center is:");
                    c.log && console.log(b);
                    a.data("$gmap", g);
                    a.data("gmap", { opts: c, gmap: g, markers: [], markerKeys: {}, infoWindow: null, clusters: [] });
                    if (0 !== c.controls.length)for (b = 0; b < c.controls.length; b += 1)g.controls[c.controls[b].pos].push(c.controls[b].div);
                    c.clustering.enabled ? (b = a.data("gmap"), b.markers = c.markers, f._renderCluster.apply(a, []), e.event.addListener(g, "bounds_changed", function() { f._renderCluster.apply(a, []); })) : 0 !== c.markers.length && f.addMarkers.apply(a, [c.markers]);
                    f._onComplete.apply(a, []);
                });
            },
            _delayedMode: !1,
            _onComplete: function() {
                var a = this.data("gmap"), b = this;
                if (0 !== k)window.setTimeout(function() { f._onComplete.apply(b, []); }, 100);
                else {
                    if (f._delayedMode) {
                        var c = f._getMapCenter.apply(this, [a.opts, !0]);
                        f._setMapCenter.apply(this, [c]);
                        a.opts.zoomFit && (c = f._autoZoom.apply(this, [a.opts, !0]), a.gmap.setZoom(c));
                    }
                    a.opts.onComplete();
                }
            },
            _setMapCenter: function(a) {
                var b = this.data("gmap");
                b.opts.log && console.log("delayed setMapCenter called");
                if (void 0 !== b.gmap && 0 == k)b.gmap.setCenter(a);
                else {
                    var c = this;
                    window.setTimeout(function() { f._setMapCenter.apply(c, [a]); }, 100);
                }
            },
            _boundaries: null,
            _getBoundaries: function(a) {
                var a = a.markers, b, c = 1E3, h = -1E3, d = 1E3, g = -1E3;
                if (a) {
                    for (b = 0; b < a.length; b += 1)a[b].latitude && a[b].longitude && (c > a[b].latitude && (c = a[b].latitude), h < a[b].longitude && (h = a[b].longitude), d > a[b].longitude && (d = a[b].longitude), g < a[b].latitude && (g = a[b].latitude), console.log(a[b].latitude, a[b].longitude, c, h, d, g));
                    f._boundaries = { N: c, E: h, W: d, S: g };
                }
                -1E3 == c && (f._boundaries = { N: 0, E: 0, W: 0, S: 0 });
                return f._boundaries;
            },
            _getBoundariesFromMarkers: function() {
                var a = this.data("gmap").markers, b, c = 1E3, h = -1E3, d = 1E3, g = -1E3;
                if (a) {
                    for (b = 0; b < a.length; b += 1)c > a[b].getPosition().lat() && (c = a[b].getPosition().lat()), h < a[b].getPosition().lng() && (h = a[b].getPosition().lng()), d > a[b].getPosition().lng() && (d = a[b].getPosition().lng()), g < a[b].getPosition().lat() && (g = a[b].getPosition().lat());
                    f._boundaries = { N: c, E: h, W: d, S: g };
                }
                -1E3 == c && (f._boundaries = { N: 0, E: 0, W: 0, S: 0 });
                return f._boundaries;
            },
            _getMapCenter: function(a, b) {
                var c, h = this, d, g;
                if (a.markers.length && ("fit" == a.latitude || "fit" == a.longitude))return d = b ? f._getBoundariesFromMarkers.apply(this) : f._getBoundaries(a), c = new e.LatLng((d.N + d.S) / 2, (d.E + d.W) / 2), console.log(b, d, c), c;
                if (a.latitude && a.longitude)return c = new e.LatLng(a.latitude, a.longitude);
                c = new e.LatLng(0, 0);
                if (a.address)return o.geocode({ address: a.address }, function(b, c) { c === google.maps.GeocoderStatus.OK ? f._setMapCenter.apply(h, [b[0].geometry.location]) : a.log && console.log("Geocode was not successful for the following reason: " + c); }), c;
                if (0 < a.markers.length) {
                    g = null;
                    for (d = 0; d < a.markers.length; d += 1)
                        if (a.markers[d].setCenter) {
                            g = a.markers[d];
                            break;
                        }
                    if (null === g)
                        for (d = 0; d < a.markers.length; d += 1) {
                            if (a.markers[d].latitude && a.markers[d].longitude) {
                                g = a.markers[d];
                                break;
                            }
                            a.markers[d].address && (g = a.markers[d]);
                        }
                    if (null === g)return c;
                    if (g.latitude && g.longitude)return new e.LatLng(g.latitude, g.longitude);
                    g.address && o.geocode({ address: g.address }, function(b, c) { c === google.maps.GeocoderStatus.OK ? f._setMapCenter.apply(h, [b[0].geometry.location]) : a.log && console.log("Geocode was not successful for the following reason: " + c); });
                }
                return c;
            },
            _renderCluster: function() {
                var a = this.data("gmap"), b = a.markers, c = a.clusters, h = a.opts, d;
                for (d = 0; d < c.length; d += 1)c[d].getMarker().setMap(null);
                c.length = 0;
                if (d = a.gmap.getBounds()) {
                    var g = d.getNorthEast(), e = d.getSouthWest(), j = [], l = (g.lat() - e.lat()) * h.clustering.clusterSize / 100;
                    for (d = 0; d < b.length; d += 1)b[d].latitude < g.lat() && b[d].latitude > e.lat() && b[d].longitude < g.lng() && b[d].longitude > e.lng() && (j[j.length] = b[d]);
                    h.log && console.log("number of markers " + j.length + "/" + b.length);
                    h.log && console.log("cluster radius: " + l);
                    for (d = 0; d < j.length; d += 1) {
                        g = -1;
                        for (b = 0; b < c.length && !(e = c[b].dist(j[d]), e < l && (g = b, h.clustering.fastClustering)); b += 1);
                        -1 === g ? (b = new n, b.addMarker(j[d]), c[c.length] = b) : c[g].addMarker(j[d]);
                    }
                    h.log && console.log("Total clusters in viewport: " + c.length);
                    for (b = 0; b < c.length; b += 1)c[b].getMarker().setMap(a.gmap);
                } else {
                    var i = this;
                    window.setTimeout(function() { f._renderCluster.apply(i); }, 1E3);
                }
            },
            _processMarker: function(a, b, c, h) {
                var d = this.data("gmap"), g = d.gmap, f = d.opts, j;
                void 0 === h && (h = new e.LatLng(a.latitude, a.longitude));
                if (!b)var i = { image: f.icon.image, iconSize: new e.Size(f.icon.iconsize[0], f.icon.iconsize[1]), iconAnchor: new e.Point(f.icon.iconanchor[0], f.icon.iconanchor[1]), infoWindowAnchor: new e.Size(f.icon.infowindowanchor[0], f.icon.infowindowanchor[1]) }, b = new e.MarkerImage(i.image, i.iconSize, null, i.iconAnchor);
                c || (new e.Size(f.icon.shadowsize[0], f.icon.shadowsize[1]), i && i.iconAnchor || new e.Point(f.icon.iconanchor[0], f.icon.iconanchor[1]));
                b = { position: h, icon: b, title: a.title, map: null, draggable: !0 === a.draggable ? !0 : !1 };
                f.clustering.enabled || (b.map = g);
                j = new e.Marker(b);
                j.setShadow(c);
                d.markers.push(j);
                a.key && (d.markerKeys[a.key] = j);
                var m;
                a.html && (c = { content: "string" === typeof a.html ? f.html_prepend + a.html + f.html_append : a.html, pixelOffset: a.infoWindowAnchor }, f.log && console.log("setup popup with data"), f.log && console.log(c), m = new e.InfoWindow(c), e.event.addListener(j, "click", function() {
                    f.log && console.log("opening popup " + a.html);
                    f.singleInfoWindow && d.infoWindow && d.infoWindow.close();
                    m.open(g, j);
                    d.infoWindow = m;
                }));
                a.html && a.popup && (f.log && console.log("opening popup " + a.html), m.open(g, j), d.infoWindow = m);
                a.onDragEnd && e.event.addListener(j, "dragend", function(b) {
                    f.log && console.log("drag end");
                    a.onDragEnd(b);
                });
            },
            _geocodeMarker: function(a, b, c) {
                var h = this;
                o.geocode({ address: a.address }, function(d, g) { g === e.GeocoderStatus.OK ? (k -= 1, h.data("gmap").opts.log && console.log("Geocode was successful with point: ", d[0].geometry.location), f._processMarker.apply(h, [a, b, c, d[0].geometry.location])) : (g === e.GeocoderStatus.OVER_QUERY_LIMIT && (!h.data("gmap").opts.noAlerts && 0 === p && alert("Error: too many geocoded addresses! Switching to 1 marker/s mode."), p += 1E3, window.setTimeout(function() { f._geocodeMarker.apply(h, [a, b, c]); }, p)), h.data("gmap").opts.log && console.log("Geocode was not successful for the following reason: " + g)); });
            },
            _autoZoom: function(a, b) {
                var c = i(this).data("gmap"), e = i.extend({}, c ? c.opts : {}, a), d, g, c = 39135.758482;
                e.log && console.log("autozooming map");
                d = b ? f._getBoundariesFromMarkers.apply(this) : f._getBoundaries(e);
                e = 111E3 * (d.E - d.W) / this.width();
                g = 111E3 * (d.S - d.N) / this.height();
                for (d = 2; 20 > d && !(e > c || g > c); d += 1)c /= 2;
                return d - 2;
            },
            addMarkers: function(a) {
                var b = this.data("gmap").opts;
                if (0 !== a.length) {
                    b.log && console.log("adding " + a.length + " markers");
                    for (b = 0; b < a.length; b += 1)f.addMarker.apply(this, [a[b]]);
                }
            },
            addMarker: function(a) {
                var b = this.data("gmap").opts;
                b.log && console.log("putting marker at " + a.latitude + ", " + a.longitude + " with address " + a.address + " and html " + a.html);
                var c = b.icon.image, h = new e.Size(b.icon.iconsize[0], b.icon.iconsize[1]), d = new e.Point(b.icon.iconanchor[0], b.icon.iconanchor[1]), g = new e.Size(b.icon.infowindowanchor[0], b.icon.infowindowanchor[1]), i = b.icon.shadow, j = new e.Size(b.icon.shadowsize[0], b.icon.shadowsize[1]), l = new e.Point(b.icon.shadowanchor[0], b.icon.shadowanchor[1]);
                a.infoWindowAnchor = g;
                a.icon && (a.icon.image && (c = a.icon.image), a.icon.iconsize && (h = new e.Size(a.icon.iconsize[0], a.icon.iconsize[1])), a.icon.iconanchor && (d = new e.Point(a.icon.iconanchor[0], a.icon.iconanchor[1])), a.icon.infowindowanchor && new e.Size(a.icon.infowindowanchor[0], a.icon.infowindowanchor[1]), a.icon.shadow && (i = a.icon.shadow), a.icon.shadowsize && (j = new e.Size(a.icon.shadowsize[0], a.icon.shadowsize[1])), a.icon.shadowanchor && (l = new e.Point(a.icon.shadowanchor[0], a.icon.shadowanchor[1])));
                c = new e.MarkerImage(c, h, null, d);
                i = new e.MarkerImage(i, j, null, l);
                a.address ? ("_address" === a.html && (a.html = a.address), "_address" == a.title && (a.title = a.address), b.log && console.log("geocoding marker: " + a.address), k += 1, f._delayedMode = !0, f._geocodeMarker.apply(this, [a, c, i])) : ("_latlng" === a.html && (a.html = a.latitude + ", " + a.longitude), "_latlng" == a.title && (a.title = a.latitude + ", " + a.longitude), b = new e.LatLng(a.latitude, a.longitude), f._processMarker.apply(this, [a, c, i, b]));
            },
            removeAllMarkers: function() {
                var a = this.data("gmap").markers, b;
                for (b = 0; b < a.length; b += 1)a[b].setMap(null), delete a[b];
                a.length = 0;
            },
            getMarker: function(a) { return this.data("gmap").markerKeys[a]; },
            fixAfterResize: function(a) {
                var b = this.data("gmap");
                e.event.trigger(b.gmap, "resize");
                a && b.gmap.panTo(new google.maps.LatLng(0, 0));
                b.gmap.panTo(this.gMap("_getMapCenter", b.opts));
            },
            setZoom: function(a, b, c) {
                var e = this.data("gmap").gmap;
                "fit" === a && (a = f._autoZoom.apply(this, [b, c]));
                e.setZoom(parseInt(a));
            },
            changeSettings: function(a) {
                var b = this.data("gmap"), c = [], e;
                for (e = 0; e < b.markers.length; e += 1)c[e] = { latitude: b.markers[e].getPosition().lat(), longitude: b.markers[e].getPosition().lng() };
                a.markers = c;
                a.zoom && f.setZoom.apply(this, [a.zoom, a]);
                (a.latitude || a.longitude) && b.gmap.panTo(f._getMapCenter.apply(this, [a]));
            },
            mapclick: function(a) { google.maps.event.addListener(this.data("gmap").gmap, "click", function(b) { a(b.latLng); }); },
            geocode: function(a, b, c) { o.geocode({ address: a }, function(a, d) { d === e.GeocoderStatus.OK ? b(a[0].geometry.location) : c && c(a, d); }); },
            getRoute: function(a) {
                var b = this.data("gmap"), c = b.gmap, f = new e.DirectionsRenderer, d = new e.DirectionsService, g = { BYCAR: e.DirectionsTravelMode.DRIVING, BYBICYCLE: e.DirectionsTravelMode.BICYCLING, BYFOOT: e.DirectionsTravelMode.WALKING }, k = { MILES: e.DirectionsUnitSystem.IMPERIAL, KM: e.DirectionsUnitSystem.METRIC }, j = null, l = null, m = null;
                void 0 !== a.routeDisplay ? j = a.routeDisplay instanceof jQuery ? a.routeDisplay[0] : "string" == typeof a.routeDisplay ? i(a.routeDisplay)[0] : null : null !== b.opts.routeFinder.routeDisplay && (j = b.opts.routeFinder.routeDisplay instanceof jQuery ? b.opts.routeFinder.routeDisplay[0] : "string" == typeof b.opts.routeFinder.routeDisplay ? i(b.opts.routeFinder.routeDisplay)[0] : null);
                f.setMap(c);
                null !== j && f.setPanel(j);
                l = void 0 !== g[b.opts.routeFinder.travelMode] ? g[b.opts.routeFinder.travelMode] : g.BYCAR;
                m = void 0 !== k[b.opts.routeFinder.travelUnit] ? k[b.opts.routeFinder.travelUnit] : k.KM;
                d.route({ origin: a.from, destination: a.to, travelMode: l, unitSystem: m }, function(a, c) { c == e.DirectionsStatus.OK ? f.setDirections(a) : null !== j && i(j).html(b.opts.routeFinder.routeErrors[c]); });
                return this;
            }
        };
    i.fn.gMap = function(a) {
        if (f[a])return f[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof a || !a)return f.init.apply(this, arguments);
        i.error("Method " + a + " does not exist on jQuery.gmap");
    };
    i.fn.gMap.defaults = { log: !1, address: "", latitude: null, longitude: null, zoom: 3, maxZoom: null, minZoom: null, markers: [], controls: {}, scrollwheel: !0, maptype: google.maps.MapTypeId.ROADMAP, mapTypeControl: !0, zoomControl: !0, panControl: !1, scaleControl: !1, streetViewControl: !0, controlsPositions: { mapType: null, zoom: null, pan: null, scale: null, streetView: null }, controlsStyle: { mapType: google.maps.MapTypeControlStyle.DEFAULT, zoom: google.maps.ZoomControlStyle.DEFAULT }, singleInfoWindow: !0, html_prepend: '<div class="gmap_marker">', html_append: "</div>", icon: { image: "http://www.google.com/mapfiles/marker.png", iconsize: [20, 34], iconanchor: [9, 34], infowindowanchor: [9, 2], shadow: "http://www.google.com/mapfiles/shadow50.png", shadowsize: [37, 34], shadowanchor: [9, 34] }, onComplete: function() {}, routeFinder: { travelMode: "BYCAR", travelUnit: "KM", routeDisplay: null, routeErrors: { INVALID_REQUEST: "The provided request is invalid.", NOT_FOUND: "One or more of the given addresses could not be found.", OVER_QUERY_LIMIT: "A temporary error occured. Please try again in a few minutes.", REQUEST_DENIED: "An error occured. Please contact us.", UNKNOWN_ERROR: "An unknown error occured. Please try again.", ZERO_RESULTS: "No route could be found within the given addresses." } }, clustering: { enabled: !1, fastClustering: !1, clusterCount: 10, clusterSize: 40 } };
})(jQuery);