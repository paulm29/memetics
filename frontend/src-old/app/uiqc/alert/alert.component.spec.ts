import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";

import { AlertComponent } from "./alert.component";
import { AlertModule } from "ngx-bootstrap";
import { AlertService } from "./alert.service";
import { LoggerService } from "../logger.service";
import { By } from "@angular/platform-browser";
import { UserService } from "../../service/user.service";

describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [
        AlertService, LoggerService,
        { provide: UserService, useValue: {} }
      ],
      imports: [ AlertModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should show alert", inject([AlertService], (alertService: AlertService) => {
    alertService.alertEvent.emit({type: "danger", msg: "messsage", alertClass: "callout-attention"});
    fixture.detectChanges();

    const dangers = fixture.debugElement.queryAll(By.css(".callout-attention"));
    expect(dangers.length).toEqual(1);
  }));

  it("should show multiple alerts of same type when timeout exists", inject([AlertService], (alertService: AlertService) => {
    alertService.alertEvent.emit({type: "type", msg: "message", timeout: 1000000, alertClass: "callout-attention"});
    fixture.detectChanges();

    const alerts = fixture.debugElement.queryAll(By.css(".callout-attention"));
    expect(alerts.length).toEqual(1);
    expect(alerts[0].nativeElement.innerText).toContain("message");
  }));

  it("should show multiple alerts of same type when timeout exists", inject([AlertService], (alertService: AlertService) => {
    alertService.alertEvent.emit({type: "type", msg: "message1", timeout: 1000000, alertClass: "callout-attention"});
    alertService.alertEvent.emit({type: "type", msg: "message2", timeout: 1000000, alertClass: "callout-attention"});
    fixture.detectChanges();

    const alerts = fixture.debugElement.queryAll(By.css(".callout-attention"));
    expect(alerts.length).toEqual(2);
    expect(alerts[0].nativeElement.innerText).toContain("message1");
    expect(alerts[1].nativeElement.innerText).toContain("message2");
  }));

  it("should only not duplicate messages of same type if no timeout", inject([AlertService], (alertService: AlertService) => {
    alertService.alertEvent.emit({type: "type", msg: "message1", timeout: 1000000, alertClass: "callout-attention"});
    alertService.alertEvent.emit({type: "type", msg: "message2", timeout: 1000000, alertClass: "callout-attention"});
    alertService.alertEvent.emit({type: "type", msg: "message3", alertClass: "callout-attention"});
    fixture.detectChanges();

    const alerts = fixture.debugElement.queryAll(By.css(".callout-attention"));
    expect(alerts.length).toEqual(1);
    expect(alerts[0].nativeElement.innerText).toContain("message3");
  }));

});
