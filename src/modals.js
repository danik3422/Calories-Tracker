const limit = document.getElementById('limit')
const closeBtn = document.querySelector('.modal__btn')
const backdrop = document.querySelector('.backdrop')
const mealBtn = document.getElementById('meal')
const workoutBtn = document.getElementById('workout')
const modal = document.querySelector('.modal')

function closeHandler(e) {
	if (e.target.classList.contains('backdrop')) {
		backdrop.classList.toggle('visible')
		document.body.style.overflow = 'auto'
	}
}

function modalHandler() {
	backdrop.classList.add('visible')
	document.body.style.overflow = 'hidden'
}
function closeBtnHandler() {
	backdrop.classList.toggle('visible')
	document.body.style.overflow = 'auto'
}

function closeEscHandler(e) {
	if (e.key === 'Escape') {
		backdrop.classList.remove('visible')
		document.body.style.overflow = 'auto'
	}
}

function mealFormHandler() {
	document.getElementById('meal-div').classList.toggle('active')
}
function workoutFormHandler() {
	document.getElementById('workout-div').classList.toggle('active')
}

backdrop.addEventListener('click', closeHandler)
limit.addEventListener('click', modalHandler)
closeBtn.addEventListener('click', closeBtnHandler)
window.addEventListener('keydown', closeEscHandler)
mealBtn.addEventListener('click', mealFormHandler)
workoutBtn.addEventListener('click', workoutFormHandler)
