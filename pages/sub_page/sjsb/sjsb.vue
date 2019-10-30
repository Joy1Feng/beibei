<template>
	<view class="content">
		<form>
			<view class="form_item">
				<label for="lien_value">二维码</label>
				<div id="code_value" class="chose">
					<span>{{ scanResult }}</span>
					<span @tap="scan" class="iconfont icon-erweima"></span>
				</div>
			</view>
			<view class="form_item">
				<label for="plle_value">杆号信息</label>
				<input type="text" id="plle_value" :disabled="!codeStatus" placeholder="请输入杆号信息" v-model="plle_value">
			</view>
			<view class="form_item">
				<label for="lien_value">线路信息</label>
				<div id="lien_value" class="chose">
					<span>{{ lineInfo.label }}</span>
					<block v-if="codeStatus">
						<span class="chose_icon" @click="showSinglePicker">请选择<span class="iconfont icon-iconfontjiantou3"></span></span>
					</block>
				</div>
			</view>
			<view class="form_item">
				<label for="cat_value">事件分类</label>
				<div id="cat_value" class="chose">
					<span v-if="checkedEventKinds.length">
						<template v-for="(item, index) in checkedEventKinds">
							{{ eventKinds.find((_item) => _item.value === item).name }} {{ index === eventKinds.length - 1 ? "" : " " }}
						</template>
					</span>
					<span class="chose_icon" @tap="eventCheckOpen = true">请选择<span class="iconfont icon-iconfontjiantou3"></span></span>
				</div>
			</view>
			<view class="form_item" style="height: 200upx;">
				<label for="description_value">事件描述</label>
				<textarea id="description_value" style="line-height: 60upx;padding-top: 20upx;" auto-height class="chose" v-model="description_value" />
			</view>
			<view class="form_item remove_border_bottom">
				<label for="speech_value">语音描述</label>
				<button id="speech_value" @tap="startRecognize" type="primary">按住说话</button>
			</view>
			<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view style="margin-top: 20rpx;" class="uni-uploader-title">图片上传</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in images" :key="index">
										<view class="image-wrapper">
											<view class="cancel" @tap="removeImg(index)">X</view>
											<view class="uni-uploader__file">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
										</view>
										</view>
									</block>
									<view style="margin-bottom: 20rpx;" class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			<view>
			</view>
			<view class="form_item" style="position: relative;margin-bottom: 30upx;">
				<label for="speech_value">是否报送</label>
				<view style="margin-top: 18upx;">
					<radio-group @change="radioChange">
					<label v-for="(item, index) in items" :key="item.value">
						<radio :value="item.value" :checked="index === current" />
						<text>{{item.name}}</text>
					</label>
					<span>{{ reporterInfo.label }}</span>
					</radio-group>
					<button v-if="reporterInfo.value" @tap="showReporterPicker" style="position: absolute;right: 20upx;top: 20upx;height: 50upx; width: 100upx;font-size: 22upx;" type="primary">修改</button>
				</view>
			</view>
			<!-- <view class="form_item remove_border_bottom">
				<label for="end_value">完成时间</label>
				<div id="end_value" class="chose">
					<view style="margin: 8upx 0 0 -20upx;">
						<ruiDatePicker
						    fields="second"
						    start="2016-01-01 00:00:00"
						    end="2023-01-01 00:00:00"
						    :value="value"
						    @change="bindChange"
						    @cancel="bindCancel"
							ref="ruiDate"
						></ruiDatePicker>
					</view>
				</div>
			</view> -->
			<view>{{joy_data}}</view>
			<button type="primary" @tap="postdata">提交</button>
		</form>
		<view class="mpvue-picker">
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		</view>
		
		<uni-popup :show="eventCheckOpen" @onBarrierTap="eventCheckOpen = false" type="bottom">
			<view class="uni-list event-list">
			<checkbox-group style="background: #ffffff; border-radius: 10rpx; overflow: hidden;border-bottom: none;padding-bottom: 40rpx;" @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in eventKinds" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>{{item.name}}</view>
				</label>
				<button @tap="confirmEventCheck" style="margin-top: 60rpx;width: 80%;" type="primary">确认</button>
			</checkbox-group>
		</view>
		</uni-popup>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../common/city.data.js';
	import ruiDatePicker from '../../../components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import permision from "../../../common/permission.js";
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import {getLineInfo, getReportInfo, getThingInfo, sjsbRequest} from '../../../api/ajax.js'
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month >= 10 ? month : "0" + month;
		let day = date.getDate();
		month = month >= 10 ? month : "0" + month;

		
		let hours = date.getHours();
		hours = hours >= 10 ? hours : "0" + hours;
		let minutes = date.getMinutes();
		minutes = minutes >= 10 ? minutes : "0" + minutes;
		let seconds = date.getSeconds();
		seconds = seconds >= 10 ? seconds : "0" + seconds;
	
		if (type === "end") {
			year += 3
		}
		
		return type === "start" ? "2019-12-08 00:00:00" : "2019-12-20 00:00:00"
		// return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	}
	export default {
		created() {
			this.minDate = getDate("start")
			this.maxDate = getDate("end")
			console.log(this.minDate, " ", this.maxDate)
		},
		components: {
			mpvuePicker,
			mpvueCityPicker,
			ruiDatePicker,
			uniPopup,
		},
		data() {
			return {
				joy_data: '',
				joy_data1: '',
				scanResult: "",
				minDate: "1970-01-01 00:00:00",
				maxDate: "2023-01-01 00:00:00",
				pickerType: null,
				eventCheckOpen: false,
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				images: [],
				title: 'Hello',
				checkedEventKinds: [],
				eventKinds: [],
				items: [{
						value: 'false',
						name: '否'
					},{
						value: 'true',
						name: '是'
					},
					
				],
				current: 0,
				pickerSingleArray: [],
				reporterList: [],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				lineInfo: {},
				reporterInfo: {},
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				value: '',
				description_value: '',
				plle_value: '',
				userId: '',
				codeStatus: '',
				poleId: '',
				optionCode: '',
				type: '',
				powerInspectionId: ''
			}
		},
		onLoad(option) {
			var that = this
			this.getLineInfo1()
			this.getReportInfo1()
			this.getThingInfo1()
			var type = option.type
			this.type = type
			if (Number(type) === 1) {
				this.optionCode = option.code
				this.scanResult = option.code
			} else if(Number(type) === 2) {
				this.codeStatus = option.code
				var noid = option.noid
				this.scanResult = noid && JSON.parse(noid).poleInformation.code
				this.plle_value = noid && JSON.parse(noid).poleInformation.name
				this.lineInfo.label = noid && JSON.parse(noid).poleInformation.line.name
				this.lineInfo.value = noid && JSON.parse(noid).poleInformation.line.id
				this.poleId = noid && JSON.parse(noid).poleInformation.id
			} else if (Number(type) === 3) {
				var info = JSON.parse(option.info)
				this.scanResult = info.poleInformation.code
				this.plle_value = info.poleInformation.name
				this.lineInfo.label = info.poleInformation.line.name
				this.lineInfo.value = info.poleInformation.line.id
				this.description_value = info.remarks
				this.reporterInfo.label = info.processNickName
				this.powerInspectionId = info.id
				
				this.$nextTick(function(){
					var checkedLine = []
					this.eventKinds.forEach(item => {
						if (item.name === info.description) {
							checkedLine.push(item.id)
						}
					})
					this.checkedEventKinds = checkedLine;
				})
				// this. = noid && JSON.parse(noid).poleInformation.id
			}
			uni.getStorage({
			    key: 'user',
			    success: function (res) {
			       that.userId = JSON.parse(res.data).user.id
			    }
			});
			
		},
		methods: {
			async getLineInfo1() {
				var res = await getLineInfo()
				res = res.map(item => {
					item.label = item.name
					item.value = item.id
					return item
				})
				
				this.pickerSingleArray = res
			},
			async getReportInfo1() {
				var res = await getReportInfo()
				res = res.map(item => {
					item.label = item.nickName
					item.value = item.id
					return item
				})
				this.reporterList = res
				
			},
			async getThingInfo1() {
				var res = await getThingInfo()
				res = res.map(item => {
					item.name = item.name
					item.value = item.id
					return item
				})
				this.eventKinds = res
			},
			async postdata() {
				var scanResult = this.scanResult
				var plle_value = this.plle_value
				var lineInfo = this.lineInfo.value
				var checkedEventKinds = this.checkedEventKinds
				var description_value = this.description_value
				var images = this.images
				var reporterInfo = this.reporterInfo.value || ['']
				if (!scanResult) {
					uni.showToast({
						title: '二维码为空',
						duration: 1000
					})
					return
				}
				if (!plle_value) {
					uni.showToast({
						title: '杆号信息为空',
						duration: 1000
					})
					return
				}
				
				if (!lineInfo) {
					uni.showToast({
						title: '线路信息为空',
						duration: 1000
					})
					return
				}
				// this.joy_data = JSON.stringify(checkedEventKinds)
				if (!checkedEventKinds.length) {
					uni.showToast({
						title: '事件分类为空',
						duration: 1000
					})
					return
				}
				if (!description_value) {
					uni.showToast({
						title: '描述为空',
						duration: 1000
					})
					return
				}
				
				var checkedThingArr1 = []
				checkedEventKinds.length && checkedEventKinds.forEach(item => {
					this.eventKinds.forEach(item1 => {
						if (item === item1.value){
							checkedThingArr1.push(item1.name)
						}
					})
				})
				var checkedThingArr1_str = checkedThingArr1.join(',')
				// this.joy_data = scanResult + plle_value + lineInfo + JSON.stringify(checkedEventKinds) + description_value + JSON.stringify(images) + reporterInfo
				var postDatas = {};
				if (this.type == 1) {
					 postDatas = {
					 "poleInformation":{
					  "code": scanResult,
					  "name": plle_value,
					  "line":{
					   "id": lineInfo[0]
					  }
					 },
					 "inspectionRecord":{
					  "poleInformation": {},
					  "description": checkedThingArr1_str,
					  "userId": this.userId,
					  "remarks": description_value,
					  "processingPerson": reporterInfo[0]
					 },
					 "LocalStorageIs": ""
					}
				}else if(this.type == 2) {
					postDatas = {
					 "inspectionRecord":{
					  "poleInformation": {"id": this.poleId
					  },
					  "description": checkedThingArr1_str,
					  "userId": this.userId,
					  "remarks": description_value,
					  "processingPerson": reporterInfo[0]
					 },
					 "LocalStorageIs": ""
					}
					
				} else if (this.type == 3){
					postDatas = {
						"inspectionRecord":{
							"id": this.powerInspectionId,
							"description": checkedThingArr1_str,
							"remarks": description_value,
							"processingPerson": reporterInfo[0]
							
						},
						"LocalStorageIs": ""
					}
				}
				this.joy_data = JSON.stringify(postDatas);
				if (this.type == 1){
					var res = await sjsbRequest(postDatas, 'POST')
				} else if (this.type == 2) {
					var res = await sjsbRequest(postDatas, 'POST')
				} else if (this.type == 3) {
					var res = await sjsbRequest(postDatas, 'PUT')
				}
				if (res.statusCode === 200) {
					uni.showToast({
						title: '提交成功',
						duration: 500
					})
					uni.switchTab({
					    url: '../../tabbar/tabbar-1/tabbar-1'
					});
				}
				
			},
			async scan() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
				    return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						this.scanResult = res.result
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
			},
			// #endif
			confirmEventCheck: function() {
				this.checkedEventKinds = this.eventKinds.filter(function(item) {
					return item.checked
				}).map(function(item) {
					return item.value
				})
				this.joy_data = JSON.stringify(this.checkedEventKinds)
				this.eventCheckOpen = false;
			},
			checkboxChange: function (e) {
				var items = this.eventKinds,
					values = e.detail.value;
				for (var i = 0, lenI = this.eventKinds.length; i < lenI; ++i) {
					const item = items[i]
					if(values.indexOf(item.value) >= 0){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			removeImg: function(index) {
				this.images.splice(index, 1);
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "只能选择9张图片",
						showCancel: false,
					})
				})
			},
			chooseImage: async function() {
				if (this.images.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.images.length + this.count[this.countIndex] > 9 ? 9 - this.images.length : this.count[this.countIndex],
					success: (res) => {
						console.log("图片", " ", res);
						this.images = this.images.concat(res.tempFilePaths);
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.images
				})
			},
			radioChange(evt) {
				console.log(evt);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				
				if (this.current === 1) {
					this.showReporterPicker();
				} else if (this.current === 0) {
					this.reporterInfo = {}
				}
			},
			// 单列
			showSinglePicker() {
				this.pickerType = 0
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			showReporterPicker() {
				this.pickerType = 1
				this.pickerValueArray = this.reporterList
				this.mode = 'selector';
				this.deepLength = 1	
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				console.log(e);
				if (this.pickerType === 0) {
					this.lineInfo = e
				} else if (this.pickerType === 1) {
					this.reporterInfo = e
				}
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			async startRecognize () {
			    // #ifdef APP-PLUS
			    let status = await this.checkPermission();
			    if (status !== 1) {
			        return;
			    }
			    // #endif
			
			    // TODO ios 在没有请求过权限之前无法得知是否有相关权限，这种状态下需要直接调用语音，会弹出正在识别的toast
				var options = {};
				var that = this;
				options.engine = 'baidu';
				that.description_value = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.description_value += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			async startRecognizeEnglish () {
			    // #ifdef APP-PLUS
			    let status = await this.checkPermission();
			    if (status !== 1) {
			        return;
			    }
			    // #endif
			
			    // TODO ios 在没有请求过权限之前无法得知是否有相关权限，这种状态下需要直接调用语音，会弹出正在识别的toast
				var options = {};
				var that = this;
				options.engine = 'baidu';
				options.lang = 'en-us';
				that.value = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.value += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			}
			// #ifdef APP-PLUS
			,
			// async checkPermission() {
			//     let status = permision.isIOS ? await permision.requestIOS('record') :
			//         await permision.requestAndroid('android.permission.RECORD_AUDIO');
			
			//     if (status === null || status === 1) {
			//         status = 1;
			//     } else if (status === 2) {
			//         uni.showModal({
			//             content: "系统麦克风已关闭",
			//             confirmText: "设置",
			//             success: function(res) {
			//                 if (res.confirm) {
			//                     permision.gotoiOSSetting();
			//                 }
			//             }
			//         })
			//     } else {
			//         uni.showModal({
			//             content: "需要麦克风权限",
			//             confirmText: "设置",
			//             success: function(res) {
			//                 if (res.confirm) {
			//                     permision.gotoAppSetting();
			//                 }
			//             }
			//         })
			//     }
			//     return status;
			// }
			// // #endif
			
		},
		onBackPress() {
		  if (this.$refs.mpvuePicker.showPicker) {
		  	this.$refs.mpvuePicker.pickerCancel();
		    return true;
		  }
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	}
</script>

<style>
	@import '../../../static/css/iconfont.css';
	
	.icon-erweima {
		font-size: 42rpx;
		color: #999999;
		position: absolute;
		right: -60upx;
	}
	
	.event-list {
		background: #FFFFFF;
		box-sizing: border-box;
		background: transparent;
		margin: 0 auto;
		width: 560rpx;
	}
	
	.event-choose-popup {
		background: white;
		width: 560rpx;
	}
	
	.event-choose-popup .confirm-event-choose {
		margin-top: 200rpx;
	}
	
	.image-wrapper {
		position: relative;
	}
	
	.image-wrapper .cancel {
		text-align: center;
		color: white;
		font-size: 28rpx;
		line-height: 48rpx;
		position: absolute;
		z-index: 999;
		right: 10rpx;
		top: 10rpx;
		width: 48rpx;
		height: 48rpx;
		background: rgba(0, 0, 0, .5);
	}
	
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
		right: -40rpx;
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
