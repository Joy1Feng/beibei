<template>
	<view class="content">
		<!-- <navigator url="pages/login/login" open-type="navigate"> -->
			<view class="profile" @tap="toLogin">
				<image src="../../../static/img/profile.png" mode="" class="profile_img"></image>
				<span class="login">请登录</span>
				<span class="iconfont icon-iconfontjiantou3"></span>
			</view>
		<!-- </navigator> -->
		<view class="help">
			<view class="help_cell">
				<image src="../../../static/img/person1.jpg" mode="" class="profile_img"></image>
				<span class="title">使用帮助</span>
				<span class="iconfont icon-iconfontjiantou3"></span>
			</view>
			<view class="help_cell remove_border_bottom">
				<image src="../../../static/img/person2.jpg" mode="" class="profile_img"></image>
				<span class="title">意见反馈</span>
				<span class="iconfont icon-iconfontjiantou3"></span>
			</view>
		</view>
		<view class="help" style="margin-top: 30upx;">
			<view class="help_cell">
				<image src="../../../static/img/person3.jpg" mode="" class="profile_img"></image>
				<span class="title">版本更新</span>
				<span class="iconfont icon-iconfontjiantou3"></span>
			</view>
			<view class="help_cell remove_border_bottom">
				<image src="../../../static/img/person4.jpg" mode="" class="profile_img"></image>
				<span class="title">关于我们</span>
				<span class="iconfont icon-iconfontjiantou3"></span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			toLogin: function(){
				uni.navigateTo({
					url:'../../login/login'
				})
			}
		}
	}
</script>

<style>
	@import '../../../static/css/iconfont.css';

	page {
		background-color: #f9f9f9;
	}

	.content {
		height: 100%;
	}

	.profile {
		height: 300upx;
		background-color: #73b7fa;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		color: #FFFFFF;
	}

	.profile_img {
		width: 120upx;
		height: 120upx;
	}

	.login {
		font-size: 32upx;
		margin-left: -380upx;
	}

	.icon {
		font-size: 36upx;
	}

	.help {
		padding: 0 30upx;
		margin-top: 30upx;
		background-color: #fff;
	}

	.help>view {
		height: 100upx;
		border-bottom: 1px solid #dcdcdc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.remove_border_bottom{
		border-bottom: none!important;
	}

	.help_cell image {
		width: 60upx;
		height: 60upx;
	}

	.help_cell>.title {
		margin-left: -400upx;
	}

	.help_cell>.help_icon {
		color: #999999;
		font-size: 36upx;
	}
</style>
