<template>
  <n-drawer-content title="黄历" class="huangli" closable>
    <n-layout has-sider :style="layoutStyle">
      <n-layout-sider bordered :width="150">
        <n-grid x-gap="6" :cols="2" style="height: 100%">
          <n-gi>
            <div class="nongliString">
              {{ lunarData.nongliString }}
            </div>
          </n-gi>
          <n-gi style="padding: 40px 0">
            <div v-for="item in lunarData.ganzhi" :key="item" class="onecn">
              {{ item }}
            </div>
          </n-gi>
        </n-grid>
      </n-layout-sider>
      <n-layout :style="layoutStyle">
        <n-layout-header bordered>
          <div>
            <n-tag type="success" style="background-color: green; color: black" round> 宜 </n-tag>
            <n-tag v-for="item in lunarData.yi" :key="item" type="success" round>
              {{ item }}
            </n-tag>
          </div>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px; ">
          <n-grid x-gap="6" :cols="1" class="lihead">
            <n-gi style="padding: 10px 0">
              <n-tag type="warning" style="color: black">阳历</n-tag>
              <n-tag type="error" class="listring"> {{ lunarData.yangliString }} </n-tag>
            </n-gi>
            <n-gi style="padding: 10px 0">
              <n-tag type="warning" style="color: black"> 道历</n-tag>
              <n-tag type="error" class="listring"> {{ lunarData.taoString }}</n-tag>
            </n-gi>
            <n-gi style="padding: 10px 0">
              <n-tag type="warning" style="color: black">节日</n-tag>
              <n-tag type="error" class="listring">{{ lunarData.holidayName }} </n-tag>
            </n-gi>
          </n-grid>
        </n-layout-content>
        <n-layout-footer bordered position="absolute">
          <div>
            <n-tag type="error" style="background-color: brown; color: black" round> 忌 </n-tag>
            <n-tag v-for="item in lunarData.ji" :key="item" type="error" round>
              {{ item }}
            </n-tag>
          </div>
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-drawer-content>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NDrawerContent, NGrid, NGi, NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NLayoutFooter, NTag } from "naive-ui";
import LunarService from "@/api/modules/lunarService";

const props = defineProps<{
  date: Date;
}>();
const lunarService = ref(new LunarService(props.date));
const lunarData = lunarService.value.getDateViewDate();
const layoutStyle = "height: " + (Number(import.meta.env.VITE_APP_HEIGHT) - 100) + "px;";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/fanlymenu.scss";
.listring {
  background-color: blueviolet;
  color: white;
  text-align: center;
  align-self: center;
  justify-content: center;
}
.lihead {
  height: 100%;
  font-weight: bold;
  align-items: left;
  font-size: 17px;
}
.huangli {
  font-family: LXGW WenKai;
}
.nongliString {
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  margin: 0 auto;
  height: 100%;
  width: 2.5rem;
  font-size: 2.5em;
  color: #000;
}

.onecn {
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  margin: 0 auto;
  width: 1.4rem;
  height: 33%;
  font-size: 1.4rem;
  color: #000;
}

.n-layout-sider {
  width: 150px;
}
.n-layout-header {
  padding: 24px;
}
.n-layout-footer {
  padding: 24px;
}
</style>
