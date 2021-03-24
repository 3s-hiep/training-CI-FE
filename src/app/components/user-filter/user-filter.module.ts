import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { UserFilterComponent } from "./user-filter.component";
import { ButtonModule } from "../button/button.module";
import { SelectModule } from "../select/select.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { InputModule } from "../input/input.module";

@NgModule({
  declarations: [UserFilterComponent],
  exports: [UserFilterComponent],
  imports: [FlexLayoutModule, TranslateModule, InputModule, ButtonModule, SelectModule],
})
export class UserFilterModule {}
