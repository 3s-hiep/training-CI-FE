import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../stores/users/users.model";
import { IDisplayColumn } from "../../components/table/table.component.i";
import { IDataTable, ITableUsersAcrion } from "../../templates/users/users-template.i";
import { displayColumns, userTitle } from "./users-page.constant";
import { UsersService } from "../../services/user/users.service";
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from "../../components/dialog-box/dialog-box.component";
// import { CreateDetailUserComponent } from "../../components/create-user/create-user-detail/create-user-detail.component";

@Component({
  selector: "cie-users-page",
  styleUrls: ["./users-page.component.scss"],
  templateUrl: "./users-page.component.html",
})
export class UsersPageComponent implements OnInit {
  public pageTitle: string;
  public tableAction: ITableUsersAcrion;
  public displayColumns: IDisplayColumn[];
  public dataTable: IDataTable[];
  public openDialog: Boolean = false;

  // public labelDialog = createDetailUser;

  constructor(public usersService: UsersService, public dialog: MatDialog) {
    this.usersService.fetchDataUsers();
  }

  public ngOnInit() {
    this.pageTitle = userTitle;
    this.displayColumns = displayColumns;

    this.usersService.getDataUsers().pipe().subscribe((res: any) => {
      this.dataTable = [];

      if (res && res['users']) {
        res['users'].map((item) => {
          let areas = item.areas.map(item => item.name).join(', ');
          let stores = item.stores.map(item => item.name).join(', ');

          // this.dataTable.push({...item, areas: areas, stores, action: "edit" });
          this.dataTable = [...this.dataTable, { ...item, areas: areas, stores, action: "Delete" }];
        })
      }
    });


  }

  ngOnDestroy(): void {
  }

  public createUser() {
    this.openDialogCreate('Add',{});
  }

  public openDialogCreate(action,obj) : void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        // this.addRowData(result.data);
        if(result.data) {

          let params: UserModel = {
            userId: '',
            userName: '',
            areas: [],
            stores: []
          };
          params.userId = result.data.userId;
          params.userName = result.data.userName;
          params.areas = [ {name: result.data.areas } ];
          params.stores = [ {name: result.data.stores } ];

          this.usersService.addUser(params);
        }
      }
    });
  }

}
