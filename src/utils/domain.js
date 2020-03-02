function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str: `0${str}`
}

export function formatTime (date,type) {
  const year  = date.getFullYear()
  const month = date.getMonth() + 1
  const day   = date.getDate()

  const hour   = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t4 = [year].map(formatNumber).join('/')                  //返回格式：1966
  const t3 = [year, month].map(formatNumber).join('/')           //返回格式：1966/02
  const t1 = [year, month, day].map(formatNumber).join('/')      //返回格式：1966/02/27
  const t2 = [hour, minute, second].map(formatNumber).join(':')  //返回格式：14:10:23
  if(type=='yyyy-MM-dd'){
    return `${t1}`
  }
  else if(type=='yyyy-MM'){
    return `${t3}`
  }
  else if(type=='yyyy'){
    return `${t4}`
  }
  else{
    return `${t1} ${t2}`
  }
}

export default {
  formatNumber,
  formatTime
}
