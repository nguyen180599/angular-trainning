import {HttpBackend, HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, filter, catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Account, ParamSearch} from '../model/account.model';
import {FormGroup} from "@angular/forms";

@Injectable()
export class AccountService {
  // tslint:disable-next-line:variable-name

  constructor(private http: HttpClient) {
  }

  public isAdd = false;
  public isEdit = false;
  accountSubject = new BehaviorSubject<any>({});

  getAccounts(param: ParamSearch): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', param.limit.toString().toLowerCase());
    params = params.append('start', param.start.toString().toLowerCase());
    params = params.append('_id', param._id ? param._id.toString().toLowerCase() : '');
    params = params.append('last_name', param.last_name ? param.last_name.toString().toLowerCase() : '');
    params = params.append('first_name', param.first_name ? param.first_name.toString().toLowerCase() : '');
    params = params.append('gender', param.gender ? param.gender.toString().toLowerCase() : '');
    params = params.append('email', param.email ? param.email.toString().toLowerCase() : '');
    params = params.append('address', param.address ? param.address.toString().toLowerCase() : '');
    return this.http.get<Account[]>('/accounts', {
      params
    });
  }

  addAccount(acc: Account): Observable<any> {
    return this.http.post('/accounts', acc);
  }

  editAccount(acc: Account): Observable<any> {
    return this.http.put('/accounts/' + acc._id, acc);
  }

  deleteAccount(acc: Account): Observable<any> {
    return this.http.delete('/accounts/' + acc._id);
  }
}
