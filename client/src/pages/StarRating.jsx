import ReactStars from "react-rating-stars-component";
import React from "react";



export default function StarRating({setRating, rating}) {



  const ratingChanged = (newRating) => {

    setRating(newRating)

  };
  return (
    <div className="flex flex-row items-center ml-2"> 
          <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    isHalf={false}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  /> <span className="ml-2">{rating}
    </span>

    </div>

  )
}





 


 
