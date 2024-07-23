const fetchTodo = () => {
	return fetch('http://localhost:3305/todos');
};

export const getTodos = () => (dispatch) =>
	fetchTodo()
		.then((loadedData) => loadedData.json())
		.then((loadedTodos) => dispatch({ type: 'GET_DATA', payload: loadedTodos }));

console.log(getTodos);
