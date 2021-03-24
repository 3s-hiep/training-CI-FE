import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

import { LoadingComponent } from "./loading.component";

@NgModule({
  declarations: [LoadingComponent],
  entryComponents: [LoadingComponent],
  imports: [MatDialogModule],
})
export class LoadingModule {}
