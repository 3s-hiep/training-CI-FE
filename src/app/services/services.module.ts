import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { BackendService } from "./backend/backend.service";

@NgModule({
  providers: [BackendService],
  imports: [HttpClientModule],
})
export class ServicesModule {}
