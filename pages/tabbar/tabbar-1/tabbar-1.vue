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
		<view class="renwuchuli">
			<view class="renwuchuli_head">
				<text class="renwuchuli_head_title">任务处理</text>
				<text class="more" @tap="toMore">更多 ></text>
			</view>
		</view>

		<view class="box">
			<t-table @change="change" border="0" border-color="#ffffff">
				<t-tr color="#999999" style="border-bottom: 1px solid #EEEEEE;">
					<t-th align="left" style="padding-left: 10upx;">序号</t-th>
					<t-th>巡检点名称</t-th>
					<t-th align="right">状态</t-th>
				</t-tr>
				<t-tr v-for="(item, index) in tableList" :key="item.id" :class="{border_bottom: index !== tableList.length-1}">
					<t-td align="left" style="padding-left: 30upx;">{{ item.id + 1 }}</t-td>
					<t-td>{{ item.name }}</t-td>
					<t-td align="right" style="padding-right: 18upx;">{{ item.age }}</t-td>
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
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				title: 'Hello',
				tableList: [{
						id: 0,
						name: '张三',
						age: '19',
						hobby: '游泳'
					},
					{
						id: 1,
						name: '李四',
						age: '21',
						hobby: '绘画'
					},
					{
						id: 2,
						name: '王二',
						age: '29',
						hobby: '滑板'
					},
					{
						id: 3,
						name: '码字',
						age: '20',
						hobby: '蹦极'
					},
					{
						id: 4,
						name: '码字',
						age: '20',
						hobby: '蹦极'
					}
				]
			};
		},
		onLoad() {},
		methods: {
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
			toMore() {
				uni.navigateTo({
					url: '../../more/more'
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
