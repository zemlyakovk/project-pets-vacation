import React, { useRef } from 'react';
import ImagePreview from '../ImagePreview/ImagePreview';
import classes from './ImagesUplod.module.css';

export default function ImagesUpload({ images, setImages, removedFilesNames, setFiles }) {

  const uploadRef = useRef();

  function inputFilesHandler(event) {
    const newFiles = Object.values(event.target.files);
    const newImages = Object.values(event.target.files).map(file => ({
      id: null,
      url: URL.createObjectURL(file),
      originalParams: `${file.name}-${file.lastModified}-${file.size}`,
      filename: file.name,
    }));
    setImages((prev) => [...prev, ...newImages]);
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function uploadHandler() {
    uploadRef.current.click();
  }

  return (
    <>
      <div className='col-span-4 flex justify-start flex-wrap'>
        {
          images.map((image, i) => <ImagePreview key={`${i}-image`}
            image={image}
            removedFilesNames={removedFilesNames}
            setImages={setImages}
            setFiles={setFiles}
          />)
        }
      </div>
      <div className="flex justify-center col-span-4">
        <div className="mb-3 w-96">
          <input ref={uploadRef} className='hidden' type="file" id="formFileMultiple" multiple onChange={inputFilesHandler} />
          <div className='flex justify-center mt-5'>
            <button type='button' onClick={uploadHandler} className={`${classes.button}`}>Загрузить фото</button>
          </div>
        </div>
      </div>
    </>
  )
}
