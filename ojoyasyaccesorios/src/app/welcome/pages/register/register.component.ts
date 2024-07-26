import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) {}

  get name() {
    return this.form_register_user.get('name') as FormControl;
  }

  get last_name() {
    return this.form_register_user.get('last_name') as FormControl;
  }

  get phone() {
    return this.form_register_user.get('phone') as FormControl;
  }

  get email() {
    return this.form_register_user.get('email') as FormControl;
  }

  get address() {
    return this.form_register_user.get('address') as FormControl;
  }

  get password() {
    return this.form_register_user.get('password') as FormControl;
  }

  form_register_user = this.formBuilder.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    password: ['', [Validators.required]],
  });
}
