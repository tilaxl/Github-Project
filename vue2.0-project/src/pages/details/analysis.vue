<template>
  <div>
    <div class="sale-board-intro">
        <h3>流量分析</h3>
        <div class="sale-board-intro-div">
	        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
	    </div>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">购买数量:</div>
    	<v-counter :max=99 @on-change = "onParamChange('buyNum', $event)"></v-counter>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">产品类型</div>
    	<v-selection :selections="buyTypes" @on-change="onParamChange('buyType',$event)"></v-selection>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">有效时间:</div>
    	<v-chooser :choosers= "periods" @on-change="onParamChange('period',$event)"></v-chooser>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">产品版本:</div>
    	<v-mul-chooser :mulChoose="versions" @on-change = "onParamChange('version', $event)"></v-mul-chooser>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">总价:</div>
    	<span class="line-span">{{price * buyNum}}元</span>
    </div>
    <div class="sale-board-m">
    	<button class="btn" type="button" @click="ShowPayTemp"
    	style="background: rgb(64,172,134);color:#fff;cursor:pointer">立即购买</button> 
    </div>
    <div class="bgcolor"></div>
    <div class="sale-board-bottom">
	    <div class="sale-board-intro">
	        <h3>产品说明</h3>
	        <div class="sale-board-intro-div">
		        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>
	        </div>
	        <h5>用户行为指标</h5>
	        <ul class="ul-text">
		        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
		        <li>用户在网站的停留时间；</li>
		        <li>用户来源网站（也叫“引导网站”）；</li>
		        <li>用户所使用的搜索引擎及其关键词；</li>
		        <li>在不同时段的用户访问量情况等。</li>
		      </ul>
		      <h5>浏览网站方式</h5>
		      <ul class="ul-text">
		        <li>用户上网设备类型</li>
		        <li>用户浏览器的名称和版本</li>
		        <li>访问者电脑分辨率显示模式</li>
		        <li>用户所使用的操作系统名称和版本</li>
		        <li>用户所在地理区域分布状况等</li>
		      </ul>
	    </div>
    </div>
    <bank-temp :is-show="isShowPayTemp" @on-close="hideAll('isShowPayTemp')">
    	<table class="table table-bordered">
    		<thead>
    			<tr>
    				<th>购买数量</th>
        	  <th>产品类型</th>
        	  <th>有效时间</th>
        	  <th>产品版本</th>
        	  <th>总价</th>
    			</tr>
    		</thead>
    		<tbody>
    			<tr>
    				<td>{{buyNum}}</td>
        	  <td>{{buyType.label}}</td>
        	  <td>{{period.label}}</td>
    				<td>
    					<span v-for="item in version">{{item.label}};</span>
    				</td>
        	  <td>{{price * buyNum}}</td>
    			</tr>
    		</tbody>
    	</table>
    	<h2 style="text-align:center">请选择银行</h2>
    	<bank-chooser></bank-chooser>
    	<button class="btn" type="button" @click="buynow" style="background:rgb(64,172,134);
    	color:#fff;margin:0 0 10px 85px;cursor:pointer">立即购买</button> 
    </bank-temp>
  </div>
</template>
  
<script>
import vCounter from '../../components/base/counter'
import vSelection from '../../components/base/selection'
import vChooser from '../../components/base/chooser'
import vMulChooser from '../../components/base/mulchooser'
import bankTemp from '../../components/base/temp'
import bankChooser from '../../components/bankchooser'

export default {
	components: {
		vCounter,
		vSelection,
		vChooser,
		vMulChooser,
		bankTemp,
		bankChooser
	},
	data () {
		return {
			price: 100,
			buyNum: 1,
			version: [],
			buyType: {
				label: '入门版',
				value: 0
			},
			period: {
				label: '半年',
				value: 0
			},
			isShowPayTemp: false,
			buyTypes: [
				{
					label: '入门版',
					value: 0
				},
				{
					label: '中级版',
					value: 1
				},
				{
					label: '高级版',
					value: 2
				}
			],
			periods: [
				{
					label: '半年',
					value: 0
				},
				{
					label: '一年',
					value: 1
				},
				{
					label: '三年',
					value: 2
				}
			],
			versions: [
				{
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
			]
		}
	},
	methods: {
		onParamChange (attr, val) {
			this[attr] = val
			this.getPrice()
		},
		getPrice () {
      let buyVersionsArray = []
      this.versions.map((item) => {
        buyVersionsArray.push(item.value)
      })
      let reqParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionsArray.join(',')
      }
      this.$http.get('/api/getPrice', reqParams)
      .then((res) => {
        this.price = res.data.amount
      })
    },
		ShowPayTemp () {
			this.isShowPayTemp = true
		},
		hideAll (attr) {
	      this[attr] = false
    },
    buynow () {
  		this.$router.push({path: '/orderList'})
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ul-text{
	list-style:none;
	padding:3px 40px 3px 50px;
}
</style>
