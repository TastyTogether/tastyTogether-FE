import React, { useEffect } from 'react';

export default function SearchMap({ currentPageItems }) {
    useEffect(() => {
        if (currentPageItems.length === 0) return;

        const initMap = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const mapOptions = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3,
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOptions);
                const geocoder = new window.kakao.maps.services.Geocoder();
                const bounds = new window.kakao.maps.LatLngBounds();

                currentPageItems.forEach((store) => {
                    const position = {
                        title: store.name,
                        longitude: store.address.longitude,
                        latitude: store.address.latitude,
                        address: store.address.street,
                    };

                    geocoder.addressSearch(position.address, function (result, status) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            var marker = new window.kakao.maps.Marker({
                                map: map,
                                position: coords,
                            });
                            marker.setMap(map);
                            bounds.extend(coords);

                            var infowindow = new window.kakao.maps.InfoWindow({
                                content:
                                    '<div style="width:150px;text-align:center;padding:6px 0;">' +
                                    position.title +
                                    '</div>',
                            });
                            infowindow.open(map, marker);
                            setBounds();
                        }
                    });
                });

                function setBounds() {
                    map.setBounds(bounds);
                }
            });
        };

        initMap();
    }, [currentPageItems]);

    return (
        <section
            style={{
                width: '100%',
                height: '100%',
                padding: '0 2rem',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '1rem',
                }}
                id="map"
            />
        </section>
    );
}
