import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";

import { DialogService } from "./dialog.service";
import { DiaLogComponent } from "./dialog.component";
import { DialogData } from "./dialog.model";

const sampleData: DialogData = {
  title: "confirm",
  text: "discard changes?",
  textConfirm: "text",
  buttonLabels: {
    cancel: "cancel",
    ok: "ok",
  },
  notCancelButton: true,
  notOkButton: true,
};

describe(DialogService.name, () => {
  let service: DialogService;
  let dialogSpy: MatDialog;

  let dialogRefSpyObj;
  let matDialogMock;

  beforeEach(() => {
    dialogRefSpyObj = {
      afterClosed: jest.fn().mockReturnValue(of({})),
      close: jest.fn(),
      componentInstance: { body: "" },
    };

    matDialogMock = {
      open: jest.fn().mockReturnValue(dialogRefSpyObj),
    };

    TestBed.configureTestingModule({
      providers: [DialogService, { provide: MatDialog, useValue: matDialogMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(DialogService);
    dialogSpy = TestBed.inject(MatDialog);
  });

  it("should open dialog", () => {
    // arrange

    // act
    service.alert(sampleData);

    // assert
    expect(dialogSpy.open).toHaveBeenCalledWith(DiaLogComponent, { data: sampleData });
  });

  it("should return afterClosed stream", () => {
    // arrange

    // act
    const actual = service.alert(sampleData);

    // assert
    expect(actual).toBe(dialogRefSpyObj.afterClosed());
  });
});
