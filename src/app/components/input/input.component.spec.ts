import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { InputComponent } from "./input.component";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInit defaultValue is not null ", () => {
    component.defaultValue = "TEST";
    component.ngOnInit();
    expect(component.formControl.value).toEqual("TEST");
  });

  it("should call ngOnInit defaultValue is null ", () => {
    component.defaultValue = undefined;
    component.ngOnInit();
    expect(component.formControl.value).toEqual("");
  });

  it("should test data field", () => {
    const spy = jest.spyOn(component.value, "emit");
    const el = fixture.nativeElement.querySelector("input");
    el.value = "something";
    el.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy).toBeCalledWith("something");
    });
  });
});
