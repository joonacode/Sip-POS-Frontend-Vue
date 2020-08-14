<template>
  <b-card no-body class="product">
    <a href="list.html" class="action-img">
      <div class="product-image">
        <img :src="detailProduct.image" alt="" srcset="">
        <div class="check-icon"></div>
      </div>
    </a>
    <div class="card-body product-detail">
      <a href="#" class="product-title">
        {{detailProduct.name}}
      </a>
      <span class="product-price  d-block">Rp. {{detailProduct.price}}</span>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['detailProduct']

}

</script>

<style scoped>
.product-image.active .check-icon {
    display: block;
}

.product-detail {
    padding: 5px 0 !important;
}

.product-title {
    color: #333;
    display: block;
    margin-bottom: 2px;
}

.product-title:hover {
    color: #000;
}

.product-price {
    color: #333;
    font-weight: bold;
}
.product {
    border: 0 !important;
    background-color: transparent !important;
}

.product .action-img:hover {
    opacity: 0.8;
}

.action-img {
  transition: .2s;
}

.product-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-image img {
  border-radius: 10px 10px 0 0;

  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.product-image.active::after {
    content: '';
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px 10px 0 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
