class CalorieTracker {
	constructor() {
		this._calorieLimit = Storage.getCaloriesLimit()
		this._totalCalories = Storage.getTotalCalories()
		this._meals = Storage.getMeals()
		this._workouts = Storage.getWorkouts()

		this._displayCaloriesTotal()
		this._displayCaloriesLimit()
		this._displayCaloriesConsumed()
		this._displayCaloriesBurned()
		this._displayCaloriesRemaining()
		this._displayCaloriesProgress()

		document.getElementById('daily-form').value = this._calorieLimit
	}
	// Public Methods \\
	addMeal(meal) {
		this._meals.push(meal)
		this._totalCalories += meal.calories
		Storage.updateTotalCalories(this._totalCalories)
		Storage.saveMeals(meal)
		this._displayNewMeal(meal)
		this._render()
	}

	addWorkout(workout) {
		this._workouts.push(workout)
		this._totalCalories -= workout.calories
		Storage.updateTotalCalories(this._totalCalories)
		Storage.saveWorkouts(workout)
		this._displayNewWorkout(workout)
		this._render()
	}

	removeMeal(id) {
		const index = this._meals.findIndex((meal) => meal.id === id)
		if (index !== -1) {
			const meal = this._meals[index]
			this._totalCalories -= meal.calories
			Storage.updateTotalCalories(this._totalCalories)
			this._meals.splice(index, 1)
			Storage.removeMeal(id)
			this._render()
		}
	}

	removeWorkout(id) {
		const index = this._workouts.findIndex((workout) => workout.id === id)
		if (index !== -1) {
			const workout = this._workouts[index]
			this._totalCalories += workout.calories
			Storage.updateTotalCalories(this._totalCalories)
			this._workouts.splice(index, 1)
			Storage.removeWorkout(id)
			this._render()
		}
	}

	reset() {
		if (confirm('Are you sure?')) {
			this._totalCalories = 0
			this._meals = []
			this._workouts = []
			Storage.clearAllData()
			this._render()
		}
	}

	setLimit(calorieLimit) {
		this._calorieLimit = calorieLimit
		this._displayCaloriesLimit()
		Storage.setCaloriesLimit(calorieLimit)
		this._render()
	}

	loadItems() {
		this._meals.forEach((meal) => this._displayNewMeal(meal))
		this._workouts.forEach((workout) => this._displayNewWorkout(workout))
	}

	// Private Methods \\
	_displayCaloriesTotal() {
		const totalCaloriesEl = document.getElementById('calories-loss')
		totalCaloriesEl.innerText = this._totalCalories
	}
	_displayCaloriesLimit() {
		const caloriesLimitEl = document.getElementById('daily-limit')
		caloriesLimitEl.innerText = this._calorieLimit
	}

	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.getElementById('consumed-total')
		const consumed = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		)
		caloriesConsumedEl.innerText = consumed
	}

	_displayCaloriesBurned() {
		const caloriesBurnedEl = document.getElementById('burned-total')
		const burned = this._workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		)
		caloriesBurnedEl.innerText = burned
	}
	_displayCaloriesRemaining() {
		const track = document.querySelector('.track')
		const caloriesRemainingEl = document.getElementById('remaining-total')
		let remaining = this._calorieLimit - this._totalCalories
		caloriesRemainingEl.innerText = remaining

		if (remaining <= 0) {
			caloriesRemainingEl.parentElement.classList.add('danger')
			track.classList.add('danger')
		} else {
			caloriesRemainingEl.parentElement.classList.remove('danger')
			track.classList.remove('danger')
		}
	}
	_displayCaloriesProgress() {
		const progressEl = document.getElementById('line-tracker')
		const percent = (this._totalCalories / this._calorieLimit) * 100
		const width = Math.min(percent, 100)
		progressEl.style.width = `${width}%`
	}

	_displayNewMeal(meal) {
		const mealsEl = document.getElementById('meal-items')
		const mealEl = document.createElement('div')
		mealEl.className = 'form__card-item'
		mealEl.setAttribute('data-id', meal.id)
		mealEl.innerHTML = `
    <div class="form__card-wrapper">
    <h4>${meal.name}</h4>
    <span class='green'>${meal.calories}</span>
    <button class="delete"></button>
    </div>
  `
		mealsEl.appendChild(mealEl)
	}

	_displayNewWorkout(workout) {
		const workoutsEl = document.getElementById('workout-items')
		const workoutEl = document.createElement('div')
		workoutEl.className = 'form__card-item'
		workoutEl.setAttribute('data-id', workout.id)
		workoutEl.innerHTML = `
    <div class="form__card-wrapper">
    <h4>${workout.name}</h4>
    <span class='orange'>${workout.calories}</span>
    <button class="delete"></button>
    </div>
  `
		workoutsEl.appendChild(workoutEl)
	}

	_render() {
		this._displayCaloriesTotal()
		this._displayCaloriesConsumed()
		this._displayCaloriesBurned()
		this._displayCaloriesRemaining()
		this._displayCaloriesProgress()
	}
}

class Meal {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2)
		this.name = name
		this.calories = calories
	}
}
class Workout {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2)
		this.name = name
		this.calories = calories
	}
}

class Storage {
	static getCaloriesLimit(defaultLimit = 2000) {
		let calorieLimit
		if (localStorage.getItem('calorieLimit') === null) {
			calorieLimit = defaultLimit
		} else {
			calorieLimit = +localStorage.getItem('calorieLimit')
		}
		return calorieLimit
	}

	static setCaloriesLimit(calorieLimit) {
		localStorage.setItem('calorieLimit', calorieLimit)
	}

	static getTotalCalories(defaultCalories = 0) {
		let totalCalories
		if (localStorage.getItem('totalCalories') === null) {
			totalCalories = defaultCalories
		} else {
			totalCalories = +localStorage.getItem('totalCalories')
		}
		return totalCalories
	}

	static updateTotalCalories(totalCalories) {
		localStorage.setItem('totalCalories', totalCalories)
	}

	static getMeals() {
		let meals
		if (localStorage.getItem('meals') === null) {
			meals = []
		} else {
			meals = JSON.parse(localStorage.getItem('meals'))
		}
		return meals
	}

	static saveMeals(meal) {
		let storage = Storage.getMeals()
		storage.push(meal)
		localStorage.setItem('meals', JSON.stringify(storage))
	}

	static removeMeal(id) {
		let meals = Storage.getMeals()
		meals.forEach((item, index) => {
			if (item.id === id) {
				meals.splice(index, 1)
			}
		})
		localStorage.setItem('meals', JSON.stringify(meals))
	}

	static getWorkouts() {
		let workouts
		if (localStorage.getItem('workouts') === null) {
			workouts = []
		} else {
			workouts = JSON.parse(localStorage.getItem('workouts'))
		}
		return workouts
	}

	static saveWorkouts(workout) {
		let storage = Storage.getWorkouts()
		storage.push(workout)
		localStorage.setItem('workouts', JSON.stringify(storage))
	}

	static removeWorkout(id) {
		let workouts = Storage.getWorkouts()
		workouts.forEach((item, index) => {
			if (item.id === id) {
				workouts.splice(index, 1)
			}
		})
		localStorage.setItem('workouts', JSON.stringify(workouts))
	}

	static clearAllData() {
		localStorage.clear()
	}
}

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
		const name = document.getElementById(`${type}-name`)
		if (name.value.length >= 20) {
			alert('Name is too long')
			return
		}

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
