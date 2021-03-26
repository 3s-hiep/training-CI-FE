import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../stores/users/users.model";
import { IDisplayColumn } from "../../components/table/table.component.i";
import { IDataTable, ITableUsersAcrion } from "../../templates/users/users-template.i";
import { displayColumns, userTitle } from "./users-page.constant";
import { UsersService } from "../../services/user/users.service";

@Component({
  selector: "cie-users-page",
  styleUrls: ["./users-page.component.scss"],
  templateUrl: "./users-page.component.html",
})
export class UsersPageComponent implements OnInit {
  public pageTitle: string;
  public tableAction :ITableUsersAcrion;
  public displayColumns: IDisplayColumn[];
  public dataTable: any[];

  // public dataTable: IDataTable[];

  constructor(public usersService: UsersService) {
    this.usersService.fetchDataUsers();
  }

  public ngOnInit() {
    this.pageTitle = userTitle;
    this.displayColumns = displayColumns;

    // console.log('displayColumns', displayColumns, userTitle);

    // data fake
    // this.dataTable = [{id: '1', name: 'name1', area: 'area1', store: 'store1', action: 'action1'}]
    // this.dataTable = [
    //   {
    //     "userId": "cisuser1",
    //     "userName": "cis-user-1-1",
    //     "deleteFlag": false,
    //     "areas":'12',
    //     "stores": '12',
    //     "action": "edit"
    //     // "action": () => {
    //     //   return <button> 12</button>;
    //     // }
    //   },
    //   {
    //     "userId": "cisuser2",
    //     "userName": "cis-user-1-2",
    //     "deleteFlag": false,
    //     "areas":'12',
    //     "stores": '12',
    //     "action": "edit"
    //   }
    // ]

  }

  ngOnDestroy(): void {
  }


}
