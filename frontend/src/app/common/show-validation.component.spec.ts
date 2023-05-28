import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { ShowValidationComponent } from "./show-validation.component";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
      <div appShowValidation='messages'>
        <input name='field' [(ngModel)]='model' required>
      </div>
  `
})
class TestShowValidationComponent {
  model: string;
}

xdescribe("ShowValidationComponent", () => {
  let component: TestShowValidationComponent;
  let fixture: ComponentFixture<TestShowValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowValidationComponent, TestShowValidationComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShowValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should show errors when invalid and pristine", function () {
    const messagesContainer = fixture.debugElement.query(By.css(".messages"));

    expect(fixture.debugElement.queryAll(By.css(".has-danger")).length).toBe(1);
    expect(messagesContainer.nativeElement.textContent).toContain("This is a required field");
  });

  it("should show errors when invalid and dirty", async(() => {
    const inputElement = fixture.debugElement.query(By.css("input")).nativeElement;
    inputElement.value = "";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const messagesContainer = fixture.debugElement.query(By.css(".messages"));

    expect(fixture.debugElement.queryAll(By.css(".has-danger")).length).toBe(1);
    expect(messagesContainer.nativeElement.textContent).toContain("This is a required field");
  }));

  it("should not show errors when valid", function () {
    const inputElement = fixture.debugElement.query(By.css("input")).nativeElement;
    inputElement.value = "valid";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css(".has-danger")).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css(".messages")).length).toBe(0);
  });
});
