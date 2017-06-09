import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Point } from './point';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


class User {
	login : string;
    password : string;
    constructor(login : string, password : string){
    	this.login = login; this.password = password;
    }
}

@Injectable()
export class DataService{
	private apiUrl = 'api/points';
	private nullUser : User = new User('', '');
	private currentUser : User = this.nullUser;
	private login : string;
    private password : string;
    private imageUrl : string = 'https://se.ifmo.ru/~s207529/areas.png';
    private points : Point[] = [];
    private users : User[] = [{
    	login : 'gulyaev13',
    	password : '12345'
    },{
    	login : 'asdfasdf',
    	password : 'qwerty'
    }];

    constructor(private http : Http){}

    print(msg : any) : Point[] {
        console.log("msg: ", msg);
        console.log("\nJSON: ", msg.json());
        console.log("\nmsg: ", msg.json().data);
        return [];
    }
    getPointsLocal() : Point[]{
        return this.points;
    }
    getPoints(): Promise<Point[]> {
    	return this.http.get('/points').toPromise()
    									.then(res => res.json())
    									.then(points => this.points = points)
    									.catch(this.handleError);
    }

    addPoint(x : number, y : number, r : number){
    	let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    	let options = new RequestOptions({ headers });
        let params = new URLSearchParams();
        params.set('x', x.toString());
        params.set('y', y.toString());
        params.set('r', r.toString());
    	let point  = new Point(x, y, r);
    	this.http.post('/point', params.toString(), options).toPromise()
    												.then(res => res.json())
    												.then(point => this.points.push(point))
    												.catch(this.handleError);
    }

    deletePoints() /*: Observable<any>*/ {
    	return this.http.delete('/delete')
        .subscribe(
            res => {
                if(res.status === 200){
                    //return this.points = [];
                    this.points.length = 0;
                }
            },
            error => {
                if(error.status === 403){
                    console.log(error);
                }
            },
            () => {return Observable.throw('ok');}
        );
    }

    getImageUrl(){
        console.log('get image url');
    	return this.http.get('/image');
    }

    charngeRadius(r : number){
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers });
        let params = new URLSearchParams();
        params.set('r', r.toString());
        return this.http.post('/imageR', params.toString(), options);
    }

    registrate(login : string, password : string) : Observable<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers });
        let params = new URLSearchParams();
        let str : string;
        let result : boolean = true;
        params.set('login', login);
        params.set('password', Md5.hashStr(password, false).toString());
        return this.http.post('/registrate', params.toString(), options);
    }

    checkLogin(login : string, password : string) : Observable<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers });
        let params = new URLSearchParams();
        let result : boolean = true;
        let str : string;
        params.set('login', login);
        params.set('password', Md5.hashStr(password, false).toString());
        return this.http.post('/login', params.toString(), options);
    }
    logout(){
        this.http.get('/logout').toPromise()
                                .then(res => this.currentUser = this.nullUser)
                                .catch(this.handleError);
    }

    isLogin(): Observable<any> {
        return this.http.get('/is_login');
    }

    private handleError(error : any){
    	console.error('Произошла ошибка', error);
    	return Promise.reject(error.message || error);
    }
}