class DateUtil {
  today: Date;

  constructor() {
    this.today = this.getTodayWithTimezone("+10");
  }

  getTodayWithTimezone(offset) {
    const now = new Date();
    console.log("now.getTimezoneOffset()", now.getTimezoneOffset());
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  }

  getYesterday() {
    console.log("this.today", this.today);
    const yesterday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
    return this.formatDDMMYYYY(yesterday);
  }

  getToday() {
    return this.formatDDMMYYYY(this.today);
  }

  getTomorrow() {
    const tomorrow = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1);
    return this.formatDDMMYYYY(tomorrow);
  }

  getTodayDatePlusTwo() {
    return new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 2);
  }

  getTodayDatePlusThree() {
    const day = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 3);
    return this.formatDDMMYYYY(day);
  }

  getCurrentYear() {
    return this.today.getFullYear();
  }

  getNextYear() {
    const nextYear = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate());
    return this.formatDDMMYYYY(nextYear);
  }

  getNextYearAsYYYYMMDD() {
    return this.formatYYYYMMDD(new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()));
  }

  getNextYearAndOneDay() {
    const nextYearOneDay = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() + 1);
    return this.formatDDMMYYYY(nextYearOneDay);
  }

  getYearAgo() {
    return new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
  }

  get3YearsAgo(): Date {
    return new Date(this.today.getFullYear() - 3, this.today.getMonth(), this.today.getDate());
  }

  get4YearsAgo(): Date {
    return new Date(this.today.getFullYear() - 4, this.today.getMonth(), this.today.getDate());
  }

  getYearPriorTo(date) {
    return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
  }

  getHourAgo() {
    return new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.today.getHours() - 1, this.today.getMinutes(), this.today.getSeconds());
  }

  formatDDMMYYYY(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
  }

  convertTimeToDate(time) {
    return this.formatDDMMYYYY(new Date(time));
  }

  ddmmyyyyTOyyyymmdd(dateString) {
    const day = dateString.substr(0, 2);
    const month = dateString.substr(3, 2);
    const year = dateString.substr(6, 4);
    return year + "-" + month + "-" + day;
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

  formatYYYYMMDD(date) {
    return date.toISOString().substring(0, 10);
  }

  dateFromDdmmyyyyString(ddmmyyyyString) {
    const dd = ddmmyyyyString.substr(0, 2);
    const mm = ddmmyyyyString.substr(3, 2);
    const yyyy = ddmmyyyyString.substr(6, 4);
    return new Date(yyyy, mm, dd);
  }

  dateFromIsoString(isoString) {
    const dd = isoString.substr(8, 2);
    const mm = isoString.substr(5, 2);
    const yyyy = isoString.substr(0, 4);
    return new Date(yyyy, mm, dd);
  }

  // e.g.           ceaseDate           Today
  isDateNullOrAfter(dateString: string, dateToCheckAgainst: Date) {
    if (!dateToCheckAgainst) {
      return false;
    }
    if (!dateString) {
      return true;
    }
    const inDate = new Date(dateString);
    return (inDate.getFullYear() > dateToCheckAgainst.getFullYear() ||
      (inDate.getFullYear() === dateToCheckAgainst.getFullYear() &&
        (inDate.getMonth() > dateToCheckAgainst.getMonth() ||
          (inDate.getMonth() === dateToCheckAgainst.getMonth() && inDate.getDate() > dateToCheckAgainst.getDate()))));
  }

  getTodayDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    const todayString = dd + "/" + mm + "/" + yyyy;
    return todayString;
  }
}

export let dateUtil = new DateUtil();
