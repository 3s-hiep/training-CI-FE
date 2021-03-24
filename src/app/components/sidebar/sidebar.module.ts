import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideBarComponent } from "./sidebar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidebarChildComponent } from "./sidebar-child/sidebar-child.component";

@NgModule({
  declarations: [SideBarComponent, SidebarChildComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot([]),
    TranslateModule,
  ],
  exports: [SideBarComponent],
})
export class SideBarModule {}
