<template>
    <view>
        My
    </view>
</template>

<script>
    // 导入自己封装的mixin模块
    import badgeMix from '@/mixins/tabbar-badge.js';
    
    export default {
        // 将badgeMix混入到当前的页面中进行使用
        mixins: [badgeMix],
        data() {
            return {

            };
        }
    }
</script>

<style lang="scss">

</style>