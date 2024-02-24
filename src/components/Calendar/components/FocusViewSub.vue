<template>
  <n-config-provider :theme="themeValue">
    <FanlyCountdownClock @finish="hideFocus" />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { ref, provide, computed } from "vue";
import type { GlobalTheme } from "naive-ui";
import { NConfigProvider, darkTheme } from "naive-ui";
import FanlyCountdownClock from "/@/components/FanlyCountdownClock.vue";
import Moment from "moment";
import router from "@/routers";
import { useCalendarStore } from "@/stores/modules/calendar";
const store = useCalendarStore();
const deadline = computed(() => Moment().add(store.focusTime, "minute").format());
const Title = ref("专注还剩时间");

provide("deadline", deadline);
provide("title", Title);
provide("height", window.screen.height);
provide("store", store);

const themeValue = computed((): GlobalTheme | null => {
  return store.themeValue == "darkTheme" ? darkTheme : null;
});

const hideFocus = () => {
  router.replace({ path: "/" });
  window.ipcRenderer.send("hide-focus-window");
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/fanlymenu.scss";
</style>
