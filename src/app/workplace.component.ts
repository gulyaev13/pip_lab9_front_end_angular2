import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Point } from './point';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'workplace',
    template: `
<form #f="ngForm" (submit)="save($event)" >
	<div class="form_align">
	<div class="inline_blocks control_block">
		<div>
			<p>Выберите значение x:</p>
			<p>
				<input id="x_4" type="checkbox" [(ngModel)]="xCheckBoxes[0]" name="x_4" value="-4" (change)="setX(-4)" onclick="this.blur()">-4
	      	    <input id="x_3" type="checkbox" [(ngModel)]="xCheckBoxes[1]" name="x_3" value="-3" (change)="setX(-3)" onclick="this.blur()">-3
	      	    <input id="x_2" type="checkbox" [(ngModel)]="xCheckBoxes[2]" name="x_2" value="-2" (change)="setX(-2)" onclick="this.blur()">-2
	      	    <input id="x_1" type="checkbox" [(ngModel)]="xCheckBoxes[3]" name="x_1" value="-1" (change)="setX(-1)" onclick="this.blur()">-1
	      	    <input id="x0"  type="checkbox" [(ngModel)]="xCheckBoxes[4]" name="x0"  value="0"  (change)="setX(0)"  onclick="this.blur()">0
				<input id="x1"  type="checkbox" [(ngModel)]="xCheckBoxes[5]" name="x1"  value="1"  (change)="setX(1)"  onclick="this.blur()">1
	      	    <input id="x2"  type="checkbox" [(ngModel)]="xCheckBoxes[6]" name="x2"  value="2"  (change)="setX(2)"  onclick="this.blur()">2
	      	    <input id="x3"  type="checkbox" [(ngModel)]="xCheckBoxes[7]" name="x3"  value="3"  (change)="setX(3)"  onclick="this.blur()">3
	      	    <input id="x4"  type="checkbox" [(ngModel)]="xCheckBoxes[8]" name="x4"  value="4"  (change)="setX(4)"  onclick="this.blur()">4
			</p> 
			<p id="button_fail">{{ xErrorMsg }}<p>
		</div>
		<div>
			<p>Введите значение y(-5&le;y&le;5):</p>
			<p><input id="y" [(ngModel)]="yText" class="{{ textClass }}" name="y" type="text" (input)="setTextBorder(checkText())" requared></p>
			<p id="text_fail">{{ yErrorMsg }}<p>
		</div>
		<div>
			<p>Выберите значение R:</p>
			<p>
				<input id="r_4" type="checkbox" name="r_4" [(ngModel)]="rCheckBoxes[0]" value="-4" (change)="showErrorR(true); setR(-4)">-4
	      	    <input id="r_3" type="checkbox" name="r_3" [(ngModel)]="rCheckBoxes[1]" value="-3" (change)="showErrorR(true); setR(-3)">-3
	      	    <input id="r_2" type="checkbox" name="r_2" [(ngModel)]="rCheckBoxes[2]" value="-2" (change)="showErrorR(true); setR(-2)">-2
	      	    <input id="r_1" type="checkbox" name="r_1" [(ngModel)]="rCheckBoxes[3]" value="-1" (change)="showErrorR(true); setR(-1)">-1
	      	    <input id="r0"  type="checkbox" name="r0"  [(ngModel)]="rCheckBoxes[4]" value="0" (change)="showErrorR(true); setR(0)">0
				<input id="r1"  type="checkbox" name="r1"  [(ngModel)]="rCheckBoxes[5]" value="1" (change)="showErrorR(false); setR(1)">1
	      	    <input id="r2"  type="checkbox" name="r2"  [(ngModel)]="rCheckBoxes[6]" value="2" (change)="showErrorR(false); setR(2)">2
	      	    <input id="r3"  type="checkbox" name="r3"  [(ngModel)]="rCheckBoxes[7]" value="3" (change)="showErrorR(false); setR(3)">3
	      	    <input id="r4"  type="checkbox" name="r4"  [(ngModel)]="rCheckBoxes[8]" value="4" (change)="showErrorR(false); setR(4)">4
			</p>
			<p id="radio_fail">{{ rErrorMsg }}<p>
		</div>
		<div>
			<input type="submit" value="Отправить" onclick="this.blur()">
		</div>
		<div>
			<input type="button" style="width : 85px; margin-left: 0px; margin-top: 10px;" value="Выйти" (click)="exit()" onclick="this.blur()">
		</div>
		<div>
			<input type="button" style="width : 105px;  margin-left: 0px;" value="Удалить всё" (click)="deleteAll()" onclick="this.blur()">
		</div>
	</div>
	<div class="inline_blocks areas">
		<img id="areas" src="https://se.ifmo.ru/~s207529/{{ imageUrl }}" (click)="imgClick($event)">
	</div>
	</div>
</form>
<div *ngIf="points.length">
	<table>
		<tr>
			<th>X</th>
			<th>Y</th>
			<th>R</th>
			<th>Результат</th>
		</tr>
		<tr *ngFor="let p of points">
			<td>{{ p.x }}</td>
			<td>{{ p.y }}</td>
			<td>{{ p.r }}</td>
			<td>{{ p.entry > 0 ? 'Попадание' : 'Промах'}}</td>
		</tr>
	</table>
</div>`
})
export class WorkPlaceComponent implements OnInit { 
	//TODO
	//Стадия загрузки
	//1 - Проверить возможность нахождения на странице, если нет, то выйти
	//2 - загрузить точки и адрес картики
	points: Point[];
	imageUrl : string;
	x : number;
	r : number;
	yText : string = '';
	valid : boolean = false;
	xErrorMsg : string = '';
	yErrorMsg : string = '';
	rErrorMsg : string = '';
	text_empty : boolean;
	now_submit : boolean;
	textClass : string = '';
	xCheckBoxes : boolean[] = [false, false, false, false, false, false, false, false, false];
	rCheckBoxes : boolean[] = [false, false, false, false, false, false, false, false, false];
	constructor(private router: Router, private dataService: DataService){
		this.points = [];
	}
	ngOnInit(){
		console.log('init');
		this.dataService.isLogin()
		.subscribe(
		res => {
			if(res.status === 200){
				this.dataService.getPoints().then(points => this.points = points);
				//this.imageUrl = 
				this.dataService.getImageUrl()
				.map(res => {
					console.log(res.json());
					this.imageUrl = res.json();
				})
				/*.catch(err => {});
				.subscribe(
					data => {
						console.log(data.text());
						console.log(data.url);
						this.imageUrl = data.text.toString();
					},
					err => {console.log(err);},
					() => {}
				);*/
			}
		},
		error => {
			if(error.status === 403){
				//alert('Ошибка доступа!');
				this.router.navigate(['']);
			}
		},
		() => {}
		);
		this.updateImage();
				/*.subscribe(
		//this.dataService.getPoints().then(points => this.points = points);
		//this.imageUrl = this.dataService.getImageUrl();*/
	}
	
	showErrorR(flag : boolean) {
		if(flag){
			//this.rErrorMsg = 'Радиус не может быть отрицательным!';
			this.rErrorMsg = 'Радиус должен быть положительным!';
		} else {
			this.rErrorMsg = '';
		}
	}
	setX(x : number){
		for(var _i = 0; _i < this.xCheckBoxes.length; _i++){
			if(_i != 4 + x) this.xCheckBoxes[_i] = false;
		}
		this.x = x;
		this.xErrorMsg = '';
	}
	setR(r : number){
		if(!this.rCheckBoxes[4 + r]) {
			this.showErrorR(false);
		}
		for(var _i = 0; _i < this.rCheckBoxes.length; _i++){
			if(_i != 4 + r) this.rCheckBoxes[_i] = false;
		}
		this.r = r;
		if(this.r > 0){
			this.dataService.charngeRadius(this.r).toPromise()
			.then(res => {
				console.log('JSON : ', res.json());
				this.imageUrl = res.json();
			})
			.catch(err => console.log(err));
		}
	}
	checkText(now_submit : boolean = false) : boolean {
		var y_regexp = /^[+-]?\d{1,50}([,.]\d{1,17})?$/;
		var y_sign_regexp = /^[+-]$/;
		var y_del_regexp = /^[+-]?\d{1,50}[,.]$/;
		var y_first_zero_regexp = /^([+-]?\d{1,50}([,.]\d{1,100})?; )*[+-]?[0]\d/;
		var y_from_to_regexp = /^([+-]?[0-4]([,.]\d+)?|[+-]?5([,.]0+)?)$/;
		var y_bigger_regexp  = /(^| )[+-]?([6789]|\d{2,})[,.;] ?/;
		var message = "";
		this.text_empty = false;
		this.now_submit = now_submit;
		if(this.yText.trim().length == 0){
			message = now_submit ? "Заполните это поле!" : "";
			this.text_empty = true;
		} else if(!(this.yText.match(y_regexp)||
			(this.yText.match(y_sign_regexp) && !now_submit) || 
			(this.yText.match(y_del_regexp) && !now_submit) ||
			this.yText.match(y_first_zero_regexp))) {
			message = "Введено неправильное значение у!";
		} else {
			if(!(this.yText.match(y_del_regexp)  ||
				this.yText.match(y_sign_regexp)) || 
				this.yText.match(y_bigger_regexp)){
				if(!this.yText.match(y_from_to_regexp)){
					message = "Значение должно быть в промежутке от -5 до 5!";
				}
			}
		}
		this.yErrorMsg = message;
		return (message.length == 0);
	}
	setTextBorder(enter_correct : boolean) : boolean{
		this.textClass = enter_correct ? "enter_correct" : "enter_incorrect";
		if(!this.now_submit && this.text_empty){
			this.textClass = "";
		}
		return enter_correct;
	}
	checkX() : boolean {
		let result : boolean = false;
		for(var _i = 0; _i < this.xCheckBoxes.length; _i++){
			result = result || this.xCheckBoxes[_i];
		}
		if(!result){
			this.xErrorMsg = "Значение X не выбрано!";
		} else {
			this.xErrorMsg = '';
		}
		return result;
	}
	checkR() : boolean {
		let result : boolean = false;
		for(var _i = 0; _i < this.rCheckBoxes.length; _i++){
			result = result || this.rCheckBoxes[_i];
		}
		if(!result){
			this.rErrorMsg = 'Значение радиуса не выбрано!';
		} else {
			for(var _i = 0; _i < 4; _i++){
				result = result && !this.rCheckBoxes[_i];
			}
			if(!result){
				this.rErrorMsg = 'Радиус не может быть отрицательным!';
			} else {
				this.rErrorMsg = '';
			}
		}
		return result;
	}
	save(event : Event){
		event.preventDefault();
		var x_result = this.checkX();
		var y_text_result = this.setTextBorder(this.checkText(true));
		var r_result = this.checkR();
		if(x_result && y_text_result && r_result){
			console.log(new Point(this.x, parseFloat(this.yText.replace(',', '.')), this.r));
			//Через сервис проверить вхождение точки в область
			this.dataService.addPoint(this.x, parseFloat(this.yText.replace(',', '.')), this.r);
			this.updateImage();
				/*.subscribe(
					data => {
						console.log(data.toString());
						this.imageUrl = data.toString();
					},
					err => {console.log(err);},
					() => {}
				);*/
			/*this.points.push(new Point(this.x, parseFloat(this.yText.replace(',', '.')), this.r));*/
			this.yText = '';
			this.textClass = '';
			for(var _i = 0; _i < this.rCheckBoxes.length; _i++){
				this.rCheckBoxes[_i] = false;
			}
			for(var _i = 0; _i < this.xCheckBoxes.length; _i++){
				this.xCheckBoxes[_i] = false;
			}
		}
	}
	imgClick(event : MouseEvent){
		if(this.checkR()){
			let x_px = event.offsetX - 125;
			let y_px = -(event.offsetY - 125);
			console.log('X:' + x_px + '\nY:' + y_px);
			let pxInR = 100 / this.r;
			let x = x_px / pxInR;
  			let y = y_px / pxInR;
			this.dataService.addPoint(x, y, this.r);
			this.dataService.charngeRadius(this.r).toPromise()
			.then(res => {
				console.log('JSON : ', res.json());
				this.imageUrl = res.json();
			})
			.catch(err => console.log(err));
		}
	}
	exit(){
		//Через сервис отправить запрос на выход
		this.dataService.logout();
		this.router.navigate(['']);
	}

	deleteAll(){
		this.dataService.deletePoints();
		this.updateImage();
	}

	updateImage(){
		this.dataService.getImageUrl().toPromise()
			.then(res => {
				console.log('JSON : ', res.json());
				this.imageUrl = res.json();
			})
			.catch(err => console.log(err));
	}
}