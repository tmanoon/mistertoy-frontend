
import { SET_MSG } from '../reducers/app.reducer.js'
import { store } from '../store.js'


export function setMsg(msg) {
    store.dispatch({
        type: SET_MSG,
        msg
    })
}