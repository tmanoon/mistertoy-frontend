import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

ChartJS.register(ArcElement, Tooltip, Legend)

export function PriceChart() {
    const data = useSelector(state => state.appModule.priceData)
  return <div className='doughnut'><Doughnut data={data} /></div>
}
