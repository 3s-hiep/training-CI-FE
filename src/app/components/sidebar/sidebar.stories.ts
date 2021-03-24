import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { withKnobs } from "@storybook/addon-knobs";
import { moduleMetadata, storiesOf } from "@storybook/angular";
import { SideBarModule } from "./sidebar.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { INavItem } from "./sidebar.component.i";
import { TranslateModule } from "@ngx-translate/core";

const navItems: INavItem[] = [
  {
    displayName: "DashBoard",
    route: "",
    isChildren: false,
  },
  {
    displayName: "Monitoring",
    isChildren: false,
    children: [
      {
        displayName: "Inventory",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Device Event",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Device Error",
        route: "",
        isChildren: true,
      },
    ],
  },
  {
    displayName: "Reports",
    isChildren: false,
    children: [
      {
        displayName: "Sales",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Transaction History",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Cash Book",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Inventory",
        route: "",
        isChildren: true,
      },
    ],
  },
  {
    displayName: "Configuration",
    isChildren: false,
    children: [
      {
        displayName: "List",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Deployment",
        route: "",
        isChildren: true,
      },
    ],
  },
  {
    displayName: "CI-Server Management",
    isChildren: false,
    children: [
      {
        displayName: "User",
        route: "",
        isChildren: true,
      },
      {
        displayName: "Distribution",
        route: "",
        isChildren: true,
      },
    ],
  },
];

storiesOf("Components | Molecules/SideBar", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [SideBarModule, MatListModule, MatSidenavModule, TranslateModule.forRoot(), RouterModule.forRoot([], { useHash: true })],
    }),
  )
  .add("usage", () => ({
    template: `
       <div
        style="width: 18.75rem;
        height: 100%;
        background: #d1d5e0 0% 0% no-repeat padding-box;
        opacity: 1;
        min-height: 100vh;"
       ><cie-sidebar [items]="dataListSideBar" [isExpanded]="true"></cie-sidebar></div>
       `,
    props: {
      dataListSideBar: navItems,
    },
  }));
