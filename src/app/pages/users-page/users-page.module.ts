import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { UsersPageComponent } from "./users-page.component";

@NgModule({
  declarations: [UsersPageComponent],
  imports: [BrowserModule, TranslateModule],
})
export class UserPageModule {}
