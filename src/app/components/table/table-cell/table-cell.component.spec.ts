import { ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA, Type, ViewContainerRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { AddDirective } from "./add.directive";
import { CellComponent } from "./cell-component";
import { TableCellComponent } from "./table-cell.component";

describe(TableCellComponent.name, () => {
  let component: TableCellComponent<any>;
  let fixture: ComponentFixture<TableCellComponent<any>>;

  class MockComponentFactoryResolver {
    public resolveComponentFactory = jest.fn();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: ComponentFactoryResolver, useClass: MockComponentFactoryResolver }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TableCellComponent, AddDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellComponent);
    component = fixture.componentInstance;
    component.data = {
      component: {} as Type<any>,
      data: {},
    };
    component.addHost = {
      viewContainerRef: {
        clear: () => {},
        createComponent: (a) => ({
          instance: {
            data: "data",
            test: a,
          },
        }),
      } as ViewContainerRef,
    };
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should not loadComponent with checkType", () => {
      // arrange
      component.data = "data";

      // act
      component.ngOnInit();
      const actual = spyOn(component, "loadComponent");

      // assert
      expect(actual).not.toHaveBeenCalled();
    });

    it("should loadComponent with not checkType", () => {
      // arrange
      component.data = {} as CellComponent<any>;

      // act
      component.ngOnInit();
      const actual = spyOn(component, "loadComponent");

      // assert
      expect(actual).not.toHaveBeenCalled();
    });
  });

  describe("loadComponent", () => {
    it("should resolveComponentFactory with data", () => {
      // arrange
      component.data = {
        component: {} as Type<any>,
        data: {},
      };
      component.addHost = {
        viewContainerRef: {
          clear: () => {},
          createComponent: (a) => ({
            instance: {
              data: "data",
              test: a,
            },
          }),
        } as ViewContainerRef,
      };

      // act
      fixture.detectChanges();
      component.loadComponent();

      const actual = spyOn(component.addHost.viewContainerRef, "createComponent");

      // assert
      expect(actual).toBeInstanceOf(Function);
    });
  });
});
