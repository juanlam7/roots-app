import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15)]),
  });

  constructor(private authService: AuthService, 
              private _router: Router) {}

  ngOnInit(): void {
  }

  async onLogin() {
    // init loading
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((resp)=>{
      console.log(resp)
      // dismiss loading
      if(resp.access_token) {
        localStorage.setItem('Token', resp.access_token);
        this._router.navigate(['/auth/map']);
      } else {
        // alerta
        this.loginForm.reset();
      }
    }, (err) => {
      console.log(err)
      // dismiss loading
      this.loginForm.reset();
    });
  }

}
