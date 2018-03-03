<template>
  <div class="chooser-li">
    <ul class="list-inline">
      <li class="list-li list-inline-item" v-for="(item, index) in mulChoose"
      :class="{active:checkActive(index)}" style="margin-left:10px;" 
      @click="toggleChoose(index)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    mulChoose: {
      type: Array,
      default: [
        {label: 'test', value: 0}
      ]
    }
  },
  data () {
    return {
      nowIndex: []
    }
  },
  methods: {
    toggleChoose (index) {
      if (this.nowIndex.indexOf(index) === -1) {
        this.nowIndex.push(index)
      } else {
        this.nowIndex.splice(this.nowIndex.indexOf(index),1)
      }
      let nowArray = []
      this.nowIndex.map((item) => {
        nowArray.push(this.mulChoose[item])
      })
      this.$emit('on-change', nowArray)
    },
    checkActive (index) {
      return this.nowIndex.indexOf(index) !== -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chooser-li{
  position:absolute;
  left:250px;top:0;
  line-height:34px;
  text-align:center;
}
.list-li{
  padding:0 15px;
  cursor:pointer;
  margin:3px 0 3px;
  border-radius:3px;
}
.active{
  background: rgb(64,172,134);
  color:#fff;
}
</style>
