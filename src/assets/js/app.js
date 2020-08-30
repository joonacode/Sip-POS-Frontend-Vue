const hamburger = document.querySelector('.hamburger')
hamburger.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar')
  sidebar.classList.toggle('active')
  document.querySelector('.content-left').classList.toggle('active')
})
document
  .querySelector('#btn-checkout-mobile')
  .addEventListener('click', (e) => {
    $('#modalCart').modal('hide')
  })
const addBtn = [...document.querySelectorAll('.add-btn')]
const minBtn = [...document.querySelectorAll('.min-btn')]
const totalOrd = [...document.querySelectorAll('.total-ord')]

for (let i = 0; i <= totalOrd.length - 1; i++) {
  let totalOrdNum = Number(totalOrd[i].value)
  addBtn[i].addEventListener('click', e => {
    totalOrdNum += 1
    totalOrd[i].value = totalOrdNum
  })
  minBtn[i].addEventListener('click', e => {
    if (totalOrdNum > 1) {
      totalOrdNum -= 1
      totalOrd[i].value = totalOrdNum
    }
  })
}
