import {async, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {IdleComponent} from "./header/idle.component";
import {AlertComponent, ProgressbarComponent, ProgressbarModule} from "ngx-bootstrap";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        IdleComponent,
        AlertComponent,
        AlertComponent
      ],
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule,
        ProgressbarModule.forRoot()
      ],
    }).compileComponents();
  }));

  // it("should create the app", async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  //
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual("app");
  // }));
  //
  // it("should render title in a h1 tag", async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector("h1").textContent).toContain("Welcome to app!");
  // }));

});
