import { ROUTE } from '../consts/route';

export const routeAction = (r) => ({
    type: ROUTE,
    location: r
})