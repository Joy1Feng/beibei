<template>
	<view @tap="$emit('onBarrierTap')" v-show="show" class="popup-main">
		<view @tap.stop class="popup-content">
			<slot>
				{{ msg }}
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopup',
		props: {
			/**
			 * 页面显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			msg: {
				type: String,
			}
		},
		data() {
			return {
				offsetTop: 0
			}
		},
		created() {
			let offsetTop = 0
			// #ifdef H5
			if (!this.h5Top) {
				offsetTop = 44
			} else {
				offsetTop = 0
			}
			// #endif
			this.offsetTop = offsetTop
		},
		methods: {}
	}
</script>
<style>
	.popup-main {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
	}
	
	.popup-content {
		margin: 200rpx auto;
	}
</style>
