import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
    selector: 'login',
    template: `
<table>
    <tr>
        <th>
            <form (submit)="navigate($event)">
        	    <p>Логин:</p>
                <p><input type="text" name="login" [(ngModel)]="login" placeholder=" Логин"></p>
                <p id="login_fail">{{ loginMsg }}</p>
        	    <p>Пароль:</p>
                <p><input type="password" name="password" [(ngModel)]="password" placeholder=" Пароль" autocomplite="false"></p>
                <p id="password_fail">{{ passwordMsg }}</p>
                <p id="login_fail">{{ errorMsg }}</p>
        	    <p>
                    <input type="submit" value="Войти" (click)="setNowLogin(true)" onclick="this.blur()"> 
                    <input type="submit" value="Зарегестрироваться" (click)="setNowLogin(false)" onclick="this.blur()">
                <p>
            </form>
        </th>
    </tr>
</table>`
})
export class LoginComponent {
    login : string = '';
    password : string = '';
    errorMsg : string = '';
    loginMsg : string = '';
    passwordMsg : string = '';
    nowLogin : boolean;
    constructor(private router: Router, private dataService: DataService){}
    navigate(event : Event){
        let flag : boolean = true;
        event.preventDefault();
        if(this.login.trim().length == 0){
            flag = false;
            this.loginMsg = 'Введите логин';
        }
        if(this.password.trim().length == 0){
            flag = false;
            this.passwordMsg = 'Введите пароль';
        }
        if(flag){
            if(this.nowLogin){
                this.doLogin();
            } else {
                this.doRegistrate();
            }
        }
    }
    setNowLogin(nowLogin : boolean){
        this.nowLogin = nowLogin;
    }
    doLogin(){
        console.log('вход');
        this.dataService.checkLogin(this.login, this.password)
        .subscribe(
            data => {
                if(data.status === 200){
                    console.log('OK');
                    this.router.navigate(['/main']);
                }
            },
            error => {
                console.log('Error 403');
                if(error.status == 403){
                    this.errorMsg = 'Неправильный логин или пароль!';
                }
            },
            () => {}
        );
    }
    doRegistrate(){
        console.log('регестрация');
        this.dataService.registrate(this.login, this.password)
        .subscribe(
            data => {
                if(data.status === 200){
                    console.log('OK');
                    this.doLogin();
                }
            },
            error => {
                console.log('Error 403');
                if(error.status === 403){
                    this.errorMsg = 'Пользователь с таким именем уже существует!';
                }
            },
            () => {}
        );
    }
}