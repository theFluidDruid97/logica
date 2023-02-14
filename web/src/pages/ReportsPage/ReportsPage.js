import 'chartjs-adapter-moment'
import { Chart as ChartJS } from 'chart.js'
import 'moment'
import { ThemeModeContext } from 'web/src/App.js'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import ReportsDrawer from 'src/components/ReportsDrawer/ReportsDrawer'
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
  const [open, setOpen] = React.useState(false)
  const [start, setStart] = React.useState(new Date())
  const [end, setEnd] = React.useState(new Date())
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const toggleDrawer = () => {
    setOpen(!open)
  }
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
        backgroundColor: ['rgba(255, 0, 0, .5)'],
        borderColor: 'black',
        borderWidth: 2,
        trendlineLinear: {
          colorMin: 'red',
          colorMax: 'red',
          lineStyle: 'solid',
          width: 4,
        },
      },
      {
        label: 'Due ',
        data: Data.map((data) => data.due),
        backgroundColor: ['rgba(255, 255, 0, .5)'],
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Current ',
        data: Data.map((data) => data.current),
        backgroundColor: ['rgba(0, 255, 0, .5)'],
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
          colorMin: 'red',
          colorMax: 'red',
          lineStyle: 'solid',
          width: 4,
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
          colorMin: 'red',
          colorMax: 'red',
          lineStyle: 'solid',
          width: 4,
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

  let cardBackground
  if (mode === 'light') {
    ChartJS.defaults.color = 'black'
    ChartJS.defaults.borderColor = 'peru'
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    ChartJS.defaults.color = 'white'
    ChartJS.defaults.borderColor = '#80cbc4'
    cardBackground = 'rgba(0, 0, 0, 0.75)'
  }

let bVarient1 = []
let bVarient2 = []
let bVarient3 = []
let bVarient4 = []


  let buttonVariant
  if ((mode === 'dark') && (displayed === 1) ) {
    bVarient1 =  'outlined', bVarient2 = 'contained', bVarient3 = 'contained', bVarient4 = 'contained'
  } else if ((mode === 'dark') && (displayed === 2) ) {
    bVarient2 =  'outlined', bVarient1 = 'contained', bVarient3 = 'contained', bVarient4 = 'contained'
  } else if ((mode === 'dark') && (displayed === 3) ) {
    bVarient3 =  'outlined', bVarient1 = 'contained', bVarient2 = 'contained', bVarient4 = 'contained'
  } else if ((mode === 'dark') && (displayed === 4) ) {
    bVarient4 =  'outlined', bVarient1 = 'contained', bVarient2 = 'contained', bVarient3 = 'contained'
  } else if (mode === 'dark') {
    bVarient1 = 'contained', bVarient2 = 'contained', bVarient3 = 'contained', bVarient4 = 'contained'
  } else if ((mode === 'light') && (displayed === 1) ) {
    bVarient1 =  'contained', bVarient2 = 'outlined', bVarient3 = 'outlined', bVarient4 = 'outlined'
  } else if ((mode === 'light') && (displayed === 2) ) {
    bVarient2 =  'contained', bVarient1 = 'outlined', bVarient3 = 'outlined', bVarient4 = 'outlined'
  } else if ((mode === 'light') && (displayed === 3) ) {
    bVarient3 =  'contained', bVarient1 = 'outlined', bVarient2 = 'outlined', bVarient4 = 'outlined'
  } else if ((mode === 'light') && (displayed === 4) ) {
    bVarient4 =  'contained', bVarient1 = 'outlined', bVarient2 = 'outlined', bVarient3 = 'outlined'
  } else if (mode === 'light')
    bVarient1 = 'outlined', bVarient2 = 'contained', bVarient3 = 'contained', bVarient4 = 'contained'

  return (
    <Box className="reports-wrap">
      <div className="reports">
        <Box className="reportControls">
          <Box>
            <Button
              sx={{ marginX: 1 }}
              variant={bVarient1}
              color="primary"
              onClick={() => setDisplayed(1)}
            >
              Line Graph
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={bVarient2}
              color="primary"
              onClick={() => setDisplayed(2)}
            >
              Pie Chart
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={bVarient3}
              color="primary"
              onClick={() => setDisplayed(3)}
            >
              Bar Graph
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={bVarient4}
              color="primary"
              onClick={() => setDisplayed(4)}
            >
              Stacked Bar Graph
            </Button>
          </Box>
          <Box>
            <Button
              sx={{ marginX: 1 }}
              variant={mode === 'light' ? 'contained' : 'outlined'}
              text-align="left"
              onClick={() => toggleDrawer()}
            >
              Filter
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={mode === 'light' ? 'contained' : 'outlined'}
              // onClick={() => setDisplayed(4)}
            >
              Export
            </Button>
          </Box>
        </Box>
        <Card
          sx={{
            marginBottom: '1%',
            marginTop: '1%',
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: `${cardBackground}`,
          }}
        >
          <DisplayChart />
        </Card>
        <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <Box sx={{ width: 400, marginTop: 10 }} role="presentation">
          <FormControl
            variant="standard"
            sx={{ marginTop: '20%', marginLeft: '20%' }}
          >
            <Box marginY="10%">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start"
                  value={start}
                  // onChange={handleStartChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box marginY="10%">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End"
                  value={end}
                  // onChange={handleEndChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Button onClick={() => handleSubmit(training.id)}>Submit</Button>
          </FormControl>
        </Box>
      </Drawer>
      </div>
    </Box>
  )
}

export default ReportsPage
