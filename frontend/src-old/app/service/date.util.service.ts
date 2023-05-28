import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";
import { isDate } from "util";
import * as moment from "moment";

@Injectable()
export class DateUtilService {
  static isSameDate(x: Date, y: Date) {
    return x.getDate() === y.getDate() && x.getMonth() === y.getMonth() && x.getFullYear() === y.getFullYear();
  }

  static isSameDateOrEarlier(date, maxDate) {
    if (DateUtilService.isSameDate(date, maxDate)) {
      return true;
    } else {
      return date <= maxDate;
    }
  }

  static isSameDateOrLater(date, minDate) {
    if (DateUtilService.isSameDate(date, minDate)) {
      return true;
    } else {
      return date >= minDate;
    }
  }

  static isDateWithinRange(date, minDate, maxDate) {
    let result = true;
    if (minDate) {
      result = DateUtilService.isSameDateOrLater(date, minDate);
    }
    if (result && maxDate) {
      result = DateUtilService.isSameDateOrEarlier(date, maxDate);
    }
    return result;
  }

  static getSemester(date) {
    if (date.getMonth() < 6) {
      return 1;
    }
    return 2;
  }

  constructor(private datePipe: DatePipe) {
  }

  format(date, dateFormat?): string {
    if (!dateFormat) {
      dateFormat = "yyyy-MM-dd";
    }
    return this.datePipe.transform(date, dateFormat);
  }

  formatDatetime(date, dateFormat?): string {
    if (!dateFormat) {
      dateFormat = "yyyy-MM-dd HH:mm:ss";
    }
    console.log("formatDatetime", date);
    const formatted = this.datePipe.transform(date, dateFormat);
    console.log("formatted", formatted);

    return formatted;
  }

  today(): string {
    return this.format(new Date());
  }

  getCurrentTime() {
    const now = new Date();
    return now.getHours() + ":" + now.getMinutes();
  }

  getNextTimePeriod(period) {
    console.log("getNextTimePeriod");
    const now: Date = new Date();
    const minutes = (Math.round(now.getMinutes() / period) * period) % 60;
    now.setMinutes(minutes);
    return now;
  }

  hhmmssToDate(time) {
    // console.log(time);
    // console.log(new Date("2000-01-01T" + time + "+10:00"));
    return new Date("2000-01-01T" + time + "+10:00");
  }

  dateTohhmmss(date: Date) {
    console.log("date", date);
    console.log(isDate(date));

    let minutes = date.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = minutes + "0";
    }
    let hours = date.getHours().toString();
    if (hours.length === 1) {
      hours = hours + "0";
    }

    return hours + ":" + minutes + ":00";
  }

  getTodayStart(): string {
    const date = moment().startOf("day");
    return this.formatDatetime(date);
  }

  getTodayEnd(): string {
    const date = moment().endOf("day");
    return this.formatDatetime(date);
  }

  getYesterdayStart(): string {
    const date = moment().subtract(1, "days").startOf("day");
    return this.formatDatetime(date);
  }

  getYesterdayEnd(): string {
    const date = moment().subtract(1, "days").endOf("day");
    return this.formatDatetime(date);
  }

  getLastWeekStart(): string {
    const date = moment().subtract(1, "weeks").startOf("day");
    return this.formatDatetime(date);
  }

  getLastWeekEnd(): string {
    const date = moment().subtract(1, "days").endOf("day");
    return this.formatDatetime(date);
  }

  yyyymmddTOddmmyyyy(dateString) {
    if (dateString.substr(2, 1) === "/") {
      return dateString;
    }
    const day = dateString.substr(8, 2);
    const month = dateString.substr(5, 2);
    const year = dateString.substr(0, 4);
    return day + "/" + month + "/" + year;
  }
}
