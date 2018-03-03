<template>
  <div>
    <div class="sale-board-intro">
        <h3>广告发布</h3>
        <div class="sale-board-intro-div">
	        <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
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
    	<span class="line-span">半年</span>
    </div>
    <div class="sale-board-from-line">
    	<div class="line-left">产品版本:</div>
    	<v-mul-chooser :mulChoose="buyeditions" @on-change="onParamChange('buyedition',$event)"></v-mul-chooser>
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
		        <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
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
    				<td>半年</td>
    				<td>
    					<span v-for="item in buyedition">{{item.label}};</span>
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
import vMulChooser from '../../components/base/mulchooser'
import bankTemp from '../../components/base/temp'
import bankChooser from '../../components/bankchooser'

export default {
	components: {
		vCounter,
		vSelection,
		vMulChooser,
		bankTemp,
		bankChooser
	},
	data () {
		return {
			buyNum: 1,
      price: 100,
			isShowPayTemp: false,
			buyType: {
				label: '初级版',
				value: 0
			},
			buyedition: {
				label: '出版业',
				value: 0
			},
			buyTypes: [
				{
          label: '初级版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        },
        {
          label: '专家版',
          value: 3
        }
			],
			buyeditions: [
				{
          label: '出版业',
          value: 0
        },
        {
          label: '媒体',
          value: 1
        },
        {
          label: '金融',
          value: 2
        },
        {
          label: '互联网',
          value: 3
        },
        {
          label: '游戏',
          value: 4
        }
			]
		}
	},
	methods: {
		showPayTemp () {
			this.isShowPayTemp = true;
		},
		onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let nowVersionArray = []
      this.versions.map((item) => {
        nowVersionArray.push(this.versions)
      })
      let regParam = {
        buyNumber: this.buyNum,
        buyTpye: this.buyType,
        version: nowVersionArray.join(',')
      }
      this.$http.get('/api/getPrice', regParam)
      .then((res) => {
        this.price = res.data.amount
      })
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

</style>
