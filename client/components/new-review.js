import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postReview } from '../store'


export function NewReview(props) {
  const userId = props.user.id

  return (
      <div id="new-review-form">
        <form onSubmit={(event) => props.postReview(event, userId)}>
          <h3>Review this product</h3>
          <div className="form-group">
            <label>Review Title</label>
            <input
              name="title"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <fieldset className="rating">
              <legend>Please rate:</legend>
              <input type="radio" id="star5" name="stars" value="5" /><label htmlFor="star5" title="Love it">5 stars</label>
              <input type="radio" id="star4" name="stars" value="4" /><label htmlFor="star4" title="Like it">4 stars</label>
              <input type="radio" id="star3" name="stars" value="3" /><label htmlFor="star3" title="Meh">3 stars</label>
              <input type="radio" id="star2" name="stars" value="2" /><label htmlFor="star2" title="Don't like it">2 stars</label>
              <input type="radio" id="star1" name="stars" value="1" /><label htmlFor="star1" title="Terrible">1 star</label>
            </fieldset>
          </div>
          <div className="form-group">
            <label>How did you like this phone?</label>
            <textarea
              name="reviewText"
              className="form-control"
            />
          </div>
          <button>Submit Feedback</button>
        </form>
      </div>
    )
  }

const mapStateToProps = ({reviews, user}) => ({ reviews, user })

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    postReview(event, userId) {

      event.preventDefault();
      const title = event.target.title.value
      const reviewText = event.target.reviewText.value
      const stars = event.target.stars.value
      const productId = ownProps.match.params.productId

      dispatch(postReview({ title, reviewText, stars, productId, userId }))
        .then(() => {
          alert('Thank you for your feedback!')
          ownProps.history.goBack()
        })
    }
  }
}

const newReviewContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewReview))
export default newReviewContainer
