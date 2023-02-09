import { Line } from 'react-chartjs-2'

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
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
