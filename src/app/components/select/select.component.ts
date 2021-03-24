import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LabelledValue } from "../index.i";

@Component({
  selector: "cie-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() items: LabelledValue<string>[];
  @Input() selectedItem: string;
  @Output() selected = new EventEmitter<string>();
  @Input() disabled: boolean;
  @Input() notValid?: boolean;
  @Input() message?: string;

  public onSelectionChange(value: string) {
    this.selected.emit(value);
  }

  getStyle() {
    if (this.disabled) {
      return "on-disabled";
    } else {
      return "not-disabled";
    }
  }
}
