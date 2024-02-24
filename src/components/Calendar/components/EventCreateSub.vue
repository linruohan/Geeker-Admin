<template>
  <n-drawer-content title="创建事件" closable>
    <n-space vertical>
      <n-input id="eventInput" v-model:value="data.eventText" placeholder="事件内容" />
      <n-date-picker v-model:value="data.dates" type="daterange" size="small" :actions="['confirm']" clearable />
    </n-space>
    <template #footer>
      <n-button type="success" @click="add"> 增加 </n-button>
    </template>
  </n-drawer-content>
</template>

<script lang="ts" setup>
import { NSpace, NInput, NDatePicker, NButton, NDrawerContent } from "naive-ui";
import type { EventInput, EventApi } from "@fullcalendar/core";
import { reactive } from "vue";
import { onMounted } from "vue";
const props = defineProps<{
  event: EventApi;
}>();
const emit = defineEmits(["addEventClick"]);
const data = reactive({
  locationStr: "",
  eventText: "",
  dates: [Number(Date.now()), Number(Date.now())] as [number, number]
});
onMounted(() => {
  if (props.event != null) {
    data.eventText = props.event.title;
    data.dates = [Number(props.event.start), Number(props.event.end || props.event.start)];
  } else {
    data.eventText = "";
    data.dates = [Number(Date.now()), Number(Date.now())];
  }
});
const add = (): void => {
  const start: Date = new Date(data.dates[0]);
  const end: Date = data.dates[1] == null ? start : new Date(data.dates[1]);
  emit("addEventClick", {
    id: props.event?.id,
    title: data.eventText,
    start: start,
    end: end
  } as EventInput);
  data.dates = [Number(Date.now()), Number(Date.now())];
  data.eventText = "";
};
</script>
