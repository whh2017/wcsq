<template>
  <div>
    <header-bar></header-bar>
    <shop-car></shop-car>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from '../components/Header'
  import FooterBar from '../components/Footer'
  import ShopCar from '../components/module/shopCar'
  export default {
    components: {
      HeaderBar,
      ShopCar,
      FooterBar
    }
  }

</script>

<style>


</style>
