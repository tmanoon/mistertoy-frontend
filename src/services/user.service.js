import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}


async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) {
            return _setLoggedinUser(user)
        } else {
            return Promise.reject('Invalid login')
        }
    } catch (error) {
        console.error('Error occurred during login:', error)
        throw error
    }
}


async function signup({ username, password, fullname, isAdmin = false }) {
    try {
        const user = { username, password, fullname, isAdmin }
        const _user = await httpService.post(BASE_URL + 'signup', user)
        if (_user) return _setLoggedinUser(_user)
        else return Promise.reject('Invalid signup')
    } catch (error) {
        console.log(error)
        throw error
    }
}


async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log(err)
    }
}


async function updateScore(diff) {
    try {
        if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
        const user = await httpService.put('/user', { diff })
        _setLoggedinUser(user)
        return user.score
    } catch (err) {
        console.log(err)
    }
}

function getById(userId) {
    return httpService.get('user/' + userId)
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



// [
//     {
//       _id: ObjectId('6606c6c7a197988982cb50b5'),
//       fullname: 'Manoon Manooni',
//       username: 'manoon',
//       password: 'manoon',
//       isAdmin: false
//     },
//     {
//       _id: ObjectId('6606c6c7a197988982cb50b6'),
//       fullname: 'Kashoosh Kashooshi',
//       username: 'kashoosh',
//       password: 'kashoosh',
//       isAdmin: false
//     },
//     {
//       _id: ObjectId('6606c6c7a197988982cb50b7'),
//       fullname: 'Shoval Sabag',
//       username: 'Shovals',
//       password: 'shovals',
//       isAdmin: true
//     }
//   ]
