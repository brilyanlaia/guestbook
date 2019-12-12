import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'event', loadChildren: './event/event.module#EventPageModule' },
  { path: 'admin-list', loadChildren: './admin/admin-list/admin-list.module#AdminListPageModule' },
  { path: 'admin-create', loadChildren: './admin/admin-create/admin-create.module#AdminCreatePageModule' },
  { path: 'event-list', loadChildren: './event/event-list/event-list.module#EventListPageModule' },
  { path: 'event-detail/:id', loadChildren: './event/event-detail/event-detail.module#EventDetailPageModule' },
  { path: 'event-create', loadChildren: './event/event-create/event-create.module#EventCreatePageModule' },
  { path: 'customer-list', loadChildren: './customer/customer-list/customer-list.module#CustomerListPageModule' },
  { path: 'customer-create', loadChildren: './customer/customer-create/customer-create.module#CustomerCreatePageModule' },
  { path: 'customer-detail/:id', loadChildren: './customer/customer-detail/customer-detail.module#CustomerDetailPageModule' },
  { path: 'admin-detail/:id', loadChildren: './admin/admin-detail/admin-detail.module#AdminDetailPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'table-detail/:id', loadChildren: './event/table-detail/table-detail.module#TableDetailPageModule' },
  { path: 'kursi-list/:id', loadChildren: './event/kursi-list/kursi-list.module#KursiListPageModule' },
  { path: 'kursi-detail/:id', loadChildren: './event/kursi-detail/kursi-detail.module#KursiDetailPageModule' },
  { path: 'check-in/:id', loadChildren: './event/check-in/check-in.module#CheckInPageModule' },
  { path: 'random/:id', loadChildren: './event/random/random.module#RandomPageModule' }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
