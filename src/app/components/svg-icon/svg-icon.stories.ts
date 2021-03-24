import { storiesOf, moduleMetadata } from "@storybook/angular";
import { FlexLayoutModule } from "@angular/flex-layout";
import { withKnobs } from "@storybook/addon-knobs";

import { Icons } from "../../app.constant";
import { SvgIconModule } from "./svg-icon.module";

storiesOf("Components | Atoms/SVGIcon", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [FlexLayoutModule, SvgIconModule],
    }),
  )
  .add("usecase", () => ({
    template: `
      <div fxLayout="column" fxLayoutGap="2px">
        <cie-svg-icon fxFlex="100%"[url]="calendar.url" [alt]="calendar.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleDoubleLeft.url" [alt]="angleDoubleLeft.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleDoubleRight.url" [alt]="angleDoubleRight.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleLeft.url" [alt]="angleLeft.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="filterClose.url" [alt]="filterClose.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="filterOpen.url" [alt]="filterOpen.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="red"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="green"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="yellow"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="blue"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="angleRight.url" [alt]="angleRight.alt" color="orange"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="sort.url" [alt]="sort.alt" ></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="phone.url" [alt]="phone.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[url]="user.url" [alt]="user.alt"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="critical.icon" [alt]="critical.icon" [text]="critical.icon"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="critical.icon" [alt]="critical.icon" [text]="critical.icon" color="red"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="info.icon" [alt]="info.icon" ></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="information.icon" [alt]="information.icon" ></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="warning.icon" [alt]="warning.icon"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="uploading.icon" [alt]="uploading.icon" [text]="uploading.icon"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="validating.icon" [alt]="validating.icon" [text]="validating.icon"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="complete.icon" [alt]="complete.icon" [text]="complete.icon"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="ng.icon" [alt]="ng.icon" [text]="ng.text"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="arrows.icon" [alt]="arrows.icon" [text]="arrows.text"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="arrowDown.icon" [alt]="arrowDown.icon" [text]="arrowDown.text"></cie-svg-icon>
        <cie-svg-icon fxFlex="100%"[icon]="arrowUp.icon" [alt]="arrowUp.icon" [text]="arrowUp.text"></cie-svg-icon>
      </div>
    `,
    props: {
      calendar: Icons.datePicker,
      angleDoubleLeft: Icons.angleDoubleLeft,
      angleDoubleRight: Icons.angleDoubleRight,
      filterOpen: Icons.filterOpen,
      filterClose: Icons.filterClose,
      angleLeft: Icons.angleLeft,
      angleRight: Icons.angleRight,
      uploading: Icons.uploading,
      validating: Icons.validating,
      complete: Icons.complete,
      ng: Icons.ng,
      critical: Icons.critical,
      information: Icons.information,
      warning: Icons.warning,
      sort: Icons.sort,
      phone: Icons.phone,
      user: Icons.user,
      arrows: Icons.arrows,
      arrowDown: Icons.arrowDown,
      arrowUp: Icons.arrowUp,
    },
  }));
