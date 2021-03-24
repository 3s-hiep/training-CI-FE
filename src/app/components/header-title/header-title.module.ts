import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { HeaderTitleComponent } from "./header-title.component";

@NgModule({
  declarations: [HeaderTitleComponent],
  exports: [HeaderTitleComponent],
  imports: [TranslateModule],
})
export class HeaderTitleModule {}
