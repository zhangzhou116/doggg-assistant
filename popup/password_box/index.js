import wifiList from './wifi.js'

// 1、生成 wifi 按钮列表
let wifiListStr = ""

for (let i = 0; i < wifiList.length; i++) {
    const wifiName = wifiList[i].name
    const str = `<button class="menu-content__button${i === 0 ? ' is-selected' : ''}">${wifiName}</button>`
    wifiListStr += str   
}
document.getElementsByClassName('menu-content__button-list')[0].innerHTML = wifiListStr

// const wifiListStr = wifiList.reduce((prev, it, idx) => {
//   const wifiName = it.name
//   const str = `<button class="menu-content__button${idx === 0 ? ' is-selected' : ''}">${wifiName}</button>`
//   return prev + str
// }, '')

// 2、初始化首个 wifi 信息
function wifiInit(idx) {
  const account = `<span>${wifiList[idx].name}</span>`
  const password = `<span>${wifiList[idx].password}</span>`

  document.getElementById('wifi_account').innerHTML = account
  document.getElementById('wifi_password').innerHTML = password
  document.getElementById('wifi_password').setAttribute('data-clipboard-text', wifiList[idx].password)

  document.getElementById("qrcode").innerHTML = ''

  new QRCode(document.getElementById('qrcode'), {
    width: 100,
    height: 100,
    text: `WIFI:T:WPA;P:${wifiList[idx].password};S:${wifiList[idx].name};H:false;`
  });
}

wifiInit(0)

// 3、给 wifi 按钮列表绑定事件
// 4、点击事件处理
// 4-1、切换按钮 is-selected 样式
// 4-2、切换 wifi 信息内容

const buttonElements = document.getElementsByClassName('menu-content__button')

for (let i = 0; i < buttonElements.length; i++) {
  buttonElements[i].addEventListener('click', function () {
    wifiInit(i)

    for (let j = 0; j < buttonElements.length; j++) {
      buttonElements[j].classList.remove('is-selected')
    }

    buttonElements[i].classList.add('is-selected')
  })
}

// 5、给密码增加复制能力
const clipboard = new ClipboardJS('#wifi_password');

clipboard.on('success', function() {
  alert('复制成功')
});



