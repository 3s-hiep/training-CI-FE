export interface INavItem {
  displayName: string;
  isChildren: boolean;
  route?: string;
  children?: INavItem[];
}
