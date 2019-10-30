<template>
	<view class="content">
		<view class="box">
			<t-table @change="change" border="0" border-color="#ffffff">
				<t-tr color="#999999" style="border-bottom: 1px solid #EEEEEE;">
					<t-th align="left" style="padding-left: 10upx;">序号</t-th>
					<t-th>巡检点名称</t-th>
					<t-th align="right">状态</t-th>
				</t-tr>
				<t-tr v-for="(item, index) in tableList" :key="index" :class="{border_bottom: index !== tableList.length-1}">
					<t-td align="left" style="padding-left: 30upx;">{{ index + 1 }}</t-td>
					<t-td>{{ item.poleInformation.name }}</t-td>
					<t-td align="right" style="padding-right: 18upx;">{{item.status}}</t-td>
				</t-tr>
			</t-table>
		</view>

	</view>
</template>

<script>
	import tTable from '../../components/t-table/t-table.vue';
	import tTh from '../../components/t-table/t-th.vue';
	import tTr from '../../components/t-table/t-tr.vue';
	import tTd from '../../components/t-table/t-td.vue';
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
				tableList: []
			};
		},
		onLoad(option) {
			this.tableList = JSON.parse(option.data)
		},
		methods: {
			change(e) {
				console.log(e.detail);
			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			}
		}
	};
</script>

<style>
	.content {
		background-color: #f9f9f9;
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
