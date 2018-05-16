<template>
  <div>
    <header-bar></header-bar>
    <bbs-content></bbs-content>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from '../components/Header'
  import BbsContent from '../components/BbsContent.vue'
  import FooterBar from '../components/Footer'
  export default {
    components: {
      HeaderBar,
      BbsContent,
      FooterBar
    }
  }

</script>

<style>


</style>
