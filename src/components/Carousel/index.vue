<template>
        <div class="block">
            <el-carousel trigger="click" height="400px" indicator-position="outside">
            <el-carousel-item v-for="(carousel, index) in list.data" :key="carousel.id">
                <img :src="carousel.imgUrl" alt="轮播图"></img>
                </el-carousel-item>
            </el-carousel>
        </div>
</template>

<script>
export default {
    name: 'Carousel',
    props: ["list"],
    // mounted() {
    //     console.log(this.list.data);
    // }
}
</script>

<style>
.block{
    margin: 0 1%;
}
.block .el-carousel__item img{
    width: 100%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>