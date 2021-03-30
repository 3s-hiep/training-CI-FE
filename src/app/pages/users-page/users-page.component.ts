import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../stores/users/users.model";
import { IDisplayColumn } from "../../components/table/table.component.i";
import { IDataTable, ITableUsersAcrion } from "../../templates/users/users-template.i";
import { displayColumns, userTitle } from "./users-page.constant";
import { UsersService } from "../../services/user/users.service";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "cie-users-page",
  styleUrls: ["./users-page.component.scss"],
  templateUrl: "./users-page.component.html",
})
export class UsersPageComponent implements OnInit {
  public pageTitle: string;
  public tableAction :ITableUsersAcrion;
  public displayColumns: IDisplayColumn[];
  public dataTable: IDataTable[];
  // public dataTable: UserModel[];

  constructor(public usersService: UsersService) {
    this.usersService.fetchDataUsers();
  }

  public ngOnInit() {
    this.pageTitle = userTitle;
    this.displayColumns = displayColumns;

    this.dataTable = [];
    this.usersService.getDataUsers().pipe().subscribe((res:any)=>{
        if(res && res['users']){
          res['users'].map((item)=> {
            console.log(item);
            let areas = item.areas.map(item=> item.name).join(', ');
            let stores = item.stores.map(item=> item.name).join(', ');

            // this.dataTable.push({...item, areas: areas, stores, action: "edit" });
            this.dataTable = [...this.dataTable, {...item, areas: areas, stores, action: "edit" }];
            console.log('this.dataTable', this.dataTable);
          })
        }
    });


    // this.dataTable =[
    //   {
    //       "userId": "12",
    //       "userName": "Name1",
    //       "deleteFlag": true,
    //       "areas": "area1",
    //       "stores": "store1",
    //       "action": "edit"
    //   }
    // ]

  }

  ngOnDestroy(): void {
  }


}
