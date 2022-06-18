import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 35rem;
  height: 35rem;
  max-width: 100vw;
`;

interface AddMapTypes {
  lat: number;
  lng: number;
  setLat: Dispatch<SetStateAction<number>>;
  setLng: Dispatch<SetStateAction<number>>;
  isLocationAdded: boolean;
  setIsLocationAdded: Dispatch<SetStateAction<boolean>>;
}

const AddMap = ({
  lat,
  lng,
  setLat,
  setLng,
  isLocationAdded,
  setIsLocationAdded,
}: AddMapTypes) => {
  useEffect(() => {
    const map = null;

    const initMap = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(
          isLocationAdded ? lng : 36.143911,
          isLocationAdded ? lat : 128.392711,
        ),
        zoom: 16,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          isLocationAdded ? lng : 36.143911,
          isLocationAdded ? lat : 128.392711,
        ),
        map: map,
      });

      naver.maps.Event.addListener(map, 'click', (e) => {
        marker.setPosition(e.coord);
        map.setCenter(e.coord);
        setLat(e.coord.x);
        setLng(e.coord.y);
        setIsLocationAdded(true);
        alert('위치정보가 저장되었습니다');
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

export default AddMap;
