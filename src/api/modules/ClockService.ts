"use strict";

import { app } from "electron";
import moment from "moment";
import LunarService from "./lunarService";
import { useIntervalFn } from "@vueuse/core";
import type { Pausable } from "@vueuse/core";

export default class ClockService {
  format = "MMMDo HH:mm";
  onTickHandler: ((arg0: ClockService) => void) | null = null;
  pausable: Pausable;
  params: ClockSettingParams;
  constructor() {
    moment().locale(app.getLocale());
    this.params = {} as ClockSettingParams;
    // lll MMMDo dddd HH:mm:ss
    this.setFormat("MMMDo HH:mm");
    this.pausable = useIntervalFn(() => {
      if (this.onTickHandler) {
        this.onTickHandler(this);
      }
    }, 1000);
    this.start();
  }

  start(): this {
    if (typeof this.onTickHandler !== "function") {
      this.onTickHandler = () => {
        console.log("123");
      };
    }

    this.pausable.resume();

    return this;
  }

  stop(): this {
    this.pausable.pause();

    return this;
  }

  onTick(callback: ((arg0: ClockService) => void) | null): this {
    this.onTickHandler = callback;

    return this;
  }

  getFormat(): string {
    return this.format;
  }

  setFormat(format: string): this {
    if (typeof format !== "string") {
      return this;
    }

    this.format = format;

    return this;
  }

  /* {
    trayFestivalsModel: true,
    trayWeatherModel: false,
    trayWeekModel: true,
    traySecondsModel: true
  }*/
  setParams(params: ClockSettingParams): this {
    this.params = params;

    // MMMDo dddd HH:mm:ss
    let default_format = "MMMDo ";

    if (this.params.trayWeekModel) {
      default_format = default_format.concat("dddd ");
    }

    default_format = default_format.concat("HH:mm");

    if (this.params.traySecondsModel) {
      default_format = default_format.concat(":ss");
    }

    return this.setFormat(default_format);
  }

  getParams(): ClockSettingParams {
    return this.params;
  }

  toString(): string {
    let showString = "";
    if (this.params.trayFestivalsModel) {
      const lunarService = new LunarService();
      const dayTextInChinese = lunarService.showNongliData(true);
      showString = showString.concat(...[dayTextInChinese, " "]);
    }

    return showString.concat(moment().format(this.getFormat()));
  }
}

export declare interface ClockSettingParams {
  trayFestivalsModel: boolean;
  trayWeatherModel: boolean;
  trayWeekModel: boolean;
  traySecondsModel: boolean;
}
