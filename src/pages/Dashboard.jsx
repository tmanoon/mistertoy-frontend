import { useState, useEffect } from 'react'
import { toyService } from '../services/toy.service.js'
import { PriceChart } from '../cmps/PriceChart.jsx'
import { SET_DATA } from '../store/reducers/app.reducer.js'
import { useDispatch } from 'react-redux'
import { StockChart } from '../cmps/StockChart.jsx'
import { LineChart } from '../cmps/LineChart.jsx'

export function Dashboard() {
    const [toys, setToys] = useState([])
    const [stockChartData, setStockChartData] = useState([])
    const [selectedLabel, setSelectedLabel] = useState('')
    const [labels, setLabels] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const labels = toyService.getLabels();
        setLabels(labels)
        toyService.query()
            .then(toys => setToys(toys))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (!selectedLabel) return
        const toysOfLabel = toys.filter(toy => toy.labels.includes(selectedLabel))
        setPricesAndCount(toysOfLabel)
        findPercentageOfToysOfLabel(toysOfLabel)


    }, [selectedLabel])

    function onSelectedLabel(e) {
        e.stopPropagation()
        const { value } = e.target
        setSelectedLabel(value)
    }

    function setPricesAndCount(toysOfLabel) {
        let pricesArr = []
        let toysCountOfPrices = []
        const countOfPrices = toysOfLabel.reduce((acc, toy) => {
            if (!acc[toy.price]) acc[toy.price] = 1
            else acc[toy.price] += 1
            return acc
        }, {})

        for (const price in countOfPrices) {
            pricesArr = [...pricesArr, price]
            toysCountOfPrices = [...toysCountOfPrices, countOfPrices[price]]
        }
        dispatch({ type: SET_DATA, newData: { prices: pricesArr, toysCountOfPrices } })
    }

    function findPercentageOfToysOfLabel(toysOfLabel) {
        const inStockToysNum = toysOfLabel.filter(toy => toy.inStock).length;
        const notInStockToysNum = toysOfLabel.length - inStockToysNum;
        const totalToys = toysOfLabel.length;
        setStockChartData([(inStockToysNum * 100) / totalToys, (notInStockToysNum * 100) / totalToys]);
    }

    return (
        <>
            <label htmlFor="label">Choose a label: </label>
            <select value={selectedLabel} onChange={onSelectedLabel}>
                <option value=''>Choose a label</option>
                {labels.map(label => <option key={label} value={label}>{label}</option>)}
            </select>
            <PriceChart />
            <StockChart percentageOfStock={stockChartData}/>
            <LineChart />
        </>
    )
}
