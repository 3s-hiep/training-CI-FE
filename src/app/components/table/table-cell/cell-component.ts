import { Type } from "@angular/core";

export class CellComponent<T> {
  constructor(public component: Type<any>, public data: T) {}
}
