import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    'url': '/user/adminlogin',
    'method': 'post',
    'params': data
  })
}

// 获取用户详细信息
export function getInfo(token) {
  return request({
    'url': '/user/getuserinfo',
    'method': 'post',
		'params': {
			token
		}
  })
}
