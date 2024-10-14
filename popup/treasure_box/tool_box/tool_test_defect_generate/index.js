
function towerLowGenerate() {
  let doms = window.document.getElementsByTagName("tr-grid-todo-row");
  let formatData = [];

  for (var it of doms) {
    const item = {};

    item.taskUrl = location.origin + it.getAttribute("detail-url");

    const towerId = /todos\/([0-9]+)\?/.exec(item.taskUrl)[1];

    item.taskTitle = `[Tower #${towerId}] ${
      it.getElementsByClassName("todo-rest")[0].innerText
    }`;

    item.priority = it
      .getElementsByClassName("selected-text")[0]
      .getAttribute("data-priority");

    item.human = it
      .getElementsByTagName('tr-grid-todo-assignee-cell')[0]
      .getElementsByClassName('text')[0]
      .innerHTML

    formatData.push(item);
    
  }

  let dataHash = formatData.reduce((prev, it) => {
    if (!prev.prioritys) {
      prev.prioritys = {}
    }

    if (!prev.humans) {
      prev.humans = {}
    }

    if (!prev.prioritys[it.priority]) {
      prev.prioritys[it.priority] = [];
    }

    if (!prev.humans[it.human]) {
      prev.humans[it.human] = [];
    }

    prev.prioritys[it.priority].push(`* [${it.taskTitle}](${it.taskUrl})\n`);
    prev.humans[it.human].push(it.taskUrl)
    return prev;
  }, {});

  const humanStr = Object.keys(dataHash.humans).reduce((prev, it, idx) => {
    return prev + `| **${it}** | **${(dataHash.humans[it] || []).length}**  |` + (idx === 0 ? '\n| ------ | ------ |\n' : '\n')
  }, '')

  const priorityArr = [{
    key: 'highest',
    value: '最高'
  }, {
    key: 'higher',
    value: '较高'
  }, {
    key: 'normal',
    value: '普通'
  }, {
    key: 'lower',
    value: '最低'
  }]

  const priorityStr = priorityArr.reduce((prev, it) => {
    return prev + `## ${it.value}（${(dataHash.prioritys[it.key] || []).length}）：\n${(dataHash.prioritys[it.key] || []).join("")}\n` + '\n\n'
  }, '')

  let res = `
  ## 测试问题数统计
  ${humanStr}
  \n
  ${priorityStr}
  `;

  console.log(res);
  
  return res
}

function towerGoodGenerate() {
  let doms = window.document.getElementsByTagName("tr-grid-todo-row");
  let formatData = [];

  for (var it of doms) {
    const item = {};

    item.taskUrl = location.origin + it.getAttribute("detail-url");

    const towerId = /todos\/([0-9]+)\?/.exec(item.taskUrl)[1];

    item.taskTitle = `[Tower #${towerId}] ${
      it.getElementsByClassName("todo-rest")[0].innerText
    }`;

    item.priority = it
      .getElementsByClassName("selected-text")[0]
      .getAttribute("data-priority");

    item.human = it
      .getElementsByTagName('tr-grid-todo-assignee-cell')[0]
      .getElementsByClassName('text')[0]
      .innerHTML

    formatData.push(item);
    
  }

  let dataHash = formatData.reduce((prev, it) => {
    if (!prev.prioritys) {
      prev.prioritys = {}
    }

    if (!prev.humans) {
      prev.humans = {}
    }

    if (!prev.prioritys[it.priority]) {
      prev.prioritys[it.priority] = [];
    }

    if (!prev.humans[it.human]) {
      prev.humans[it.human] = [];
    }

    prev.prioritys[it.priority].push(`* [${it.taskTitle}](${it.taskUrl})\n`);
    prev.humans[it.human].push(it.taskUrl)
    return prev;
  }, {});

  const humanStr = Object.keys(dataHash.humans).reduce((prev, it, idx) => {
    return prev + `| **${it}** | **${(dataHash.humans[it] || []).length}**  |` + (idx === 0 ? '\n| ------ | ------ |\n' : '\n')
  }, '')

  const priorityArr = [{
    key: 'highest',
    value: '最高'
  }, {
    key: 'higher',
    value: '较高'
  }, {
    key: 'normal',
    value: '普通'
  }, {
    key: 'lower',
    value: '最低'
  }]

  const priorityStr = priorityArr.reduce((prev, it) => {
    return prev + `## ${it.value}（${(dataHash.prioritys[it.key] || []).length}）：\n${(dataHash.prioritys[it.key] || []).join("")}\n` + '\n\n'
  }, '')

  let res = `
  ## 测试问题数统计
  ${humanStr}
  \n
  ${priorityStr}
  `;

  return res
}

const clipboard = new ClipboardJS('#test__defect-copy');

clipboard.on('success', function() {
  alert('复制成功')
});

window.document.getElementById("test__defect-low-generate").addEventListener("click", function(){
  chrome.tabs.query({
    active :true,
  }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: towerLowGenerate
    }).then(ress => {
      console.log(ress[0].result);
      document.getElementById("test__defect-copy").setAttribute('data-clipboard-text', ress[0].result)
    })
  })
})
