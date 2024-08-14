// 跳转上次打开页面
const defaultPage = localStorage.getItem("defaultPage") || 'jump_box';
window.location.href = `./${defaultPage}/index.html`
