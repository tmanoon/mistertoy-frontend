import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered', 'Lego', 'Computer Game']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        id: utilService.makeId(),
        name: '',
        labels: '',
        createdAt: '',
        inStock: ''
    }
}

function getDefaultFilter() {
    return {
        name: '',
        inStock: '',
        sortBy: ''
    }
}

function getLabels() {
    return labels
}