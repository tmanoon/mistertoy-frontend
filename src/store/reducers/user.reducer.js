import { userService } from "./../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'


const initialState = {
    count: 105,
    user: userService.getLoggedInUser(),
    users: [],
    watchedUser : null
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Count
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case DECREMENT:
            return { ...state, count: state.count - 1 }
        case CHANGE_BY:
            return { ...state, count: state.count + action.diff }


        //* User
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        // case SET_USER_SCORE:
        //     const user = { ...state.user, score: action.score }
        //     return { ...state, user }
            case SET_WATCHED_USER:
                return { ...state, watchedUser: action.user }
                break
            case REMOVE_USER:
                return {
                    ...state,
                    users: state.users.filter(user => user._id !== action.userId)
                    
                }
                break
            case SET_USERS:
                return { ...state, users: action.users }
            case SET_SCORE:
                return { ...state, user: { ...state.user, score: action.score } }
        default:
            return state;
    }
}