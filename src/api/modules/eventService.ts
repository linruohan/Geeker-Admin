"use strict";
import type { EventInput } from "@fullcalendar/core";
// import * as fs from "fs";
import eventsjson from "@/assets/json/events.json";
export default class EventService {
  eventGuid = 10;
  todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  getEventID = () => {
    return String(this.eventGuid++);
  };
  events: EventInput[] = [];
  getEvents(): EventInput[] {
    this.events = eventsjson;
    return this.events;
  }
  save() {
    // fs.writeFile("src/assets/json/events.json", JSON.stringify(this.events), err => {
    //   if (err) throw err;
    //   console.log("内容已写入到文件中");
    // });
  }
  addEvent(event: EventInput) {
    this.events.push(event);
    this.save();
  }
  delEvent(event: EventInput) {
    let index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
      this.save();
    }
  }
  updateEvent(event: EventInput): void {
    let index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
      this.events.push(event);
      this.save();
    }
  }
  // /**
  //  * 提交title和start、end 到 Notion API
  //  */
  // async postEvent(event: EventInput): Promise<Page> {
  //   const http = wrapper(axios, {
  //     maxCacheSize: 15
  //   });
  //   const res = await http({
  //     url: import.meta.env.VITE_NOTION_PAGE_API,
  //     method: "post",
  //     headers: this.getHeaders(),
  //     data: {
  //       parent: { type: "database_id", database_id: this.notion_database_id },
  //       properties: this.getParams(event)
  //     }
  //   });

  //   return res;
  // }

  // /**
  //  * 更新 title 或者 start、end 到 Notion API
  //  */
  // async patchEvent(event: EventInput): Promise<Page> {
  //   const http = wrapper(axios, {
  //     maxCacheSize: 15
  //   });
  //   const res = await http({
  //     url: import.meta.env.VITE_NOTION_PAGE_API + "/" + event.id,
  //     method: "patch",
  //     headers: this.getHeaders(),
  //     data: {
  //       properties: this.getParams(event)
  //     }
  //   });

  //   return res;
  // }

  // async getEvents(): Promise<EventInput[]> {
  //   const http = wrapper(axios, {
  //     maxCacheSize: 15,
  //     ttl: 60000 //ms
  //   });
  //   const res = await http({
  //     url: import.meta.env.VITE_NOTION_DATABASE_API + this.notion_database_id + "/query",
  //     method: "post",
  //     headers: this.getHeaders()
  //   });
  //   return this.list2Events(res.data.results);
  // }

  // list2Events(results: []): EventInput[] {
  //   const events = results.map((element: Page) => {
  //     return {
  //       id: element.id,
  //       title: element.properties?.title?.rich_text[0].plain_text,
  //       start: element.properties?.start?.date.start,
  //       end: element.properties?.end?.date.start
  //     } as EventInput;
  //   });

  //   return events;
  // }
  // getParams(event: EventInput): InputPropertyValueMap {
  //   return {
  //     title: {
  //       type: "rich_text",
  //       rich_text: [
  //         {
  //           type: "text",
  //           text: { content: event.title || "" }
  //         }
  //       ]
  //     },
  //     start: {
  //       type: "date",
  //       date: { start: (event.start as Date).toISOString() }
  //     },
  //     end: {
  //       type: "date",
  //       date: { start: (event.end as Date).toISOString() }
  //     }
  //   };
  // }
}
