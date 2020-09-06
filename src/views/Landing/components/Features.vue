<template>
  <div>
    <WrapperFeatures id="features" :imageRight="true" :image="require(`@/assets/images/list.png`)">
      <template #title>Clean and Fresh UI</template>
      <template #description>Antarmuka yang bersih dan mudah dipahami oleh user</template>
    </WrapperFeatures>
    <WrapperFeatures
      id="responsive"
      :bgTransparent="true"
      :image="require(`@/assets/images/mobile.png`)"
    >
      <template #title>Mobile Friendly</template>
      <template #description>Antarmukan terlihat bagus ketika diakses menggunakan ponsel</template>
    </WrapperFeatures>
    <WrapperFeatures
      id="history"
      :imageRight="true"
      :image="require(`@/assets/images/history.png`)"
    >
      <template #title>History</template>
      <template #description>Lihat perkembangan usaha anda di halaman history</template>
    </WrapperFeatures>
  </div>
</template>

<script>
import WrapperFeatures from './WrapperFeatures'
export default {
  components: {
    WrapperFeatures
  }
}
</script>

<style scoped>
</style>
