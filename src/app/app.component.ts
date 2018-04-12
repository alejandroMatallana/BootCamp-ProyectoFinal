import { TodoServiceService } from './services/todo-service.service';
import { Todo } from './todoInterface';
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'Todo';
	todo: Todo[] = [];
	tipo: string;

	constructor(private todoService: TodoServiceService) {
		todoService.getToDo().subscribe((content) => (this.todo = content));
	}

	/**
	 * Metodo encargado de llamar el servicio para crear un todo
	 */
	crearTodo(input: HTMLInputElement) {
		const tarea = input.value;
		this.todoService.guardar(tarea);
		input.value = '';
	}

	/**
	 * Metodo encargado de llamar el servicio para elminar un todo
	 */
	eliminarTodo(todo: Todo) {
		this.todoService.borrar(todo);
	}

	/**
	 * Metodo para mostrar todos los Todo
	 */
	setModeTodos() {
		this.tipo = 'todos';
	}

	/**
	 * Metodo para mostrar los Todo activos
	 */
	setModeActivos() {
		this.tipo = 'activos';
	}

	/**
	 * Metodo para mostrar los Todo completados
	 */
	setModeCompletados() {
		this.tipo = 'completados';
	}

	/**
	 * Metodo que cuenta la cantidad de Todos activos
	 */
	obtenerCantidad(): number {
		return this.todo.filter((todo) => todo.active).length;
	}

	/**
	 * Metodo para cambiar el estado de un Todo
	 * @param todo, el Todo al que se le va a cambiar el estado
	 */
	verificarChecbox(todo: Todo) {
		this.todoService.cambiarEstado(todo);
	}

	/**
	 * Metodo que carga los Todos segun el estado que estos tengan
	 */
	obtenerEstado() {
		switch (this.tipo) {
			case 'todos': {
				return this.todo;
			}
			case 'activos': {
				return this.todo.filter((todo) => todo.active);
			}
			case 'completados': {
				return this.todo.filter((todo) => !todo.active);
			}
			default: {
				return this.todo;
			}
		}
	}
}
