import { reviewService } from '../../services/review.service.js'
import { store } from '../store.js'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from '../reducers/review.reducer.js'
import { SET_SCORE, SET_WATCHED_USER } from '../reducers/user.reducer'
import { userService } from '../../services/user.service.js'

// Command Creators
export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}


export async function loadReviews() {
  try {
    const reviews = await reviewService.query()
    store.dispatch({ type: SET_REVIEWS, reviews })
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review.txt, review.toyId)
    store.dispatch(getActionAddReview(addedReview))
    const user = await userService.getById(addedReview.userId)
    const { score } = user
    store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}