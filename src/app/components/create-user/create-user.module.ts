import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { CreateUserComponent } from "./create-user.component";
import { ButtonModule } from "../button/button.module";
import { CommonModule } from "@angular/common";
import { CreateDetailUserComponent } from "./create-user-detail/create-user-detail.component";
@NgModule({
  declarations: [CreateUserComponent],
  entryComponents: [CreateUserComponent, CreateDetailUserComponent],
  imports: [CommonModule, TranslateModule, ButtonModule, MatCheckboxModule],
})
export class CreateUserModule {}
