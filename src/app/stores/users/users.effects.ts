import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { BackendService } from "../../services/backend/backend.service";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private backendService: BackendService) { }

}
