import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";

import { CheckboxListComponent } from "./checkbox-list.component";
import { CheckboxListModule } from "./checkbox-list.module";

describe("CheckboxListComponent", () => {
  let component: CheckboxListComponent;
  let fixture: ComponentFixture<CheckboxListComponent>;

  const list = [
    { value: "1", label: "one" },
    { value: "2", label: "two" },
    { value: "3", label: "three" },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxListModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onCheck", () => {
    it("should emit 1 checked with true event", (done) => {
      // arrange
      component.list = list;
      fixture.detectChanges();
      const expected = ["1"];
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
      component.onCheck(true, "1");
    });

    it("should emit 1 checked with false event", (done) => {
      // arrange
      component.list = list;
      component.checkedItem = ["2", "3"];
      fixture.detectChanges();
      const expected = ["3"];
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
      component.onCheck(false, "2");
    });
  });
});
