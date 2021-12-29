import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../core/services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {createAccount, createParamSearch, Account} from "../../core/model/account.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  unSubscribeAll: Subject<any>;
  account: Account[] = [];

  constructor(private router: Router, private accountService: AccountService, private route: ActivatedRoute) {
    this.unSubscribeAll = new Subject<any>();
    // if (this.router.url.split('/')[1] === 'edit') {
    //   this.id = this.route.snapshot.params.id;
    //   this.isAdd = false;
    //   this.getAccountSelected();
    //
    // } else {
    //   this.id = '';
    //   this.isAdd = true;
    //   this.getAccountSelected();
    // }
  }
  id = '';
  selectedAccount!: Account;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getAccountSelected();
  }

  getAccountSelected(): void {
    this.accountService.getAccounts(createParamSearch({
      _id: this.id,
      start: 0,
      limit: 25
    }))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        if (resp.length > 1) {
          this.selectedAccount = this.account[0];
        } else {
          this.selectedAccount = resp[0];
        }

      }, (err: Error) => {
        alert('Cannot found');
      });
  }

  saveEdit(): void {
    // @ts-ignore
    const editedAccount = createAccount({
      ...this.selectedAccount
    });
    this.accountService.editAccount(editedAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          alert('Sửa thành công!');
          this.router.navigate(['/']);
        }, (err: Error) => {
          alert('Thất bại');
        });
  }

}
