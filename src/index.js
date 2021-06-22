import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml} from './js/componentes';

export const todoList = new TodoList();

/*version original
todoList.todos.forEach( todo => crearTodoHtml(todo) );

Aplicando protip
Si en el bolque de codigo del foreach solo ocupas mandar como parametro
el valor de la iteracion actual lo puede reducir a esto*/
todoList.todos.forEach( crearTodoHtml );

todoList.todos[0].imprimirClase();

// console.log(todoList.todos[0].imprimirClase());

console.log(todoList.todos);