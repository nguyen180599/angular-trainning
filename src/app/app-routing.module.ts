import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowAccountComponent} from './show-account/show-account.component';
import {AddComponent} from "./form-controls/add/add.component";
import {EditComponent} from "./form-controls/edit/edit.component";


// import { ResolversDetailService } from './Resolvers/resolvers-detail.service';

const routes: Routes = [
  {
    path: '',
    component: ShowAccountComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
