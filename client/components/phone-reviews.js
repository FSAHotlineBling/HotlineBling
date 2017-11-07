import React from 'react'
import { connect } from 'react-redux'

export function PhoneReviews(props) {

  const productId = props.productId
  const reviews = props.reviews.filter(review => review.productId === productId)

  if (reviews.length) {
    var averageRating = 0;
    reviews.forEach(function (review) {
      averageRating += (Number(review.stars) || 0)
    })
    averageRating /= reviews.length

  }

  const ratingPercentage = {
    width: `${(averageRating) / 5 * 100}%`
  }

  console.log('RATING PERCENTAGE IS', ratingPercentage)

  return (
    <div className="phone-reviews">
      <h4>Customer Reviews</h4>
      <div className="star-ratings-sprite"><span style={ratingPercentage} className="star-ratings-sprite-rating" /></div>
      <p>Average Rating: {averageRating} out of {reviews.length} Review(s)  </p>
      {
        reviews.length && reviews.map(review => {
              return (
                <div key={review.id} className="card">
                <h3 className="card-header">{review.title}</h3>
                <div className="card-block">
                  <h4 className="card-title">Rating: {review.stars} star(s)</h4>
                  <p className="card-text">{review.reviewText}</p>
                  <p className="card-text"><small className="text-muted">{review.user.name} {review.dateCreated}</small></p>
                  </div>
                </div>
            )}
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
