<template>
  <MainContainer :isHome="true">
    <ProductHome />
  </MainContainer>
</template>

<script>
import ProductHome from '@/components/organisms/ProductHome'
import MainContainer from '@/components/organisms/MainContainer'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Home',
  components: {
    ProductHome,
    MainContainer
  }
}
</script>
