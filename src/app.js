import CalorieTracker from './CalorieTracker'
import { Meal, Workout } from './Item'
import './modals'
import './style/style.css'

class App {
	constructor() {
		this._tracker = new CalorieTracker()
		this._loadEventListeners()
		this._tracker.loadItems()
	}

	_loadEventListeners() {
		document
			.getElementById('meal-form')
			.addEventListener('submit', this._newItem.bind(this, 'meal'))
		document
			.getElementById('workout-form')
			.addEventListener('submit', this._newItem.bind(this, 'workout'))

		document
			.getElementById('meal-items')
			.addEventListener('click', this._removeItem.bind(this, 'meal'))

		document
			.getElementById('workout-items')
			.addEventListener('click', this._removeItem.bind(this, 'workout'))

		document
			.getElementById('filter-meals')
			.addEventListener('keyup', this._filterItems.bind(this, 'meal'))

		document
			.getElementById('filter-workouts')
			.addEventListener('keyup', this._filterItems.bind(this, 'workout'))

		document
			.getElementById('reset')
			.addEventListener('click', this._reset.bind(this))

		document
			.querySelector('.modal__form')
			.addEventListener('submit', this._setLimit.bind(this))
	}

	_newItem(type, e) {
		e.preventDefault()
		if (document.getElementById(`${type}-name`).value.length >= 20) {
			alert('Name is too long')
			return
		}
		const name = document.getElementById(`${type}-name`)
		const calories = document.getElementById(`${type}-calories`)
		if (type === 'meal') {
			const meal = new Meal(name.value, Math.abs(+calories.value))
			this._tracker.addMeal(meal)
		} else {
			const workout = new Workout(name.value, Math.abs(+calories.value))
			this._tracker.addWorkout(workout)
		}

		name.value = ''
		calories.value = ''
		document.getElementById(`${type}-div`).classList.remove('active')
	}

	_removeItem(type, e) {
		if (e.target.classList.contains('delete')) {
			if (confirm('Are you sure?')) {
				const id = e.target.parentElement.parentElement.getAttribute('data-id')

				type === 'meal'
					? this._tracker.removeMeal(id)
					: this._tracker.removeWorkout(id)

				e.target.parentElement.parentElement.remove()
			}
		}
	}

	_filterItems(type, e) {
		const text = e.target.value.toLowerCase()

		document
			.querySelectorAll(`#${type}-items .form__card-item`)
			.forEach((item) => {
				const name = item.firstElementChild.firstElementChild.textContent

				if (name.toLowerCase().indexOf(text) !== -1) {
					item.style.display = 'block'
				} else {
					item.style.display = 'none'
				}
			})
	}
	_reset() {
		this._tracker.reset()
		document.getElementById('filter-meals').innerHTML = ''
		document.getElementById('filter-workouts').innerHTML = ''
		document.getElementById('meal-items').innerHTML = ''
		document.getElementById('workout-items').innerHTML = ''
	}

	_setLimit(e) {
		e.preventDefault()
		const limit = document.getElementById('daily-form')

		if (limit.value === '' || limit.value <= 0) {
			alert('Please enter correct limit')
			return
		}
		this._tracker.setLimit(+limit.value)
		limit.value = ''
		document.querySelector('.backdrop').classList.remove('visible')
		document.body.style.overflow = 'auto'
	}
}

const app = new App()
