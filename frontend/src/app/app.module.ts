import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/header/registrationpage/registrationpage.component';
import { LoginComponent } from './components/header/loginpage/loginpage.component';
import { LogoutComponent } from './components/header/logout/logout.component';
import { ChatwidgetComponent } from './components/chatsystem/chatwidget/chatwidget.component';
import { FriendlistComponent } from './components/chatsystem/friendlist/friendlist.component';
import { HeaderComponent } from './components/header/header.component';
import { FriendComponent } from './components/chatsystem/friendlist/friend/friend.component';
import { MapComponent } from './components/map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { registrationComponent } from './components/header/registrationpage/registrationpage.component';
import { loginComponent } from './components/header/loginpage/loginpage.component';
import { ChatsystemComponent } from './components/chatsystem/chatsystem.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/header/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { PropretyComponent } from './components/header/profile/proprety/proprety.component';
import { MatRadioModule } from '@angular/material/radio';
import { ResizableModule  } from 'angular-resizable-element';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { AccountComponent } from './components/sidebar/account/account.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent,
    ChatwidgetComponent,
    FriendlistComponent,
    HeaderComponent,
    FriendComponent,
    MapComponent,
    registrationComponent,
    loginComponent,
    ChatsystemComponent,
    SidebarComponent,
    ProfileComponent,
    PropretyComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    ResizableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
