<template>
    <div class="main-container">
        <Carsousel :list="bannerList" />
        <ShopItem :recomList="recommendList"></ShopItem>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Carsousel from '@/components/Carousel'
import ShopItem from '@/components/ShopItem'
export default {
    name: 'Home',
    components: {
        Carsousel,ShopItem
    },
    mounted() {
    },
    computed: {
        ...mapState({
            bannerList: (state) => state.home.bannerList,
        }),
        ...mapState({
            recommendList: (state) => state.home.recommendList,
        }),
    }
}
</script>

<style scoped>

</style>