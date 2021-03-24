import { APP_BASE_HREF } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { INavItem } from "../sidebar.component.i";
import { SideBarModule } from "../sidebar.module";

import { SidebarChildComponent } from "./sidebar-child.component";
const item: INavItem = {
  displayName: "DashBoard",
  route: "/dashboard",
  isChildren: false,
};
describe("SidebarChildComponent", () => {
  let component: SidebarChildComponent;
  let fixture: ComponentFixture<SidebarChildComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [SideBarModule, TranslateModule.forRoot(), RouterTestingModule.withRoutes([{ path: "", component: SidebarChildComponent }])],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarChildComponent);
    component = fixture.componentInstance;
    component.item = item;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("onItemSelected", () => {
    it("should handle when item is not children", () => {
      const itemTemp = {
        displayName: "DashBoard",
        route: "/",
        isChildren: false,
      };
      const spy2 = jest.spyOn(router, "navigate");
      // arrange
      component.onItemSelected(itemTemp);
      expect(spy2).toHaveBeenCalledWith(["/"]);
    });

    it("should handle when item is children is empty", () => {
      const itemTemp = {
        displayName: "DashBoard",
        route: "/",
        isChildren: false,
        children: [],
      };
      const spy2 = jest.spyOn(router, "navigate");
      // arrange
      component.onItemSelected(itemTemp);
      expect(spy2).toHaveBeenCalledWith(["/"]);
    });

    it("should handle when item is children", () => {
      const itemTemp = {
        displayName: "DashBoard",
        route: "/",
        isChildren: false,
        children: [
          {
            displayName: "DashBoard",
            route: "/",
            isChildren: false,
          },
        ],
      };
      // arrange
      component.onItemSelected(itemTemp);
      expect(component.expanded).toEqual(true);
    });
  });
});
