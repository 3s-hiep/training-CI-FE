import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { UserModel } from "../../stores/users/users.model";
import { IDisplayColumn } from "../../components/table/table.component.i";
// import { LabelledValue, Labels, UserFilter } from "../../components/user-filter/user-filter.i";
import { IDataTable, ITableAction, ITableUsersAcrion } from "./users-template.i";

@Component({
  selector: "cie-users-template",
  templateUrl: "./users-template.component.html",
  styleUrls: ["./users-template.component.scss"],
})
export class UsersTemplateComponent implements OnInit, OnChanges {
  @Input() pageTitle: string;

  @Input() tableAction: ITableUsersAcrion;

  @Input() displayColumns: IDisplayColumn[];

  @Input() dataTable: IDataTable[];

  @Output() createUser = new EventEmitter();


  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("d", this.dataTable);
  }
  ngOnInit(): void {

  }

  public onCreateUser() {
    this.createUser.emit();
  }

}
