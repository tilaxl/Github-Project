<template>
  <div id="app" class="bgc">
    <div class="header">
      <div class="h-c">
        <router-link :to="{path:'/'}">
          <img :src = "logo"/>
        </router-link>
        <ul class="list-inline">
          <li>{{username}}</li>
          <li class="list-inline-item" @click="Land" v-if="username===''">登录</li>
          <li class="list-inline-item" @click="Register" v-if="username===''">注册</li>
          <li class="list-inline-item" v-if="username!==''" @click="logout">退出</li>
          <li class="list-inline-item" @click="About">关于</li>
        </ul>
      </div>
    </div>
    <div class="middle">
     <keep-alive>
       <router-view></router-view>
     </keep-alive>
    </div>
    <myfooter></myfooter>
    <mytemp :is-show = "showLand" @on-close = "hideAll('showLand')">
        <myland @has-land="landok" @to-register="toregister">
        </myland>
    </mytemp>
    <mytemp :is-show = "showRegister" @on-close = "hideAll('showRegister')">
      <myregister @has-land="landok" @to-land="toland">
      </myregister>
    </mytemp>
    <mytemp :is-show = "showAbout" @on-close = "hideAll('showAbout')">
      <p>这是我个人制作的一个小项目</p>
    </mytemp>
  </div>
</template>

<script>
import myfooter from './components/footer'
import mytemp from './components/base/temp'
import myland from './components/form/land'
import myregister from './components/form/register'

export default {
  data () {
    return {
      logo: require('./assets/logo.png'),
      username: '',
      showLand: false,
      showRegister: false,
      showAbout: false
    }
  },
  methods: {
    Land () {
      this.showLand = true
    },
    hideAll (attr) {
      this[attr] = false
    },
    landok (data) {
      this.hideAll('showLand')
      this.hideAll('showRegister')
      this.username = data.username
    },
    logout () {
      this.username = ''
    },
    Register () {
      this.showRegister = true
    },
    About () {
      this.showAbout = true
    },
    toland () {
      this.showRegister = false
      this.showLand = true
    },
    toregister () {
      this.showLand = false
      this.showRegister = true
    }
  },
  components: {
    mytemp,
    myland,
    myregister,
    myfooter
  }
}
</script>

<style>
@import "./assets/css/bootstrap.min.css";
.bgc,html{
  background:#f4f4f4;
  height:100%;
}
.header{
  width:100%;
  height:70px;
  background:#E0EEE0;
}
.h-c,.middle{
  width:1000px;
  margin:0 auto;
}
.h-c img{
  width:50px;
  margin:10px;
}
.header ul{
  line-height:70px;
  color:red;
  float:right;
}
.header ul li{
  display:inline-block;
  cursor:pointer;
  margin-right:7px;
}
</style>