import { useDispatch, useSelector } from 'react-redux';
import { curTodoId, refreshing } from '../selectors';
import { modalActiveAction, deleteOK, refreshTodoAction } from '../actions';

export const useDeleteTodo = () => {
	const dispatch = useDispatch();
	const id = useSelector(curTodoId);
	const refresh = useSelector(refreshing);
	console.log(refresh);
	const DeleteTodo = () => {
		fetch(`http://localhost:3305/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись удалена', responce);
				// dispatch(refreshing(!refresh));
				dispatch(refreshTodoAction(!refresh));
				dispatch(modalActiveAction(false));
			})
			.finally(dispatch(deleteOK));
	};

	return DeleteTodo;
};
