import {Component, OnInit, VERSION} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {AccountService} from './core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  title: '' | undefined;
  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }
}
