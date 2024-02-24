<template>
  <n-card :title="title" :bordered="false" :style="style">
    <template #header-extra>
      <n-button text style="font-size: 24px" @click="$emit('finish')">
        <n-icon>
          <times-circle-regular-icon />
        </n-icon>
      </n-button>
    </template>
    <n-grid x-gap="12" :cols="cols">
      <n-gi v-if="cols == 4">
        <n-card :title="formatTime(days)" size="large"> 天 </n-card>
      </n-gi>
      <n-gi v-if="cols >= 3">
        <n-card :title="formatTime(hours)" size="large"> 时 </n-card>
      </n-gi>
      <n-gi>
        <n-card :title="formatTime(minutes)" size="large"> 分 </n-card>
      </n-gi>
      <n-gi>
        <n-card :title="formatTime(seconds)" size="large"> 秒 </n-card>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { NButton, NIcon, NGrid, NGi, NCard } from "naive-ui";
import { TimesCircleRegular as TimesCircleRegularIcon } from "@vicons/fa";
import { onMounted } from "vue";
import { ref } from "vue";

const props = defineProps<{ speed: Number | undefined }>();
const emit = defineEmits(["finish"]);
const deadline = inject("deadline");
const title = inject("title", "");
const height = inject("height", 600);
const currentTime = ref(Date.parse(String(deadline)) - new Date().valueOf());
const style = computed((): string => {
  return "height:" + height + "px";
});
const seconds = computed((): number => {
  return Math.floor((currentTime.value / 1000) % 60);
});
const minutes = computed((): number => {
  return Math.floor((currentTime.value / 1000 / 60) % 60);
});
const hours = computed((): number => {
  return Math.floor((currentTime.value / (1000 * 60 * 60)) % 24);
});
const days = computed((): number => {
  return Math.floor(currentTime.value / (1000 * 60 * 60 * 24));
});
const cols = computed((): number => {
  if (days.value > 0) {
    return 4;
  }
  if (hours.value > 0) {
    return 3;
  }
  return 2;
});

onMounted(() => {
  setTimeout(countdown, 1000);
});
const formatTime = (value: number): string => {
  if (value < 10) {
    return "0" + value;
  }
  return value.toString();
};
const countdown = () => {
  currentTime.value = Date.parse(String(deadline)) - new Date().valueOf();
  if (currentTime.value > 0) {
    console.log(props.speed);
    setTimeout(countdown, 1000);
  } else {
    emit("finish");
  }
};
</script>
<style scoped lang="scss">
::v-deep(.n-card__content) {
  display: inline-grid;
  align-items: center;
}
</style>
