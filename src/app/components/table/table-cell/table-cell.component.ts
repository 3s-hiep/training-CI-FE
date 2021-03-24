import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from "@angular/core";
import { CellComponent } from "./cell-component";

import { AddDirective } from "./add.directive";
import { IAddComponent } from "../table.component.i";

@Component({
  selector: "cie-table-cell",
  template: `
    <div class="cie-table-cell">
      <ng-template addComponent></ng-template>
      <span *ngIf="checkType">{{ data }}</span>
    </div>
  `,
})
export class TableCellComponent<T> implements OnInit {
  @Input() data: CellComponent<any> | string | number | boolean;
  @ViewChild(AddDirective, { static: true }) addHost?: AddDirective;
  public checkType = true;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit() {
    this.checkType = typeof this.data === "string" || typeof this.data === "number" || typeof this.data === "boolean";
    if (!this.checkType) {
      this.loadComponent();
    }
  }
  loadComponent() {
    const addItem = this.data as CellComponent<T>;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(addItem.component);
    const viewContainerRef = this.addHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<IAddComponent<T>>(componentFactory);
    componentRef.instance.data = addItem.data;
  }
}
