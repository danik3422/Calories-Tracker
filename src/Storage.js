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
export default Storage
