import testMiddleware from './testMiddleware';
import userMiddleware from './userMiddleware';

export default [
    ...testMiddleware,
    ...userMiddleware
]