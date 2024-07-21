import { useState } from 'react';
import { useAddTodo, useGetTodo } from './index';
import { useDispatch, useSelector } from 'react-redux';

export const useTodoManager = () => {
	const [newTodo, setNewTodo] = useState('');
	const [search, setSearch] = useState('');
	const [sorted, setSorted] = useState(false);
	const { AddTodo } = useAddTodo(newTodo, setNewTodo);
	const { todos } = useGetTodo(sorted, search);
	const refresh = useSelector((state) => state.refreshing);
	const dispatch = useDispatch();

	const onNewTodoChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSearchChange = ({ target }) => {
		setSearch(target.value);
		dispatch({ type: 'REFRESH', payload: !refresh });
	};

	const sortTodo = () => {
		setSorted(!sorted);
		dispatch({ type: 'REFRESH', payload: !refresh });
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
