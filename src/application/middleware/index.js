import tripFlow from './tripMiddleware';
import userMiddleware from './userMiddleware';

const middleware = [
    ...userMiddleware,
    tripFlow
]

export default middleware