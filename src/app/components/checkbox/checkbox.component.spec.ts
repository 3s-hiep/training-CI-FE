import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckbox } from "@angular/material/checkbox";
import { TranslateModule } from "@ngx-translate/core";

import { CheckboxComponent } from "./checkbox.component";
import { CheckboxModule } from "./checkbox.module";

describe("CheckboxComponent", () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onChangedValue", () => {
    it("should emit 1 checked with true event", (done) => {
      // arrange

      fixture.detectChanges();
      const expected = true;
      // assert
      component.checked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      const source = {} as MatCheckbox;
      component.onChangedValue({ checked: true, source });
    });

    it("should emit 1 checked with false event", (done) => {
      // arrange

      fixture.detectChanges();
      const expected = false;
      // assert
      component.checked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      const source = {} as MatCheckbox;
      component.onChangedValue({ checked: false, source });
    });
  });
});
