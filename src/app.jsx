import React from 'react';
import styles from './app.module.css';
import Modal from './modal.jsx';
import { useTodoManager } from './hooks/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction, updateTodoAction } from './actions/index.jsx';

export const App = () => {
	const dispatch = useDispatch();
	const isCreating = useSelector((state) => state.isCreating);

	const {
		newTodo,
		search,
		AddTodo,
		isLoading,
		todos,
		onNewTodoChange,
		onSearchChange,
		sortTodo,
	} = useTodoManager();

	return (
		<div className={styles.dashboard}>
			<div className={styles.header}>
				<input
					type="text"
					placeholder="Поиск..."
					value={search}
					onChange={onSearchChange}
				/>
				<button onClick={sortTodo}>Сортировка</button>
				<div>
					<input
						type="text"
						placeholder="Добавить новое дело"
						value={newTodo}
						onChange={onNewTodoChange}
					/>
					<button disabled={isCreating || !newTodo} onClick={AddTodo}>
						Добавить
					</button>
				</div>
			</div>
			<div className={styles.todos}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					todos.map(({ id, title }) => (
						<div key={id}>
							{title}
							<button
								onClick={() => {
									dispatch(updateTodoAction(id, title));
								}}
							>
								Редактировать
							</button>
							<button
								onClick={() => {
									dispatch(deleteTodoAction(id));
								}}
							>
								Удалить
							</button>
						</div>
					))
				)}
			</div>
			<Modal />
		</div>
	);
};
