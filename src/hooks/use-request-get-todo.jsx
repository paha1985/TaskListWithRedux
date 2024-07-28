import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../actions/getDataAction';
import { loading, refreshing } from '../selectors';
import { loadTodoAction } from '../actions';

export const useGetTodo = (sorted, search) => {
	const [todos, setTodos] = useState([]);
	const dispatch = useDispatch();
	const refresh = useSelector(refreshing);
	const isLoading = useSelector(loading);
	const todos1 = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(loadTodoAction(true));
		dispatch(getTodos());
		let filteredTodos = [];
		fetch('http://localhost:3305/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				if (search) {
					filteredTodos = loadedTodos.filter((todo) => {
						const lc = todo.title.toLowerCase();
						const filter = search.toLowerCase();
						return lc.includes(filter);
					});
					setTodos(
						sorted
							? filteredTodos.sort((a, b) => (a.title > b.title ? 1 : -1))
							: filteredTodos,
					);
				} else {
					setTodos(
						sorted
							? loadedTodos.sort((a, b) => (a.title > b.title ? 1 : -1))
							: loadedTodos,
					);
				}
			})
			.finally(() => dispatch(loadTodoAction(false)));
	}, [refresh]);
	//console.log('todos1', todos1);
	console.log(todos);
	return { isLoading, todos };
};
