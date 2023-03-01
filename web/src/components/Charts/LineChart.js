import { Line } from 'react-chartjs-2'

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        id="canvas"
        options={{
          fill: true,
          tension: 0.25,
          plugins: {
            title: {
              display: true,
              text: '2022 Training',
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  )
}

export default LineChart
