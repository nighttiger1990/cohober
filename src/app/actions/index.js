import * as auth from './auth';
import * as project from './project';
import * as category from './category';
import * as user from './user';
import * as notification from './notification';
import * as history from './history';
import * as locations from './locations';

export default {
    ...auth,
    ...project,
    ...category,
    ...user,
    ...notification,
    ...history,
    ...locations
} 

