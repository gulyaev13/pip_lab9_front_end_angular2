import { Component } from '@angular/core';

@Component({
    selector: 'header',
    template: `
    <div class="inline_blocks">
		<img src="https://se.ifmo.ru/~s207529/itmo_small_blue_rus.png" alt="IFMO logo">
	</div>
	<div class="inline_blocks">
		<h1>Гуляев И. Е. P3210 Вариант №10063</h1>
	</div>`
})
export class HeaderComponent { }