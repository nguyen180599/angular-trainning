import { Component, OnInit } from '@angular/core';
import {Account, createAccount} from '../../core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import {Accounts} from '../../core/data/account';
import {AccountService} from '../../core/services/account.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  account: Account = {
    _id: '',
    account_number: '',
    balance: 0,
    age: 0,
    firstname: '',
    lastname: '',
    gender: '',
    address: '',
    employer: '',
    email: '',
    city: '',
    state: '',
  };
  unSubscribeAll: Subject<any>;
  constructor(private router: Router, private accountService: AccountService) {
    this.unSubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
  }
  saveNew(): void {
    const newAccount = createAccount({
      ...this.account
    });
    this.accountService
      .addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          alert('Thêm mới thành công');
          this.router.navigate(['/']);
          console.log(this.account);
        },
        (err: Error) => {
          alert('Thất bại');
        }
      );
  }
}
