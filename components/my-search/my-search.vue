<template>
    <view
        class="my-search-container"
        @click="searchBoxHandler"
        :style="{ 'background-color': bgcolor }">
        <!-- 使用view组件模拟input输入框的样式 -->
        <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
            <uni-icons type="search" size="17"></uni-icons>
            <text class="placeholder">搜索</text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "my-search",
        props: {
            // 背景颜色
            bgcolor: {
                type: String,
                default: '#C00000'
            },
            // 圆角尺寸
            radius: {
                type: Number,
                // 单位是 px
                default: 18
            }
        },
        data() {
            return {
                
            };
        },
        methods: {
            // 点击了模拟的input输入框
            searchBoxHandler() {
                // 触发外界通过@click绑定的click事件处理函数
                this.$emit('click');
            }
        }
    }
</script>

<style lang="scss">
    .my-search-container {
        // 移除背景颜色，改由props属性控制
        // background-color: #c00000;
        height: 50px;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }
    .my-search-box {
        height: 36px;
        background-color: #ffffff;
        // 移除圆角尺寸，改由props属性控制
        // border-radius: 18px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .placeholder {
            font-size: 14px;
            margin-left: 5px;
        }
    }
</style>