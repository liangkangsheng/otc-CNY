
import * as home from './home.js';
import * as login from './loginReg.js';
import * as user from './user.js';
import * as order from './order.js';
import * as collection from './collection.js';
import * as cancelled from './cancelled.js';
import * as item from './item.js';
export default {
	...login,
	...user,
	...home,
	...order,
	...collection,
	...cancelled,
	...item
};
