import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowAccountComponent} from './show-account/show-account.component';

// import { ResolversDetailService } from './Resolvers/resolvers-detail.service';

const routes: Routes = [
  {
    path: '',
    component: ShowAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
