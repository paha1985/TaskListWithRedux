import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useGetTodo = (sorted, search) => {
	const [todos, setTodos] = useState([]);
	const dispatch = useDispatch();
	const refresh = useSelector((state) => state.refreshing);
	const isLoading = useSelector((state) => state.isLoading);

	useEffect(() => {
		dispatch({ type: 'LOADING', payload: true });
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
			.finally(() => dispatch({ type: 'LOADING', payload: false }));
	}, [refresh]);
	return { isLoading, todos };
};
