import { NgModule } from "@angular/core";

import { SystemErrorComponent } from "./system-error.component";
import { PluginModule } from "../../plugins/plugin.module";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SystemErrorComponent],
  exports: [SystemErrorComponent],
  imports: [SvgIconModule, PluginModule, TranslateModule.forRoot()],
})
export class SystemErrorModule {}
