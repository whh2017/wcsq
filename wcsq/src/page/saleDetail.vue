<template>
  <div>
    <header-bar></header-bar>
    <detail-content></detail-content>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from '../components/Header'
  import FooterBar from '../components/Footer'
  import DetailContent from '../components/detailContent.vue'
  export default {
    components: {
      HeaderBar,
      DetailContent,
      FooterBar
    }
  }

</script>

<style>


</style>
