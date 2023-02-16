import { Bar } from 'react-chartjs-2'

export const stackedBarChart = ({ chartData }) => {
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
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </div>
  )
}
