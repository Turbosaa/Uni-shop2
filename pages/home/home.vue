<template>
    <view>
        <!-- 轮播图的区域 -->
        <swiper indicator-dots autoplay circular :interval="3000" :duration="1000">
            <swiper-item v-for="(item, index) in swiperList" :key="index">
                <navigator
                    class="swiper-item"
                    :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
                    <image :src="item.image_src"></image>
                </navigator>
            </swiper-item>
        </swiper>
        
        <!-- 分类导航区域 -->
        <view class="nav-list">
            <view
                class="nav-item"
                v-for="(item, index) in navList" :key="index"
                @click="navClickHandler(item)">
                <image :src="item.image_src" class="nav-img"></image>
            </view>
        </view>
        <!-- 楼层区域 -->
        <view class="floor-list">
            <!-- 楼层item项 -->
            <view class="floor-item" v-for="(item, index) in floorList" :key="index">
                <!-- 楼层标题 -->
                <image :src="item.floor_title.image_src" class="floor-title"></image>
                <!-- 楼层图片区域 -->
                <view class="floor-img-box">
                    <!-- 左侧大图片的盒子 -->
                    <navigator class="left-img-box" :url="item.product_list[0].url">
                        <image
                            :src="item.product_list[0].image_src"
                            :style="{ width: item.product_list[0].image_width + 'rpx' }"
                            mode="widthFix"></image>
                    </navigator>
                    <!-- 右侧4个小图片的盒子 -->
                    <view class="right-img-box">
                        <navigator
                            v-if="index2 !== 0"
                            v-for="(item2, index2) in item.product_list"
                            :key="index2"
                            :url="item2.url"
                            class="right-img-item">
                            <image
                                :src="item2.image_src"
                                :style="{ width: item2.image_width + 'rpx' }"
                                mode="widthFix"></image>
                        </navigator>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 轮播图的数据列表，默认为空数组
                swiperList: [],
                // 分类导航的数据列表
                navList: [],
                // 楼层的数据列表
                floorList: []
            };
        },
        onLoad() {
            // 在小程序页面刚加载的时候，调用获取轮播图数据的方法
            this.getSwiperList();
            // 在小程序页面刚加载的时候，调用获取分类导航数据的方法
            this.getNavList();
            // 在小程序页面刚加载的时候，调用获取楼层数据的方法
            this.getFloorList();
        },
        methods: {
            // 获取轮播图数据的方法
            async getSwiperList() {
                // 发起请求
                const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
                // 请求失败
                if (res.meta.status !== 200) return uni.$showMsg();
                // 请求成功，为data中的数据赋值
                this.swiperList = res.message;
            },
            // 获取分类导航数据的方法
            async getNavList() {
                // 发起请求
                const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
                // 请求失败
                if (res.meta.status !== 200) return uni.$showMsg();
                // 请求成功，为data中的数据赋值
                this.navList = res.message;
            },
            // nav-item项被点击时候的事件处理函数
            navClickHandler(item) {
                // 判断点击的是哪个nav
                if (item.name === '分类') {
                    uni.switchTab({
                        url: '/pages/cate/cate'
                    });
                }
            },
            // 获取楼层数据的方法
            async getFloorList() {
                // 发起请求
                const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
                // 请求失败
                if (res.meta.status !== 200) return uni.$showMsg();
                // 请求成功，为data中的数据赋值
                // 通过双层forEach循环，处理url地址
                res.message.forEach(floor => {
                    floor.product_list.forEach(prod => {
                        prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
                    });
                });
                this.floorList = res.message;
            }
        }
    }
</script>

<style lang="scss">
    swiper {
        height: 330rpx;
        .swiper-item,
        image {
            width: 100%;
            height: 100%;
        }
    }
    .nav-list {
        display: flex;
        justify-content: space-around;
        margin: 15px 0;
        .nav-img {
            width: 128rpx;
            height: 140rpx;
        }
    }
    .floor-title {
        height: 60rpx;
        width: 100%;
        display: flex;
    }
    .floor-img-box {
        display: flex;
        padding-left: 12rpx;
    }
    .right-img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>