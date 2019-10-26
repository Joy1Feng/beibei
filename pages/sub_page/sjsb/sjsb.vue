<template>
	<view class="content">
		<form>
			<view class="form_item">
				<label for="code_value">二维码</label>
				<div id="code_value"></div>
			</view>
			<view class="form_item">
				<label for="plle_value">杆号信息</label>
				<input type="text" id="plle_value" placeholder="请输入杆号信息">
			</view>
			<view class="form_item">
				<label for="lien_value">线路信息</label>
				<div id="lien_value" class="chose">
					<span>123</span>
					<span class="chose_icon">请选择<span class="iconfont icon-iconfontjiantou3"></span></span>
				</div>
			</view>
			<view class="form_item">
				<label for="cat_value">事件分类</label>
				<div id="cat_value" class="chose">
					<span>111</span>
					<span class="chose_icon">请选择<span class="iconfont icon-iconfontjiantou3"></span></span>
				</div>
			</view>
			<view class="form_item" style="height: 200upx;">
				<label for="description_value">事件描述</label>
				<textarea id="description_value" style="line-height: 60upx;padding-top: 20upx;" auto-height class="chose" value="jfasjdfk" />
				</view>
			<view class="form_item">
				<label for="speech_value">语音描述</label>
				<button id="speech_value" placeholder="请输入杆号信息">按住说话</button>
			</view>
			<view class="form_item">
				<label for="speech_value">是否报送</label>
				<div style="margin-top: 18upx;">
					<radio-group @change="radioChange">
					<label v-for="(item, index) in items" :key="item.value">
						<radio :value="item.value" :checked="index === current" />
						<text>{{item.name}}</text>
					</label>
					</radio-group>
				</div>
			</view>
			<view class="form_item remove_border_bottom">
				<label for="end_value">完成时间</label>
				<div id="end_value" class="chose">
					<span>123</span>
					<span class="chose_icon">请选择<span class="iconfont icon-iconfontjiantou3"></span></span>
				</div>
			</view>
			<button type="primary" style="margin-top: 30upx;">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				items: [{
						value: 'true',
						name: '是'
					},
					{
						value: 'false',
						name: '否'
					}
				],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
	@import '../../../static/css/iconfont.css';
	.content{
		padding: 0 30upx;
		overflow: hidden;
	}
	.form_item{
		height: 90upx;
		line-height: 90upx;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
	}
	.form_item label{
		text-align: left;
		width: 120upx;
		padding-right: 30upx;
	}
	.form_item input{
		flex: 1;
		height: 90upx;
	}
	
	.form_item .chose{
		flex: 1;
		height: 90upx;
		line-height: 90upx;
		position: relative;
	}
	.form_item .chose_icon{
		position: absolute;
		right: -40upx;
		top: 0;
		color: #999999;
	}
	.remove_border_bottom{
		border-bottom: none;
	}
	.chose_icon span{
		vertical-align: middle;
		font-size: 24upx;
		color: #999999;
	}
	#speech_value{
		height: 60upx;
		width: 400upx;
		background-color: #f5f5f5;
		color: #999999;
		font-size: 28upx;
		margin-top: 16upx;
		line-height: 60upx;
	}
</style>
