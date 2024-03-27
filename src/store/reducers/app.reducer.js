export const SET_PREFS = 'SET_PREFS'
export const SET_MSG = 'SET_MSG'
export const SET_DATA = 'SET_DATA'

const initialState = {
    prefs: {backgroundColor: '#ffffff', color: '#000000'},
    msg: null,
    priceData: {
        labels: [],
        datasets: [
          {
          label: 'Quantity of toys: ',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PREFS:
            return { ...state, prefs: action.val }
        case SET_MSG: 
        return { ...state, msg: action.msg }
        case SET_DATA: 
        return {
            ...state,
            priceData: {...state.priceData, labels: action.newData.prices,
                datasets: [{
                    ...state.priceData.datasets[0], // Keep other properties intact
                    data: action.newData.toysCountOfPrices
                }]
            }
        }
        default:
            return state
    }
}