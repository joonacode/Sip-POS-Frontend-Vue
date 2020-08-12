<template>
  <div class="card product">
    <div class="card-body card-history" :class="cardData.bg">
      <div class="card-history-detail">
        <span class="title d-block">
          {{cardData.title}}
        </span>
        <span class="price d-block">{{cardData.price}}</span>
        <span class="percent d-block">{{cardData.percent}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHistory',
  props: ['cardData']
}

</script>

<style lang="scss" scoped>

</style>
