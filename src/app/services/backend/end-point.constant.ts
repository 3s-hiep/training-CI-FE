import { environment } from "../../../environments/environment";

export default class EndPoint {
  public static readonly LOGIN = `${environment.endpoints.bff}/login`;
  public static readonly GET_TOKEN = `${environment.endpoints.bff}/token`;
  public static readonly USER_INFO = `${environment.endpoints.bff}/userinfo`;
  public static readonly FIRST_LOGIN = `${environment.endpoints.bff}/applicationFirstLogin`;
  public static readonly CHANGE_PASSWORD = `${environment.endpoints.bff}/changePassword`;
  public static readonly LOG_OUT = `${environment.endpoints.bff}/logout`;
  public static readonly USER_SETTING = `${environment.endpoints.bff}/userSettings`;
}
