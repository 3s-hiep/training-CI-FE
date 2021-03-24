import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Constant } from "../../app.constant";
import { LanguageService } from "../../services/language/language.service";
import { TokenService } from "../../services/token/token.service";

import { header, changePassword as labelTokens } from "../../../assets/i18n/tokens.json";
import { LoadingService } from "../../components/loading/loading.service";
import { UserAuthService } from "../../services/user-auth/user-auth.service";

@Component({
  selector: "cie-master",
  templateUrl: "./master.component.html",
  styleUrls: ["./master.component.scss"],
})
export class MasterComponent implements OnInit {
  public title = header.appTitle;
  public tabs: Array<string>;
  public userMenus: Array<string>;
  public isUserMenuOpened = false;
  readonly labels: any = labelTokens;

  constructor(
    public router: Router,
    private languageService: LanguageService,
    private tokenService: TokenService,
    public loadingService: LoadingService,
    public userAuthService: UserAuthService,
  ) {}

  public ngOnInit() {
    this.userMenus = Constant.userMenus;
    this.languageService.enable();
  }

  public gotoPage(page: string) {
    this.router.navigate(["/" + page]);
  }

  public onSelectedUserMenu(event: string) {
    switch (event) {
      case "Logout":
        this.loadingService.open();
        this.userAuthService.postLogout$().subscribe(
          () => {
            this.tokenService.clear();
            this.loadingService.close();
            this.router.navigate(["/logout"]);
          },
          () => {
            this.loadingService.close();
          },
        );
        break;
      default:
        break;
    }
  }
}
