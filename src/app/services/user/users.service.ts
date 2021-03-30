import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserModel } from 'src/app/stores/users/users.model';
import { usersSelector } from '../../stores/users/user.selector';
import { GetList } from '../../stores/users/users'
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public store: Store) { }

  // fetch users: dispatch action
  public fetchDataUsers() {
    return this.store.dispatch(new GetList())
  }

  public getDataUsers() {
    return this.store.pipe(select(usersSelector))
  }
}
