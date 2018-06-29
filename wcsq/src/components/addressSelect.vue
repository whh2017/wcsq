<template>
  <div class="address-cascader">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { regionData ,CodeToText } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: regionData,
        selectedOptions: [],
        selectedAddress: ''
      }
    },
 
    methods: {
      handleChange: function(value) {
        //  alert(CodeToText[value[0].toString()]);
        var s1 = CodeToText[value[0].toString()];
        var s2 = CodeToText[value[1].toString()];
        var s3 = CodeToText[value[2].toString()];
        this.selectedAddress = s1 + s2 + s3;
        this.$emit('get-data',this.selectedAddress);
      },
      clearValue: function() {
        this.selectedOptions = [];
      }
    }
  }
</script>

<style lang="scss">
    .address-cascader{
        width: 100%;
        .el-cascader{
            display: block;
        }
        .el-cascader__label span{
            display: none;
        }
    }
</style>
