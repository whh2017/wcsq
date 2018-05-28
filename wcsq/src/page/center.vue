<template>
  <div>
    <header-bar></header-bar>
    <center-content></center-content>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from '../components/Header'
  import CenterContent from '../components/CenterContent'
  import FooterBar from '../components/Footer'
  export default {
    components: {
      HeaderBar,
      CenterContent,
      FooterBar
    }
  }

</script>

<style>


</style>
