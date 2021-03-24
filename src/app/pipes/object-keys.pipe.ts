import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "keys", pure: true })
export class ObjectKeysPipe implements PipeTransform {
  transform(value: any): any {
    // guard against null object
    if (value == null) {
      return;
    }
    return Object.keys(value);
  }
}
