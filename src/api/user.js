// 登录api
export function loginApi(data) {
  return new Promise((resolve) => {
    resolve('登录')
  })
}

// 获取用户信息Api
export function getInfoApi(data) {
  return new Promise((resolve) => {
    resolve('用户信息')
  })
}

// 退出登录Api
export function loginOutApi() {
  return new Promise((resolve) => {
    resolve('退出登录')
  })
}

// 修改密码
export function passwordChange(data) {
  return new Promise((resolve) => {
    resolve('修改密码')
  })
}
