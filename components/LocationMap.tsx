import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 35rem;
  height: 35rem;
  max-width: 100%;
`;

interface LocationMapTypes {
  lat: number;
  lng: number;
}

const LocationMap = ({ lat, lng }: LocationMapTypes) => {
  useEffect(() => {
    const map = null;

    const initMap = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lng, lat),
        zoom: 16,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lng, lat),
        map: map,
      });
    };
    initMap();
  }, []);

  //지도 사이즈 관련 스타일
  const mapStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <>
      <MapWrapper>
        <div id="map" style={mapStyle}></div>{' '}
      </MapWrapper>
    </>
  );
};

export default LocationMap;
