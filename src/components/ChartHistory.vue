<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
              900000,
              1050000,
              2000000,
              3000000,
              4000000,
              5000000,
              6000000,
              7000000,
              5000000,
              6000000,
              5000000,
              9000000
            ]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>

<style lang="scss" scoped>
</style>
