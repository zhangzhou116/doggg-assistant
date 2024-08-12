import * as accounts from "./accounts.js";

// 传入一个html元素，对应文件做对比
function accountInfo(element, accountList) {
  const accountListStr = accountList.reduce((prev, it) => {
    const accountName = it.name
    const accountUrl = it.url
    const str = `<button class="list__content-button">
            <a href=${accountUrl} target="_blank">${accountName}</a>
          </button>`
    return prev + str
  }, "")
  
  element.innerHTML = accountListStr
}

accountInfo(document.querySelector(".is-prod .list__content"), accounts.onLine)
accountInfo(document.querySelector(".is-test .list__content"), accounts.test)
accountInfo(document.querySelector(".is-other .list__content"), accounts.other)