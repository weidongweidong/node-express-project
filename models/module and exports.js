
const mongoHelper = require('../utils/mongoHelper');
const mongoose = require('mongoose');
const settings = require(`../conf/${process.env.NODE_ENV}/settings`);



/**首先说一下 ，module，module.exports 这俩对象是啥？ 
 * module 就是当前页面对象。 
 * module.exports 是一个对象， 里面的东西就是对外暴露的对象属性等，  一次暴露多个方法，就要这样写了。 
 * 而exports 就是model.exports 的一个引用， 不管怎么样，将要暴露的东西放到mdoel.exports就行。 
 * 两种方式暴露方法或对象：
 * 1，可以一个一个用exports .上方法， 去暴露，（这个过程也是再给model.exports 加东西的过程） 
 * exports.aa = "bb";
 * 2，也可以将要暴露的对象弄到一起搞成对象直接给model.exports对象进行赋值。  
 * module.exports = {a:function(){}}
 */



/**
 * 关于为什么要使用 exports = module.exports = xxx
 *
 */
// ===============
module.exports = {a:function(){}}
// module.exports 原来的对象就被覆盖成了这个方法，此时暴露的只是这个方法了。 
exports.aa = "bb";
// 而exports 引用的是model.exports覆盖前的那个对象， 修改它、在它身上添加属性已经没有用了（它已经不代表暴露出去的对象了）

// =============
// 所有我们为了让上面一行的这个暴露动作不失效， 所以不能覆盖原model.exports ，
// 我们这样做： exports = module.exports = xxx
exports = module.exports = {a:function(){}} 
exports.aa = "bb";
// 这样的话， 原来的暴露对象赋值给原来的暴露对象， 暴露对象不被覆盖， exports对象的指向仍然是有效的暴露的对象， 然后再往这个exports添加对象， 就实现暴露了。
// 但是这样写的话，要注意这个代码=>  exports = module.exports = xxx  以上的暴露动作会失效。 

