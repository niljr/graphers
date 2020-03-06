const SET_CLIENT = 'SET_CLIENT';

export function setClient(client) {
    return {
        type: SET_CLIENT,
        client
    }
}

const initialState = {
    client: null
}

export default function client(state = initialState, action) {
    switch (action.type) {
        case SET_CLIENT:
            return {
                ...state,
                client: action.client
            }

        default:
            return state;
    }
}
