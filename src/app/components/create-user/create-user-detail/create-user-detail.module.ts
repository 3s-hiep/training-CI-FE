import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CreateDetailUserComponent } from "./create-user-detail.component";
import { ButtonModule } from "../../button/button.module";
import { CommonModule } from "@angular/common";
import { SelectModule } from "../../select/select.module";
import { SelectMultiModule } from "../../select-multi/select-multi.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectGroupMultiModule } from "../../select-group-multi/select-group-multi.module";
import { InputModule } from "../../input/input.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CheckboxModule } from "../../checkbox/checkbox.module";
@NgModule({
  declarations: [CreateDetailUserComponent],
  imports: [
    TranslateModule,
    CommonModule,
    ButtonModule,
    SelectGroupMultiModule,
    SelectModule,
    SelectMultiModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    InputModule,
    FlexLayoutModule,
    CheckboxModule,
  ],
  exports: [CreateDetailUserComponent],
})
export class CreateUserDetailModule {}
