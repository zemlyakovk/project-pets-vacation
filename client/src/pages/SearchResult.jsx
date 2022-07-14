import React from 'react'
import { useLocation } from 'react-router-dom';

export default function SearchResult() {
  const { state: { radioValue, textValue, dateFrom, dateTo, serviceType } } = useLocation()
  console.log(radioValue);
  return (
    <div>SearchResult</div>
  )
}
