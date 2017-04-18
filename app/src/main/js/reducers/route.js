import { ROUTE } from '../consts/route';

export const routeReducer = (state = '', action) => {
    switch (action.type) {
        case ROUTE:
            return action.location;
        default:
            return state;
    }
}