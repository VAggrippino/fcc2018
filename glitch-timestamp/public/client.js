window.addEventListener('load', () => {
  [...document.getElementsByClassName('baseurl')].map(elem => elem.innerText = location.href)
})