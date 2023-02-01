<template>
    <view class="login-container">
        <!-- 提示登录的图标 -->
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
        <!-- 登录按钮 -->
        <!-- 可以从@getuserinfo事件处理函数的形参中，获取到用户的基本信息 -->
        <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
        <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
        <!-- 登录提示 -->
        <view class="tips-text">登录后尽享更多权益</view>
    </view>
</template>

<script>
    // 按需导入辅助函数
    import { mapMutations, mapState } from 'vuex';
    
    export default {
        name: "my-login",
        data() {
            return {

            };
        },
        computed: {
            // 调用mapState辅助方法，把m_user模块中的数据映射到当前用组件中使用
            ...mapState('m_user', ['redirectInfo'])
        },
        methods: {
            // 使用mapMutations辅助方法，把m_user模块中的方法映射到当前组件中使用
              ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
            // 获取微信用户的基本信息
            // getUserInfo(e) {
            //     // 判断是否获取用户信息成功
            //     if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权');
            //     // 将用户的基本信息存储到vuex中（获取用户信息成功，e.detail.userInfo就是用户的基本信息）
            //     this.updateUserInfo(e.detail.userInfo);
            //     // 获取登录成功后的token字符串
            //     this.getToken(e.detail);
            // },
            getUserProfile() {
                uni.getUserProfile({
                    // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    desc: '用于完善个人资料',
                    success: (res) => {
                        // 将用户的基本信息存储到vuex中
                        this.updateUserInfo(res.userInfo);
                        // 获取登录成功后的token字符串
                        this.getToken(res);
                    },
                    fail: (res) => {
                        return uni.$showMsg('您取消了登录授权');
                    }
                });
            },
            // 调用登录接口，换取永久的 token
            async getToken(info) {
                // 调用微信登录接口
                const [err, res] = await uni.login().catch(err => err);
                // 判断是否uni.login()调用失败
                if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败');
                // 准备参数对象
                const query = {
                    code: res.code,
                    encryptedData: info.encryptedData,
                    iv: info.iv,
                    rawData: info.rawData,
                    signature: info.signature
                };
                // 换取token
                const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
                if (loginResult.meta.status !== 400) return uni.$showMsg('登录失败');
                uni.$showMsg('登录成功');
                // 更新vuex中的token
                // this.updateToken(loginResult.message.token);
                // 接口没有token，用假token代替
                this.updateToken(res.code);
                // 判断vuex中的redirectInfo对象是否为null
                // 如果不为null，则登录成功之后，需要重新导航到对应的页面
                this.navigateBack();
            },
            // 返回登录之前的页面
            navigateBack() {
                // redirectInfo不为null，并且导航方式为switchTab
                if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
                    // 调用小程序提供的uni.switchTab()进行页面的导航
                    uni.switchTab({
                        // 要导航到的页面地址
                        url: this.redirectInfo.from,
                        // 导航成功之后，把vuex中的redirectInfo对象重置为null
                        complete: () => {
                            this.updateRedirectInfo(null);
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .login-container {
        // 登录盒子的样式
        height: 750rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f8f8f8;
        position: relative;
        overflow: hidden;

        // 绘制登录盒子底部的半椭圆造型
        &::after {
            content: ' ';
            display: block;
            position: absolute;
            width: 100%;
            height: 40px;
            left: 0;
            bottom: 0;
            background-color: white;
            border-radius: 100%;
            transform: translateY(50%);
        }

        // 登录按钮的样式
        .btn-login {
            width: 90%;
            border-radius: 100px;
            margin: 15px 0;
            background-color: #c00000;
        }

        // 按钮下方提示消息的样式
        .tips-text {
            font-size: 12px;
            color: gray;
        }
    }
</style>