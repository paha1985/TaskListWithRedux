export const initialModalState = {
	modalActive: false,
};

export const modalReducer = (state = initialModalState, action) => {
	const { type, payload } = action;
	console.log(state);
	switch (type) {
		case 'MODAL_ACTIVE':
			return { ...state, modalActive: payload };

		// case 'MODAL_CANCEL':
		// 	return { ...state, isUpdating: false, isDeleting: false, modalActive: false };

		default:
			return state;
	}
};
