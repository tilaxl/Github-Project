<template>
  <div>
    <div class="temp-cover" v-if="isShow" @click="closeShow"></div>
    <transition name="drop">
      <div class="temp-warp" v-if="isShow">
        <div class="close" @click="closeShow">
          <div class="temp-close"></div>
        </div>
        <slot>empty</slot>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeShow () {
      this.$emit('on-close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .5s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
.temp-cover{
  position:fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  top:0;left:0;
  z-index:2;
}
.temp-warp{
  position:fixed;
  background:rgba(255,255,255,1);
  width:50%;
  top:25%;left:50%;
  z-index:10;
  margin-left:-25%;
}
.close{
  padding:4px 4px;
  position:absolute;
  right:1px;top:1px;
  cursor:pointer;
}
.temp-close{
  width: 20px;
  height: 0px;
  border:1px solid black;
  transform: rotate(45deg);
  position:relative;
  margin-top:10px;
}
.temp-close:after{
  content: "";
  width: 20px;
  height: 0px;
  border:1px solid black;
  transform: rotate(-90deg);
  position:absolute;
  top:-1px;left:-1px;
}
</style>