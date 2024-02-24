<template>
  <n-config-provider :theme="themeValue">
    <n-card style="--padding-top: 0; --padding-bottom: 0; --padding-left: 0; --padding-right: 0">
      <n-el style="color: var(--text-color-base); transition: 0.3s var(--cubic-bezier-ease-in-out)">
        <full-calendar ref="fullcalendar" :options="calendarOptions" :style="{ '--fc-today-bg-color': fc_today_bg_color }">
          <template #eventContent="arg">
            <i>{{ arg.event.title }}</i>
          </template>
        </full-calendar>
      </n-el>
    </n-card>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject, reactive } from "vue";
import type { GlobalTheme } from "naive-ui";
import { darkTheme, NCard, NElement as NEl, useThemeVars, NConfigProvider } from "naive-ui";
import FullCalendar from "@fullcalendar/vue3";
import {
  type CustomButtonInput,
  type CalendarApi,
  type CalendarOptions,
  type DateSelectArg,
  type EventClickArg,
  type EventApi,
  type EventInput,
  type EventSourceInput,
  type DateRangeInput,
  type DateInput
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import zhLocale from "@fullcalendar/core/locales/zh-cn";
import type { WeatherValueMap } from "@/api/interface";
import CalendarViewService from "@/api/modules/calendarViewService";
import { useCalendarStore } from "@/stores/modules/calendar";
import { computed } from "vue";
import { watch } from "vue";
import eventsjson from "@/assets/json/events.json";
const props = defineProps({
  events: { type: Array, default: eventsjson as EventInput[] },
  changeShowFestivals: { type: Boolean, default: true },
  changeShowWeather: { type: Boolean, default: true }
});

const emit = defineEmits(["dateClick", "eventClick", "eventAdd", "settingClick"]);
const weather = inject("weather", {} as WeatherValueMap);
const store = useCalendarStore();
const themeVars = ref(useThemeVars());
const fc_today_bg_color = ref(themeVars.value.primaryColor);
const fullcalendar = ref(null);
let fullcalendarApi = ref<CalendarApi>();
onMounted(() => {
  fullcalendarApi.value = Object.getOwnPropertyDescriptor(fullcalendar.value, "getApi")?.value();
});
const CustomViewConfig = {
  classNames: ["custom-view"],
  content: function (props) {
    // let segs = sliceEvents(props, true); // allDay=true
    const date = props.dateProfile.currentRange.start.toUTCString();
    const calendarViewService = new CalendarViewService();
    return calendarViewService.showView(date, date, props.changeShowFestivals, props.changeShowWeather, weather);
    // return { html: html };
  }
};
const currentEvents = ref([] as EventApi[]);

const themeValue = computed((): GlobalTheme | null => {
  updateColors();
  return store.themeValue == "darkTheme" ? darkTheme : null;
});
watch(
  () => props.changeShowFestivals,
  newval => {
    console.log(newval);
    updateView();
  }
);
watch(
  () => props.changeShowWeather,
  newval => {
    console.log(newval);
    updateView();
  }
);
watch(weather, () => {
  updateView();
});
watch(
  () => props.events,
  newval => {
    console.log(newval);
    if (fullcalendarApi.value == null) {
      fullcalendarApi.value = Object.getOwnPropertyDescriptor(fullcalendar, "getApi")?.value();
    }
    fullcalendarApi.value?.removeAllEventSources();
    fullcalendarApi.value?.addEventSource(props.events as EventSourceInput);
  }
);

const updateColors = () => {
  calendarOptions.eventColor = themeVars.value.primaryColor;
  fc_today_bg_color.value = convertHexToRGBA(themeVars.value.primaryColor, Number(themeVars.value.opacity5));
};
const updateView = () => {
  if (fullcalendarApi.value == null) {
    fullcalendarApi.value = Object.getOwnPropertyDescriptor(fullcalendar, "getApi")?.value();
  }
  fullcalendarApi.value?.changeView("dayGridMonth", CustomViewConfig["dayGridMonth"] as DateRangeInput | DateInput);
};

const handleEvents = (events: EventApi[]) => {
  currentEvents.value = events;
};
const dateClick = (selectInfo: DateSelectArg) => {
  emit("dateClick", selectInfo.start);
};
const eventClick = (clickInfo: EventClickArg): void => {
  emit("eventClick", clickInfo.event);
};
const eventAdd = (): void => {
  emit("eventAdd");
};
const settingClick = (): void => {
  emit("settingClick");
};
const convertHexToRGBA = (hex: string, opacity: number) => {
  const tempHex = hex.replace("#", "");
  const r = parseInt(tempHex.substring(0, 2), 16);
  const g = parseInt(tempHex.substring(2, 4), 16);
  const b = parseInt(tempHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
// let eventGuid = 0;
// const createEventId = () => {
//   return String(eventGuid++);
// };
// const handleEventClick = (clickInfo: EventClickArg) => {
//   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//     clickInfo.event.remove();
//   }
// };
// const handleDateSelect = (selectInfo: DateSelectArg) => {
//   let title = prompt("Please enter a new title for your event");
//   let calendarApi = selectInfo.view.calendar;

//   calendarApi.unselect(); // clear date selection
//   if (title) {
//     calendarApi.addEvent({
//       id: createEventId(),
//       title,
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//       allDay: selectInfo.allDay
//     });
//   }
// };

// const handleWeekendsToggle = () => {
//   calendarOptions.weekends = !calendarOptions.weekends; // update a property
// };
const calendarOptions = reactive<CalendarOptions>({
  plugins: [
    dayGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  customButtons: {
    settingButton: {
      icon: "setting",
      click: settingClick
    } as CustomButtonInput,
    addEventButton: {
      icon: "plus-square",
      click: eventAdd
    } as CustomButtonInput
  },
  headerToolbar: {
    left: "settingButton",
    center: "title",
    right: "addEventButton,prev,next"
  },
  select: dateClick,
  eventClick: eventClick,
  eventsSet: handleEvents,
  /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
  initialView: "dayGridMonth",
  initialEvents: props.events,
  dayMaxEvents: true,
  selectable: true,
  editable: false,
  weekends: true,
  footerToolbar: false,
  height: Number(import.meta.env.VITE_APP_HEIGHT) - 4,
  aspectRatio: 1,
  fixedWeekCount: false,
  handleWindowResize: false,
  views: { custom: CustomViewConfig },
  locale: zhLocale
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/fanlymenu.scss";

::v-deep(.fc-header-toolbar) {
  height: 64px;
  margin-bottom: 0 !important;
}

::v-deep(.fc .fc-button-primary) {
  color: var(--text-color-base);
  background-color: var(--base-color, #2c3e50);
  border-color: var(--border-color, #2c3e50);
}
// ::v-deep(.fc .fc-addEventButton-button),
::v-deep(.fc .fc-settingButton-button) {
  border-color: var(--base-color);
}

::v-deep(.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child)) {
  /* margin-left: -1px; */
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin: 0 3px;
}

::v-deep(.fc-daygrid-day-top) {
  display: flex;
  text-align: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

::v-deep(.fc-daygrid-day-chinese) {
  position: relative;
  z-index: 4;
  padding: 4px;
}

::v-deep(.fc-day-today .fc-daygrid-day-number) {
  width: 25px;
  height: 25px;
  color: var(--base-color);
  background: var(--primary-color);
  padding: 2px;
  margin: 2px;
  border-radius: 50%;
}

::v-deep(.fc-daygrid-dayweather) {
  text-align: center;
}

::v-deep(.fc-daygrid-dayweather-iconday) {
  padding-top: 4px;
  float: left;
  width: 20px;
}

::v-deep(.fc-daygrid-dayweather-temp) {
  padding-top: 4px;
  font-size: 0.6rem;
}

::v-deep(.fc-day-sat) {
  color: var(--cyan-300) !important;
}

::v-deep(.fc-day-sun) {
  color: var(--cyan-300) !important;
}
</style>
