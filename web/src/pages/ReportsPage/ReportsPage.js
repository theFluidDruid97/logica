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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import MenuItem from '@mui/material/MenuItem'
import { organizations } from '../../../../scripts/airmen'
import { trainings } from '../../../../scripts/trainings.js'

import Button from '@mui/material/Button'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import chartTrendline from 'chartjs-plugin-trendline'

import { saveAs } from 'file-saver'

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
  const [organization, setOrganization] = React.useState('')
  const [training, setTraining] = React.useState('')
  const [presetDate, setPresetDate] = React.useState('')

  const exportChart = () => {
    const canvas = document.getElementById('canvas')
    canvas.toBlob(function (blob) {
      saveAs(blob, 'Chart-' + Date.now() + '.png')
    })
  }

  const handleOrganizationChange = (event) => {
    setOrganization(event.target.value)
  }

  const handleTrainingsChange = (event) => {
    setTraining(event.target.value)
  }

  const handleStartChange = (newDate) => {
    setStart(newDate)
  }
  const handleEndChange = (newDate) => {
    setEnd(newDate)
  }

  const handlePresetDateChange = (event) => {
    setPresetDate(event.target.value)
  }

  const presetDates = ['Last Month', 'Last Quarter', 'Last Year']

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

  let bVariant1 = []
  let bVariant2 = []
  let bVariant3 = []
  let bVariant4 = []

  let buttonVariant
  if (mode === 'dark' && displayed === 1) {
    ;(bVariant1 = 'contained'),
      (bVariant2 = 'outlined'),
      (bVariant3 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'dark' && displayed === 2) {
    ;(bVariant2 = 'contained'),
      (bVariant1 = 'outlined'),
      (bVariant3 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'dark' && displayed === 3) {
    ;(bVariant3 = 'contained'),
      (bVariant1 = 'outlined'),
      (bVariant2 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'dark' && displayed === 4) {
    ;(bVariant4 = 'contained'),
      (bVariant1 = 'outlined'),
      (bVariant2 = 'outlined'),
      (bVariant3 = 'outlined')
  } else if (mode === 'dark') {
    ;(bVariant1 = 'outlined'),
      (bVariant2 = 'outlined'),
      (bVariant3 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'light' && displayed === 1) {
    ;(bVariant1 = 'contained'),
      (bVariant2 = 'outlined'),
      (bVariant3 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'light' && displayed === 2) {
    ;(bVariant2 = 'contained'),
      (bVariant1 = 'outlined'),
      (bVariant3 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'light' && displayed === 3) {
    ;(bVariant3 = 'contained'),
      (bVariant1 = 'outlined'),
      (bVariant2 = 'outlined'),
      (bVariant4 = 'outlined')
  } else if (mode === 'light' && displayed === 4) {
    ;(bVariant4 = 'contained'),
      (bVariant1 = 'outlined'),
      (bVariant2 = 'outlined'),
      (bVariant3 = 'outlined')
  } else if (mode === 'light')
    (bVarient1 = 'outlined'),
      (bVariant2 = 'contained'),
      (bVariant3 = 'contained'),
      (bVariant4 = 'contained')

  return (
    <Box className="reports-wrap">
      <div className="reports">
        <Box className="reportControls">
          <Box>
            <Button
              sx={{ marginX: 1 }}
              variant={bVariant1}
              color="primary"
              onClick={() => setDisplayed(1)}
            >
              Line Graph
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={bVariant2}
              color="primary"
              onClick={() => setDisplayed(2)}
            >
              Pie Chart
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={bVariant3}
              color="primary"
              onClick={() => setDisplayed(3)}
            >
              Bar Graph
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={bVariant4}
              color="primary"
              onClick={() => setDisplayed(4)}
            >
              Stacked Bar Graph
            </Button>
          </Box>
          <Box>
            <Button
              sx={{ marginX: 1 }}
              variant={mode === 'light' ? 'contained' : 'contained'}
              text-align="left"
              onClick={() => toggleDrawer()}
            >
              Filter
            </Button>
            <Button
              sx={{ marginX: 1 }}
              variant={mode === 'light' ? 'contained' : 'contained'}
              onClick={exportChart}
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
            <FormControl variant="standard" sx={{ marginLeft: '20%' }}>
              <Box marginY="10%">
                <Box marginY="10%">
                  <p>Filters</p>
                  <TextField
                    fullWidth
                    select
                    value={organization}
                    label="Organization"
                    onChange={handleOrganizationChange}
                  >
                    {organizations.map((organization, index) => (
                      <MenuItem key={organizations[index]} value={organization}>
                        {organizations[index]}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY="10%">
                  <TextField
                    fullWidth
                    select
                    value={training}
                    onChange={handleTrainingsChange}
                    label="Training"
                  >
                    {trainings.map((training) => (
                      <MenuItem key={training.id} value={training}>
                        {training.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box>
                <p>Date Range</p>
                <Box marginY="10%"></Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="reportsStartDate"
                    label="Start"
                    value={start}
                    onChange={handleStartChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box marginY="10%">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="reportsEndDate"
                    label="End"
                    value={end}
                    onChange={handleEndChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <TextField
                  className="reportsPresetDate"
                  fullWidth
                  select
                  value={presetDate}
                  onChange={handlePresetDateChange}
                  label="PresetDate"
                >
                  {presetDates.map((presetDate) => (
                    <MenuItem key={presetDate.id} value={presetDate}>
                      {presetDate}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Button
                sx={{ marginY: 10 }}
                variant={mode === 'light' ? 'contained' : 'outlined'}
                text-align="left"
                // onClick={() => handleSubmit(training.id)}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Drawer>
      </div>
    </Box>
  )
}

export default ReportsPage
