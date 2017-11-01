import axios from 'axios'

//INITIAL STATE

const allReviews = []

//ACTION TYPES

const GET_REVIEWS = 'GET_REVIEWS'
const GET_REVIEW = 'GET_REVIEW'


//ACTION CREATORS

const getReviews = (reviews) => ({ type: GET_REVIEWS, reviews })
const getReview = (review) => ({type: GET_REVIEW, review})

//THUNK CREATORS

export const fetchReviews = () => {
  return function thunk(dispatch) {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(fetchedReviews => {
        const action = getReviews(fetchedReviews)
        dispatch(action)
      })
  }
}

export const postReview = newReview => {
  return function thunk(dispatch) {
    return axios.post('/api/reviews', newReview)
      .then(res => res.data)
      .then(postedReview => {
        const action = getReview(postedReview)
        dispatch(action)
      })
  }
}

//REDUCER

export default function reducer(state = allReviews, action) {
  switch (action.type) {
    case GET_REVIEW:
      return [...state, action.review]
    case GET_REVIEWS:
      return action.reviews
    default: return state
  }
}
