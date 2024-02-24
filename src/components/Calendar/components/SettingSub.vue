<!-- eslint-disable prettier/prettier -->
<template>
  <n-drawer-content title="设置" closable>
    <n-tabs default-value="normalSetting" size="medium" style="--tab-gap: 18px">
      <n-tab-pane name="normalSetting" tab="通用设置" display-directive="show">
        <n-space vertical>
          <n-radio-group v-model:value="themeValue" name="themeGroup" @update-value="updateTheme">
            <n-radio-button key="lightTheme" value="lightTheme"> 浅色主题 </n-radio-button>
            <n-radio-button key="darkTheme" value="darkTheme"> 深色主题 </n-radio-button>
          </n-radio-group>
          <h4>获取节假日</h4>
          <n-switch v-model:value="inputSwitchFestivalsModel" size="large" @update-value="updateFestivalsModel" />
          <h4>获取天气预报</h4>
          <n-switch v-model:value="inputSwitchWeatherModel" size="large" @update-value="updateWeatherModel" />
          <n-space v-if="inputSwitchWeatherModel" inline>
            <n-input-number
              v-model:value="longitude"
              :min="-180"
              :max="180"
              :show-button="false"
              placeholder="经度"
              @update:value="changeLocalLocation"
            />
            <n-input-number
              v-model:value="latitude"
              :min="-90"
              :max="90"
              :show-button="false"
              placeholder="纬度"
              @update:value="changeLocalLocation"
            />
          </n-space>
          <n-divider dashed />
          <n-button type="error" block @click="quit"> 退出应用 </n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="menuSetting" tab="菜单栏设置" display-directive="show">
        <n-grid :x-gap="12" :cols="1">
          <n-grid-item>
            <h4>显示节假日(农历)</h4>
            <n-switch v-model:value="data.trayFestivalsModel" size="large" @update-value="updateTraySetting" />
          </n-grid-item>
          <n-grid-item>
            <h4>显示星期</h4>
            <n-switch v-model:value="data.trayWeekModel" size="large" @update-value="updateTraySetting" />
          </n-grid-item>
          <n-grid-item>
            <h4>显示秒钟</h4>
            <n-switch v-model:value="data.traySecondsModel" size="large" @update-value="updateTraySetting" />
          </n-grid-item>
        </n-grid>
      </n-tab-pane>
      <n-tab-pane name="focusSetting" tab="专注设置" display-directive="show">
        <n-space vertical>
          <n-slider v-model:value="data.focus_time" :step="5" :min="5" :max="120" />
          <n-button type="primary" size="large" @click="focus">
            <template #icon>
              <n-icon>
                <caret-right-icon />
              </n-icon>
            </template>
            {{ focusLabel }}
          </n-button>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-drawer-content>
</template>

<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { ref, inject, reactive } from "vue";
import { useCalendarStore } from "@/stores/modules/calendar";
import {
  NDrawerContent,
  NTabs,
  NTabPane,
  NSpace,
  NRadioGroup,
  NRadioButton,
  NSwitch,
  NInputNumber,
  NButton,
  NDivider,
  NIcon,
  NSlider,
  NGrid,
  NGridItem
} from "naive-ui";
import { CaretRight as CaretRightIcon } from "@vicons/fa";
import type { FLocation } from "@/api/interface";
import { computed } from "vue";
import { onMounted } from "vue";
const props = defineProps({
  changeShowFestivals: {
    type: Boolean,
    default: false
  },
  changeShowWeather: { type: Boolean, default: true }
});

const emit = defineEmits([
  "focusClick",
  "goCreateEventView",
  "update:visibleFullSetting",
  "update:changeShowFestivals",
  "update:changeShowWeather",
  "updateLocation"
]);
const store = useCalendarStore();
const themeValue = ref(store.themeValue);
const inputSwitchFestivalsModel = ref(props.changeShowFestivals);
const inputSwitchWeatherModel = ref(props.changeShowWeather);
const flocation: ComputedRef<FLocation> | undefined = inject("flocation");
const longitude = flocation?.value.longitude;
const latitude = flocation?.value.latitude;

const data = reactive({
  trayFestivalsModel: true,
  trayWeatherModel: true,
  trayWeekModel: true,
  traySecondsModel: true,
  focus_time: 40
});
const focusLabel = computed((): string => {
  return "开始专注" + data.focus_time + "分钟";
});
onMounted(() => {
  data.focus_time = store.focusTime;
});
const updateTheme = (value: string): void => {
  store.changeThemeValue(value);
};
const updateFestivalsModel = (value: boolean): void => {
  emit("update:changeShowFestivals", value);
};
const updateWeatherModel = (value: boolean): void => {
  emit("update:changeShowWeather", value);
};
const changeLocalLocation = (): void => {
  emit("updateLocation", {
    longitude: longitude,
    latitude: latitude
  });
};
const updateTraySetting = (): void => {
  window.ipcRenderer.send("updateTraySetting", {
    trayFestivalsModel: data.trayFestivalsModel,
    trayWeatherModel: data.trayWeatherModel,
    trayWeekModel: data.trayWeekModel,
    traySecondsModel: data.traySecondsModel
  });
};

const focus = (): void => {
  store.changeFocusTime(data.focus_time);
  emit("focusClick");
  window.ipcRenderer.send("show-focus-window");
};
const quit = (): void => {
  window.ipcRenderer.send("quit");
};
</script>
