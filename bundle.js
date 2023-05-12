/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CalorieTracker.js":
/*!*******************************!*\
  !*** ./src/CalorieTracker.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/Storage.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nvar CalorieTracker = /*#__PURE__*/function () {\n  function CalorieTracker() {\n    _classCallCheck(this, CalorieTracker);\n    this._calorieLimit = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCaloriesLimit();\n    this._totalCalories = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTotalCalories();\n    this._meals = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getMeals();\n    this._workouts = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getWorkouts();\n    this._displayCaloriesTotal();\n    this._displayCaloriesLimit();\n    this._displayCaloriesConsumed();\n    this._displayCaloriesBurned();\n    this._displayCaloriesRemaining();\n    this._displayCaloriesProgress();\n    document.getElementById('daily-form').value = this._calorieLimit;\n  }\n  // Public Methods \\\\\n  _createClass(CalorieTracker, [{\n    key: \"addMeal\",\n    value: function addMeal(meal) {\n      this._meals.push(meal);\n      this._totalCalories += meal.calories;\n      _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateTotalCalories(this._totalCalories);\n      _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveMeals(meal);\n      this._displayNewMeal(meal);\n      this._render();\n    }\n  }, {\n    key: \"addWorkout\",\n    value: function addWorkout(workout) {\n      this._workouts.push(workout);\n      this._totalCalories -= workout.calories;\n      _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateTotalCalories(this._totalCalories);\n      _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveWorkouts(workout);\n      this._displayNewWorkout(workout);\n      this._render();\n    }\n  }, {\n    key: \"removeMeal\",\n    value: function removeMeal(id) {\n      var index = this._meals.findIndex(function (meal) {\n        return meal.id === id;\n      });\n      if (index !== -1) {\n        var meal = this._meals[index];\n        this._totalCalories -= meal.calories;\n        _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateTotalCalories(this._totalCalories);\n        this._meals.splice(index, 1);\n        _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeMeal(id);\n        this._render();\n      }\n    }\n  }, {\n    key: \"removeWorkout\",\n    value: function removeWorkout(id) {\n      var index = this._workouts.findIndex(function (workout) {\n        return workout.id === id;\n      });\n      if (index !== -1) {\n        var workout = this._workouts[index];\n        this._totalCalories += workout.calories;\n        _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateTotalCalories(this._totalCalories);\n        this._workouts.splice(index, 1);\n        _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeWorkout(id);\n        this._render();\n      }\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      if (confirm('Are you sure?')) {\n        this._totalCalories = 0;\n        this._meals = [];\n        this._workouts = [];\n        _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].clearAllData();\n        this._render();\n      }\n    }\n  }, {\n    key: \"setLimit\",\n    value: function setLimit(calorieLimit) {\n      this._calorieLimit = calorieLimit;\n      this._displayCaloriesLimit();\n      _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setCaloriesLimit(calorieLimit);\n      this._render();\n    }\n  }, {\n    key: \"loadItems\",\n    value: function loadItems() {\n      var _this = this;\n      this._meals.forEach(function (meal) {\n        return _this._displayNewMeal(meal);\n      });\n      this._workouts.forEach(function (workout) {\n        return _this._displayNewWorkout(workout);\n      });\n    }\n\n    // Private Methods \\\\\n  }, {\n    key: \"_displayCaloriesTotal\",\n    value: function _displayCaloriesTotal() {\n      var totalCaloriesEl = document.getElementById('calories-loss');\n      totalCaloriesEl.innerText = this._totalCalories;\n    }\n  }, {\n    key: \"_displayCaloriesLimit\",\n    value: function _displayCaloriesLimit() {\n      var caloriesLimitEl = document.getElementById('daily-limit');\n      caloriesLimitEl.innerText = this._calorieLimit;\n    }\n  }, {\n    key: \"_displayCaloriesConsumed\",\n    value: function _displayCaloriesConsumed() {\n      var caloriesConsumedEl = document.getElementById('consumed-total');\n      var consumed = this._meals.reduce(function (total, meal) {\n        return total + meal.calories;\n      }, 0);\n      caloriesConsumedEl.innerText = consumed;\n    }\n  }, {\n    key: \"_displayCaloriesBurned\",\n    value: function _displayCaloriesBurned() {\n      var caloriesBurnedEl = document.getElementById('burned-total');\n      var burned = this._workouts.reduce(function (total, workout) {\n        return total + workout.calories;\n      }, 0);\n      caloriesBurnedEl.innerText = burned;\n    }\n  }, {\n    key: \"_displayCaloriesRemaining\",\n    value: function _displayCaloriesRemaining() {\n      var track = document.querySelector('.track');\n      var caloriesRemainingEl = document.getElementById('remaining-total');\n      var remaining = this._calorieLimit - this._totalCalories;\n      caloriesRemainingEl.innerText = remaining;\n      if (remaining <= 0) {\n        caloriesRemainingEl.parentElement.classList.add('danger');\n        track.classList.add('danger');\n      } else {\n        caloriesRemainingEl.parentElement.classList.remove('danger');\n        track.classList.remove('danger');\n      }\n    }\n  }, {\n    key: \"_displayCaloriesProgress\",\n    value: function _displayCaloriesProgress() {\n      var progressEl = document.getElementById('line-tracker');\n      var percent = this._totalCalories / this._calorieLimit * 100;\n      var width = Math.min(percent, 100);\n      progressEl.style.width = \"\".concat(width, \"%\");\n    }\n  }, {\n    key: \"_displayNewMeal\",\n    value: function _displayNewMeal(meal) {\n      var mealsEl = document.getElementById('meal-items');\n      var mealEl = document.createElement('div');\n      mealEl.className = 'form__card-item';\n      mealEl.setAttribute('data-id', meal.id);\n      mealEl.innerHTML = \"\\n    <div class=\\\"form__card-wrapper\\\">\\n    <h4>\".concat(meal.name, \"</h4>\\n    <span class='green'>\").concat(meal.calories, \"</span>\\n    <button class=\\\"delete\\\"></button>\\n    </div>\\n  \");\n      mealsEl.appendChild(mealEl);\n    }\n  }, {\n    key: \"_displayNewWorkout\",\n    value: function _displayNewWorkout(workout) {\n      var workoutsEl = document.getElementById('workout-items');\n      var workoutEl = document.createElement('div');\n      workoutEl.className = 'form__card-item';\n      workoutEl.setAttribute('data-id', workout.id);\n      workoutEl.innerHTML = \"\\n    <div class=\\\"form__card-wrapper\\\">\\n    <h4>\".concat(workout.name, \"</h4>\\n    <span class='orange'>\").concat(workout.calories, \"</span>\\n    <button class=\\\"delete\\\"></button>\\n    </div>\\n  \");\n      workoutsEl.appendChild(workoutEl);\n    }\n  }, {\n    key: \"_render\",\n    value: function _render() {\n      this._displayCaloriesTotal();\n      this._displayCaloriesConsumed();\n      this._displayCaloriesBurned();\n      this._displayCaloriesRemaining();\n      this._displayCaloriesProgress();\n    }\n  }]);\n  return CalorieTracker;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalorieTracker);\n\n//# sourceURL=webpack://calories-tracker/./src/CalorieTracker.js?");

/***/ }),

/***/ "./src/Item.js":
/*!*********************!*\
  !*** ./src/Item.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Meal\": () => (/* binding */ Meal),\n/* harmony export */   \"Workout\": () => (/* binding */ Workout)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nvar Meal = /*#__PURE__*/_createClass(function Meal(name, calories) {\n  _classCallCheck(this, Meal);\n  this.id = Math.random().toString(16).slice(2);\n  this.name = name;\n  this.calories = calories;\n});\nvar Workout = /*#__PURE__*/_createClass(function Workout(name, calories) {\n  _classCallCheck(this, Workout);\n  this.id = Math.random().toString(16).slice(2);\n  this.name = name;\n  this.calories = calories;\n});\n\n\n//# sourceURL=webpack://calories-tracker/./src/Item.js?");

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar Storage = /*#__PURE__*/function () {\n  function Storage() {\n    _classCallCheck(this, Storage);\n  }\n  _createClass(Storage, null, [{\n    key: \"getCaloriesLimit\",\n    value: function getCaloriesLimit() {\n      var defaultLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;\n      var calorieLimit;\n      if (localStorage.getItem('calorieLimit') === null) {\n        calorieLimit = defaultLimit;\n      } else {\n        calorieLimit = +localStorage.getItem('calorieLimit');\n      }\n      return calorieLimit;\n    }\n  }, {\n    key: \"setCaloriesLimit\",\n    value: function setCaloriesLimit(calorieLimit) {\n      localStorage.setItem('calorieLimit', calorieLimit);\n    }\n  }, {\n    key: \"getTotalCalories\",\n    value: function getTotalCalories() {\n      var defaultCalories = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n      var totalCalories;\n      if (localStorage.getItem('totalCalories') === null) {\n        totalCalories = defaultCalories;\n      } else {\n        totalCalories = +localStorage.getItem('totalCalories');\n      }\n      return totalCalories;\n    }\n  }, {\n    key: \"updateTotalCalories\",\n    value: function updateTotalCalories(totalCalories) {\n      localStorage.setItem('totalCalories', totalCalories);\n    }\n  }, {\n    key: \"getMeals\",\n    value: function getMeals() {\n      var meals;\n      if (localStorage.getItem('meals') === null) {\n        meals = [];\n      } else {\n        meals = JSON.parse(localStorage.getItem('meals'));\n      }\n      return meals;\n    }\n  }, {\n    key: \"saveMeals\",\n    value: function saveMeals(meal) {\n      var storage = Storage.getMeals();\n      storage.push(meal);\n      localStorage.setItem('meals', JSON.stringify(storage));\n    }\n  }, {\n    key: \"removeMeal\",\n    value: function removeMeal(id) {\n      var meals = Storage.getMeals();\n      meals.forEach(function (item, index) {\n        if (item.id === id) {\n          meals.splice(index, 1);\n        }\n      });\n      localStorage.setItem('meals', JSON.stringify(meals));\n    }\n  }, {\n    key: \"getWorkouts\",\n    value: function getWorkouts() {\n      var workouts;\n      if (localStorage.getItem('workouts') === null) {\n        workouts = [];\n      } else {\n        workouts = JSON.parse(localStorage.getItem('workouts'));\n      }\n      return workouts;\n    }\n  }, {\n    key: \"saveWorkouts\",\n    value: function saveWorkouts(workout) {\n      var storage = Storage.getWorkouts();\n      storage.push(workout);\n      localStorage.setItem('workouts', JSON.stringify(storage));\n    }\n  }, {\n    key: \"removeWorkout\",\n    value: function removeWorkout(id) {\n      var workouts = Storage.getWorkouts();\n      workouts.forEach(function (item, index) {\n        if (item.id === id) {\n          workouts.splice(index, 1);\n        }\n      });\n      localStorage.setItem('workouts', JSON.stringify(workouts));\n    }\n  }, {\n    key: \"clearAllData\",\n    value: function clearAllData() {\n      localStorage.clear();\n    }\n  }]);\n  return Storage;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);\n\n//# sourceURL=webpack://calories-tracker/./src/Storage.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CalorieTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalorieTracker */ \"./src/CalorieTracker.js\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ \"./src/Item.js\");\n/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals */ \"./src/modals.js\");\n/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modals__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/style.css */ \"./src/style/style.css\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\n\n\nvar App = /*#__PURE__*/function () {\n  function App() {\n    _classCallCheck(this, App);\n    this._tracker = new _CalorieTracker__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this._loadEventListeners();\n    this._tracker.loadItems();\n  }\n  _createClass(App, [{\n    key: \"_loadEventListeners\",\n    value: function _loadEventListeners() {\n      document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));\n      document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));\n      document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));\n      document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));\n      document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));\n      document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));\n      document.getElementById('reset').addEventListener('click', this._reset.bind(this));\n      document.querySelector('.modal__form').addEventListener('submit', this._setLimit.bind(this));\n    }\n  }, {\n    key: \"_newItem\",\n    value: function _newItem(type, e) {\n      e.preventDefault();\n      if (document.getElementById(\"\".concat(type, \"-name\")).value.length >= 20) {\n        alert('Name is too long');\n        return;\n      }\n      var name = document.getElementById(\"\".concat(type, \"-name\"));\n      var calories = document.getElementById(\"\".concat(type, \"-calories\"));\n      if (type === 'meal') {\n        var meal = new _Item__WEBPACK_IMPORTED_MODULE_1__.Meal(name.value, Math.abs(+calories.value));\n        this._tracker.addMeal(meal);\n      } else {\n        var workout = new _Item__WEBPACK_IMPORTED_MODULE_1__.Workout(name.value, Math.abs(+calories.value));\n        this._tracker.addWorkout(workout);\n      }\n      name.value = '';\n      calories.value = '';\n      document.getElementById(\"\".concat(type, \"-div\")).classList.remove('active');\n    }\n  }, {\n    key: \"_removeItem\",\n    value: function _removeItem(type, e) {\n      if (e.target.classList.contains('delete')) {\n        if (confirm('Are you sure?')) {\n          var id = e.target.parentElement.parentElement.getAttribute('data-id');\n          type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);\n          e.target.parentElement.parentElement.remove();\n        }\n      }\n    }\n  }, {\n    key: \"_filterItems\",\n    value: function _filterItems(type, e) {\n      var text = e.target.value.toLowerCase();\n      document.querySelectorAll(\"#\".concat(type, \"-items .form__card-item\")).forEach(function (item) {\n        var name = item.firstElementChild.firstElementChild.textContent;\n        if (name.toLowerCase().indexOf(text) !== -1) {\n          item.style.display = 'block';\n        } else {\n          item.style.display = 'none';\n        }\n      });\n    }\n  }, {\n    key: \"_reset\",\n    value: function _reset() {\n      this._tracker.reset();\n      document.getElementById('filter-meals').innerHTML = '';\n      document.getElementById('filter-workouts').innerHTML = '';\n      document.getElementById('meal-items').innerHTML = '';\n      document.getElementById('workout-items').innerHTML = '';\n    }\n  }, {\n    key: \"_setLimit\",\n    value: function _setLimit(e) {\n      e.preventDefault();\n      var limit = document.getElementById('daily-form');\n      if (limit.value === '' || limit.value <= 0) {\n        alert('Please enter correct limit');\n        return;\n      }\n      this._tracker.setLimit(+limit.value);\n      limit.value = '';\n      document.querySelector('.backdrop').classList.remove('visible');\n      document.body.style.overflow = 'auto';\n    }\n  }]);\n  return App;\n}();\nvar app = new App();\n\n//# sourceURL=webpack://calories-tracker/./src/app.js?");

/***/ }),

/***/ "./src/modals.js":
/*!***********************!*\
  !*** ./src/modals.js ***!
  \***********************/
/***/ (() => {

eval("var limit = document.getElementById('limit');\nvar closeBtn = document.querySelector('.modal__btn');\nvar backdrop = document.querySelector('.backdrop');\nvar mealBtn = document.getElementById('meal');\nvar workoutBtn = document.getElementById('workout');\nvar modal = document.querySelector('.modal');\nfunction closeHandler(e) {\n  if (e.target.classList.contains('backdrop')) {\n    backdrop.classList.toggle('visible');\n    document.body.style.overflow = 'auto';\n  }\n}\nfunction modalHandler() {\n  backdrop.classList.add('visible');\n  document.body.style.overflow = 'hidden';\n}\nfunction closeBtnHandler() {\n  backdrop.classList.toggle('visible');\n  document.body.style.overflow = 'auto';\n}\nfunction closeEscHandler(e) {\n  if (e.key === 'Escape') {\n    backdrop.classList.remove('visible');\n    document.body.style.overflow = 'auto';\n  }\n}\nfunction mealFormHandler() {\n  document.getElementById('meal-div').classList.toggle('active');\n}\nfunction workoutFormHandler() {\n  document.getElementById('workout-div').classList.toggle('active');\n}\nbackdrop.addEventListener('click', closeHandler);\nlimit.addEventListener('click', modalHandler);\ncloseBtn.addEventListener('click', closeBtnHandler);\nwindow.addEventListener('keydown', closeEscHandler);\nmealBtn.addEventListener('click', mealFormHandler);\nworkoutBtn.addEventListener('click', workoutFormHandler);\n\n//# sourceURL=webpack://calories-tracker/./src/modals.js?");

/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://calories-tracker/./src/style/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;