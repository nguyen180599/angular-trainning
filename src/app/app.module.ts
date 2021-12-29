import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {fakeBackendProvider} from './core/services/fake-backend';
import {AccountService} from './core/services/account.service';
import {HttpClientModule} from '@angular/common/http';
import { ShowAccountComponent } from './show-account/show-account.component';
import { AddComponent } from './form-controls/add/add.component';
import { EditComponent } from './form-controls/edit/edit.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, NgxPaginationModule],
  declarations: [AppComponent, ShowAccountComponent, AddComponent, EditComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}
