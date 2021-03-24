import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { environment } from "../environments/environment";
import { MasterComponent } from "./components/master/master.component";
import { AuthGuard } from "./guards/auth.guard";
import { UsersPageComponent } from "./pages/users-page/users-page.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "users",
        pathMatch: "full",
      },
      {
        path: "logout",
        redirectTo: "/users",
      },
      {
        path: "login",
        redirectTo: "/users",
      },
      {
        path: "users",
        component: UsersPageComponent,
      },
    ],
    canActivate: [AuthGuard],
    runGuardsAndResolvers: "always",
    component: MasterComponent,
  },

  {
    path: "**",
    redirectTo: "/users",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: !environment.production, relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
