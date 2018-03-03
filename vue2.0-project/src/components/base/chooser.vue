<template>
  <div class="chooser-li">
    <ul class="list-inline">
      <li class="list-li list-inline-item" v-for="(item, index) in choosers"
      :class="{active:index == nowIndex}" 
      @click="chooseSelect(index)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    choosers: {
      type: Array,
      default: [
        {label: 'test', value: 0}
      ]
    }
  },
  data () {
    return {
      nowIndex: ''
    }
  },
  methods: {
    chooseSelect (index) {
      this.nowIndex = index
      this.$emit('on-change', this.choosers[index])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chooser-li{
  position:absolute;
  left:260px;top:0;
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
