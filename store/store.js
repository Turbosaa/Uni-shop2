// 导入Vue和Vuex
import Vue from 'vue';
import Vuex from 'vuex';
// 导入购物车的Vuex模块
import moduleCart from './cart.js';
// 导入用户的Vuex模块
import moduleUser from './user.js';

// 将Vuex安装为Vue的插件
Vue.use(Vuex);

// 创建Store的实例对象
const store = new Vuex.Store({
    // TODO：挂载store模块
    modules: {
        // 挂载购物车的Vuex模块，模块内成员的访问路径被调整为m_cart，例如：
        // 购物车模块中cart数组的访问路径是m_cart/cart
        m_cart: moduleCart,
        // 挂载用户的Vuex模块，访问路径为m_user
        m_user: moduleUser
    }
});

// 向外共享Store的实例对象
export default store;