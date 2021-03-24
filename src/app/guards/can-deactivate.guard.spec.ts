import { TestBed, inject } from "@angular/core/testing";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { CanDeactivateGuard, CanComponentDeactivate } from "./can-deactivate.guard";

@Component({
  template: "",
})
class DeactivateBlockableComponent implements CanComponentDeactivate {
  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    return false;
  }
}

@Component({
  template: "",
})
class DeactivateNonBlockableComponent {}

describe("CanDeactivateGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeactivateBlockableComponent, DeactivateNonBlockableComponent],
      providers: [CanDeactivateGuard],
    });
  });

  it("should be injectable", inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should evaluate canDeactivate in component", inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    // arrange
    const component = TestBed.createComponent(DeactivateBlockableComponent).componentInstance;

    // act
    const actual = guard.canDeactivate(component);

    // assert
    expect(actual).toBe(false);
  }));

  it("should return always true if component has no canDeactivate", inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    // arrange
    const component = TestBed.createComponent(DeactivateNonBlockableComponent).componentInstance;

    // act
    const actual = guard.canDeactivate(component as CanComponentDeactivate);

    // assert
    expect(actual).toBe(true);
  }));
});
