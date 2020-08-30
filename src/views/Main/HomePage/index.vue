<template>
  <MainContainer :isHome="true">
    <ProductList />
  </MainContainer>
</template>

<script>
import ProductList from '@/components/ProductList'
import MainContainer from '@/components/ui/MainContainer'

// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Home',
  components: {
    ProductList,
    MainContainer
  }
}
</script>
