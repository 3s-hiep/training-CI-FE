import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { LabelledValue, Labels, UserFilter } from "../../components/user-filter/user-filter.i";
import { IDataTable, ITableAction } from "./users-template.i";

@Component({
  selector: "cie-users-template",
  templateUrl: "./users-template.component.html",
  styleUrls: ["./users-template.component.scss"],
})
export class UsersTemplateComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() textButton: string;

  @Input() tableAction: ITableAction;

  @Input() dataTable: IDataTable[];

  @Input() userFilter?: UserFilter;

  @Input() userAreas?: LabelledValue<string>[];

  @Input() userStores?: LabelledValue<string>[];

  @Input() labelsFilter?: Labels;

  @Output() selectArea = new EventEmitter<string>();

  @Output() clearFilter = new EventEmitter();

  @Output() filtered = new EventEmitter<UserFilter>();

  @Output() pagination = new EventEmitter<any>();
  @Output() createButtonUsers = new EventEmitter();

  constructor() {}
  ngOnInit(): void {
    console.log(this.userAreas);
  }

  public onFilters(data: UserFilter) {
    this.filtered.emit(data);
  }

  public onPagination(data: any) {
    this.pagination.emit(data);
  }
  public onCreateButtonUsers() {
    this.createButtonUsers.emit();
  }
  public onSelectArea(area: string) {
    this.selectArea.emit(area);
  }

  public onClearFilter() {
    this.clearFilter.emit();
  }
}
