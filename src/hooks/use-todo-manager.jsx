import { useState } from 'react';
import { useAddTodo, useGetTodo } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { refreshing } from '../selectors';
import { refreshTodoAction } from '../actions';

export const useTodoManager = () => {
	const [newTodo, setNewTodo] = useState('');
	const [search, setSearch] = useState('');
	const [sorted, setSorted] = useState(false);
	const { AddTodo } = useAddTodo(newTodo, setNewTodo);
	const { todos } = useGetTodo(sorted, search);
	const refresh = useSelector(refreshing);
	const dispatch = useDispatch();

	const onNewTodoChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSearchChange = ({ target }) => {
		setSearch(target.value);
		dispatch(refreshTodoAction(!refresh));
	};

	const sortTodo = () => {
		setSorted(!sorted);
		dispatch(refreshTodoAction(!refresh));
	};

	return {
		newTodo,
		search,
		AddTodo,
		todos,
		onNewTodoChange,
		onSearchChange,
		sortTodo,
	};
};
