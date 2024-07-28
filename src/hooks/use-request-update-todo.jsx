import { useDispatch, useSelector } from 'react-redux';
import { refreshing, curTodoTitle, curTodoId } from '../selectors';
import { updateOK, modalActiveAction, refreshTodoAction } from '../actions';

export const useUpdateTodo = () => {
	const dispatch = useDispatch();
	const id = useSelector(curTodoId);
	const title = useSelector(curTodoTitle);
	const refresh = useSelector(refreshing);

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
				dispatch(refreshTodoAction(!refresh));
				dispatch(modalActiveAction(false));
			})
			.finally(dispatch(updateOK));
	};

	return UpdateTodo;
};
