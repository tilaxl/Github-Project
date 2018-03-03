<template>
  <div class="selection-div">
    <div class="selection-box" @click="listShow">
      <span>{{selections[nowIndex].label}}</span>
      <div class="selection-arrow"></div>
      <div class="selection-list" v-show="selectionShow">
        <ul class="list-inline">
          <li class="selection-li" v-for="(item, index) in selections"
          @click="changeIndex(index)">{{item.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    selections: {
      type: Array,
      default: [
        {label: 'test', value: 0}
      ]
    }
  },
  data () {
    return {
      nowIndex: 0,
      selectionShow: false
    }
  },
  methods: {
    listShow () {
      this.selectionShow = !this.selectionShow
    },
    changeIndex (index) {
      this.nowIndex = index
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selection-box{
  line-height:34px;
  position:absolute;
  left:260px;top:0;
  margin:3px 0 3px;
  border-radius:3px;
  border:1px solid #e3e3e3;
  z-index:2;
}
.selection-box span{
  padding:0 20px 0 10px;
}
.selection-arrow{
  width:0;
  height: 0;
  border-left:4px solid transparent;
  border-right: 4px solid transparent;
  border-top:5px solid #E3E3E3;
  display: inline-block;
  vertical-align: middle;
  margin-right:10px;
}
.selection-list{
  background:#fff;
}
.selection-list li{
  padding:3px 0 3px 10px;
}
.selection-list li:hover{
  background: rgb(64,172,134);
}
</style>
