import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { LabelledValue, SelectGroupMulti } from "./select-group-multi.component.i";

@Component({
  selector: "cie-select-group-multi",
  templateUrl: "./select-group-multi.component.html",
  styleUrls: ["./select-group-multi.component.scss"],
})
export class SelectGroupMultiComponent implements OnChanges {
  @Input() label: string;
  @Input() groups: SelectGroupMulti[];
  @Input() selectedItem: string[] = [];
  @Input() isStoryBook = false;
  @Input() placeholder: string;
  @Input() maxItemsDisplay = 2;
  @Input() disabled: boolean;
  @Output() selected = new EventEmitter<string[]>();
  @Input() notValid?: boolean;
  @Input() message?: string;
  public allSelected = false;
  public tempSelected = [];

  constructor(private cdRef: ChangeDetectorRef) {
    this.tempSelected = [...this.selectedItem];
  }

  ngOnChanges(): void {
    this.tempSelected = [...this.selectedItem];
  }

  public onSelectionChange(value: string[]) {
    this.selected.emit(value);
  }

  getSelect(): any {
    return Array.prototype.concat
      .apply(
        [],
        this.groups.map(({ items }) => items),
      )
      .filter((item: LabelledValue<string>) => ((this.isStoryBook && this.tempSelected) || this.selectedItem).includes(item.value))
      .map((item: LabelledValue<string>) => item.label);
  }

  getDisplaySelectItem() {
    const items = this.getSelect() as string[];

    let itemsDisplay: string = items.slice(0, this.maxItemsDisplay).join(",");
    if (items.length > this.maxItemsDisplay) {
      itemsDisplay =
        itemsDisplay + ` (+${items.length - this.maxItemsDisplay}${items.length > this.maxItemsDisplay + 1 ? " others" : " other"})`;
    }
    return itemsDisplay;
  }
}
