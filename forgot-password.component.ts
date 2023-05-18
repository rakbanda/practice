import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService:AccountService 
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          rePassword: ['', Validators.required]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      if(this.form.value.password != this.form.value.rePassword){
        alert("Passwords Doesn't match")
        return;
      }
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.login(this.form.value.username, this.form.value.password)
          .pipe(first())
          .subscribe({
              next: () => {
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigateByUrl(returnUrl);
              },
              error:( error) => {
                  this.loading = false;
              }
          });
  }
}
