import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TokenService } from "../../services/token/token.service";
import { Constant, Icons } from "../../app.constant";
import { LanguageService } from "../../services/language/language.service";
@Component({
  selector: "cie-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() userMenus: Array<any>;
  @Input() isUserMenuOpened: boolean;
  @Output() clickedUserIcon = new EventEmitter<void>();
  @Output() clickedTitle = new EventEmitter<void>();
  @Output() selectedUserMenu = new EventEmitter<string>();

  public user = Icons.user;
  public userName = "";
  constructor(public language: LanguageService, public tokenService: TokenService) {}
  ngOnInit(): void {
    this.userName = this.tokenService.getUserInfo()?.displayName || "John Doe";
  }

  public onClickTitle() {
    this.clickedTitle.emit();
  }

  public onClickUserIcon() {
    this.clickedUserIcon.emit();
  }

  public onClickUserMenu(menu: string) {
    this.selectedUserMenu.emit(menu);
    this.isUserMenuOpened = false;
  }

  public onSetLang(lang: string) {
    this.language.setLang(lang);
    sessionStorage.setItem(Constant.LANG_SETTING_KEY, lang);
    this.tokenService.refresh();
    this.isUserMenuOpened = false;
  }
}
