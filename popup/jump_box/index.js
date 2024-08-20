import * as accounts from "./accounts.js";

localStorage.setItem("defaultPage", "jump_box")

// 传入一个html元素，对应文件做对比
function accountInfo(element, accountList) {
  const accountListStr = accountList.reduce((prev, it) => {
    const url = it.url
    const accountName = it.name
    const loginUrl = it.loginUrl
    const account= it.account || ""
    const password = it.password || ""
    
    const str = 
          `<button class="list__content-button" data-loginurl="${loginUrl}" data-url="${url}" data-account="${account}" data-password="${password}">
            ${it.img ? `<img src=${it.img} />` : ""}
            <span class="is-text-overflow">${accountName}</span>
          </button>`
    return prev + str
  }, "")
  
  element.innerHTML = accountListStr
}

accountInfo(document.querySelector(".is-prod .list__content"), accounts.onLine);
accountInfo(document.querySelector(".is-test .list__content"), accounts.test);
accountInfo(document.querySelector(".is-other .list__content"), accounts.other);

// [...document.getElementsByClassName('list__content-button')].forEach((element) => {
//   element.addEventListener('click', async (e) => {
//     let token = "";
//     const clickedElement = e.target;
//     const url = clickedElement.dataset.url;
//     const loginurl = clickedElement.dataset.loginurl;
//     const account = clickedElement.dataset.account;
//     const password = clickedElement.dataset.password;

//     console.log('Login URL:', loginurl);
//     console.log('Account:', account);
//     console.log('Password:', password);

//     if (password && account) {
//       try {
//         const response = await fetch(loginurl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             name: account,
//             password: password
//           })
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Response Data:', data);

//         token = data?.data?.token;

//       } catch (err) {
//         console.error('Fetch error:', err);
//       }
//     }

//     console.log('Token:', token);

//     if (!token) {
//       alert('登录失败，请重试');
//       return;
//     }


//     chrome.tabs.create({
//       active: true,
//       url: url
//     }, (tab) => {
//       function injectedFunction() {
//         function setCookie(name, value, days) {
//           let expires = "";
      
//           if (days) {
//               const date = new Date();
//               date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//               expires = "; expires=" + date.toUTCString();
//           }
          
//           document.cookie = name + "=" + (value || "") + expires + "; path=/";
//         }
        
//         setCookie("admin_token", token, 7);
//         window.location.reload();
//       }

//       chrome.scripting.executeScript({
//         target : { tabId: tab.id },
//         func : injectedFunction
//       });
//     })
//   });
// })

[...document.getElementsByClassName('list__content-button')].forEach((element) => {
  element.addEventListener('click', async (e) => {
    let token = "";
    const clickedElement = e.target;
    const url = clickedElement.dataset.url;
    const loginurl = clickedElement.dataset.loginurl;
    const account = clickedElement.dataset.account;
    const password = clickedElement.dataset.password;

    // if (password && account) {
    //   try {
    //     const response = await fetch(loginurl, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         name: account,
    //         password: password
    //       })
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const data = await response.json();

    //     token = data?.data?.token;

    //   } catch (err) {
    //     console.error('Fetch error:', err);
    //   }
    // }
    // if (!token) {
    //   alert('登录失败，请重试');
    //   return;
    // }
    
    chrome.tabs.create({
      active: true,
      url: url
    }, (tab) => {
      // function injectedFunction() {
      //   function setCookie(name, value, days) {
      //     let expires = "";
      //     if (days) {
      //       const date = new Date();
      //       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      //       expires = "; expires=" + date.toUTCString();
      //     }
      //     document.cookie = name + "=" + (value || "") + expires + "; path=/";
      //     console.log('Cookie set:', document.cookie);
      //   }

      //   setCookie("admin_token", token, 7);
      //   window.location.reload();
      // }

      // chrome.scripting.executeScript({
      //   target: { tabId: tab.id },
      //   func: injectedFunction
      // });
    });
  });
});


