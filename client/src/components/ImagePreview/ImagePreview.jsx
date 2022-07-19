import React from 'react';
import classes from './ImagePreview.module.css';

export default function ImagePreview({ image, removedFilesId, setImages, setFiles }) {
  function onRemoveHandler() {
    // * Если файлы уже есть на беке то просто собираем массив удаленных, иначе удаляем из массива выбранных
    if (image.id) {
      removedFilesId.current.push(image.id);
    } else {
      // * Удаляем файлы из массива для загрузки если пользователь нажал на крестик
      setFiles((prev) => prev.filter((el) => `${el.name}-${el.lastModified}-${el.size}` !== image.originalParams))
    }
    // * Удаляем картинки из блока отображения
    setImages((prev) => prev.filter((el) => el.url !== image.url))
  }
  return (
    <>
      <div className="flex flex-wrap w-1/6">
        <button type="button"
          className={classes.closeBtn} aria-label="Close" onClick={onRemoveHandler}></button>
        <div className="w-full p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src={image.url} />
        </div>
      </div>
    </>

  )
}
