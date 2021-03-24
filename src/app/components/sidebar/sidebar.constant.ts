import { sidebar } from "../../../assets/i18n/tokens.json";
import { INavItem } from "./sidebar.component.i";

export const dataListSideBar: INavItem[] = [
  {
    displayName: sidebar.dashBoard,
    route: "",
    isChildren: false,
  },
  {
    displayName: sidebar.monitoring,
    isChildren: false,
    children: [
      {
        displayName: sidebar.inventory,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.deviceEvent,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.deviceError,
        route: "",
        isChildren: true,
      },
    ],
  },
  {
    displayName: sidebar.reports,
    isChildren: false,
    children: [
      {
        displayName: sidebar.sales,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.transactionHistory,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.cashBook,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.inventory,
        route: "",
        isChildren: true,
      },
    ],
  },
  {
    displayName: sidebar.configuration,
    isChildren: false,
    children: [
      {
        displayName: sidebar.list,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.deployment,
        route: "",
        isChildren: true,
      },
    ],
  },
  {
    displayName: sidebar.ciServerManagement,
    isChildren: false,
    children: [
      {
        displayName: sidebar.user,
        route: "",
        isChildren: true,
      },
      {
        displayName: sidebar.distribution,
        route: "",
        isChildren: true,
      },
    ],
  },
];
