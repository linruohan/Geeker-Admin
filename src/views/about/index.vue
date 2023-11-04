<template>
  <div>
    <div class="card mb10">
      <h4 class="title">简介</h4>
      <span class="text">
        <el-link type="primary" href="https://docs.spicyboy.cn" target="_blank">MyTool-Admin</el-link>
        一款基于 Vue3.3、TypeScript、Vite4、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。项目提供强大的
      </span>
    </div>
  </div>
</template>

<script setup lang="ts" name="about">
const { pkg, lastBuildTime } = __APP_INFO__;
const { version } = pkg;
</script>

<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }

  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);

    .el-link {
      font-size: 15px;
    }
  }
}
</style>
