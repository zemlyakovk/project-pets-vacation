import React from 'react';
import ImagePreview from '../ImagePreview/ImagePreview';
import classes from './ImagesUplod.module.css';

export default function ImagesUpload({ images, setImages, removedFilesId, setFiles }) {
  function inputFilesHandler(event) {
    const newFiles = Object.values(event.target.files);
    const newImages = Object.values(event.target.files).map(file => ({
      id: null,
      url: URL.createObjectURL(file),
      originalParams: `${file.name}-${file.lastModified}-${file.size}`
    }));
    console.log(newFiles);
    setImages((prev) => [...prev, ...newImages]);
    setFiles((prev) => [...prev, ...newFiles]);
  }
  return (
    <>
      <div className='col-span-4 flex justify-start flex-wrap'>
        {
          images.map((image, i) => <ImagePreview key={`${i}-image`}
            image={image}
            removedFilesId={removedFilesId}
            setImages={setImages}
            setFiles={setFiles}
          />)
        }
      </div>
      <div className="flex justify-center col-span-4">
        <div className="mb-3 w-96">
          <input className={classes.fileInput} type="file" id="formFileMultiple" multiple onChange={inputFilesHandler} />
        </div>
      </div>
    </>
  )
}
