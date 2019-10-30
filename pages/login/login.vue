<template>
	<view class="content">
		<view style="height: 350upx;">
			<image src="../../static/banner/img1.jpg" mode="" style="width: 100%;height: 100%;"></image>
		</view>
		<view class="input-content">
			<view class="uni-input-row">
				<input 
					type="number" 
					placeholder="手机号:"
					maxlength="11"
					v-model="phone"
				/>
			</view>
			<view class="uni-input-row">
				<input 
					type="password" 
					placeholder="密码:"
					v-model="password"
				/>
			</view>
			<view class="uni-input-row" style="position: relative;">
				<input 
					type="text" 
					placeholder="验证码:"
					v-model="code"
				/>
				<image @tap="getCodeImg" class="code_img" :src="img"></image>
			</view>
			<button class="confirm-btn" style="background-color: #2B8CF9;color: #FFFFFF;" @tap="login">立即登录</button>
			<view class="forget-section" style="color: #999;margin-top: 16upx;">
				忘记密码?
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getCode, login1} from '../../api/ajax.js'
	export default {
		
		data() {
			return {
				img: '',
				phone: '13800000001',
				password: '123456',
				code: '1234',
			}
		},
		onLoad() {
			this.getCodeImg()
		},
		methods: {
			async getCodeImg() {
				const res = await getCode()
				this.img = 'data:image/gif;base64,' + res.img
			},
			async login() {
				var that = this
				if (this.phone.length !== 11) {
					uni.showToast({
					    title: '手机号不正确',
					    duration: 1000
					});
					return
				}
				if (!this.password.length) {
					uni.showToast({
					    title: '密码不能为空',
					    duration: 1000
					});
					return
				}
				if (this.code.length !== 4) {
					uni.showToast({
					    title: '验证码错误',
					    duration: 1000
					});
					return
				}
				var data = {
					"username": that.phone,
					"password": that.password,
					"code": that.code,
				}
				const res = await login1(data)
				
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(res) 
				});
				uni.setStorage({
					key: 'login',
					data: data
				});
				uni.showToast({
					title: '登录成功',
					duration: 500
				})
				uni.reLaunch({
					url: '../tabbar/tabbar-1/tabbar-1'
				})
			}
		}
	}
</script>

<style>
	.content{
		margin-top: 0;
	}
	.login_content{
		padding: 0 30upx;
	}
	.input-content{
		padding: 0 30upx;
	}
	.input-content .uni-input-row{
		border: 1px solid #DCDCDC;
		border-radius: 10upx;
		margin: 30upx 0 ;
		height: 40upx !important;
		line-height: 40upx!important;
	}
	.code_img{
		position: absolute;
		right: 12upx;
		top: 8upx;
		width: 160upx;
		height: 70upx;
		border-radius: 6upx;
	}
</style>
