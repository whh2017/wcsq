<template>
  <div>
    <header-bar></header-bar>
    <index-content></index-content>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from '../components/Header'
  import IndexContent from '../components/IndexContent'
  import FooterBar from '../components/Footer'
  export default {
    components: {
      HeaderBar,
      IndexContent,
      FooterBar
    }
  }

</script>

<style>


</style>
