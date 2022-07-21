import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listFavorit } from '../store/actions/favorit.actions';
import MiniCardSitterMainPage from './MiniCardSitterMainPage'
// import SearchResult from './SearchResult/SearchResult'



export default function Favorites() {
  const dispatch = useDispatch();
  const { value, isLoading } = useSelector((state) => state.favorit)

  useEffect(() => {
    dispatch(listFavorit())
  }, [dispatch])

  return (
    <div className="flexCol m-auto">
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 col-span-1">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      ) :
        <div className='flex col-span-1 flex-wrap'>
          {value && value.map((el) =>
            <MiniCardSitterMainPage key={el.id}  {...el.Sitter} />
          )}
        </div>
      }
    </div>

    // <div className='flex flex-col'>
    //   {/* <div className=''>
    //     <SearchResult />
    //   </div> */}
    //   <div div className='flex flex-row' >
    //     <div className='grid max-w-4xl'>
    //       {/* <MiniCardSitterMainPage /> */}
    //     </div>
    //   </div >
    // </div>
  )
}
