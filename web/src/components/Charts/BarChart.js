import { Bar } from 'react-chartjs-2'

export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        id="canvas"
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
