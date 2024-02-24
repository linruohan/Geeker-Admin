<template>
  <fullcalendar-sub
    v-model:changeShowFestivals="data.changeShowFestivals"
    v-model:changeShowWeather="changeShowWeather"
    v-model:events="data.events"
    v-model:location="data.location"
    @date-click="dateClick"
    @event-click="eventClick"
    @event-add="eventAdd"
    @setting-click="goSettingView"
  />
  <weather-sub v-if="changeShowWeather" v-model:changeShowWeather="changeShowWeather" v-model:location="data.location" />
  <n-drawer v-model:show="showDrawer" :width="data.settingDrawerWidth" placement="left">
    <setting-sub
      v-if="visibleFullSetting"
      v-model:changeShowWeather="changeShowWeather"
      v-model:changeShowFestivals="data.changeShowFestivals"
      @update-location="updateLocation"
      @focus-click="focusClick"
      @go-create-event-view="goCreateEventView"
    />
    <date-view-sub v-if="data.visibleFullDateView" v-model:date="data.date" />
    <event-create-sub v-if="data.visibleECSub" v-model:event="event" @add-event-click="addEventClick" />
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, provide, computed, watch, onMounted } from "vue";
import router from "@/routers";
import { NDrawer } from "naive-ui";
import FullcalendarSub from "./components/FullcalendarSub.vue";
import WeatherSub from "./components/WeatherSub.vue";
import SettingSub from "./components/SettingSub.vue";
import DateViewSub from "./components/DateViewSub.vue";
import WeatherService from "@/api/modules/WeatherService";
import EventService from "@/api/modules/eventService";
import EventCreateSub from "./components/EventCreateSub.vue";
import type { EventInput, EventApi } from "@fullcalendar/core";
import type { FLocation, WeatherValueMap } from "@/api/interface";
import { useCalendarStore } from "@/stores/modules/calendar";
import { useIntervalFn } from "@vueuse/core";
import type { UseIntervalFnOptions } from "@vueuse/core";

const flocation = computed(() => store.location);
const store = useCalendarStore();
provide("flocation", flocation);
const weather = ref({} as WeatherValueMap);
provide("weather", weather);
const visibleFullSetting = ref(false);
const event = ref({} as EventApi);

const getWeather = async (location: FLocation) => {
  const weatherService = new WeatherService();
  weather.value = await weatherService.getWeathers(location);
  console.log("getweather:", weather.value);
};
const eventService = ref(new EventService());
const changeShowWeather = ref(true);

const intervalFnOptions = reactive({
  immediate: changeShowWeather.value
} as UseIntervalFnOptions);

const { pause, resume, isActive } = useIntervalFn(
  () => {
    console.log("isActive", isActive);
    getWeather(store.location);
  },
  7200000,
  intervalFnOptions
);

const data = reactive({
  location: {},
  changeShowFestivals: true,
  visibleFullDateView: false,
  date: new Date(),
  visibleECSub: false,
  events: [] as EventInput[],
  settingDrawerWidth: (Number(import.meta.env.VITE_APP_WIDTH) / 4.0) * 3
});
let showDrawer = computed({
  get() {
    return visibleFullSetting.value || data.visibleFullDateView || data.visibleECSub;
  },
  set(newValue) {
    visibleFullSetting.value = newValue;
    data.visibleFullDateView = newValue;
    data.visibleECSub = newValue;
  }
});
watch(
  () => data.changeShowFestivals,
  newval => {
    console.log("data:", data);
    console.log("index:changeShowFestivals:", newval);
    store.changeShowFestivals();
  }
);
watch(changeShowWeather, newval => {
  console.log("newval", newval);
  store.changeShowWeather();
  if (changeShowWeather.value) {
    getWeather(store.location);
    // 增加定时器，每隔2个小时更新一次天气预报
    resume();
  } else {
    pause();
  }
});
onMounted(() => {
  setShowData();
  getEvents();
});

const updateLocation = (newval: FLocation): void => {
  store.changeLocation(newval);
  if (changeShowWeather.value) {
    getWeather(newval);
  }
};
const setShowData = (): void => {
  data.changeShowFestivals = store.showFestivals;
  changeShowWeather.value = store.showWeather;
};
const dateClick = (date: Date): void => {
  data.date = date;
  data.visibleFullDateView = true;
};
const eventClick = (omevent: any): void => {
  event.value = omevent;
  console.log("eventClick:event", omevent);
  data.visibleECSub = true;
};
const eventAdd = (): void => {
  showDrawer.value = false;
  event.value = {} as EventApi;
  data.visibleECSub = true;
};
// const quit = (): void => {
//   window.ipcRenderer.send("quit");
// };
const goCreateEventView = (): void => {
  showDrawer.value = false;
  event.value = {} as EventApi;
  data.visibleECSub = true;
};
const goSettingView = (): void => {
  showDrawer.value = false;
  visibleFullSetting.value = true;
};
const focusClick = () => {
  showDrawer.value = false;
  router.replace({ path: "/focus" });
};
const getEvents = () => {
  data.events = eventService.value.getEvents();
};
const addEventClick = (data: EventInput) => {
  console.log("addEventClick:data", data);
  data.visibleECSub = false;
  if (data.id) {
    //   this.eventService.patchEvent(data)
    //   .then(() => {
    //     this.updateEvents();
    //   });
  } else {
    //   this.eventService.postEvent(data)
    //   .then(() => {
    //     this.updateEvents();
    //   });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/fanlymenu.scss";
</style>
