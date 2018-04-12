import { Todo } from './../todoInterface';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoServiceService {
	constructor(private db: AngularFirestore) {}

	/**
	 * Metodo que se encarga de acceder a la coleccion de los Todos
	 */
	getToDo(): Observable<Todo[]> {
		return this.db.collection<Todo>('todos').valueChanges();
	}

	/**
	 * Metodo que se encarga de guardar en una coleccion los Todos
	 * @param dato, es el que se ingresa por el input text
	 */
	guardar(dato: string) {
		const id = this.db.createId();
		const active = true;
		this.db.collection('todos').doc(id).set({ id, dato: dato, active });
	}

	/**
	 * Metodo que se encarga de eliminar los Todo
	 * @param todo, el todo que se va a borrar, se selecciona por el Id y se borra de la coleccion
	 */
	borrar(todo: Todo): void {
		this.db.collection('todos').doc(todo.id).delete();
	}

	/**
   * Cambiar el estado de la tarea
   * @param todo, el todo al que se le va a cambiar el estado en la coleccion
   */
	cambiarEstado(todo: Todo) {
		if (todo.active === true) {
			todo.active = false;
		} else {
			todo.active = true;
		}
		this.db.collection('todos').doc(todo.id).update(todo);
	}

	/**
	 * Metodo que se encarga de eliminar las tareas que estan completadas
	 * borra todas las tareas que esten completas
	 * @param todo, los todos que cumplan con el estado de terminado
	 */
	elminarTareasCompletas(todo: Todo[]) {
		for (const todos of todo) {
			this.db.collection('todos').doc(todos.id).delete();
		}
	}
}
