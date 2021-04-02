import { NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import localeEn from "@angular/common/locales/en";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule, RouterState } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { ToastrModule } from "ngx-toastr";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "../app/app-routing.module";
import { AppComponent } from "../app/app.component";
import { ComponentsModule } from "./components/components.module";
import { BaseModule } from "./plugins/base.module";
import { metaReducers, REDUCER_TOKEN, getReducers } from "./stores";
import { CredentialsService } from "./services/credentials/credentials.service";
import { NotificationService } from "./services/notification/notification.service";
import { MasterModule } from "./components/master/master.module";
import { TranslateService, TranslateStore } from "@ngx-translate/core";
import { UserPageModule } from "./pages/users-page/users-page.module";
import { UsersEffects } from "./stores/users/users.effects";

registerLocaleData(localeEn);

const DebugModules = environment.production
  ? []
  : [StoreDevtoolsModule.instrument({ name: "CashInsight CI-Enterprise" })];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    StoreModule.forRoot(REDUCER_TOKEN, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: !environment.production,
        strictActionSerializability: !environment.production,
        strictStateImmutability: !environment.production,
        strictStateSerializability: !environment.production,
      },
    }),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    EffectsModule.forRoot([UsersEffects]),
    ...DebugModules,
    BaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MasterModule,
    UserPageModule,
  ],
  providers: [
    TranslateService,
    TranslateStore,
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
