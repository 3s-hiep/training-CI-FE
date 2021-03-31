import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { CreateDetailUserComponent } from "./create-user-detail.component";
import { CreateUserData } from "./create-user-detail.component.i";
import { CreateUserDetailModule } from "./create-user-detail.module";

describe("CreateDetailUserComponent", () => {
  let component: CreateDetailUserComponent;
  let fixture: ComponentFixture<CreateDetailUserComponent>;

  const labels = {
    pageTitle: "pageTitle",
    id: "id1",
    name: "name",
    status: "status",
    role: "role",
    store: "store",
    checkbox: "checkbox",
    cancelButton: "cancelButton",
    saveButton: "saveButton",
  };

  const data: CreateUserData = {
    id: {
      labels: {
        placeholder: "string",
        aria: "string",
        type: "string",
        attrs: { key: "string" },
      },
      value: "001",
    },
    name: {
      labels: {
        placeholder: "string",
        aria: "string",
      },
      value: "001",
    },
    status: {
      placeholder: "string",
      types: [],
      value: "string",
    },
    role: {
      placeholder: "string",
      types: [],
      value: ["selected"],
    },
    store: {
      placeholder: "string",
      types: [],
      value: ["selected"],
    },
    passwordConfirm: {
      labels: {
        placeholder: "string",
        aria: "string",
      },
      value: true,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CreateUserDetailModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDetailUserComponent);
    component = fixture.componentInstance;
    component.labels = labels;

    component.data = {
      pageLabels: labels,
      initialData: data,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClickCancel", () => {
    it("should call onClickCancel()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css(`[data-test="button-cancel"]`));
      const spy = jest.spyOn(component, "onClickCancel");
      filteredComponent.triggerEventHandler("click", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });
  describe("onClickSave", () => {
    it("should call onClickSave()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css(`[data-test="button-save"]`));
      component.checkValid = jest.fn(() => true);
      const spy = jest.spyOn(component, "onClickSave");
      const spy1 = jest.spyOn(component.dialogRef, "close");
      filteredComponent.triggerEventHandler("click", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spy1).toHaveBeenCalled();
    });
    it("should call onClickSave() not valid", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css(`[data-test="button-save"]`));
      component.checkValid = jest.fn(() => false);
      const spy = jest.spyOn(component, "onClickSave");
      const spy1 = jest.spyOn(component.dialogRef, "close");
      filteredComponent.triggerEventHandler("click", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spy1).not.toHaveBeenCalled();
    });
  });
  describe("onChangedValue", () => {
    it("should call onChangedValue()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css(`[data-test="role-select"]`));
      const spy = jest.spyOn(component, "onChangedValue");
      filteredComponent.triggerEventHandler("selected", []);
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("checkValid", () => {
    it("should call checkValid() not valid", () => {
      // act
      const act = component.checkValid();
      expect(act).toBe(true);
    });
    it("should call checkValid() valid", () => {
      // act
      component.tempFilters = {
        id: {
          value: "",
          labels: { aria: "001", placeholder: "001" },
        },
        name: {
          value: "",
          labels: { aria: "001", placeholder: "001" },
        },
        role: {
          value: [],
          placeholder: "001",
          types: [],
        },
        store: {
          value: [],
          placeholder: "001",
          types: [],
        },
      } as CreateUserData;
      const act = component.checkValid();
      expect(act).toBe(false);
    });
  });
});
