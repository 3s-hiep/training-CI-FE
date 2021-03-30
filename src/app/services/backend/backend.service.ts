import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { FirstLogin, Token, UserInfo } from "./backend.service.model";
import EndPoint from "./end-point.constant";
import { Observable } from 'rxjs';
import { UserModel, DataListModel } from "../../stores/users/users.model"

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(private http: HttpClient) {}

  /**
   * send GET requests to BFF Login endpoint
   * @param redirectUrl required URL to redirect after authentication
   */
  public getLogin(redirectUrl: string) {
    return this.http.get(`${EndPoint.LOGIN}?redirectUrl=${redirectUrl}`);
  }

  /**
   * send GET requests to BFF Token endpoint
   * @param  applicationId required Type of Application ID
   * @param redirectUrl required URL to redirect after authentication
   * @param code Authorization code (OAuth2 grant type = authorization_code)
   */
  public getUrlToken(
    applicationId: string | number,
    redirectUrl: string,
    code?: string
  ) {
    return this.http.get<Token>(
      `${
        EndPoint.GET_TOKEN
      }?applicationId=${applicationId}&redirectUrl=${redirectUrl}${
        (code && `&code=${code}`) || ""
      }`
    );
  }

  /**
   * send GET requests to BFF UserInfo endpoint
   * @param applicationId required Type of Application ID
   */
  public getUserInfo(applicationId: number) {
    return this.http.get<UserInfo>(
      `${EndPoint.USER_INFO}?applicationId=${applicationId}`
    );
  }

  /**
   * send PUT requests to BFF FirstLogin endpoint
   * @param applicationId required Type of Application ID
   */
  public putFirstLoginUser(firstLogin: FirstLogin) {
    return this.http.put<FirstLogin>(`${EndPoint.FIRST_LOGIN}`, firstLogin);
  }

  /**
   * send POST requests to BFF ChangePassword
   */
  public postChangePassword(email: string) {
    return this.http.post(EndPoint.CHANGE_PASSWORD, { email });
  }

  /**
   * send POST requests to BFF Logout
   */
  public postLogout() {
    return this.http.post<any>(EndPoint.LOG_OUT, {});
  }

  /**
   * send PUT requests to UserSettings endpoint
   * @param data required type object
   * @param settingKey required string key
   * @param applicationId required Type of Application ID
   */
  public putUserSettings(
    data: any,
    settingKey: string,
    applicationId: number | string
  ) {
    return this.http.put<any>(
      `${EndPoint.USER_SETTING}/${settingKey}?applicationId=${applicationId}`,
      data
    );
  }

  public getUserList(): Observable<UserModel[]> {
    // const url = 'https://5d8db435370f02001405c26a.mockapi.io/users';
    const url = 'http://localhost:3000/users';
    return this.http.get<UserModel[]>(url);
  }
}
