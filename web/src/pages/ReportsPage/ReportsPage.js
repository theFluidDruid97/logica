import 'chartjs-adapter-moment'
import 'moment'

import Button from '@mui/material/Button'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import chartTrendline from 'chartjs-plugin-trendline'

import { BarChart } from 'src/components/Charts/BarChart.js'
import LineChart from 'src/components/Charts/LineChart.js'
import PieChart from 'src/components/Charts/PieChart.js'
import { pieData } from 'src/components/Charts/PieTestData.js'
import { Data } from 'src/components/Charts/TestData.js'
Chart.register(CategoryScale)
Chart.register(chartTrendline)

const ReportsPage = () => {
  Chart.defaults.font.size = 16
  Chart.defaults.font.family = 'oxygen'
  Chart.defaults.font.weight = 'bold'
  Chart.defaults.color = 'rgba(255,255,255, 1)'
  const [displayed, setDisplayed] = React.useState(1)
  const [barChartData, setBarChartData] = React.useState({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: 'Overdue ',
        data: Data.map((data) => data.overdue),
        backgroundColor: ['rgba(255, 0, 0, 0.5)'],
        borderColor: 'black',
        borderWidth: 2,
        trendlineLinear: {
          style: '#3e95cd',
          lineStyle: 'line',
          width: 1,
        },
      },
      {
        label: 'Due ',
        data: Data.map((data) => data.due),
        backgroundColor: ['rgba(255, 255, 0, 0.5)'],
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Current ',
        data: Data.map((data) => data.current),
        backgroundColor: ['rgba(0, 255, 0, 0.5)'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  })

  const [stackedBarChartData, setStackedBarChartData] = React.useState({
    labels: Data.map((data) => data.month),

    datasets: [
      {
        label: 'Overdue ',
        data: Data.map((data) => data.overdue),
        backgroundColor: ['rgba(255, 0, 0, 0.5)'],
        borderColor: 'black',
        borderWidth: 2,
        stack: 'Stack 0',
        trendlineLinear: {
          style: '#3e95cd',
          lineStyle: 'line',
          width: 1,
        },
      },
      {
        label: 'Due ',
        data: Data.map((data) => data.due),
        backgroundColor: ['rgba(255, 255, 0, 0.5)'],
        borderColor: 'black',
        borderWidth: 2,
        stack: 'Stack 0',
      },
      {
        label: 'Current ',
        data: Data.map((data) => data.current),
        backgroundColor: ['rgba(0, 255, 0, 0.5)'],
        borderColor: 'black',
        borderWidth: 2,
        stack: 'Stack 0',
      },
    ],
  })

  const [lineChartData, setLineChartData] = React.useState({
    labels: Data.map((data) => data.month),

    datasets: [
      {
        label: 'Overdue ',
        data: Data.map((data) => data.overdue),
        backgroundColor: ['rgba(255, 0, 0, 0.5)'],
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 2,
        trendlineLinear: {
          style: '#3e95cd',
          lineStyle: 'line',
          width: 1,
        },
      },
      {
        label: 'Due ',
        data: Data.map((data) => data.due),
        backgroundColor: ['rgba(255, 255, 0, 0.5)'],
        borderColor: 'rgb(255, 255, 0)',
        borderWidth: 2,
      },
      {
        label: 'Current ',
        data: Data.map((data) => data.current),
        backgroundColor: ['rgba(0, 128, 0, 0.5)'],
        borderColor: 'rgb(0, 128, 0)',
        borderWidth: 2,
      },
    ],
  })

  const [pieChartData, setPieChartData] = React.useState({
    labels: ['Overdue', 'Due', 'Current '],

    datasets: [
      {
        labels: ['Overdue', 'Due', 'Current '],
        data: [
          pieData.map((data) => data.overdue),
          pieData.map((data) => data.due),
          pieData.map((data) => data.current),
        ],
        backgroundColor: [
          'rgba(255, 0, 0, 0.5)',
          'rgba(255, 255, 0, 0.5)',
          'rgba(0, 255, 0, 0.5)',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  })

  const DisplayChart = () => {
    if (displayed === 1) {
      return <LineChart chartData={lineChartData} />
    } else if (displayed == 2) {
      return <PieChart chartData={pieChartData} />
    } else if (displayed === 3) {
      return <BarChart chartData={barChartData} />
    } else if (displayed === 4) {
      return <BarChart chartData={stackedBarChartData} />
    }
  }

  return (
    <div className="reports">
      <Button onClick={() => setDisplayed(1)}>Line Graph</Button>
      <Button onClick={() => setDisplayed(2)}>Pie Chart</Button>
      <Button onClick={() => setDisplayed(3)}>Bar Graph</Button>
      <Button onClick={() => setDisplayed(4)}>Stacked Bar Graph</Button>
      <DisplayChart />
    </div>
  )
}

export default ReportsPage
