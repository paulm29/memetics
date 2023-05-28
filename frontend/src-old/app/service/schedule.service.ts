import {Injectable} from "@angular/core";
import {MemeticsClient} from "./memetics.client";
import {Schedule} from "../model/schedule";

@Injectable()
export class ScheduleService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  get(profile) {
    return this.memeticsClient.scheduleGet(profile);
  }

  create(profile) {
    const schedule: Schedule = new Schedule();
    schedule.profile = profile;
    return this.memeticsClient.scheduleCreate(schedule);
  }

  update(schedule) {
    return this.memeticsClient.scheduleUpdate(schedule);
  }
}
