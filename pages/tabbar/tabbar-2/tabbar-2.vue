<template>
	<view class="content">
		<uni-load-more status="loading" :content-text="contentText" color="#007aff" v-if="!messages.length"/>
		<uni-swipe-action v-else :options="options2" @click="bindClick" v-for="(item, index) in messages" :key="index">
			<view class="message_item">
				<span class="message_person">{{item.rolename}}</span>
				<view class="message_info">{{item.content}}</view>
				<view class="status">
					<span style="margin: 0 10upx;color: #2B8CF9;">已读</span>
					<span style="color: #999999;">未读</span>
				</view>
			</view>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSwipeAction from '../../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniList from '../../../components/uni-list/uni-list.vue'
	import uniListItem from '../../../components/uni-list-item/uni-list-item.vue'
	import uniLoadMore from '../../..//components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniSwipeAction,
			uniList,
			uniListItem,
			uniLoadMore
		},
		data() {
			return {
				contentText: {
					contentrefresh: '加载中...',
				},
				isOpened: false,
				options2: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				showImg: false,
				messages: []
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.isOpened = true
			})
		},
		onLoad() {
			var that = this
			setTimeout(function() {
				var res = [
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'},
					{rolename: '张三', content: '中国短发接电费看见爱上的看法绝对是'}
				]
				that.messages = res
			}, 2000)
		},
		methods: {
			bindClick(e) {
				console.log(e)
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			setOpened() {
				this.isOpened = !this.isOpened
			},
			change(e) {
				this.isOpened = e
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

	.cont {
		height: 90upx;
		line-height: 90upx;
		padding: 0 30upx;
		position: relative;
		background: #fff;
	}

	.cont::before {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		content: '';
		transform: scaleY(0.5);
		background-color: $uni-border-color;
	}

	.cont::after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		content: '';
		transform: scaleY(0.5);
		background-color: $uni-border-color;
	}

	.example-body {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 20upx 0;
	}

	/* .button-view {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 20upx 0;
		background: #fff;
	} */

	.button {
		border: 1px solid #E7E7E7;
		padding: 8upx 16upx;
		border-radius: 8upx;
	}
	.message_item{
		height: 80upx;
		position: relative;
		border-bottom: 1px solid #DBDBDB;
		padding: 10upx 30upx 20upx 30upx;
	}
	.message_item .message_person{
		font-size: 32upx;
	}
	.message_item .message_info{
		color: #999999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding-right: 150upx;
	}
	.status{
		position: absolute;
		right: 30upx;
		top: 32upx;
	}
	.content{
	}
</style>