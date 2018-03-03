<template>
  <div>
    <template v-for="navig in navigation">
      <div class="daohan">
        <ul class="nav nav-pills">
          <li class="nav-link">{{navig.title}}</li>
          <li class="nav-link" v-for="item in navig.list">
            <a :href="item.url">{{item.name}}</a>
          </li>
          <li class="nav-link">{{navig.title2}}</li>
          <li class="nav-link" v-for="item in navig.list2">
            <a :href="item.url">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </template>
    <slide-show class="banner" :slides = 'slide'></slide-show>
    <div class="newList">
      <ul>
        <li>最新消息</li>
        <li v-for="news in newsList.list">
          <a :href="news.url"><div>{{news.name}}</div>{{news.time}}</a>
        </li>
      </ul>
    </div>
    <div class="flexdiv">
      <template v-for="(sales, index) in saleList">
        <div class="saleList">
          <div :class="['imgDiv-' + sales.id, 'imgDiv']"></div>
          <div>
            <h3>{{sales.name}}</h3>
            <p>{{sales.context}}</p>
            <a :href="sales.href">立即购买</a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import slideShow from './slideshow'
export default {
  created () {
    this.$http.get('/api/getList')
      .then((res) => {
        this.saleList = res.data
      }, (err) => {
        console.log(err)
      })
  },
  data () {
    return {
      navigation: {
        pc: {
          title: 'PC产品',
          list: [
            {name: '数据统计', url: 'detail/count'},
            {name: '数据预测', url: 'detail/forecast'},
            {name: '流量分析', url: 'detail/analysis'},
            {name: '广告发布', url: 'detail/publish'}
          ],
          title2: '应用产品',
          list2: [
            {name: '91手机助手', url: ''},
            {name: '产品助手', url: ''},
            {name: '智能地图', url: ''},
            {name: '团队语音', url: ''}
          ]
        }
      },
      newsList: {
        list: [
          {name: '新闻例子1', time: '2017-10-3', url: ''},
          {name: '新闻例子2', time: '2017-10-3', url: ''},
          {name: '新闻例子3', time: '2017-10-3', url: ''},
          {name: '新闻例子4', time: '2017-10-3', url: ''},
          {name: '新闻例子5', time: '2017-10-3', url: ''}
        ]
      },
      saleList: [],
      slide: [
        {
          src: require('../assets/slideShow/1.jpg'),
          title: 'xxx1',
          href: 'detail/1'
        },
        {
          src: require('../assets/slideShow/2.jpg'),
          title: 'xxx2',
          href: 'detal/2'
        },
        {
          src: require('../assets/slideShow/3.jpg'),
          title: 'xxx3',
          href: 'detal/3'
        }
      ]
    }
  },
  components: {
    slideShow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.daohan{
  padding:30px 0 20px 0;
}
a{
  text-decoration:none;
  color:#555;
}
.nav-link a:hover{
  color:blue;
}
.right{
  width:100%;
  background:rgb(240,242,242);
}
.shop-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.newList{
  width:100px;
  margin-top:50px;
  text-align:center;
  float:left;
  box-shadow: #666 0 0 2px;
}
.newList ul{
  list-style:none;
  padding:0;
}
.newList ul li{
  height:60px;
  line-height:30px;
}
.newList ul li:hover{
  background:rgb(64,172,134);
}
.flexdiv{
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
  margin-top:50px;
}
.saleList{
  width:45%;
  display:flex;
  justify-content:space-around;
  align-items:center;
  box-shadow:#fff 0 0 1px;
  margin:24px 0 24px 20px;
  background:#fff;
  padding:10px 0;
}
.saleList p{
  font-size:14px;
  font-weight:400;
}
.saleList div:nth-child(2){
  width: 60%;
}
.saleList a{
  border:none;
  outline: none;
  background-color:rgb(67,176,137);
  color:#fff;
  padding: 5px 15px;
}
.imgDiv{
  width: 100px;
  height: 100px;
}
.imgDiv-earth{
  background: url(../assets/images/1.png) no-repeat;
}
.imgDiv-car{
  background: url(../assets/images/2.png) no-repeat;
}
.imgDiv-loud{
  background: url(../assets/images/3.png) no-repeat;
}
.imgDiv-mouten{
  background: url(../assets/images/4.png) no-repeat;
}
</style>
