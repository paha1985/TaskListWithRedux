import './Modal.css';
import { useDeleteTodo, useUpdateTodo } from './hooks/index';
import { useDispatch, useSelector } from 'react-redux';
import { curTodoTitle, modalActive } from './selectors';
import { modalActiveAction, modalCancel, changeTitle } from './actions';

const Modal = () => {
	const dispatch = useDispatch();

	const isDeleting = useSelector((state) => state.crudState.isDeleting);
	const active = useSelector(modalActive);
	const todoTitle = useSelector(curTodoTitle);

	const DeleteTodo = useDeleteTodo();

	const UpdateTodo = useUpdateTodo();

	const setUpdatedTodoChange = ({ target }) => {
		dispatch(changeTitle(target.value));
	};

	return (
		<div
			className={active ? 'modal active' : 'modal'}
			onClick={() => dispatch(modalActiveAction(false))}
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
								dispatch(modalActiveAction(false));
								//dispatch(modalCancel);
							}}
						>
							Закрыть
						</button>
					</div>
				) : (
					<div>
						<input
							type="text"
							value={todoTitle}
							onChange={setUpdatedTodoChange}
						/>
						<div>
							<button onClick={UpdateTodo}>Сохранить</button>
							<button
								onClick={() => {
									dispatch(modalActiveAction(false));
									//dispatch(modalCancel);
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
