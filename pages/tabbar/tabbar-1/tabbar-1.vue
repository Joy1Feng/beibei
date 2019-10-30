<template>
	<view class="content">
		<view class="page-section-spacing">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1500" indicator-active-color="#2b8cf9"
			 indicator-color="#ffffff" circular="true">
				<swiper-item>
					<image src="../../../static/banner/img.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../../static/banner/img1.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../../static/banner/img2.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-wrap" style="background-color: #fff;padding-top: 30upx;">
			<view class="uni-flex uni-row sub_page">
				<view class="flex-item" @tap="toSjsb">
					<image src="../../../static/img/sjsb.jpg" mode=""></image>
					<text>事件上报</text>
				</view>
				<view class="flex-item" @tap="toSjgl">
					<image src="../../../static/img/sjgl.jpg" mode=""></image>
					<text>事件管理</text>
				</view>
				<view class="flex-item" @tap="toJrdb">

					<image src="../../../static/img/jrdb.jpg" mode=""></image>
					<text>今日待办</text>
				</view>
				<view class="flex-item" @tap="toTjfx">
					<image src="../../../static/img/tjfx.jpg" mode=""></image>
					<text>统计分析</text>
				</view>
			</view>
		</view>
		<view class="renwuchuli" v-if="userRole === 1">
			<view class="renwuchuli_head">
				<text class="renwuchuli_head_title">任务处理</text>
				<text class="more" @tap="toMoreRenwuchuli">更多 ></text>
			</view>
		</view>

		<view class="box" v-if="userRole === 1">
			<uni-load-more status="loading" :content-text="contentText" color="#007aff" v-if="renwuchuliStatus===0"/>
			<view v-else-if="renwuchuliStatus === 1" style="text-align: center; line-height: 60upx; color: #999999;">暂无数据</view>
			<t-table v-else-if="renwuchuliStatus === 2" @change="change" border="0" border-color="#ffffff">
				<t-tr color="#999999" style="border-bottom: 1px solid #EEEEEE;">
					<t-th align="left" style="padding-left: 10upx;">序号</t-th>
					<t-th>巡检点名称</t-th>
					<t-th align="right">状态</t-th>
				</t-tr>
				<t-tr v-for="(item, index) in showrenwuchuliList" :key="index" :class="{border_bottom: index !== showrenwuchuliList.length-1}">
					<t-td align="left" style="padding-left: 30upx;">{{ index + 1 }}</t-td>
					<t-td>{{ item.poleInformation.name }}</t-td>
					<t-td align="right" style="padding-right: 18upx;">{{item.status}}</t-td>
				</t-tr>
			</t-table>
		</view>
		
		<view class="renwuchuli" v-if="userRole === 2">
			<view class="renwuchuli_head">
				<text class="renwuchuli_head_title">任务中心</text>
				<text class="more" @tap="toMoreRenwuzhongxin">更多 ></text>
			</view>
		</view>
		
		<view class="box" v-if="userRole === 2">
			<uni-load-more status="loading" :content-text="contentText" color="#007aff" v-if="renwuzhongxinStatus===0"/>
			<view v-else-if="renwuzhongxinStatus === 1" style="text-align: center; line-height: 60upx; color: #999999;">暂无数据</view>
			<t-table v-else-if="renwuzhongxinStatus === 2" @change="change" border="0" border-color="#ffffff">
				<t-tr color="#999999" style="border-bottom: 1px solid #EEEEEE;">
					<t-th align="left" style="padding-left: 10upx;">序号</t-th>
					<t-th>巡检点名称</t-th>
					<t-th align="right">状态</t-th>
				</t-tr>
				<t-tr v-for="(item, index) in showRenwuzhongxinList" :key="index" :class="{border_bottom: index !== renwuzhongxinList.length-1}">
					<t-td align="left" style="padding-left: 30upx;">{{ index + 1 }}</t-td>
					<t-td>{{ item.poleInformation.name }}</t-td>
					<t-td align="right" style="padding-right: 18upx;">{{item.status}}</t-td>
				</t-tr>
			</t-table>
		</view>

	</view>
</template>

<script>
	import tTable from '../../../components/t-table/t-table.vue';
	import tTh from '../../../components/t-table/t-th.vue';
	import tTr from '../../../components/t-table/t-tr.vue';
	import tTd from '../../../components/t-table/t-td.vue';
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	import {getInfo} from '../../../api/ajax.js'
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd,
			uniLoadMore
		},
		data() {
			return {
				joy_data: '',
				title: 'Hello',
				tableList: [],
				showTable: [],
				contentText: {
					contentrefresh: '加载中...',
				},
				renwuchuliList: [],
				renwuzhongxinList: [],
				showrenwuchuliList: [],
				showRenwuzhongxinList: [],
				renwuchuliStatus: 0,
				renwuzhongxinStatus: 0,
				userRole: null
			};
		},
		onLoad() {
			var that = this
			// uni.clearStorage();
			this.getInfo1()
			uni.getStorage({
			    key: 'user',
			    success: function (res) {
			       that.userRole = JSON.parse(res.data).userRole
			    }
			});
		},
		methods: {
			async getInfo1() {
				var that = this
				var data = {timeType: 5};
				var userRole = null;
				var userId = null;
				uni.getStorage({
				    key: 'user',
				    success: function (res) {
				       userRole = JSON.parse(res.data).userRole
					   userId = JSON.parse(res.data).user.id
				    }
				});
				
				// userRole = 2
				if (userRole === 1) {
					data.userId = 1
					data.status = 1
					var res = await getInfo(data);
					res = res.content.map(item => {
						item.status = '执行中'
						return item
					})
					
					that.renwuchuliList = res
					that.showrenwuchuliList = res.slice(0, 5)
					that.renwuchuliList = res;
					if (res.length === 0) {
						// 暂无数据
						that.renwuchuliStatus = 1
					} else (
						that.renwuchuliStatus = 2
					)
					that.joy_data = res
				} else if (userRole === 2) {
					data.status = 1
					data.processingPerson = 6
					var res = await getInfo(data);
					res = res.content.map(item => {
						item.status = '未分发'
						return item
					})
					that.showRenwuzhongxinList = res.slice(0, 5)

					that.renwuzhongxinList = res;
					if (res.length === 0) {
						// 暂无数据
						that.renwuzhongxinStatus = 1
					} else (
						that.renwuzhongxinStatus = 2
					)
				} else if (userRole === 3) {
					data.processingPerson = userId
					data.userId = userId
					var res= await getInfo(Object.assign(data, {status: 0}));
					res = res.content.map(item => {
						item.status = '未分发'
						return item
					})
					that.renwuchuliList = res
					that.showrenwuchuliList = res.slice(0, 5)
					
					var res1= await getInfo(Object.assign(data, {status: 1}));
					res1 = res1.content.map(item => {
						item.status = '执行中'
						return item
					})
					that.renwuzhongxinList = res
					that.showRenwuzhongxinList = res.slice(0, 5)
				}
			},
			change(e) {
				console.log(e.detail);
			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			},
			toSjsb() {
				uni.navigateTo({
					url: '../../sub_page/sjsb/sjsb'
				})
			},
			toSjgl() {
				uni.navigateTo({
					url: '../../sub_page/sjgl/sjgl'
				})
			},
			toJrdb() {
				uni.navigateTo({
					url: '../../sub_page/jrdb/jrdb'
				})
			},
			toTjfx() {
				uni.navigateTo({
					url: '../../sub_page/tjfx/tjfx'
				})
			},
			toMoreRenwuchuli() {
				var that = this
				uni.navigateTo({
					url: '../../more/more?data=' + JSON.stringify(that.renwuchuliList)
				})
			},
			toMoreRenwuzhongxin() {
				var that = this
				uni.navigateTo({
					url: '../../more/more?data=' + JSON.stringify(that.renwuzhongxinList)
				})
			}
			
		}
	};
</script>

<style>
	.content {
		background-color: #f9f9f9;
	}

	.swiper {
		height: 400upx;
	}

	swiper-item image {
		width: 100%;
		height: 400upx;
	}

	.sub_page {
		height: 200upx;
		justify-content: space-around;
	}

	.sub_page>.flex-item {
		background-color: #fff;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 30upx;
	}

	.flex-item>image {
		width: 100upx;
		height: 100upx;
	}

	.renwuchuli {
		padding: 0 33upx;
		background-color: #fff;
		margin-top: 30upx;
	}

	.renwuchuli_head {
		height: 80upx;
		line-height: 80upx;
		position: relative;
		border-bottom: 1px dashed #dcdcdc;
	}

	.renwuchuli_head:before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 14upx;
		height: 70%;
		width: 6upx;
		background-color: #2b8cf9;
	}

	.renwuchuli_head .renwuchuli_head_title {
		font-size: 32upx;
		margin-left: 24upx;
		color: #666666;
	}

	.renwuchuli_head .more {
		float: right;
		font-size: 26upx;
		color: #999999;
	}
	.box{
		padding: 0 33upx;
		background-color: #fff;
	},
	.border_bottom{
		border-bottom: 1px solid #EEEEEE;
	}
</style>
