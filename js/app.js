class CalorieTracker {
	constructor() {
		this._calorieLimit = 2000
		this._totalCalories = 0
		this._meals = []
		this._workouts = []

		this._displayCaloriesTotal()
		this._displayCaloriesLimit()
		this._displayCaloriesConsumed()
		this._displayCaloriesBurned()
		this._displayCaloriesRemaining()
		this._displayCaloriesProgress()
	}
	// Public Methods \\
	addMeal(meal) {
		this._meals.push(meal)
		this._totalCalories += meal.calories
		this._displayNewMeal(meal)
		this._render()
	}

	addWorkout(workout) {
		this._workouts.push(workout)
		this._totalCalories -= workout.calories
		this._displayNewWorkout(workout)
		this._render()
	}

	removeMeal(id) {
		const index = this._meals.findIndex((meal) => meal.id === id)
		if (index !== -1) {
			const meal = this._meals[index]
			this._totalCalories -= meal.calories
			this._meals.splice(index, 1)
			this._render()
		}
	}

	removeWorkout(id) {
		const index = this._workouts.findIndex((workout) => workout.id === id)
		if (index !== -1) {
			const workout = this._workouts[index]
			this._totalCalories += workout.calories
			this._workouts.splice(index, 1)
			this._render()
		}
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

class App {
	constructor() {
		this._tracker = new CalorieTracker()
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
			.addEventListener('keyup', this._filterItems.bind(this, 'meals'))

		document
			.getElementById('filter-workouts')
			.addEventListener('keyup', this._filterItems.bind(this, 'workout'))
	}

	_newItem(type, e) {
		e.preventDefault()
		const name = document.getElementById(`${type}-name`)
		const calories = document.getElementById(`${type}-calories`)
		if (type === 'meal') {
			const meal = new Meal(name.value, +calories.value)
			this._tracker.addMeal(meal)
		} else {
			const workout = new Workout(name.value, +calories.value)
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
}
const app = new App()
