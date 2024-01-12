import { useEffect } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';

export default function KaoKaoMap({ latitude, longitude }) {
    useEffect(() => {
        window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            const markerPosition = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position: markerPosition,
                map: map,
            });
            marker.setMap(map);
            map.setDraggable(false);
            map.setZoomable(false);
            latitude && map.setCenter(new kakao.maps.LatLng(latitude, longitude));
        });
    }, [latitude]);
    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
}
