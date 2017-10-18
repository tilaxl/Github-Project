<template>
  <div class="slide-show" @mouseout="runInv" @mouseover="clearInv">
    <div class="slide-img">
      <a class="imgb">
        <transition name="prev">
          <img v-if="isShow" :src="slides[nowIndex].src" alt="" />
        </transition>
        <transition name="next">
         <img v-if = "!isShow" :src="slides[nowIndex].src" alt="" />
        </transition>
      </a>
    </div>
    <span>
      <h2>{{slides[nowIndex].title}}</h2>
      <ul class="nav nav-pills">
        <li class="nav-link"><a @click="goto(prevIndex)"><</a></li>
        <li class="nav-link" v-for="(item, index) in slides">
          <a @click="goto(index)">{{index + 1}}</a>
        </li>
        <li class="nav-link"><a @click="goto(nextIndex)">></a></li>
      </ul>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      if(this.nowIndex === index) {
        return
      } else {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
          this.$emit('onchange', index)
        }, 10)
      }
    },
    runInv () {
      this.runId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.runId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide-show{
  width:1000px;
  height:562px;
  position:relative;
  overflow:hidden;
}
.slide-img img{
  width:1000px;
  position:absolute;
  top:0;
}
.prev-enter{
  transform: translateX(888px);
}
.prev-enter-active{
  transition:all .3s ease;
}
.next-leave{
  opacity: 0;
}
.next-leave-active{
 transform: translateX(-888px);
 transition:all .3s ease;
 opacity: 0.1;
}
.slide-show span{
  background: rgba(255,255,255,0.4);
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.nav-link a{
  cursor:pointer;
}
</style>