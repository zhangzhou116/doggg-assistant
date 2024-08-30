import account from './account.js';

// 传入一个平台名，返回对应平台的账号信息 
function create(plat) {
  const acc = account[plat]
  const accountListStr = acc.reduce((prev, it) => {
    const platform = it.platform
    const name = it.name
    const password = it.password
    const remark = it.remark
    const str = `
            <div class="details-texts">
              <span>${platform ? platform : "-"}</span>
              <span class="copy-text" data-clipboard-text="${name}">${name ? name : "-"}</span>
              <span class="copy-text" data-clipboard-text="${password}">${password ? password : "-"}</span>
              <span>${remark ? remark : "-"}</span>
            </div>
            `
    
    
    return prev + str
  }, "")

  document.getElementsByClassName("details-texts-list")[0].innerHTML = accountListStr
}
const platformButton = document.getElementsByClassName("platform-span")

const platname = {
  "国内":"home",
  "国外":"overseas"
}

platformButton[0].classList.add('is-selected')
create("home")

for (let i = 0 ; i < platformButton.length; i++) {
  platformButton[i].addEventListener('click', function () {
    
    create(platname[platformButton[i].innerText])

    for (let j = 0 ; j < platformButton.length; j++){
      platformButton[j].classList.remove('is-selected')
    }

    platformButton[i].classList.add('is-selected')
  })
}

// 5、给密码增加复制能力
const clipboard = new ClipboardJS('.copy-text');

clipboard.on('success', function() {
  alert('复制成功')
});