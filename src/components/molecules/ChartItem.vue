<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: ['chartData', 'labels'],
  data() {
    return {
      optionsx: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartdata: {
        labels: this.labels,
        datasets: [
          {
            label: `Revenue ${new Date().getFullYear()}`,
            backgroundColor: '#f87979',
            data: this.chartData
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.optionsx)
  }
}
</script>

<style lang="scss" scoped>
</style>
