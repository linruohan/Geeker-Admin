import { defineStore } from "pinia";
import { CalendarState } from "@/stores/interface";
import { FLocation } from "@/api/interface";

export const useCalendarStore = defineStore({
  id: "mytool-auth",
  state: (): CalendarState => ({
    themeValue: "lightTheme",
    showFestivals: false,
    showWeather: false,
    location: {
      longitude: 114.52,
      latitude: 38.02
    } as FLocation,
    focusTime: 40
  }),
  actions: {
    changeThemeValue(themeValue: string) {
      this.themeValue = themeValue;
    },
    changeShowFestivals() {
      this.showFestivals = !this.showFestivals;
    },
    changeShowWeather() {
      this.showWeather = !this.showWeather;
    },
    changeLocation(location: FLocation) {
      this.location = {
        longitude: location.longitude,
        latitude: location.latitude
      } as FLocation;
    },
    changeFocusTime(focusTime: number) {
      this.focusTime = focusTime;
    }
  }
});
