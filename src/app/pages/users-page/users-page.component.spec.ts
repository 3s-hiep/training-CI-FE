import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UsersPageComponent } from "./users-page.component";

describe("UsersPageComponent", () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPageComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "**", component: UsersPageComponent },
        ]),
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
