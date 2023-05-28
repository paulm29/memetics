import {Component, OnInit} from "@angular/core";

import {ActivatedRoute} from "@angular/router";
import {ScheduleService} from "../service/schedule.service";
import {AlertService} from "../uiqc/alert/alert.service";
import {Profile} from "../model/profile";
import {Schedule} from "../model/schedule";
import {DateUtilService} from "../service/date.util.service";

@Component({
  templateUrl: "./schedule.component.html"
})
export class ScheduleComponent implements OnInit {
  title = "Schedule";
  profile: Profile;
  schedule: Schedule = new Schedule();

  hourStep: number = 1;
  minuteStep: number = 10;
  newTime: Date = new Date();

  checkModel = {
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false
  };

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private alertService: AlertService, private dateUtilService: DateUtilService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];

    this.scheduleService.get(this.profile).subscribe(
      (response) => {
        this.initSchedule(response);
      },
      () => {
        this.scheduleService.create(this.profile).subscribe((response) => {
          this.initSchedule(response);
        }, () => this.alertService.error("Unable to set up schedule."));
      }
    );
  }

  initSchedule(response) {
    this.schedule = response;
    this.schedule.times = this.schedule.times.map((time) => this.dateUtilService.hhmmssToDate(time));

    for(const key in this.checkModel) {
      if (this.schedule.days.indexOf(key) !== -1) {
        this.checkModel[key] = true;
      }
    }
  }

  timeChanged(index, time) {
    console.log("Time changed to: " + time);
    if (time) { // time is valid
      this.schedule.times[index] = time;
      this.updateSchedule();
    }
  }

  addTime() {
    const nextTime: Date = this.dateUtilService.getNextTimePeriod(10);
    this.schedule.times.push(nextTime);
    this.updateSchedule();
  }

  removeTime(index) {
    this.schedule.times.splice(index, 1);
    this.updateSchedule();
  }

  scheduleDay() {
    const keys = Object.keys(this.checkModel);
    this.schedule.days = keys.filter((key) => this.checkModel[key]);
    this.updateSchedule();
  }

  updateSchedule() {
    const scheduleClone = JSON.parse(JSON.stringify(this.schedule));
    scheduleClone.times = scheduleClone.times.map((time) => {
      console.log("time", time);
      this.dateUtilService.dateTohhmmss(time)
    });

    this.scheduleService.update(scheduleClone).subscribe(
      (response) => {
        this.initSchedule(response);
      }, () => this.alertService.defaultError());
  }
}
