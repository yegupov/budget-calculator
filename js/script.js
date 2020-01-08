'use strict';

let money, time;

function start() {
  money = +prompt("Ваш бюджет на месяц?", '');
  time = prompt("Введите дату в формате YYYY-MM-DD", "2019-12-31");
  while (isNaN(money) || money == '' || money == null) {
    money = +prompt("Ваш бюджет на месяц?", '');
  }
}
start();

let appData = {
  moneyMonth: money,
  timeData: time,
  expenses : {},  // обязательные расходы
  optionalExpenses: {},  // необязательные расходы
  income : [],  // доп. доход
  savings: true  // сбережения
};

function chooseExpenses() {
  for (let i = 0; i < 2; i++) {
    let expenseItem = prompt("Введите обязательную статью расходов в этом месяце:", ""),
        moneyItem = prompt("Во сколько обойдется?", "");
    if ( (typeof(expenseItem)) === 'string' && (typeof(expenseItem)) != null && (typeof(moneyItem)) != null
        && expenseItem != '' && moneyItem != '' && expenseItem.length < 50) {
      console.log("Готово", i);
      appData.expenses[expenseItem] = moneyItem;
    } else {
      alert('Данные некорректны!')
      console.log ("Bad result");
      i--;
    }
  }
}
chooseExpenses();

console.log("appData.expenses: ", appData.expenses);

// Расчет дневного бюджета
function detectDayBudget() {
  appData.moneyPerDay = (appData.moneyMonth / 30).toFixed(2);
  alert( "Бюджет на 1 день: " + appData.moneyPerDay + "руб.");
}
detectDayBudget();

// Расчет уровня достатка
function detectLevel() {
  if (appData.moneyPerDay < 100) {
    console.log('Это минимальный уровень достатка');
  } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log('Это средний уровень достатка');
  } else if (appData.moneyPerDay > 2000){
    console.log('Это высокий уровень достатка');
  } else {
    console.log('Произошла ошибка');
  }
}
detectLevel();

function checkSavings() {
  if (appData.savings) {
    let save = +prompt("Какова сумма накоплений?"),
        percent = +prompt("Под какой процент?");
    appData.monthIncome = save / 100 / 12 * percent;
    alert( "Доход в месяц с Вашего депозита: " + appData.monthIncome + "руб.");
  }
}
checkSavings();

// Функция для определения необязательных расходов
function chooseOptExpenses() {
  for (let i = 1; i <= 3; i++) {
    let optExpensesItem = prompt("Статья необязательных расходов?", "");
    appData.optionalExpenses[i] = optExpensesItem;
  }
  console.log(appData.optionalExpenses);
}
chooseOptExpenses();
