import { NgModule } from "@angular/core";
import { MasterComponent } from "./master.component";
import { HeaderModule } from "../header/header.module";
import { AppRoutingModule } from "../../app-routing.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SideBarModule } from "../sidebar/sidebar.module";

@NgModule({
  declarations: [MasterComponent],
  exports: [MasterComponent],
  imports: [HeaderModule, AppRoutingModule, MatSidenavModule, SideBarModule],
})
export class MasterModule {}
