import React, { useRef } from 'react';
import AvatarEditor from "react-avatar-editor";

export default function ModalAvatar({ pic, setPic }) {
  const picRef = useRef();

  function savePicHandler() {
    if (picRef.current) {
      const canvasScaled = picRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      setPic({ ...pic, img: null, croppedImg: croppedImg, cropperOpen: false, new: true })
    }
  }

  function onCloseHendler() {
    setPic({ ...pic, img: null, cropperOpen: false })
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
          <AvatarEditor
            ref={picRef}
            image={pic.img}
            width={200}
            height={200}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            rotate={0}
            borderRadius={1000}
            scale={pic.zoom}
            className='m-4'
          />
          <div
            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button type="button" onClick={savePicHandler}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
