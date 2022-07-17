import { Map, YMaps, Placemark, ZoomControl } from 'react-yandex-maps';
import React, { useRef } from 'react';

export default function SitterCard() {
  const maState = {
    center: [55.751574, 37.573856],
    zoom: 10

  }
  const mapRef = useRef();
  const placeRef = useRef();

  // useEffect(() => {
  //   placeRef.current.events.add('dragged', (e) => {
  //     // const coords = this.geometry.getCoordinates();
  //     console.log('coords');
  //   })
  // }, [])

  function onClickHend() {
    console.log('====>', mapRef.current.geoObjects);
    console.log(placeRef.current);
  }

  return (
    <>
      <YMaps query={{ apikey: '5aa9357e-d3dd-4bd8-a386-c1b9aed33f24' }}>
        <Map defaultState={maState} width='500px' height='500px' instanceRef={mapRef}>
          <Placemark geometry={[55.684758, 37.738521]} options={{ draggable: true }} />
          <Placemark
            geometry={[55.661574, 37.573856]}
            options={{ draggable: true }}
            // Событие change связано с св-вом geometry инстанса метки, 
            // поэтому onChange работать не будет, придется использовать instanceRef
            instanceRef={ref => {
              if (ref) {
                // По аналогии добавляем обработчик
                ref.events.add("dragend", function () {
                  // Используя ссылку на инстанс Линии меняем ее геометрию
                  console.log(ref.coordinates);
                  // polyline.current.geometry.set(0, newCoords);
                });
              }
            }}
          />
          <Placemark geometry={[55.484561, 37.306764]} />
          <Placemark geometry={[55.681656, 37.515335]} />
          <ZoomControl />
        </Map>
      </YMaps>
      <button onClick={onClickHend}>check</button>
    </>
  )
}
