import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../core/services/account.service";

@Component({
  selector: 'app-add-edit-delete',
  templateUrl: './add-edit-delete.component.html',
  styleUrls: ['./add-edit-delete.component.scss']
})
export class AddEditDeleteComponent implements OnInit {
  formAccount!: FormGroup;
  filterForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEditDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    if (this.data.action === 'add') {
      this.formAdd();
    } else if (this.data.action === 'edit' || this.data.action === 'view') {
      this.formEdit();
      if (this.data.action === 'view') {
        this.formAccount.disable();
      }
    } else if (this.data.action === 'filter') {
      this.formFilter();
    }
  }

  formAdd(): void {
    this.formAccount = this.fb.group({
      _id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      gender: '',
      address: ['', Validators.required],
      employer: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern(
        '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
      )],
      ],
      city: [''],
      state: [''],
    });
  }

  formEdit(): void {
    this.formAccount = this.fb.group({
      _id: [this.data.item._id],
      firstname: [this.data.item.firstname, Validators.required],
      lastname: [this.data.item.lastname, Validators.required],
      age: [this.data.item.age, [Validators.required, Validators.min(18)]],
      gender: this.data.item.gender,
      address: [this.data.item.address, Validators.required],
      employer: [this.data.item.employer],
      email: [this.data.item.email, [Validators.required, Validators.email, Validators.pattern(
        '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
      )],
      ],
      city: [this.data.item.city],
      state: [this.data.item.state],
    });
  }

  formFilter(): void {
    this.filterForm = this.fb.group({
      first_name: [this.data.el.first_name],
      last_name: [this.data.el.last_name],
      gender: [this.data.el.gender],
      address: [this.data.el.address],
      email: [this.data.el.email]
    });
  }

  submit(): void {
    switch (this.data.action) {
      case 'add':
        this.add();
        break;
      case 'edit':
        this.edit();
        break;
      case 'delete':
        this.delete();
        break;
      case 'filter':
        this.filter();
        break;
    }
  }

  add(): void {
    this.accountService.addAccount(this.formAccount.value).subscribe(() => {
      this.dialogRef.close('success');
    });
  }

  edit(): void {
    this.accountService.editAccount(this.formAccount.value).subscribe(() => {
      this.dialogRef.close('success');
    });
  }

  delete(): void {
    this.accountService.deleteAccount(this.data.item).subscribe(() => {
      this.dialogRef.close('success');
    });
  }

  filter(): void {
    this.dialogRef.close(this.filterForm.value);
  }
}
