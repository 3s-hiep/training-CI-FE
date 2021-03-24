import { NgModule } from "@angular/core";
import { DropdownMenuModule } from "../dropdown-menu/dropdown-menu.module";
import { HeaderTitleModule } from "../header-title/header-title.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { HeaderComponent } from "./header.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    SvgIconModule,
    DropdownMenuModule,
    HeaderTitleModule,
    FlexLayoutModule,
  ],
})
export class HeaderModule {}
