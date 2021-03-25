import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from "../../services/backend/backend.service";
import { ActionTypes, GetList, GetListSuccess, GetListFailure } from "./users";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { UserModel, DataListModel } from "./users.model";
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private backendService: BackendService) { }
  public getUsers = createEffect(() => {
    return this.actions.pipe(
      ofType<GetList>(ActionTypes.GetUsers),
      switchMap(action => {
        return this.backendService.getUserList().pipe(
          map((res: UserModel[]) => {
            return new GetListSuccess(res);
          }),
          catchError(err => of(new GetListFailure({ code: err.status, reason: err.message })))
        );
      })
    )
  })

}
