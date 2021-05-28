import { animate, makeEaseOut, penta } from './animate.js'

const makeEasyPenta = makeEaseOut(penta)

const sliderList = document.querySelector('.page-header__slider-list')
const projectList = document.querySelector('.projects-section__list')

function getCoords(elem) {
  return elem.getBoundingClientRect().top + pageYOffset
}

console.log(getCoords(projectList.children[0]))

sliderList.addEventListener('click', (evt) => {
  evt.preventDefault()
  let link = evt.target.tagName === 'A' ? evt.target : ''

  if (!link) return

  let position = Number(link.dataset.position)
  let scrollPosition
  if (isNaN(position)) {
    scrollPosition = 0
    return
  }

  let projectItemPosition = getCoords(projectList.children[position])
  console.log(projectItemPosition)

  window.scrollTo(0, projectItemPosition)

  animate({
    timing: makeEasyPenta,
    duration: 1300,
    draw,
  })
})
