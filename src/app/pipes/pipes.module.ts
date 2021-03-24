import { NgModule } from "@angular/core";

import { ObjectKeysPipe } from "./object-keys.pipe";
import { LocalizedDatePipe } from "./localized-date/localized-date.pipe";

@NgModule({
  declarations: [ObjectKeysPipe, LocalizedDatePipe],
  exports: [ObjectKeysPipe, LocalizedDatePipe],
  imports: [],
})
export class PipesModule {}
