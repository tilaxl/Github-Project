<template>
  <div>
    <div class="detail-left">
      <img :src="productIcon"/>
      <ul>
        <router-link v-for="item in products" :to="{path:item.path}" tag="li" active-class="active" style="cursor:pointer">{{item.name}}</router-link>
      </ul>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [
        {
          name: '数据统计',
          path: 'count',
          active: false
        },
        {
          name: '数据预测',
          path: 'forecast',
          active: false
        },
        {
          name: '流量分析',
          path: 'analysis',
          active: false
        },
        {
          name: '广告发布',
          path: 'publish',
          active: false
        }
      ],
      productImg: {
        '/detail/count': require('../assets/images/1.png'),
        '/detail/forecast': require('../assets/images/2.png'),
        '/detail/analysis': require('../assets/images/4.png'),
        '/detail/publish': require('../assets/images/3.png')
      }
    }
  },
  computed: {
    productIcon () {
      return this.productImg[this.$route.path]
    }
  }
}
</script>

<style>
.detail-left{
  float:left;
  margin:0 0 0 -50px;
  width:200px;
  text-align:center;
  background: #fff;
}
.detail-left ul{
  list-style: none;
  padding: 30px 0 0 0;
}
.detail-left ul li{
  padding: 8px 10px;
}
.detail-left ul .active,
.detail-left ul li:hover{
  background: rgb(64,172,134);
  color:#fff;
}
.detail-right{
  margin:30px 0 0 200px;
  background: #fff;
}
.sale-board-intro h3,h5{
  height:47px;
  margin:0;
  line-height:47px;
  padding:3px 50px;
}
.sale-board-intro h5{
  font-weight:bold;
}
.sale-board-intro-div{
  background:#E0EEE0;
}
.sale-board-intro p{
  padding:3px 40px 3px 50px;
}
.sale-board-from-line{
  height:40px;
  position:relative;
}
.line-left{
  margin-left:50px;
  line-height:40px;
}
.sale-board-m{
  margin-top:16px;
  height:40px;
  margin-left:260px;
}
.bgcolor{
  height:50px;
  background:#f4f4f4;
  margin-top:20px;
}
.sale-board-bottom{
  background: #fff;
}
.table{
  margin-top:35px;
}
.table td, .table th{
  width:220px;
  padding:.75rem 0;
  text-align:center;
}
.table th{
  background:rgb(64,172,134);
}
.line-span{
  position:absolute;
  left:260px;top:0;
  line-height:34px;
  margin:3px 0 3px;
}
</style>
