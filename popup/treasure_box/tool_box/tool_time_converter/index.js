document.getElementsByClassName("timestamp__time-button")[0].addEventListener("click", function(){
  const timestamp = (Number(document.getElementById("timestamp").value) || 0) * 1000
  let res = ''
  
  if (timestamp > 0) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    
    res = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  } else {
    res = '时间戳输入错误'
  }
  
  document.getElementById("time-text").innerHTML = res
})

document.getElementsByClassName("timestamp__time-button")[1].addEventListener("click", function(){
  const time = document.getElementById("time").value || 0
  const date = new Date(time)

  let res = ''
  
  if (!isNaN(date)) {
    res = Math.floor(date.getTime() / 1000)
  } else {
    res = '时间戳输入错误'
  }
  
  document.getElementById("tool__time-text").innerHTML = res
})