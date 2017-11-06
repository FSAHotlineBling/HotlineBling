import React from 'react'
import { connect } from 'react-redux'

export function PhoneReviews(props) {

  const productId = props.productId
  const reviews = props.reviews.filter(review => review.productId === productId)

  if (reviews.length) {
    var averageRating = 0;
    reviews.forEach(function (review) {
      console.log(`REVIEW STARS FOR ${productId}:`, review.stars)
      averageRating += (Number(review.stars) || 0)
    })
    averageRating /= reviews.length

    console.log('AVERAGE IS', averageRating)
  }

  return (
    <div className="phone-reviews">
      <h4>Customer Reviews</h4>
      {reviews.length &&
        (<ul className="reviews-div">
          <li>Average Rating: {averageRating}</li>
          <li> {reviews.length} Review(s) </li>
          <ul>
            {reviews.map(review => {
              return (
                <li key={review.id}>
                  <ul>
                    <li>Rating: {review.stars} star(s)</li>
                    <li>{review.title}</li>
                    <li>{review.reviewText}</li>
                    <li>{review.user.name}</li>
                    <li>{review.dateCreated}</li>
                  </ul>
                </li>
              )
            })}
          </ul>
        </ul>
        )
      }
      {!reviews.length &&
        (
          <span>No reviews for this product yet! Try it out and be the first to let us know!</span>
        )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reviews: state.review
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const phoneReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(PhoneReviews)

export default phoneReviewsContainer
