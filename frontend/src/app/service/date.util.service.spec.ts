import { async, inject, TestBed } from "@angular/core/testing";
import { DateUtilService } from "./date.util.service";
import { DatePipe } from "@angular/common";

describe("DateUtilService", () => {
  let dateUtilService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        DateUtilService,
        DatePipe
      ]
    });
  }));

  beforeEach(inject([DateUtilService], (_dateUtilService_: DateUtilService) => {
    dateUtilService = _dateUtilService_;
  }));

  it("should format date with yyyy-MM-dd by default", function() {
    const date = new Date(2017, 3, 1, 0, 0, 0);

    expect(dateUtilService.format(date)).toBe("2017-04-01");
  });

  it("should format date with supplied format", function() {
      const date = new Date(2017, 3, 1, 6, 32, 50);

      expect(dateUtilService.format(date, "dd/MM/yyyy")).toBe("01/04/2017");
      expect(dateUtilService.format(date, "yyyy-MM-dd")).toBe("2017-04-01");
      expect(dateUtilService.format(date, "yyyy-MM-dd HH:mm:ss")).toBe("2017-04-01 06:32:50");
  });

  it("should be same date", function() {
      const today = new Date();

      const same = DateUtilService.isSameDate(today, today);

      expect(same).toBe(true);
  });

  it("should not be same date", function() {
      const today = new Date();
      const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

      const same = DateUtilService.isSameDate(today, yesterday);

      expect(same).toBe(false);
  });

  it("should be true when first date later", function () {
      const date = new Date(2000, 1, 2, 0, 0, 0);
      const minDate = new Date(2000, 1, 1, 1, 0, 0);

      const valid = DateUtilService.isSameDateOrLater(date, minDate);

      expect(valid).toBe(true);
  });

  it("should be false when first day earlier", function () {
      const date = new Date(2000, 1, 1, 1, 0, 0);
      const minDate = new Date(2000, 1, 2, 0, 0, 0);

      const valid = DateUtilService.isSameDateOrLater(date, minDate);

      expect(valid).toBe(false);
  });

  it("should be true when same day", function () {
      const date = new Date(2000, 1, 1, 0, 0, 0);
      const minDate = new Date(2000, 1, 1, 1, 0, 0);

      const valid = DateUtilService.isSameDateOrLater(date, minDate);

      expect(valid).toBe(true);
  });

  it("should be false when first date later", function () {
      const date = new Date(2000, 1, 2, 0, 0, 0);
      const maxDate = new Date(2000, 1, 1, 1, 0, 0);

      const valid = DateUtilService.isSameDateOrEarlier(date, maxDate);

      expect(valid).toBe(false);
  });

  it("should be true when first day earlier", function () {
      const date = new Date(2000, 1, 1, 1, 0, 0);
      const maxDate = new Date(2000, 1, 2, 0, 0, 0);

      const valid = DateUtilService.isSameDateOrEarlier(date, maxDate);

      expect(valid).toBe(true);
  });

  it("should be true when same day", function () {
      const date = new Date(2000, 1, 1, 0, 0, 0);
      const maxDate = new Date(2000, 1, 1, 1, 0, 0);

      const valid = DateUtilService.isSameDateOrEarlier(date, maxDate);

      expect(valid).toBe(true);
  });

  it("should be within range when no min date", function () {
      const date = new Date(2000, 1, 1, 0, 0, 0);
      const maxDate = new Date(2000, 1, 2, 0, 0, 0);

      const valid = DateUtilService.isDateWithinRange(date, undefined, maxDate);

      expect(valid).toBe(true);
  });

  it("should be within range when no max date", function () {
      const minDate = new Date(2000, 1, 1, 0, 0, 0);
      const date = new Date(2000, 1, 2, 0, 0, 0);

      const valid = DateUtilService.isDateWithinRange(date, minDate, undefined);

      expect(valid).toBe(true);
  });

  it("should be within range when no min or max date", function () {
      const date = new Date(2000, 1, 1, 0, 0, 0);

      const valid = DateUtilService.isDateWithinRange(date, undefined, undefined);

      expect(valid).toBe(true);
  });

  // it("should be within next year when minimum is today", function () {
  //     const today = new Date();
  //     const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  //
  //     expect(DateUtilService.isDateWithinRange(today, today, dateUtilService.nextYear())).toBe(true);
  //     expect(DateUtilService.isDateWithinRange(oneYearFromNow, today, dateUtilService.nextYear())).toBe(true);
  // });
  //
  // it("should not be within next year when minimum is today", function () {
  //     const today = new Date();
  //     const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  //     const oneYearAndDayFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() + 1);
  //
  //     expect(DateUtilService.isDateWithinRange(yesterday, today, dateUtilService.nextYear())).toBe(false);
  //     expect(DateUtilService.isDateWithinRange(oneYearAndDayFromNow, today, dateUtilService.nextYear())).toBe(false);
  // });
  //
  // it("should be within next year when minimum is yesterday", function () {
  //     const today = new Date();
  //     const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  //     const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  //
  //     expect(DateUtilService.isDateWithinRange(yesterday, yesterday, dateUtilService.nextYear())).toBe(true);
  //     expect(DateUtilService.isDateWithinRange(today, yesterday, dateUtilService.nextYear())).toBe(true);
  //     expect(DateUtilService.isDateWithinRange(oneYearFromNow, yesterday, dateUtilService.nextYear())).toBe(true);
  // });
  //
  // it("should not be within next year when minimum is yesterday", function () {
  //     const today = new Date();
  //     const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  //     const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
  //     const oneYearAndDayFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() + 1);
  //
  //     expect(DateUtilService.isDateWithinRange(twoDaysAgo, yesterday, dateUtilService.nextYear())).toBe(false);
  //     expect(DateUtilService.isDateWithinRange(oneYearAndDayFromNow, yesterday, dateUtilService.nextYear())).toBe(false);
  // });
  //
  // it("should be within next year", function() {
  //     const today = new Date();
  //     const date = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  //
  //     expect(DateUtilService.isDateWithinRange(date, undefined, dateUtilService.nextYear())).toBe(true);
  // });
  //
  // it("should not be within next year", function() {
  //     const date = new Date(2099, 1, 1);
  //
  //     expect(DateUtilService.isDateWithinRange(date, undefined, dateUtilService.nextYear())).toBe(false);
  // });

  // it("should be current date", function () {
  //   const valid = dateUtilService.isCurrentOrFutureDate(new Date());
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should be future date", function () {
  //   const date = new Date(2099, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrFutureDate(date);
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should not be current or future date", function () {
  //   const date = new Date(1000, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrFutureDate(date);
  //
  //   expect(valid).toBe(false);
  // });
  //
  // it("should be current year", function () {
  //   const date = new Date(2017, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrFutureYear(date);
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should be future year", function () {
  //   const date = new Date(2099, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrFutureYear(date);
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should not be current or future year", function () {
  //   const date = new Date(1000, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrFutureYear(date);
  //
  //   expect(valid).toBe(false);
  // });
  //
  // it("should be current date", function () {
  //   const valid = dateUtilService.isCurrentOrPastDate(new Date());
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should be past date", function () {
  //   const date = new Date(2000, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrPastDate(date);
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should not be current or past date", function () {
  //   const date = new Date(3000, 1, 1, 0, 0, 0);
  //
  //   const valid = dateUtilService.isCurrentOrPastDate(date);
  //
  //   expect(valid).toBe(false);
  // });
  //
  // it("should be earlier than 2 years ago", function () {
  //   const date = new Date(1000, 1, 1);
  //
  //   const valid = dateUtilService.isDateEarlierThan2YearsAgo(date);
  //
  //   expect(valid).toBe(true);
  // });
  //
  // it("should not be earlier than 2 years ago", function () {
  //   const date = new Date(new Date().getFullYear() -1 , 1, 1);
  //
  //   const valid = dateUtilService.isDateEarlierThan2YearsAgo(date);
  //
  //   expect(valid).toBe(false);
  // });
  //
  // it("should be later than today", function() {
  //   const date = new Date(2099, 1, 1);
  //
  //   expect(dateUtilService.isLaterThanToday(date)).toBe(true);
  // });
  //
  // it("should not be later than today when today", function() {
  //   const date = new Date();
  //
  //   expect(dateUtilService.isLaterThanToday(date)).toBe(false);
  // });
  //
  // it("should not be later than today when past", function() {
  //   const date = new Date(2000, 1, 1);
  //
  //   expect(dateUtilService.isLaterThanToday(date)).toBe(false);
  // });
});
