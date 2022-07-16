import { useRef } from 'react';
import { Map, YMaps, Placemark, ZoomControl } from 'react-yandex-maps';

export default function ModalMap({ map, setMap }) {
  const maState = {
    center: [55.751574, 37.573856],
    zoom: 10

  }
  const mapRef = useRef();

  function onCloseHendler() {
    setMap({ ...map, show: false })
  }

  return (
    <div className="modal fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto transition duration-1000 ease-in-out" id="exampleModalCenter" aria-labelledby="exampleModalCenterTitle" tabIndex='1' aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <button type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal" aria-label="Close" onClick={onCloseHendler}></button>
          </div>
          <div className='w-[500px] h-[500px]'>
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
                <ZoomControl />
              </Map>
            </YMaps>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
