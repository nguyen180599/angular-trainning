import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Account} from "../../core/model/account.model";
import {MatPaginator} from "@angular/material/paginator";
import {AddEditDeleteComponent} from "../../add-edit-delete/add-edit-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
export interface LoadData {
  value: boolean;
  key: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnChanges {
  @Input() row!: Account[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {read: MatSort, static: true}) sort!: MatSort;
  @Input() column!: string[];
  @Input() total!: number;
  @Output() isLoaded: EventEmitter<LoadData> = new EventEmitter<LoadData>();
  @Input() pagingMode = 'paging';

  dataSource!: MatTableDataSource<Account>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.isLoading) {
    //   this.isLoading = changes.isLoading.currentValue;
    // }
    if (changes.column) {
      this.column = changes.column.currentValue;
    }

    if (changes.row) {
      this.dataSource = new MatTableDataSource<Account>(this.row);
      this.dataSource.sort = this.sort;
      if (this.pagingMode === 'paging') {
        this.dataSource.paginator = this.paginator;
      }
    }

    if (changes.total) {
      if (!changes.total.firstChange){
        this.isLoaded.emit({value: true, key: ''});
      }
    }

    if (changes.pagingMode) {
      this.pagingMode = changes.pagingMode.currentValue;
      this.isLoaded.emit({value: true, key: ''});
      // this.dataSource = new MatTableDataSource<Account>(this.row);
      // if (this.pagingMode === 'paging') {
      //   this.isLoaded.emit(true);
      // }
    }
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  openDialog(el?: Account, key: string): void {
    const dialogRef = this.dialog.open(AddEditDeleteComponent, {
      data: {
        item: el,
        action: key
      },
      panelClass: ['w-50']
    });

    dialogRef.afterClosed().subscribe((res: string) => {
      if (res === 'success') {
        // this.getAllAccount();
        this.isLoaded.emit({value: true, key});
      }
    });
  }
}
