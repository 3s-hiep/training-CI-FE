import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetList } from '../../stores/users/users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public store: Store) { }

  // fetch users: dispatch action
  public fetchDataUsers() {
    return this.store.dispatch(new GetList())
  }
}
