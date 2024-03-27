
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered', 'Lego', 'Computer Game']

_createToys()


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
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let filteredToys = toys
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                filteredToys = filteredToys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.inStock) {
                if (filterBy.inStock === 'low') {
                    let lowStockToys = []
                    let stockOfToys = filteredToys.reduce((acc, currToy) => {
                        if (currToy.inStock) {
                            if (acc[currToy.name]) acc[currToy.name]++
                            else acc[currToy.name] = 1
                        }
                        return acc
                    }, {})

                    console.log(stockOfToys)

                    for (const toy in stockOfToys) {
                        if (stockOfToys[toy] <= 2 && stockOfToys[toy] > 0) {
                            lowStockToys.push(filteredToys.find(_toy => _toy.name === toy))
                        }
                    }
                    filteredToys = lowStockToys
                } else {
                    const stockStatus = filterBy.inStock === 'available' ? true : false
                    filteredToys = filteredToys.filter(toy => toy.inStock === stockStatus)
                }
            }
            if (filterBy.sortBy) {
                if (filterBy.sortBy === 'name') filteredToys = filteredToys.sort((firstToy, secondToy) => firstToy.name.localeCompare(secondToy.name))
                else filteredToys = filteredToys.sort((firstToy, secondToy) => firstToy[filterBy.sortBy] - secondToy[filterBy.sortBy])
            }
            return filteredToys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        toy._id = utilService.makeId()
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
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

function _createToys() {
    let toys = []
    toys.push(_createToy('Starry Nights - Lego', 100, [labels[2], labels[8]], new Date(2023, 5, 23).getTime(), false))
    toys.push(_createToy('Harry Potter - Lego', 100, [labels[2], labels[8]], new Date(2022, 9, 23).getTime(), true))
    toys.push(_createToy('Harry Potter - Lego', 100, [labels[2], labels[8]], new Date(2022, 9, 23).getTime(), true))
    toys.push(_createToy('Chess Board - Vanilla JS', 10, [labels[1], labels[2], labels[9]], new Date(2024, 1, 13).getTime(), false))
    toys.push(_createToy('Miss Bug - Vanilla JS', 10, [labels[2], labels[9]], new Date(2024, 2, 20).getTime(), true))
    toys.push(_createToy('Robot - RoboHash', 50, [labels[0], labels[2], labels[7]], new Date(2024, 2, 25).getTime(), true))
    toys.push(_createToy('Robot - RoboHash', 50, [labels[0], labels[2], labels[7]], new Date(2024, 2, 25).getTime(), true))
    toys.push(_createToy('Robot - RoboHash', 50, [labels[0], labels[2], labels[7]], new Date(2024, 2, 25).getTime(), true))
    toys.push(_createToy('Jade from Bratz - Bratz', 60, [labels[4], labels[6]], new Date(2023, 6, 29).getTime(), false))
    toys.push(_createToy('Sarit Hadad - Disney', 60, [labels[4], labels[7]], new Date(2004, 8, 20).getTime(), true))
    toys.push(_createToy('Checkers for Yom Kippur', 14, [labels[1], labels[2]], new Date(1980, 2, 20).getTime(), true))
    toys.push(_createToy('Checkers for Yom Kippur', 14, [labels[1], labels[2]], new Date(1980, 2, 20).getTime(), true))
    toys.push(_createToy('Checkers for Yom Kippur', 14, [labels[1], labels[2]], new Date(1980, 2, 20).getTime(), true))
    utilService.saveToStorage(STORAGE_KEY, toys)
}

function _createToy(name, price, labels, createdAt, inStock) {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.name = name
    toy.price = price
    toy.labels = labels
    toy.createdAt = createdAt
    toy.inStock = inStock
    return toy
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


function getLabels() {
    return labels
}