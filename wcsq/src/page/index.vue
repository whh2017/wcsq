<template>
  <div>
     <header-bar></header-bar>
     <h3>{{this.$store.state.islogin}}</h3>
  </div>
</template>

<script>
import HeaderBar from '../components/Header'
export default {
  components:{
    HeaderBar
  }
}
</script>

<style>

</style>
