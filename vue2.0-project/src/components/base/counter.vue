<template>
  <div class="number-div">
    <span @click="minus">-</span>
    <input type="text" v-model="number" @keyup="fixNumer"/>
    <span @click="add">+</span>
  </div>
</template>

<script>

export default {
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 99
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  methods: {
    minus () {
      if (this.number <= this.min) {
        return
      } else {
        this.number --
      }
    },
    add () {
      if (this.number >= this.max) {
        return
      } else {
        this.number ++
      }
    },
    fixNumer () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g), '')
      } else {
        fix = this.number
      }
      if (fix > this.max || fix <this.min) {
        fix = this.min
      }
      this.number = fix
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.number-div{
  width:110.78px;
  height:30px;
  position:absolute;
  left:260px;top:0;
  border:1px solid #e3e3e3;
  margin-top:5px;
}
.number-div span{
  display:inline-block;
  width:30px;
  height:30px;
  border-left:1px solid #e3e3e3;
  border-right:1px solid #e3e3e3;
  text-align:center;
  line-height:28px;
  cursor:pointer;
}
.number-div input{
  outline:none;
  border:none;
  width: 40px;
  text-align:center;
}
</style>
