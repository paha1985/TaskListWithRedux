import { useDispatch, useSelector } from 'react-redux';

export const useUpdateTodo = () => {
	const dispatch = useDispatch();
	const id = useSelector((state) => state.curTodoId);
	const title = useSelector((state) => state.curTodoTitle);
	const refresh = useSelector((state) => state.refreshing);

	const UpdateTodo = () => {
		fetch(`http://localhost:3305/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 10,
				title: title,
				completed: true,
			}),
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись отредактирована', responce);
				dispatch({ type: 'REFRESH', payload: !refresh });
				dispatch({ type: 'MODAL_ACTIVE', payload: false });
			})
			.finally(dispatch({ type: 'UPDATING', payload: false }));
	};

	return UpdateTodo;
};
