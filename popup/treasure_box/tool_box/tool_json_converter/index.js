document.getElementById("json-format-button").addEventListener("click", function () {
  const strdata = document.getElementById("json-input").value
  let jsonHtml = ''
  
  try {
    const jsondata = JSON.parse(strdata)
    jsonHtml = prettyPrintJson.toHtml(jsondata)
  } catch (err) {
    console.log('json 转换报错');
  }
  
  document.getElementById("json-return").innerHTML = jsonHtml || 'JSON格式错误'
  document.getElementById("json-format-copy").setAttribute('data-clipboard-text', document.getElementById("json-return").outerText)
})

const clipboard = new ClipboardJS('#json-format-copy');

clipboard.on('success', function() {
  alert('复制成功')
});