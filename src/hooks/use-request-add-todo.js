import { useDispatch, useSelector } from 'react-redux';

export const useAddTodo = (newTodo, setNewTodo) => {
	const refresh = useSelector((state) => state.refreshing);
	const dispatch = useDispatch();

	const AddTodo = () => {
		dispatch({ type: 'CREATING', payload: true });
		fetch('http://localhost:3305/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 10,
				title: newTodo,
				completed: true,
			}),
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись добавлена', responce);
				dispatch({ type: 'REFRESH', payload: !refresh });
				setNewTodo('');
			})
			.finally(dispatch({ type: 'CREATING', payload: true }));
	};

	return { AddTodo };
};
