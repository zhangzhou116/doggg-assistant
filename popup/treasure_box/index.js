import * as account from "./content_button_index.js"

localStorage.setItem("defaultPage", "treasure_box")

// 生成百宝箱内容列表
function createAccountList(accountLists) {
  const accountList = accountLists.reduce((prev, it) => {
    const name = it.name
    const str = `
            <span class="button__span is-text-overflow">${name}</span>
            `
    return prev + str
  },"")
  
  const accountListStr = accountList + `<span class="button__buttom-span"></span><span class="button__buttom-span"></span>`
  document.getElementsByClassName("content__button-group")[0].innerHTML = accountListStr
}

// 绑定点击事件
function binding(urlList) {
  const buttonElements = []

  for (let i = 0; i < urlList.length; i++){
    buttonElements[i] = document.getElementsByClassName("button__span")[i]
  }

  for (let i = 0; i < buttonElements.length; i++){
    buttonElements[i].addEventListener("click", function(){
      window.location.href = urlList[i].url + '/index.html'
    })
  }
}

// 查询对应信息
function selectButton(){
  const searchVal = document.getElementById('search-input').value
  
  if (!searchVal) {
    createAccountList(account.treasureButton)
    binding(account.treasureButton)
    return;
  }
  else{
    const filterAccount = account.treasureButton.filter(item => item.name.indexOf(searchVal) !== -1 ? item => item.name.indexOf(searchVal): null)
    console.log(filterAccount);
    
    filterAccount ? createAccountList(filterAccount): document.getElementsByClassName("content__select")[0].innerHTML = "无匹配数据"
    binding(filterAccount)
  }
}

// 绑定回车事件
document.addEventListener('keydown', selectButton);

document.getElementsByClassName('content__select-button')[0].addEventListener('click', selectButton)


// 初始化运行方法
createAccountList(account.treasureButton) // 生成百宝箱内容列表
binding(account.treasureButton) // 绑定点击事件
