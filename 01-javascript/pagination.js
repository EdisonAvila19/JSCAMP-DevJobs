const RESULTS_PER_PAGE = 3
let currentPage = 1
let $activeJobs
const $paginationContainer = document.querySelector('.pagination')

export function paginate() {
  currentPage = 1
  $activeJobs = document.querySelectorAll('.job-listing-card:not(.is-hidden)')
  showJobs()
  $paginationContainer.innerHTML = ''

  const totalPages = Math.ceil($activeJobs.length / RESULTS_PER_PAGE)
  
  let pagesCode = ''
  for (let i = 1; i <= totalPages; i++) {
    pagesCode += `<a class='${currentPage === i ? 'is-active' : ''}' data-page='${i}' href="#${i}">${i}</a>`
  }

  $paginationContainer.innerHTML = `
    <a class='prev ${totalPages > 1 ? 'is-disabled' : 'is-hidden'}' href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 6l-6 6l6 6" />
    </svg></a>
    ${pagesCode}
    <a class='next ${totalPages > 1 ? '' : 'is-hidden'}' href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6l6 6l-6 6" />
    </svg></a>
  `
}

$paginationContainer.addEventListener('click', (e) => {
  e.preventDefault()
  const target = e.target.closest('a')
  if (!target) return

  console.log('click');

  if (target.dataset.page) {
    currentPage = Number(target.dataset.page);
  } else if (target.closest('.prev') && currentPage > 1) {
    currentPage--
  } else if (target.closest('.next') && currentPage < Math.ceil($activeJobs.length / RESULTS_PER_PAGE)) {
    currentPage++
  }

  $paginationContainer.querySelector('.prev').classList.toggle('is-disabled', currentPage === 1 )
  $paginationContainer.querySelector('.next').classList.toggle('is-disabled', currentPage === Math.ceil($activeJobs.length / RESULTS_PER_PAGE))

  $paginationContainer.querySelector('.is-active').classList.remove('is-active')
  $paginationContainer.querySelector(`a[data-page='${currentPage}']`).classList.add('is-active')
  showJobs()
})


function showJobs() {
  $activeJobs.forEach(($job, index) => {
    const start = (currentPage - 1) * RESULTS_PER_PAGE
    const end = start + RESULTS_PER_PAGE

    const isHidden = !(index >= start && index < end)

    $job.classList.toggle('is-hidden', isHidden)
  })

}