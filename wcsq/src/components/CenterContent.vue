<template>
  <div class="wc-center layout">
    <div>
      <el-tabs type="border-card" :tab-position="tabPosition" class="tabs">
        <el-tab-pane label="编辑资料">
          <span slot="label" class="item">
            <i class="el-icon-edit"></i> 编辑资料</span>
          <div>
            <edit-data></edit-data>
          </div>
        </el-tab-pane>
        <el-tab-pane label="物品发布">
          <span slot="label" class="item">
            <i class="el-icon-goods"></i> 物品发布</span>
          <div>
            <img src="../assets/local/no.jpg">
          </div>
        </el-tab-pane>
        <el-tab-pane label="好友管理">
          <span slot="label" class="item">
            <i class="el-icon-view"></i> 好友管理</span>
          <div>
            <img src="../assets/local/no.jpg">
          </div>
        </el-tab-pane>
        <el-tab-pane label="积分详情">
          <span slot="label" class="item">
            <i class="el-icon-tickets"></i> 积分详情</span>
          <div>
            <img src="../assets/local/no.jpg">
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的帖子">
          <span slot="label" class="item">
            <i class="el-icon-news"></i> 我的帖子</span>
          <div>
            <img src="../assets/local/no.jpg">
          </div>
        </el-tab-pane>
        <el-tab-pane label="围诚统计">
          <span slot="label" class="item">
            <i class="el-icon-sold-out"></i> 围诚统计</span>
          <div>
            <img src="../assets/local/no.jpg">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import editData from '../components/editData'
  export default {
    components: {
      editData
    },
    data() {
      return {
        tabPosition: 'left'
      }
    }
  }

</script>

<style>
  /* background: #ff6600; */

  /* background: url(../assets/local/center-bg.jpg) no-repeat; */

  .wc-center .el-tabs--border-card>.el-tabs__content {
    padding: 0;
  }

  .wc-center .tabs {
    height: 800px;
    margin: 30px 0;
  }

  .wc-center .item {
    font-size: 16px;
  }

  .wc-center .content {
    height: 800px;
    overflow: auto;
  }

  .wc-center .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
    padding: 0 40px;
    height: 74px;
    line-height: 74px;
  }

</style>
