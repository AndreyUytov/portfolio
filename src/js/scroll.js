import {
  animate,
  makeToZero,
  tripple,
  makeEaseOut,
  setupEndValue,
} from './animate.js'

let makeTrippleToZero = makeToZero(makeEaseOut(tripple))

const sliderList = document.querySelector('.page-header__slider-list')
const projectList = document.querySelector('.projects-section__list')

function getCoords(elem) {
  return {
    top: elem.getBoundingClientRect().top + pageYOffset,
  }
}

let currentSliderItem = sliderList.querySelector(
  '.page-header__slider-item--active'
)

sliderList.addEventListener('click', (evt) => {
  evt.preventDefault()
  let link = evt.target.tagName === 'A' ? evt.target : ''

  if (!link) return

  let position = Number(link.dataset.position)
  let projectItemPosition = isNaN(position)
    ? 0
    : getCoords(projectList.children[position]).top

  animate({
    timing: makeTrippleToZero,
    duration: 1300,
    draw(progress) {
      window.scrollTo(
        0,
        setupEndValue(pageYOffset, projectItemPosition, progress)
      )
    },
  }).then(() => {
    currentSliderItem.classList.remove('page-header__slider-item--active')
    currentSliderItem = link.parentElement
    currentSliderItem.classList.add('page-header__slider-item--active')
  })
})

let arrayOfCoordsElements = []

Array.from(projectList.children).forEach((el, i) => {
  arrayOfCoordsElements.push({ coords: getCoords(el), i })
})

arrayOfCoordsElements.reverse()

function isVisible({ coords }) {
  if (coords.top <= pageYOffset + 250) {
    return true
  }
}

window.addEventListener('scroll', () => {
  let item = arrayOfCoordsElements.find((el) => {
    return isVisible(el) === true
  })

  if (item) {
    sliderList.dispatchEvent(
      new CustomEvent('visible-el', {
        bubbles: true,
        detail: { i: item.i },
      })
    )
  } else {
    updateCurrentSlider(0)
  }
})

document.addEventListener('visible-el', (evt) => {
  let index = evt.detail.i + 1
  updateCurrentSlider(index)
})

function updateCurrentSlider(index) {
  currentSliderItem.classList.remove('page-header__slider-item--active')
  currentSliderItem = sliderList.children[index]
  currentSliderItem.classList.add('page-header__slider-item--active')
}
