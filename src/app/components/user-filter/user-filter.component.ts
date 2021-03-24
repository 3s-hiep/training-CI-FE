import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { LabelledValue, Labels, UserFilter } from "./user-filter.i";
@Component({
  selector: "cie-user-filter",
  templateUrl: "./user-filter.component.html",
  styleUrls: ["./user-filter.component.scss"],
})
export class UserFilterComponent implements OnInit {
  @Input() userAreas: LabelledValue<string>[];

  @Input() userStores: LabelledValue<string>[];

  @Input() filters: UserFilter;

  @Output() selectArea = new EventEmitter<string>();

  @Output() clearFilter = new EventEmitter();

  @Output() filtered = new EventEmitter<UserFilter>();

  public tempFilter: UserFilter;

  @Input() labels: Labels;

  constructor() {}

  ngOnInit() {
    this.tempFilter = { ...this.filters };
  }

  onChangedInput(name: string) {
    this.tempFilter = {
      ...this.tempFilter,
      name,
    };
  }

  onAreaSelected(area: string) {
    this.tempFilter = {
      ...this.tempFilter,
      area,
    };
    this.selectArea.emit(area);
  }

  onStoreSelected(store: string) {
    this.tempFilter = {
      ...this.tempFilter,
      store,
    };
  }

  onApply() {
    this.filtered.emit(this.tempFilter);
  }

  onClickClear() {
    this.tempFilter = { area: "", name: "", store: "" };
    this.clearFilter.emit();
  }
}
