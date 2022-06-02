import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AccountService} from '../core/services/account.service';
import {Account, createAccount, createParamSearch} from '../core/model/account.model';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AddEditDeleteComponent} from "../add-edit-delete/add-edit-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {flip} from "ngx-bootstrap/positioning/modifiers";
import {LoadData, TableComponent} from "./table/table.component";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-show-account',
  templateUrl: './show-account.component.html',
  styleUrls: ['./show-account.component.scss']
})
export class ShowAccountComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  listColumn = ['stt', 'name', 'age', 'email', 'address', 'gender', 'action'];
  account: Account[] = [];
  filter = {
    last_name: '',
    first_name: '',
    gender: '',
    email: '',
    address: '',
  };
  isLoading = false;
  pagingMode = 'paging';
  total!: number;
  totalRow = 1000;
  isFilter = false;

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    // this.getAllAccount();
    this.total = this.totalRow;
  }

  getAllAccount(key: string): void {
    this.accountService.getAccounts(createParamSearch({
      ...this.filter,
      start: 0,
      limit: this.totalRow
    })).pipe(delay(500))
      .subscribe((res: Account[]) => {
        this.account = res;
        this.isLoading = false;
        if (key !== '') {
          this.snackBarToart(key);
        }
      }, (err: Error) => {
        this.account = [];
      });
  }

  onLoaded($event: LoadData): void {
    if ($event.value) {
      this.isLoading = true;
      this.getAllAccount($event.key);
    }
    // console.log($event)
  }

  snackBarToart(key: string): void {
    this.snackBar.open(`${key.toUpperCase()} SUCCESS!`, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['bg-info', 'p-4', 'text-light']
    });
  }

  // @ts-ignore
  openAddDialog(key: string): void {
    const dialogRef = this.dialog.open(AddEditDeleteComponent, {
      data: key === 'filter' ? {action: key, el: this.filter} : {action: key},
      panelClass: ['w-50']
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'success') {
        this.snackBarToart('add account');
      } else {
        if (res) {
          this.filter = res;
        } else {
          this.filter = {
            last_name: '',
            first_name: '',
            gender: '',
            email: '',
            address: '',
          };
        }
        this.getAllAccount('');
      }
    });
  }

}
