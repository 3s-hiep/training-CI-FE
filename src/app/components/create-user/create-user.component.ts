import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
export interface Labels {
  button: string;
}
@Component({
  selector: "cie-create-user",
  templateUrl: "./create-user.component.html",
})
export class CreateUserComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  public labels: Labels;
  ngOnInit(): void {}
}
