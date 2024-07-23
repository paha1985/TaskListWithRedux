import React, { useContext } from 'react';
import './Modal.css';
import { AppContext } from './context';
import { useDeleteTodo, useUpdateTodo } from './hooks/index';
import { useDispatch, useSelector } from 'react-redux';

const Modal = () => {
	const { refreshTodos } = useContext(AppContext);

	const dispatch = useDispatch();

	const isDeleting = useSelector((state) => state.isDeleting);
	const active = useSelector((state) => state.modalActive);
	const curTodoTitle = useSelector((state) => state.curTodoTitle);

	const DeleteTodo = useDeleteTodo(refreshTodos);

	const UpdateTodo = useUpdateTodo(refreshTodos);

	const setUpdatedTodoChange = ({ target }) => {
		dispatch({ type: 'CHANGE_TITLE', payload: target.value });
	};

	return (
		<div
			className={active ? 'modal active' : 'modal'}
			onClick={() => dispatch({ type: 'MODAL_ACTIVE', payload: false })}
		>
			<div
				className={active ? 'modal__content active' : 'modal__content'}
				onClick={(e) => e.stopPropagation()}
			>
				{isDeleting ? (
					<div>
						<div>Удалить запись?</div>
						<button onClick={DeleteTodo}>Удалить</button>
						<button
							onClick={() => {
								dispatch({ type: 'MODAL_CANCEL' });
							}}
						>
							Закрыть
						</button>
					</div>
				) : (
					<div>
						<input
							type="text"
							value={curTodoTitle}
							onChange={setUpdatedTodoChange}
						/>
						<div>
							<button onClick={UpdateTodo}>Сохранить</button>
							<button
								onClick={() => {
									dispatch({ type: 'MODAL_CANCEL' });
								}}
							>
								Закрыть
							</button>
						</div>
					</div>
				)}
				{/* {children} */}
			</div>
		</div>
	);
};

export default Modal;
