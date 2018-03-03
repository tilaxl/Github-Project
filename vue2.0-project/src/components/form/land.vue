<template>
  <div class="landdiv">
    <div class="i">
      <input class="form-control" name="" id="userId" value="" type="text" v-model="username" placeholder="你的手机号/邮箱"/>
    </div>
    <div class="i">
      <input class="form-control" name="" id="userId" value="" type="text" v-model="userpwd" placeholder="密码"/>
    </div>
    <div class="use-err">{{userError.errorText}}</div>
    <div class="checkbox">
      <label>
        <input type="checkbox" value=""/>
        记住密码
      </label>
      <a href="" @click="gg">忘记密码</a>
    </div>
    <div class="i">
      <button class="btn btn-primary" type="button" @click="login">登陆</button> 
      <button class="btn btn-default" type="button" @click="toregister">注册</button> 
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      username: '',
      userpwd: ''
    }
  },
  computed: {
    userError () {
      let errorText, status
      if (!/(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(this.username)) {
        status = false
        errorText = '你输入的账号错误'
      } else {
        status = true
        errorText = ''
      }
      if (!this.errorFlag) {
        errorText = ''
        this.errorFlag = true
      }
      return {
        errorText,
        status
      }
    }
  },
  methods: {
    login () {
      if (!this.userError.status) {
        alert('账号信息错误')
      } else {
        this.errorText = ''
        this.$http.get('api/login')
        .then((res) => {
          this.$emit('has-land', res.data)
        }, (error) => {
          console.log(error)
        })
      }
    },
    gg () {
      alert('GG')
    },
    toregister () {
      this.$emit('to-register')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .landdiv{
  padding:30px 20px;
  border-radius:10px;
 }
 .i{
  position:relative;
  padding:10px 0 10px 100px;
 }
 .form-control{
  width:388px;
  padding:10px;
 }
 .checkbox{
  padding:10px 0 10px 100px;
 }
 .checkbox a{
  text-decoration:none;
  padding:0 0 0 235px;
 }
 .btn{
  width:175px;
  height:38px;
 }
 .btn-default{
  margin-left:34px;
 }
 .use-err{
  padding:10px 0 10px 100px;
  color:red;
 }
</style>