import { APP_BASE_HREF } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SideBarComponent } from "./sidebar.component";
import { SideBarModule } from "./sidebar.module";
import { TranslateModule } from "@ngx-translate/core";

describe("SideBarComponent", () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SideBarModule, TranslateModule.forRoot(), RouterTestingModule.withRoutes([{ path: "", component: SideBarComponent }])],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
