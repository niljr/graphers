const SET_USER = 'SET_USER';

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}

const initialState = {
    user: null
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
}
