'use strict';

let startBtn = document.getElementById('start'),
    allBtns = document.getElementsByTagName('button'),
    // valueDivs = document.querySelectorAll('[class*="-value"]'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
  	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
  	levelValue = document.getElementsByClassName('level-value')[0],
  	expensesValue = document.getElementsByClassName('expenses-value')[0],
  	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
  	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItems = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item'),
  	incomeItem = document.querySelector('.choose-income'),
  	checkSavings = document.querySelector('#savings'),
  	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

for (var i = 0; i < allBtns.length; i++) {
  if (allBtns[i].id !== 'start') {
    allBtns[i].disabled = true;
  }
}

startBtn.addEventListener('click', function () {
  time = prompt("Введите дату в формате YYYY-MM-DD", '');
  money = +prompt("Ваш бюджет на месяц?", '');

  while (isNaN(money) || money == '' || money == null) {
    money = +prompt("Ваш бюджет на месяц?", '');
  }

  appData.moneyMonth = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();

  for (var i = 0; i < allBtns.length; i++) {
    if (allBtns[i].getAttribute('class') !== 'count-budget-btn') {
      allBtns[i].disabled = false;
    }
  }
});

// Определение обязательных расходов
expensesBtn.addEventListener('click', function () {
  let sum = 0;

  for (let i = 0; i < expensesItems.length; i++) {
    let expenseItem = expensesItems[i].value,
        moneyItem = expensesItems[++i].value; // i теперь равно 1
    if ( (typeof(expenseItem)) != null && (typeof(moneyItem)) != null
        && expenseItem != '' && moneyItem != '' && expenseItem.length < 50) {
      appData.expenses[expenseItem] = moneyItem;
      sum += +moneyItem;
    } else {
      alert('Данные некорректны!')
      i--;
    }
  }
  expensesValue.textContent = sum;
  countBudgetBtn.disabled = false;
});

// Определение необязательных расходов
optionalExpensesBtn.addEventListener('click', function () {
  for (let i = 0; i < optionalExpensesItems.length; i++) {
    let optExpensesItem = optionalExpensesItems[i].value;
    appData.optionalExpenses[i] = optExpensesItem;

    optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
});

// Расчет дневного бюджета
countBudgetBtn.addEventListener('click', function () {
  let obligatoryExpenses = 0;
  for (let key in appData.expenses) {
    obligatoryExpenses += +appData.expenses[key];
  }
  if (appData.moneyMonth !== undefined) {
    appData.moneyPerDay = ( (appData.moneyMonth - obligatoryExpenses) / 30).toFixed(2);

    dayBudgetValue.textContent = appData.moneyPerDay;

    // Расчет уровня достатка
    if (appData.moneyPerDay < 100) {
      levelValue.textContent = 'Это минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = 'Это средний уровень достатка';
    } else if (appData.moneyPerDay > 2000){
      levelValue.textContent = 'Это высокий уровень достатка';
    } else {
      levelValue.textContent = 'Произошла ошибка!';
    }
  } else {
    dayBudgetValue.textContent = 'Произошла ошибка!';
  }
});

incomeItem.addEventListener('input', function () {
  let items = incomeItem.value;
  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
  if (appData.savings) {
    appData.savings = false;
    monthSavingsValue.textContent = '';
    yearSavingsValue.textContent = '';
    sumValue.value = '';
    percentValue.value = '';
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener('input', function () {
  appData.checkSavings();
});

percentValue.addEventListener('input', function () {
  appData.checkSavings();
});

let appData = {
  moneyMonth: money,
  timeData: time,
  expenses : {},  // обязательные расходы
  optionalExpenses: {},  // необязательные расходы
  income : [],  // доп. доход
  savings: false,  // сбережения
  checkSavings: function () {
    if (appData.savings) {
      let sum = +sumValue.value,
          percent = +percentValue.value;
      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100 * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
  }
};
