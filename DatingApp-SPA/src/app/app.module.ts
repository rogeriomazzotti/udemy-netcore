import { MemberMessagesComponent } from "./members/member-messages/member-messages.component";
import { MessagesResolver } from "./_resolvers/messages.resolver";
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { AuthGuard } from "./_guards/auth.guard";
import { appRoutes } from "./routes";
import { AlertifyService } from "./_services/alertify.service";
import { AuthService } from "./_services/auth.service";
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxGalleryModule } from "ngx-gallery";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationModule,
  ButtonsModule
} from "ngx-bootstrap";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { UserService } from "./_services/user.service";
import { JwtModule } from "@auth0/angular-jwt";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { FileUploadModule } from "ng2-file-upload";
import { TimeAgoPipe } from "time-ago-pipe";
import { ListsResolver } from "./_resolvers/lists.resolver";
export function tokenGetter() {
  return localStorage.getItem("token");
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    ListsResolver,
    MessagesResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
