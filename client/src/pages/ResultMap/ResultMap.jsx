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

  // useEffect(() => {
  //   placeRef.current.events.add('dragged', (e) => {
  //     // const coords = this.geometry.getCoordinates();
  //     console.log('coords');
  //   })
  // }, [])
  async function getSitters() {
    const response = await axios.get('/sitters/all');
    console.log(response);
    setState(() => response.data)
  }

  useEffect(() => {
    getSitters()
  }, [])


  function onClickHend() {
    // console.log('====>', mapRef.current.geoObjects);
    // console.log(placeRef.current);
    console.log(address);
    setSearch(() => true)
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
        token="0e29acdc44dc991a2276e7b9055396891dfe379f"
        value={address}
        onChange={setAddress} />
      {search > 0 &&
        <YMaps query={{ apikey: '5aa9357e-d3dd-4bd8-a386-c1b9aed33f24' }}>
          <Map defaultState={{
            center: [address.data.geo_lat, address.data.geo_lon],
            zoom: address.data.street || address.data.settlement ? 13 : 10
          }} width='500px' height='500px' instanceRef={mapRef}>
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
      <button onClick={onClickHend}>check</button>
    </>
  )
}
