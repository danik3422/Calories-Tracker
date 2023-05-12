import Storage from './Storage'
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

export default CalorieTracker
