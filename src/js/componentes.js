import {Todo} from '../classes';
import {todoList} from '../index';

//referencias al html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) =>{
	const htmlTodo = `
	<li class = "${ (todo.completado) ? 'completed' : '' }" data-id="${ (todo.id)} ">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label> ${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li> `;

	const div = document.createElement('div'); //se usa el div solo com un contenedor, para poder meter el codigo html
	div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);//esto se hace para que solo inserte la etiquete li

  return div.firstElementChild;
}

//eventos

txtInput.addEventListener('keyup', (event) => {
	if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
		console.log(txtInput.value);
		const nuevoTodo = new Todo( txtInput.value );
		todoList.nuevoTodo(nuevoTodo);
		console.log(todoList);
		crearTodoHtml(nuevoTodo);
		txtInput.value = '';
	}
});

divTodoList.addEventListener('click', (event) => {
	const nombreElemento = event.target.localName; //trae el nombre del elemento al que le dimos click, un input. label etc.
	const todoElemento = event.target.parentElement.parentElement; //obtengo el elemento li, que tiene el id
	const todoID = todoElemento.getAttribute('data-id');

	if( nombreElemento.includes('input') ){ //click en el check
		todoList.marcarCompletado( todoID );
		todoElemento.classList.toggle('completed'); //si ya existe la clase la quita, sino la pone
	
	}else if( nombreElemento.includes('button') ){ //hay que borrar la tarea
		todoList.eliminarTodo( todoID );
		divTodoList.removeChild( todoElemento );
	}

	console.log(todoList);
});

//Borra todos los completados
btnBorrar.addEventListener('click', () => {
	todoList.eliminarCompletados();
	console.log(todoList);
	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];
		if (elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento);
		}
	}
});

ulFiltros.addEventListener('click', (event) => {

	const filtro = event.target.text;

	if (!filtro) {
		return;
	}

	for (const elemento of divTodoList.children) {
		console.log(elemento);
		elemento.classList.remove('hidden');
		anchorFiltros.forEach(element => {
			element.classList.remove('selected');
		});
		event.target.classList.add('selected');

		const completado = elemento.classList.contains('completed'); //verifico si tiene la clase completada

		switch (filtro) {
			case 'Pendientes':
				if (completado) {
					elemento.classList.add('hidden');
				}
				break;
				case 'Completados':
					if (!completado) {
						elemento.classList.add('hidden');
					}
					break;
			default:
				break;
		}

	}

}
);