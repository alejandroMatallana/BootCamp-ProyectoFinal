import { TodoServiceService } from './services/todo-service.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
	declarations: [ AppComponent, TodoComponent ],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule.enablePersistence()
	],
	providers: [ TodoServiceService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
