import { NgModule } from "@angular/core";
import { UsersTemplateComponent } from "./users-template.component";
import { HeaderPagerModule } from "../../components/header-page/header-page.module";
import { UserFilterModule } from "../../components/user-filter/user-filter.module";
import { TableModule } from "../../components/table/table.module";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ButtonModule } from "../../components/button/button.module";

@NgModule({
  declarations: [UsersTemplateComponent],
  imports: [HeaderPagerModule, UserFilterModule, TableModule, ButtonModule, TranslateModule, FlexLayoutModule],
  exports: [UsersTemplateComponent],
})
export class UsersTemplateModule {}
