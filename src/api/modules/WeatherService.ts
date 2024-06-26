"use strict";
import axios from "axios";
import wrapper from "axios-cache-plugin";
import type { FLocation, WeatherValueMap } from "../interface";
import weathericons100 from "@/assets/weathericons/100.png";
import weathericons101 from "@/assets/weathericons/101.png";
import weathericons102 from "@/assets/weathericons/102.png";
import weathericons103 from "@/assets/weathericons/103.png";
import weathericons104 from "@/assets/weathericons/104.png";
import weathericons150 from "@/assets/weathericons/150.png";
import weathericons153 from "@/assets/weathericons/153.png";
import weathericons154 from "@/assets/weathericons/154.png";
import weathericons300 from "@/assets/weathericons/300.png";
import weathericons301 from "@/assets/weathericons/301.png";
import weathericons302 from "@/assets/weathericons/302.png";
import weathericons303 from "@/assets/weathericons/303.png";
import weathericons304 from "@/assets/weathericons/304.png";
import weathericons305 from "@/assets/weathericons/305.png";
import weathericons306 from "@/assets/weathericons/306.png";
import weathericons307 from "@/assets/weathericons/307.png";
import weathericons308 from "@/assets/weathericons/308.png";
import weathericons309 from "@/assets/weathericons/309.png";
import weathericons310 from "@/assets/weathericons/310.png";
import weathericons311 from "@/assets/weathericons/311.png";
import weathericons312 from "@/assets/weathericons/312.png";
import weathericons313 from "@/assets/weathericons/313.png";
import weathericons314 from "@/assets/weathericons/314.png";
import weathericons315 from "@/assets/weathericons/315.png";
import weathericons316 from "@/assets/weathericons/316.png";
import weathericons317 from "@/assets/weathericons/317.png";
import weathericons318 from "@/assets/weathericons/318.png";
import weathericons350 from "@/assets/weathericons/350.png";
import weathericons351 from "@/assets/weathericons/351.png";
import weathericons399 from "@/assets/weathericons/399.png";
import weathericons400 from "@/assets/weathericons/400.png";
import weathericons401 from "@/assets/weathericons/401.png";
import weathericons402 from "@/assets/weathericons/402.png";
import weathericons403 from "@/assets/weathericons/403.png";
import weathericons404 from "@/assets/weathericons/404.png";
import weathericons405 from "@/assets/weathericons/405.png";
import weathericons406 from "@/assets/weathericons/406.png";
import weathericons407 from "@/assets/weathericons/407.png";
import weathericons408 from "@/assets/weathericons/408.png";
import weathericons409 from "@/assets/weathericons/409.png";
import weathericons410 from "@/assets/weathericons/410.png";
import weathericons456 from "@/assets/weathericons/456.png";
import weathericons457 from "@/assets/weathericons/457.png";
import weathericons499 from "@/assets/weathericons/499.png";
import weathericons500 from "@/assets/weathericons/500.png";
import weathericons501 from "@/assets/weathericons/501.png";
import weathericons502 from "@/assets/weathericons/502.png";
import weathericons503 from "@/assets/weathericons/503.png";
import weathericons504 from "@/assets/weathericons/504.png";
import weathericons507 from "@/assets/weathericons/507.png";
import weathericons508 from "@/assets/weathericons/508.png";
import weathericons509 from "@/assets/weathericons/509.png";
import weathericons510 from "@/assets/weathericons/510.png";
import weathericons511 from "@/assets/weathericons/511.png";
import weathericons512 from "@/assets/weathericons/512.png";
import weathericons513 from "@/assets/weathericons/513.png";
import weathericons514 from "@/assets/weathericons/514.png";
import weathericons515 from "@/assets/weathericons/515.png";
import weathericons900 from "@/assets/weathericons/900.png";
import weathericons901 from "@/assets/weathericons/901.png";
import weathericons999 from "@/assets/weathericons/999.png";
export default class WeatherService {
  async getWeathers(location: FLocation): Promise<WeatherValueMap> {
    const locationStr = location.longitude + "," + location.latitude;
    const http = wrapper(axios, {
      maxCacheSize: 15
    });
    http.__addFilter(/weatherdata/);

    const res = await http({
      url: import.meta.env.VITE_WEATHER_API,
      method: "get",
      params: {
        location: locationStr
      }
    });

    return res.data;
  }

  static getIcon(iconDay: string): string {
    const weatherIcons = [
      { iconday: "100", icon: weathericons100 },
      { iconday: "101", icon: weathericons101 },
      { iconday: "102", icon: weathericons102 },
      { iconday: "103", icon: weathericons103 },
      { iconday: "104", icon: weathericons104 },
      { iconday: "150", icon: weathericons150 },
      { iconday: "153", icon: weathericons153 },
      { iconday: "154", icon: weathericons154 },
      { iconday: "300", icon: weathericons300 },
      { iconday: "301", icon: weathericons301 },
      { iconday: "302", icon: weathericons302 },
      { iconday: "303", icon: weathericons303 },
      { iconday: "304", icon: weathericons304 },
      { iconday: "305", icon: weathericons305 },
      { iconday: "306", icon: weathericons306 },
      { iconday: "307", icon: weathericons307 },
      { iconday: "308", icon: weathericons308 },
      { iconday: "309", icon: weathericons309 },
      { iconday: "310", icon: weathericons310 },
      { iconday: "311", icon: weathericons311 },
      { iconday: "312", icon: weathericons312 },
      { iconday: "313", icon: weathericons313 },
      { iconday: "314", icon: weathericons314 },
      { iconday: "315", icon: weathericons315 },
      { iconday: "316", icon: weathericons316 },
      { iconday: "317", icon: weathericons317 },
      { iconday: "318", icon: weathericons318 },
      { iconday: "350", icon: weathericons350 },
      { iconday: "351", icon: weathericons351 },
      { iconday: "399", icon: weathericons399 },
      { iconday: "400", icon: weathericons400 },
      { iconday: "401", icon: weathericons401 },
      { iconday: "402", icon: weathericons402 },
      { iconday: "403", icon: weathericons403 },
      { iconday: "404", icon: weathericons404 },
      { iconday: "405", icon: weathericons405 },
      { iconday: "406", icon: weathericons406 },
      { iconday: "407", icon: weathericons407 },
      { iconday: "408", icon: weathericons408 },
      { iconday: "409", icon: weathericons409 },
      { iconday: "410", icon: weathericons410 },
      { iconday: "456", icon: weathericons456 },
      { iconday: "457", icon: weathericons457 },
      { iconday: "499", icon: weathericons499 },
      { iconday: "500", icon: weathericons500 },
      { iconday: "501", icon: weathericons501 },
      { iconday: "502", icon: weathericons502 },
      { iconday: "503", icon: weathericons503 },
      { iconday: "504", icon: weathericons504 },
      { iconday: "507", icon: weathericons507 },
      { iconday: "508", icon: weathericons508 },
      { iconday: "509", icon: weathericons509 },
      { iconday: "510", icon: weathericons510 },
      { iconday: "511", icon: weathericons511 },
      { iconday: "512", icon: weathericons512 },
      { iconday: "513", icon: weathericons513 },
      { iconday: "514", icon: weathericons514 },
      { iconday: "515", icon: weathericons515 },
      { iconday: "900", icon: weathericons900 },
      { iconday: "901", icon: weathericons901 },
      { iconday: "999", icon: weathericons999 }
    ];

    const imgSrc = weatherIcons.find((data: { iconday: string }) => data.iconday == iconDay);
    return imgSrc?.icon || "";
  }
}
