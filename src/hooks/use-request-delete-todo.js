import { useDispatch, useSelector } from 'react-redux';

export const useDeleteTodo = () => {
	const dispatch = useDispatch();
	const id = useSelector((state) => state.curTodoId);
	const refresh = useSelector((state) => state.refreshing);
	const DeleteTodo = () => {
		fetch(`http://localhost:3305/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись удалена', responce);
				dispatch({ type: 'REFRESH', payload: !refresh });
				dispatch({ type: 'MODAL_ACTIVE', payload: false });
			})
			.finally(dispatch({ type: 'DELETING', payload: false }));
	};

	return DeleteTodo;
};
