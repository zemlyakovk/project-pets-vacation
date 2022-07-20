import { Map, YMaps, Placemark, ZoomControl } from 'react-yandex-maps';
import React, { useEffect, useRef, useState } from 'react';
import axios from '../../axios/axios';
import { AddressSuggestions } from 'react-dadata';

export default function ResultMap() {
  // const maState = {
  //   center: [55.751574, 37.573856],
  //   zoom: 10

  // }
  const mapRef = useRef();
  // const placeRef = useRef();
  const [state, setState] = useState([]);
  const [address, setAddress] = useState();
  const [search, setSearch] = useState(false);
  const [ymap, setYmap] = useState();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.events.add('boundschange', (e) => {
        const newBounds = e.originalEvent.newBounds;
        const distance = ymap.coordSystem.geo.getDistance(newBounds[0], newBounds[1]) / 2000;
        getSitters(e.originalEvent.newCenter, distance)
      });
    }
  }, [ymap])

  async function getSitters(geoLock, distance) {
    const response = await axios.get(`/sitters/all?latitude=${geoLock[0]}&longitude=${geoLock[1]}&distance=${distance}`);
    setState(() => response.data)
  }

  function onClickHend(geoLock) {
    const distance = address.data.street || address.data.settlement ? 5 : 20
    getSitters(geoLock, distance);
    setSearch(() => true);
  }

  return (
    <>
      <AddressSuggestions
        inputProps={{
          placeholder: "Введите город, район или точный адрес",
          id: 'street-address',
          name: 'address',
        }}
        filterFromBound='city'
        filterToBound='house'
        token="7e47857f6ca620ff5df72ae45b911b78fa0f61e4"
        value={address}
        onChange={setAddress} />
      {search > 0 &&
        <YMaps query={{ apikey: '5aa9357e-d3dd-4bd8-a386-c1b9aed33f24' }}>
          <Map
            modules={["geocode", "coordSystem.geo"]}
            onLoad={(ymaps) => {
              setYmap(ymaps);
            }}
            defaultState={{
              center: [address.data.geo_lat, address.data.geo_lon],
              zoom: address.data.street || address.data.settlement ? 13 : 10
            }} width='500px' height='500px' instanceRef={ref => {
              if (ref) {
                mapRef.current = ref
              }
            }}>
            {state.map((sitter, i) => (
              <Placemark
                key={'placemark#' + i}
                geometry={[sitter.Address.latitude, sitter.Address.longitude]}
                properties={{
                  balloonContentHeader: `${sitter.User.first_name}, ${sitter.Address.city || sitter.Address.settlement}, ${sitter.Address.street}`,
                  balloonContentBody: sitter.title,

                }}
                modules={
                  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                }
                options={{
                  draggable: true,
                  iconLayout: 'default#image',
                  iconImageHref: require('../../icons8-place-marker-100.png'),
                  iconImageSize: [42, 42],
                }} />
            ))}
            <ZoomControl />
          </Map>
        </YMaps>}
      <button onClick={() => { onClickHend([address.data.geo_lat, address.data.geo_lon]) }}>check</button>
    </>
  )
}
