<template>
  <n-badge :value="temp" class="weather">
    <n-image width="40" :src="weatherIcon" />
  </n-badge>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { NBadge, NImage } from "naive-ui";
import WeatherService from "@/api/modules/WeatherService";
const weather = inject("weather", {
  weatherNow: {
    icon: "100",
    temp: "30"
  }
});
const weatherIcon = computed((): string => {
  if (weather.weatherNow) {
    return WeatherService.getIcon(weather.weatherNow.icon);
  }
  return "";
});
const temp = computed((): string => {
  if (weather.weatherNow) {
    return weather.weatherNow.temp + "°C";
  }
  return "";
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/fanlymenu.scss";

.weather {
  position: absolute;
  top: 10px;
  left: 550px;
  z-index: 1000;
}

.weatherTemp {
  font-size: 0.8rem;
  background-color: #ffffff;
  color: var(--primary-color);
}
</style>
