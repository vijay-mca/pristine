import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CompetitionsListingComponent } from './component/competitions-listing/competitions-listing.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ViewCompetitionComponent } from './component/view-competition/view-competition.component';
import { CartComponent } from './component/cart/cart.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { CmsComponent } from './component/cms/cms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'competition-listing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    data: { title: 'My Profile' },
  },
  {
    path: 'competition-listing',
    component: CompetitionsListingComponent,
    data: { title: 'Competition Listing' },
  },
  {
    path: 'view-competition/:pro_id',
    component: ViewCompetitionComponent,
    data: { title: 'View Competition' },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart' },
  },
  {
    path: 'cms/:cms_id',
    component: CmsComponent,
    data: { title: 'CMS' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: '404 Page Not Found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
