import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { UsersTemplateModule } from "src/app/templates/users/users-template.module";
import { UsersPageComponent } from "./users-page.component";

@NgModule({
  declarations: [UsersPageComponent],
  imports: [BrowserModule, TranslateModule, UsersTemplateModule],
})
export class UserPageModule {}
