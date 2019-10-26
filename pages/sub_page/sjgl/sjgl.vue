<template>
	<view class="sjgl">
		<view class="uni-padding-wrap" style="background-color: #fff;height: 80upx;padding-top: 20upx;">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view style="padding: 0 30upx;">
			<view style="position: relative;">
				<input type="text" value="" placeholder="请输入搜索内容" class="sjgl_search_value"/>
				<span class="search_btn">搜索</span>
			</view>
			<view class="content">
				<view v-show="current === 0">选项卡1的内容</view>
				<view v-show="current === 1">选项卡2的内容</view>
				<view v-show="current === 2">选项卡3的内容</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '../../../components/uni-segmented-control/uni-segmented-control.vue'
	import uniSearchBar from '../../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSegmentedControl,
			uniSearchBar
		},
		data() {
			return {
				items: ['处理中', '已结束'],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['#007aff', '#4cd964', '#dd524d'],
				current: 0,
				colorIndex: 0,
				activeColor: '#007aff',
				styleType: 'text'
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
			},
			styleChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.styleType = evt.target.value
				}
			},
			colorChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.activeColor = evt.target.value
				}
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}
	
	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.uni-common-mt {
		margin-top: 20upx;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300upx;
		text-align: center;
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}

	uni-radio-group uni-label {
		padding: 0;
	}

	.uni-list-item__container {
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.example-body {
		padding: 0;
	}

	.uni-list .uni-list-item:last-child {}
	
	
	.sjgl_search_value{
		height: 80upx;
		line-height: 80upx;
		border-radius: 40upx;
		background-color: #fff;
		padding-left: 30upx;
		margin-top: 20upx;
		position: relative;
	}
	.sjgl_search_value:after{
		content: '';
		display: block;
		position: absolute;
		right: 120upx;
		top: 20upx;
		height: 20px;
		width: 4upx;
		background-color: #DCDCDC;
	}
	.search_btn{
		position: absolute;
		color: #2B8CF9;
		font-size: 32upx;
		right: 30upx;
		top: 15upx;
	}
</style>