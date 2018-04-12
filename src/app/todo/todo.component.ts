import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todoInterface';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: [ './todo.component.css' ]
})
export class TodoComponent implements OnInit {
	@Input() todoDatos: Todo;
	@Output() elminiarTarea: EventEmitter<any> = new EventEmitter();
	@Output() seleccionarChecbox: EventEmitter<any> = new EventEmitter();

	constructor() {}

	/**
	 * Metodo que se encarga de decir al padre que va a ser eliminado
	 */
	eliminar() {
		this.elminiarTarea.emit(this.todoDatos);
	}

	/**
	 * Metodo que se encarga de decir al padre que fue seleccionado
	 */
	seleccionar() {
		this.seleccionarChecbox.emit(this.todoDatos);
	}

	ngOnInit() {}
}
