import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClickButton", () => {
    it("should call onClickButton and emit the action", (done) => {
      const event: any = {
        value: "ok",
      };
      component.clicked.subscribe({
        next: (actual) => {
          expect(actual).toEqual(event);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onClickButton(event);
    });
  });
});
