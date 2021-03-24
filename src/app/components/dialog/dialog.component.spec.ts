import { TestBed, ComponentFixture } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";

import { DiaLogComponent } from "./dialog.component";
import { DiaLogModule } from "./dialog.module";

describe(DiaLogComponent.name, () => {
  let component: DiaLogComponent;
  let fixture: ComponentFixture<DiaLogComponent>;

  let mockDialogRef;

  beforeEach(() => {
    mockDialogRef = {
      close: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [DiaLogModule, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should return false through dialogRef", () => {
    // arrange

    // act
    component.onCancel();

    // assert
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it("should return true through dialogRef", () => {
    // arrange

    // act
    component.onConfirm();

    // assert
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
