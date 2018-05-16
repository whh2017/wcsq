<template>
  <div>
    <header-bar></header-bar>
    <sale-content></sale-content>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from '../components/Header'
  import SaleContent from '../components/SaleContent.vue'
  import FooterBar from '../components/Footer'
  export default {
    components: {
      HeaderBar,
      SaleContent,
      FooterBar
    }
  }

</script>

<style>


</style>
