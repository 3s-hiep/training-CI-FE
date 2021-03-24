import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, ViewChild, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { DropdownMenuItemComponent } from "./dropdown-menu-item.component";
import { DropdownMenuModule } from "./dropdown-menu.module";

@Component({
  selector: "cie-test",
  template: `
    <cie-dropdown-menu>
      <cie-dropdown-menu-item [label]="label" [value]="value"></cie-dropdown-menu-item>
    </cie-dropdown-menu>
  `,
})
class TestComponent implements OnInit {
  public label: string;
  public value: string;
  @ViewChild(DropdownMenuItemComponent, { static: false }) menuItem: DropdownMenuItemComponent;
  ngOnInit() {}
}

describe("DropdownMenuComponent", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [DropdownMenuModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set value", () => {
    // arrange
    const expected = "sample label";
    component.menuItem.label = expected;
    // act
    component.menuItem.ngOnInit();
    // assert
    expect(component.menuItem.value).toEqual(expected);
  });

  it("should not override value", () => {
    // arrange
    const expected = "value";
    component.menuItem.label = "label";
    component.menuItem.value = expected;
    // act
    component.menuItem.ngOnInit();
    // assert
    expect(component.menuItem.value).toEqual(expected);
  });
});
