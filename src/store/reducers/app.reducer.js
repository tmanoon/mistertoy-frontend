export const SET_PREFS = 'SET_PREFS'
export const SET_MSG = 'SET_MSG'

const initialState = {
    prefs: {backgroundColor: '#ffffff', color: '#000000'},
    msg: null
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PREFS:
            return { ...state, prefs: action.val }
        case SET_MSG: 
        return { ...state, msg: action.msg }
        default:
            return state
    }
}