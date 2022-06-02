import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {fakeBackendProvider} from './core/services/fake-backend';
import {AccountService} from './core/services/account.service';
import {HttpClientModule} from '@angular/common/http';
import { ShowAccountComponent } from './show-account/show-account.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import { AddEditDeleteComponent } from './add-edit-delete/add-edit-delete.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { TableComponent } from './show-account/table/table.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    ShowAccountComponent,
    AddEditDeleteComponent,
    TableComponent
  ],
  entryComponents: [
    AddEditDeleteComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}
