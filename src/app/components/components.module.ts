import { NgModule } from "@angular/core";

import { SvgIconModule } from "./svg-icon/svg-icon.module";
import { LoadingModule } from "./loading/loading.module";
import { ButtonModule } from "./button/button.module";
import { CheckboxListModule } from "./checkbox-list/checkbox-list.module";
import { SelectModule } from "./select/select.module";
import { SelectMultiModule } from "./select-multi/select-multi.module";

@NgModule({
  exports: [SvgIconModule, LoadingModule, ButtonModule, SvgIconModule, CheckboxListModule, SelectModule, SelectMultiModule],
  declarations: [],
})
export class ComponentsModule {}
