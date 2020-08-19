export const valiNumber = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入数字'))
  } else if (!isNumber(value)) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}
export const isValidTelNum = /^1[3|4|5|7|8][0-9]\d{8}$/
export const isValidEmail = /^([A-Za-z0-9_+-.])+@([A-Za-z0-9\-.])+\.([A-Za-z]{2,22})$/
export function isNumber (num) {
  let reg = /^[0-9]*[1-9][0-9]*$/
  num = parseInt(num)
  return reg.test(num)
}

// 经纬度
export const isValidLongitude = /^(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)\.([0-9]{1,6})$/
export const isValidLatitude = /^(?:[0-9]|[1-8][0-9]|90)\.([0-9]{1,6})$/
