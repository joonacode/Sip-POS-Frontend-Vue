<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data() {
    return {
      month: [
        {
          id: 1,
          name: 'January'
        },
        {
          id: 2,
          name: 'February'
        },
        {
          id: 3,
          name: 'March'
        },
        {
          id: 4,
          name: 'April'
        },
        {
          id: 5,
          name: 'Mei'
        },
        {
          id: 6,
          name: 'June'
        },
        {
          id: 7,
          name: 'July'
        },
        {
          id: 8,
          name: 'August'
        },
        {
          id: 9,
          name: 'September'
        },
        {
          id: 10,
          name: 'October'
        },
        {
          id: 11,
          name: 'November'
        },
        {
          id: 12,
          name: 'December'
        }
      ]
    }
  },
  mounted() {
    const dateNow = new Date()
    const labels = []
    for (let i = 0; i <= dateNow.getMonth(); i++) {
      labels.push(this.month[i].name)
    }
    this.renderChart(
      {
        labels: labels,
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
              7000000
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
