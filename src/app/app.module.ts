import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './server.service';

import { AppComponent }   from './app.component';
import { HeaderComponent }   from './header.component';
import { FooterComponent }   from './footer.component';
import { LoginComponent }   from './login.component';
import { WorkPlaceComponent }   from './workplace.component';
import { DataService } from './data.service';
/*import { WorkPlaceGuard }   from './workplace.guard';*/

const appRoutes: Routes =[
    { path: '', component: LoginComponent },
    { path: 'main', component: WorkPlaceComponent/*, canActivate: [WorkPlaceGuard]*/ },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports:      [ BrowserModule, 
    				FormsModule, 
    				RouterModule.forRoot(appRoutes),
    				HttpModule,
    				/*InMemoryWebApiModule.forRoot(InMemoryDataService)*/
    				 ],
    declarations: [ AppComponent, HeaderComponent, FooterComponent, LoginComponent, WorkPlaceComponent ],
    providers: [ DataService/*, WorkPlaceGuard*/ ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }