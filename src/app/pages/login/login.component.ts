import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { APP_NAME, COMPANY_NAME } from '../../app.constants';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.compnent.html',
  styles: `
   .divider {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;

      mat-divider {
        width: 35%;
      }
    }
  `,
})
export default class LoginComponent {
  appName = APP_NAME;
  companyName = COMPANY_NAME;
  date = new Date();
  loginWithGoogle() {}
}
