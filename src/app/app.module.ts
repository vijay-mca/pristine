import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CompetitionsListingComponent } from './component/competitions-listing/competitions-listing.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ViewCompetitionComponent } from './component/view-competition/view-competition.component';
import { CartComponent } from './component/cart/cart.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { CmsComponent } from './component/cms/cms.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { ConnectionServiceModule } from 'ng-connection-service';
import { InternetComponent } from './component/internet/internet.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CompetitionsListingComponent,
    NotFoundComponent,
    ViewCompetitionComponent,
    CartComponent,
    MyAccountComponent,
    CmsComponent,
    SpinnerComponent,
    InternetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConnectionServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
