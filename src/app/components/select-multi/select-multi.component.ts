import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LabelledValue } from "../index.i";

@Component({
  selector: "cie-select-multi",
  templateUrl: "./select-multi.component.html",
  styleUrls: ["./select-multi.component.scss"],
})
export class SelectMultiComponent {
  @Input() label: string;
  @Input() all = false;
  @Input() allValue = "";
  @Input() items: LabelledValue<string>[];
  @Input() selectedItem: string[] = [];
  @Output() selected = new EventEmitter<string[]>();
  @Input() isStoryBook = false;
  @Input() disabled: boolean;
  @Input() maxItemsDisplay = 2;
  public allSelected = false;

  public tempSelected = [];
  public oldSelected = [];
  @Input() placeholder: string;
  @Input() notValid?: boolean;
  @Input() message?: string;
  constructor(private translate: TranslateService) {
    this.tempSelected = [...this.selectedItem];
  }
  public onSelectionChange(value: string[]) {
    if (this.all && this.allValue !== "") {
      if (this.allSelected === false) {
        if (value.includes(this.allValue)) {
          value = [this.allValue, ...this.items.map((item) => item.value)];
          this.allSelected = true;
        } else {
          if (value.filter((item) => item !== this.allValue).length >= this.items.length) {
            value = [this.allValue, ...value];
            this.allSelected = true;
          }
        }
      } else {
        if (!value.includes(this.allValue)) {
          if (this.oldSelected.includes(this.allValue)) {
            value = [];
            this.allSelected = false;
          }
        } else {
          value = value.filter((item) => item !== this.allValue);
          this.allSelected = false;
        }
      }
    }
    this.tempSelected = value;
    this.oldSelected = value;
    this.selected.emit(value);
  }

  getSelectNotAll(): any {
    let items = [];
    if (this.items && this.items.length > 0) {
      const selectedValue = (this.selectedItem && this.selectedItem) || [];
      items = this.isStoryBook
        ? this.items.filter((item) => this.tempSelected.includes(item.value)).map((item) => this.translate.instant(item.label))
        : this.items.filter((item) => selectedValue.includes(item.value)).map((item) => this.translate.instant(item.label));
    }
    return items.filter((item) => item !== this.allValue);
  }
  getSelect(): any {
    return this.items
      .filter((item: LabelledValue<string>) => ((this.isStoryBook && this.tempSelected) || this.selectedItem).includes(item.value))
      .map((item: LabelledValue<string>) => item.label);
  }
  getDisplaySelectItem() {
    const items = this.getSelect() as string[];
    const itemsDisplay: string = items.slice(0, this.maxItemsDisplay).join(",");
    return itemsDisplay;
  }
}
