export default {
    // 开启命名空间
    namespaced: true,

    // state数据
    state: () => ({
        // 收货地址
        // address: {}
        // 3. 读取本地的收货地址数据，初始化address对象
        address: JSON.parse(uni.getStorageSync('address') || '{}')
    }),

    // 方法
    mutations: {
        // 更新收货地址
        updateAddress(state, address) {
            state.address = address;
            // 2. 通过this.commit()方法，调用m_user模块下的saveAddressToStorage方法将address对象持久化存储到本地
            this.commit('m_user/saveAddressToStorage');
        },
        // 1. 定义将address持久化存储到本地mutations方法
        saveAddressToStorage(state) {
            uni.setStorageSync('address', JSON.stringify(state.address));
        }
    },

    // 数据包装器
    getters: {
        // 收货详细地址的计算属性
        addstr(state) {
            if (!state.address.provinceName) return '';
            // 拼接“省，市，区，详细地址”的字符串并返回给用户
            return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
        }
    }
}