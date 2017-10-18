<template>
  <div class="registerdiv">
    <div class="i">
      <input class="form-control" type="text" v-model="username" placeholder="用户(你的手机号/邮箱)"/>
    </div>
    <div class="i">
      <input class="form-control" type="text" v-model="userpwd" placeholder="密码(6-16个字符组成，区分大小写)"/>
    </div>
    <div class="use-err">{{userError.errorText}}</div>
    <div class="checkbox">
      <label>
        <input type="checkbox" value=""/>
        我已同意
      </label>
      <a @click="toland">已有账号，直接登录></a>
    </div> 
    <button class="btn btn-primary" type="button" @click="login">注册</button> 
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
    toland () {
      this.$emit('to-land')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .registerdiv{
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
  padding:0 0 0 150px;
 }
 .btn{
  width:388px;
  height:38px;
  margin:10px 100px 10px;
 }
 .use-err{
  padding:10px 0 10px 100px;
  color:red;
 }
</style>