export class Constant {
  public static title = "CI-Enterprise";
  public static pages = [];
  public static userMenus = ["Logout"];
  public static iconPath = "assets/img/icons/";

  public static readonly APPLICATION_ID = 5;
  public static readonly SESSION_KEY = "connect.sid";
  public static readonly LANG_SETTING_KEY = "language";

  // Error level case & color
  public static errorLevel = {
    critical: { case: "critical", color: "red" },
    warning: { case: "warning", color: "yellow" },
    info: { case: "info", color: "blue" },
  };
}

export class Icons {
  // url
  public static datePicker = { url: Constant.iconPath + "calendar-day-solid.svg", alt: "date picker" };
  public static angleDoubleLeft = { url: Constant.iconPath + "angle-double-left-solid.svg", alt: "Previous Year" };
  public static angleLeft = { url: Constant.iconPath + "angle-left-solid.svg", alt: "Previous Month" };
  public static angleRight = { url: Constant.iconPath + "angle-right-solid.svg", alt: "Next Month" };
  public static angleDoubleRight = { url: Constant.iconPath + "angle-double-right-solid.svg", alt: "Next Year" };
  public static phone = { url: Constant.iconPath + "phone-volume-solid.svg", alt: "" };
  public static user = { url: Constant.iconPath + "user.svg", alt: "User Menu" };
  public static sort = { url: Constant.iconPath + "sort-solid.svg", alt: "sort" };
  public static filterClose = { url: Constant.iconPath + "angle-double-left-solid.svg", alt: "filter close" };
  public static filterOpen = { url: Constant.iconPath + "angle-double-right-solid.svg", alt: "filter open" };
  public static timePicker = { url: Constant.iconPath + "clock-regular.svg", alt: "time picker" };
  public static angleLeftPage = { url: Constant.iconPath + "angle-left-solid.svg", alt: "Previous Page" };
  public static angleRightPage = { url: Constant.iconPath + "angle-right-solid.svg", alt: "Next Page" };
  public static accordion = { url: Constant.iconPath + "chevron-down-solid.svg", alt: "accordion" };

  // icon
  public static uploading = { icon: "uploading", src: "assets/img/icons/spinner-solid.svg" };
  public static validating = { icon: "validating", src: "assets/img/icons/spinner-solid.svg" };
  public static complete = { icon: "complete", src: "assets/img/icons/check-circle-regular.svg" };
  public static ng = { icon: "NG", text: "error", src: "assets/img/icons/times-circle-regular.svg" };
  public static error = { icon: "error", text: "error", src: "assets/img/icons/times-circle-regular.svg" };
  public static failure = { icon: "failure", text: "failure", src: "assets/img/icons/times-circle-regular.svg" };
  public static invalid = { icon: "invalid", text: "failure", src: "assets/img/icons/times-circle-regular.svg" };
  public static critical = { icon: "critical", text: "error", src: "assets/img/icons/times-circle-regular.svg" };
  public static information = { icon: "information", text: "information", src: "assets/img/icons/info-circle-solid.svg" };
  public static warning = { icon: "warning", text: "caution", src: "assets/img/icons/exclamation-triangle-solid.svg" };
  public static inProgress = { icon: "inProgress", text: "in progress", src: "assets/img/icons/spinner-solid.svg" };
  public static scheduled = { icon: "scheduled", text: "scheduled", src: "assets/img/icons/clock-regular.svg" };
  public static arrows = { icon: "arrows", text: "arrows", src: "assets/img/icons/arrows-alt-v-solid.svg" };
  public static arrowDown = { icon: "arrowDown", text: "arrowDown", src: "assets/img/icons/long-arrow-alt-down-solid.svg" };
  public static arrowUp = { icon: "arrowUp", text: "arrowUp", src: "assets/img/icons/long-arrow-alt-up-solid.svg" };
  public static info = { icon: "info", text: "info", src: "assets/img/icons/info-circle-solid.svg" };
  public static deleted = { icon: "deleted", text: "deleted", src: "assets/img/icons/times-circle-regular.svg" };
}
