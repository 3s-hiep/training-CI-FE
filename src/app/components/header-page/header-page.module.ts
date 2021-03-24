import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderPageComponent } from "./header-page.component";

@NgModule({
  declarations: [HeaderPageComponent],
  exports: [HeaderPageComponent],
  imports: [FlexLayoutModule, TranslateModule],
})
export class HeaderPagerModule {}
