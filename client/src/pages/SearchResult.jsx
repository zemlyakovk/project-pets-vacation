import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../store/actions/search.actions';


export default function SearchResult() {
  const { value, error, isLoading } = useSelector((state) => state.search)
  const dispatch = useDispatch();
  const { state } = useLocation()

  useEffect(() => {
    dispatch(search(state))
    console.log(isLoading);
  }, [])

  return (
    <div>SearchResult</div>
  )
}
