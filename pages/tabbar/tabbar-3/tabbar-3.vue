<template>
	<view class="content">
		<view>{{title}}</view>
		<view class="uni-btn-v">
			<button type="primary" @click="scan">扫一扫</button>
		</view>
	</view>
</template>
<script>
	import permision from "../../../common/permission.js"
	import {erweimaRequest} from '../../../api/ajax.js'
	export default {
		data() {
			return {
				title: 'scanCode',
			}
		},
		onLoad() {
		},
		methods: {
			async scan() {
				var that = this
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
				    return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						var role = null
						uni.getStorage({
						    key: 'user',
						    success: function (res) {
						       role = JSON.parse(res.data).userRole
						    }
						});
						erweimaRequest(res.result).then(res1 => {
							if(!res1.id) {
								if (role === 1) {
									if (!res1.poleInformation) {
										uni.navigateTo({
											url: '../../sub_page/sjsb/sjsb?type=1&code=' + res.result,								
										})
									} else {
										uni.navigateTo({
											url: '../../sub_page/sjsb/sjsb?type=2&noid=' + JSON.stringify(res1),								
										})
									}
									
								} else if (role === 2) {
									uni.showToast({
										title: '没有故障信息',
										duration: 2000,
										icon: 'none'
									})
									uni.switchTab({
									    url: '../tabbar-1/tabbar-1'
									});
									// uni.navigateTo({
									// 	url: '../../sub_page/wxjl/wxjl?data=' + JSON.stringify(res1.data)
									// })
								} else {
									uni.navigateTo({
										url: '../../sub_page/sjsb/sjsb'
									})
								}
							} else {
								if (role === 1) {
									uni.navigateTo({
										url: '../../sub_page/sjsb/sjsb?type=3&info=' + JSON.stringify(res1),								
									})
								} else if (role === 2) {
									this.title = JSON.stringify(res1)
									uni.navigateTo({
										url: '../../sub_page/wxjl/wxjl?data=' + JSON.stringify(res1)
									})
								} else {
									uni.navigateTo({
										url: '../../sub_page/sjsb/sjsb'
									})
								}
							}
						})
						
									
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要使用您的相机，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				});
			}
			// #ifdef APP-PLUS
			,
			async checkPermission(code) {
				let status = permision.isIOS ? await permision.requestIOS('camera') :
					await permision.requestAndroid('android.permission.CAMERA');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "需要相机权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			}
			// #endif
		}
	}
</script>

<style>
	
	.content{
		padding: 300upx 30upx 0 30upx;
		height: 100%;	
	}
	
</style>
