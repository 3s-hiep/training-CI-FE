import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { HeaderModule } from "./header.module";

import { LanguageService } from "../../services/language/language.service";
import { TranslateModule } from "@ngx-translate/core";
import { APP_BASE_HREF } from "@angular/common";
class LanguageServiceMock {}
storiesOf("Components | Organisms/Header", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [HeaderModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: LanguageService, useClass: LanguageServiceMock },
      ],
    }),
  )
  .add("usage", () => ({
    template: `
      <cie-header
        [isUserMenuOpened]="isUserMenuOpened"
        (changedTab)="changedTab($event)"
        (clickedTitle)="clickedTitle($event)"
        (clickedUserIcon)="clickedUserIcon($event)"
        (selectedUserMenu)="selectedUserMenu($event)"
        [userMenus]="userMenus"
        [title]="title"
      ></cie-header>
    `,
    props: {
      isUserMenuOpened: boolean("isUserMenuOpened", false),
      changedTab: action("changedTab"),
      clickedTitle: action("clickedTitle"),
      clickedUserIcon: action("clickedUserIcon"),
      selectedUserMenu: action("selectedUserMenu"),
      tabs: ["assets", "package", "setting"],
      userMenus: ["Logout", "Change Password"],
      title: "CI-Enterprise",
    },
  }));
