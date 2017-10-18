<template>
  <div>
    <div class="sale-board-intro">
        <h3>数据统计</h3>
        <div class="sale-board-intro-div">
	        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
	    </div>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">产品类型</div>
    	<v-chooser :choosers= "buyTypes" @on-change="onParamChange('buyType',$event)"></v-chooser>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">适用地区</div>
    	<v-selection :selections="districts" @on-change="onParamChange('district',$event)"></v-selection>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">有效时间:</div>
    	<span class="line-span">半年</span>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">总价:</div>
    	<span class="line-span">{{price * buyNum}}元</span>
    </div>
    <div class="sale-board-m">
    	<button class="btn" type="button" style="background: rgb(64,172,134);color:#fff;cursor:pointer" @click="showPayTemp">立即购买</button> 
    </div>
    <div class="bgcolor"></div>
    <div class="sale-board-bottom">
    	<div class="sale-board-intro">
        <h3>产品说明</h3>
        <div class="sale-board-intro-div">
	        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
        </div>
	    </div>
    	<table class="table table-hover table-striped">
	    	<tbody>
	    		<tr>
	    			<td>安全安保</td>
	    			<td>办公文教</td>
	    			<td>彩票</td>
	    			<td>车辆物流</td>
	    			<td>成人用品</td>
	    			<td>出版传媒</td>
	    		</tr>
	    		<tr>
	    			<td>电脑硬件</td>
	    			<td>电子电工</td>
	    			<td>房地产建筑装修</td>
	    			<td>分类平台</td>
	    			<td>服装鞋帽</td>
	    			<td>箱包饰品</td>
	    		</tr>
	    		<tr>
	    			<td>化工原料制品</td>
	    			<td>机械设备</td>
	    			<td>家庭日用品</td>
	    			<td>家用电器</td>
	    			<td>教育培训</td>
	    			<td>节能环保</td>
	    		</tr>
	    		<tr>
	    			<td>金融服务</td>
	    			<td>礼品</td>
	    			<td>旅游住宿</td>
	    			<td>美容化妆</td>
	    			<td>母婴护理</td>
	    			<td>农林牧渔</td>
	    		</tr>
	    		<tr>
	    			<td>软件</td>
	    			<td>商务服务</td>
	    			<td>生活服务</td>
	    			<td>食品保健品</td>
	    			<td>手机数码</td>
	    			<td>通讯服务设备</td>
	    		</tr>
	    		<tr>
	    			<td>网络服务</td>
	    			<td>医疗服务</td>
	    			<td>游戏</td>
	    			<td>运动休闲娱乐</td>
	    			<td>招商加盟</td>
	    			<td>联系我们</td>
	    		</tr>
    		</tbody>
    	</table>
    </div>
    <bank-temp :is-show="isShowPayTemp" @on-close="hideThis('isShowPayTemp')">
    	<table class="table table-bordered">
    		<thead>
    			<tr>
    				<th>产品类型</th>
    				<th>适用地区</th>
    				<th>有效时间</th>
    				<th>总价</th>
    			</tr>
    		</thead>
    		<tbody>
    			<tr>
    				<td>{{buyType.label}}</td>
    				<td>{{district.label}}</td>
    				<td>半年</td>
    				<td>{{price}}</td>
    			</tr>
    		</tbody>
    	</table>
    	<h2 style="text-align:center">请选择银行</h2>
    	<bank-chooser></bank-chooser>
    	<button class="btn" type="button" @click="buynow" style="background:rgb(64,172,134);
    	color:#fff;margin:0 0 10px 85px;cursor:pointer">立即购买</button>
    </bank-temp>
    <bank-temp :is-show="isShowErrTemp" @on-close="hideAll('isShowErrTemp')">购买失败!</bank-temp>
  </div>
</template>
  
<script>
import vChooser from '../../components/base/chooser'
import vSelection from '../../components/base/selection'
import bankTemp from '../../components/base/temp'
import bankChooser from '../../components/bankchooser'

export default {
  components: {
  	vChooser,
  	vSelection,
  	bankTemp,
		bankChooser
  },
  data () {
  	return {
  		buyNum: 1,
  		price: 100,
  		isShowPayTemp: false,
  		isShowErrTemp: false,
  		isShowCheckOrder: false,
  		buyType: {
  			label: '红色版',
				value: 0
  		},
  		district: {
  			label: '浙江',
	  		value: 0
  		},
  		buyTypes: [
				{
					label: '红色版',
					value: 0
				},
				{
					label: '绿色版',
					value: 1
				},
				{
					label: '紫色版',
					value: 2
				}
		  ],
		  districts: [
		  	{
		  		label: '浙江',
		  		value: 0
		  	},
		  	{
		  		label: '北京',
		  		value: 1
		  	},
		  	{
		  		label: '上海',
		  		value: 2
		  	},
		  	{
		  		label: '广州',
		  		value: 3
		  	},
		  	{
		  		label: '西安',
		  		value: 4
		  	},
		  	{
		  		label: '海南',
		  		value: 5
		  	}
		  ]
		}
	},
	methods: {
		onParamChange (attr, val) {
			this[attr] = val
			this.getPrice()
		},
		showPayTemp () {
			this.isShowPayTemp = true;
		},
		hideAll (attr) {
      this[attr] = false
    },
    hideThis (attr) {
    	this[attr] = false
    	this.isShowErrTemp = true
    },
    buynow () {
    		this.$router.push({path: '/orderList'})
    },
    getPrice () {
      let reqParams = {
        buyType: this.buyType,
        district: this.district
      }
      this.$http.get('/api/getPrice', reqParams)
      .then((res) => {
        this.price = res.data.amount
      })
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
