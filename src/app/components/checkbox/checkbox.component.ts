import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";

export interface Labels {
  aria: string;
}

@Component({
  selector: "cie-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent {
  @Input() checkbox: boolean;
  @Input() labels: Labels;
  @Input() color = "primary";

  @Output() checked = new EventEmitter<boolean>();

  public onChangedValue(data: MatCheckboxChange) {
    this.checked.emit(data.checked);
  }
}
