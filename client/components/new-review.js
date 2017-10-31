// import React, { Component } from 'react'


// export default class NewReview extends Component {

//   constructor() {
//     super()
//     this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
//   }

//   handleReviewSubmit(event) {
//     event.preventDefault();
//     const title = event.target.title.value
//     const reviewText = event.target.reviewText.value
//     const stars = event.target.stars.value
//   }

//   render() {
//     return (
//       <div id="new-review">
//         <form onSubmit = {this.handleReviewSubmit}>
//           <h3>Review this product</h3>
//           <div className="form-group">
//             <label>Review Title</label>
//             <input
//               name="title"
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <fieldset className="rating">
//               <legend>Please rate:</legend>
//               <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Love it">5 stars</label>
//               <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Like it">4 stars</label>
//               <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
//               <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Don't like it">2 stars</label>
//               <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Terrible">1 star</label>
//             </fieldset>
//           </div>
//           <div className="form-group">
//             <label>How did you like this phone?</label>
//             <textarea
//               name="reviewText"
//               className="form-control"
//             />
//           </div>
//           <button>Submit Feedback</button>
//         </form>
//       </div>
//     )
//   }
// }

// const handleReviewSubmit =

// //-Create NewReview component that takes title, text, and number of stars


import React, { Component } from 'react'
import axios from 'axios'


export default function NewReview() {
  // function handleClick(e) {
  //   e.preventDefault();
  //   console.log('The link was clicked.');
  // }

  function handleReviewSubmit(event) {
    event.preventDefault();
    const title = event.target.title.value
    const reviewText = event.target.reviewText.value
    const stars = event.target.stars.value

  }

  return (
      <div id="new-review">
        <form onSubmit = {handleReviewSubmit}>
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
              <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Love it">5 stars</label>
              <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Like it">4 stars</label>
              <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
              <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Don't like it">2 stars</label>
              <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Terrible">1 star</label>
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

