<template>
  <div id="landingPage">
    <Header />
    <!-- efek -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 p-0">
          <div class="round-hide"></div>
        </div>
      </div>
    </div>
    <About />
    <Features />
    <Pricing />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'
import About from './components/About'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
export default {
  components: {
    Header,
    Footer,
    About,
    Features,
    Pricing,
    Contact
  }
}
</script>

<style scoped>
@import '../../assets/css/landing.css';
</style>
