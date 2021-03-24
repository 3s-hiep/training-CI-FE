import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[addComponent]",
})
export class AddDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
