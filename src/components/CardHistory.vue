<template>
  <b-card no-body class="product bg-transparent border-0">
    <div class="card-body card-history" :class="cardData.bg">
      <div class="card-history-detail">
        <span class="title d-block">
          {{cardData.title}}
        </span>
        <span class="price d-block">{{cardData.price}}</span>
        <span class="percent d-block">{{cardData.percent}}</span>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'CardHistory',
  props: ['cardData']
}

</script>

<style scoped>
.card-history-detail {
    margin: 0 0 20px 20px;
}

.card-history.bg-1 {
    background: linear-gradient(285.38deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%);
    box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-history.bg-2 {
    background: linear-gradient(285.38deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%);
    box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-history.bg-3 {
    background: linear-gradient(285.38deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%);
    box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-history {
    font-weight: bold;
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
}

.card-history .title {
    font-size: 13px;
    margin-bottom: 6px;
}

.card-history .price {
    font-size: 30px;
    margin-bottom: 2px;
}

.card-history .percent {
    font-size: 13px;
}
</style>
