import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { DialogBoxModule } from "src/app/components/dialog-box/dialog-box.module";
import { UsersTemplateModule } from "src/app/templates/users/users-template.module";
import { UsersPageComponent } from "./users-page.component";

@NgModule({
  declarations: [UsersPageComponent],
  imports: [BrowserModule, TranslateModule, UsersTemplateModule, DialogBoxModule],
})
export class UserPageModule {}
