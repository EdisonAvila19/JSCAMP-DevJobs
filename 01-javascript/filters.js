import { paginate } from "./pagination.js"

const mensaje = document.querySelector('#filter-selected-value')

const $inputFilter = document.querySelector('#empleos-search-input')
const $filters_container = document.querySelector('.search-filters')

let filters = {
  technology: '',
  modalidad: '',
  nivel: ''
}

$filters_container.addEventListener('change', (event) => {
  if (event.target.tagName !== 'SELECT') return

  filters[event.target.name] = event.target.value
  
  const jobs = document.querySelectorAll('.job-listing-card')

  if (Object.values(filters).join().replaceAll(',','') !== '') {
    mensaje.textContent = `Has seleccionado: ${Object.values(filters).filter(filter => filter).join(', ')}`
  } else {
    mensaje.textContent = ''
  }

  jobs.forEach(job => {
    const modalidad = job.getAttribute('data-modalidad') //remoto
    const nivel = job.getAttribute('data-nivel') // madrid
    const technology = job.getAttribute('data-technology') // python,sql,r

    const isModalidadShown = filters.modalidad === '' || filters.modalidad === modalidad
    const isNivelShown = filters.nivel === '' || filters.nivel === nivel
    const isTechnologyShown = filters.technology === '' || technology.includes(filters.technology)

    const isShown = isModalidadShown && isNivelShown && isTechnologyShown
    

    job.classList.toggle('is-hidden', isShown === false)
    job.classList.toggle('is-filtered', isShown === false)
  })

  paginate()
})

$inputFilter.addEventListener('input', (event) => {
  filters.title = event.target.value.toLowerCase().trim()

  const jobs = document.querySelectorAll('.job-listing-card:not(.is-filtered)')
  jobs.forEach(job => {
    const title = job.querySelector('h3').textContent.toLowerCase().trim()
    const isShown = title === '' || title.includes(filters.title)
    job.classList.toggle('is-hidden', isShown === false)
  })

  paginate()
})