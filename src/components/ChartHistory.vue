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
            data: [40, 39, 10, 40, 39, 80, 40, 40, 30, 20, 20, 30]
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
