var BASE_URL = 'http://192.168.3.231:8000';
// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数
// http://192.168.3.87:8000/auth/vCode
const login_url = BASE_URL + '/auth/login'
const code_url = BASE_URL + '/auth/vCode'
const renwu_url = BASE_URL + '/app/inspectionRecord'
const lineInfo_url = BASE_URL + '/app/poleInformation/lineList'
const report_user_url = BASE_URL + '/app/poleInformation/users'
const thing_url = BASE_URL + '/app/poleInformation/malfunction'
const sjsb_url = BASE_URL + '/app/poleInformation/inspectionRecord'
const code_query_url = BASE_URL + '/app/poleInformation/'
const wxjl_post_url = BASE_URL + '/app/maintenanceRecord/'
const check_url = BASE_URL + '/app/poleInformation/getByName'
const update_token_url = BASE_URL + '/auth/login'
const contact_url = BASE_URL + '/app/users/get'



// 二维码
export const getCode = () => {
	return new Promise((resolve, reject) => {
		uni.request({
		    url: code_url,
			method: 'GET',
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}

// 更新token
const updateToken = () => {
	var login = {}
	uni.getStorage({
	    key: 'login',
	    success: function (res) {
	       login = JSON.parse(res.data)
	    }
	});
	getCode().then(res => {
		login.code = res.data.code
		return new Promise((resolve, reject) => {
			uni.request({
			    url: login_url,
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: login,
			    success: (res) => {
					uni.setStorage({
						key: 'user',
						data: JSON.stringify(res.data) 
					});
			    }
			});
		})
	})
}


// 登录
export const login1 = (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
		    url: login_url,
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: data,
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}


// 获取首页数据
export const getInfo = (data) => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: renwu_url,
			data: data,
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
				'Content-Type': 'application/json'
			},
		    success: (res) => {
				if (res.status === 401) {
					updateToken()
				} else {
					resolve(res.data)
				}
		    }
		});
	})
}

// 获取线路信息
export const getLineInfo = () => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: lineInfo_url,
			data: {},
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
			},
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}

// 获取报送人员信息
export const getReportInfo = () => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: report_user_url,
			data: {},
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
			},
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}

// 获取事件分类信息
export const getThingInfo = () => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: thing_url,
			data: {},
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
			},
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}

// 获取事件上报信息
export const sjsbRequest = (data, method) => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: sjsb_url,
			data: data,
			method: method,
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
				'Content-Type': 'application/json'
			},
		    success: (res) => {
		        resolve(res)
		    }
		});
	})
}

// 获取二维码信息
export const erweimaRequest = (data) => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: code_query_url+data,
			data: {},
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
				'Content-Type': 'application/json'
			},
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}

// 提交维修记录
export const weixiujiluPostRequest = (flag, data) => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: wxjl_post_url + flag,
			data: data,
			method: 'POST',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
				'Content-Type': 'application/json'
			},
		    success: (res) => {
		        resolve(res)
		    }
		});
	})
}
// 查询重复
export const checkPost = (data) => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: check_url,
			data: data,
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
				'Content-Type': 'application/json'
			},
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}

// 获取通讯录
export const getContact = () => {
	var token = null
	uni.getStorage({
	    key: 'user',
	    success: function (res) {
	       token = JSON.parse(res.data).token
	    }
	});
	return new Promise((resolve, reject) => {
		uni.request({
		    url: contact_url,
			data: {},
			method: 'GET',
			header: {
			    'Authorization': 'Bearer ' + token, //自定义请求头信息
			},
		    success: (res) => {
		        resolve(res.data)
		    }
		});
	})
}