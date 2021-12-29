import { Component, OnInit } from '@angular/core';
import {AccountService} from '../core/services/account.service';
import {Observable, Subject} from 'rxjs';
import {Account, createAccount, createParamSearch} from '../core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import {Accounts} from '../core/data/account';
import * as faker from 'faker';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-account',
  templateUrl: './show-account.component.html',
  styleUrls: ['./show-account.component.scss']
})
export class ShowAccountComponent implements OnInit {
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';
  p = 1;
  list = 25;
  wantShow = 500;
  constructor(private accountService: AccountService, private router: Router) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }


  getAllAccount(): void {
    this.accountService.getAccounts(createParamSearch({
      last_name: this.searchStr,
      start: 0,
      limit: this.wantShow
    }))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.account = resp;
      }, (err: Error) => {
        this.account = [];
      });
  }

  deleteAccount(acc: Account): void {
    // console.log("xoa" + acc._id);
    this.accountService.deleteAccount(acc)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        // angular.module('', [require('angular-messages')]);
        this.getAllAccount();
      }, (err: Error) => {
        alert('Cannot found');
      });
  }

  search(): void {
    this.getAllAccount();
  }
}
