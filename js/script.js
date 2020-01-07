'use strict';
(function() {
  let money = prompt("Ваш бюджет на месяц?", 100),
      time = prompt("Введите дату в формате YYYY-MM-DD", "2019-12-31"),
      appData = {
        moneyMonth: money,
        timeData: time,
        expenses : {},  // обязательные расходы
        optionalExpenses: {},  // необязательные расходы
        income : [],  // доп. доход
        savings: false
      };

  let expenseItem_1 = prompt("Введите обязательную статью расходов в этом месяце:", ""),
      moneyItem_1 = prompt("Во сколько обойдется?", 75);
  appData.expenses[expenseItem_1] = moneyItem_1;

  let expenseItem_2 = prompt("Введите обязательную статью расходов в этом месяце:", ""),
      moneyItem_2 = prompt("Во сколько обойдется?", 5);
  appData.expenses[expenseItem_2] = moneyItem_2;

  console.log("appData.expenses: ", appData.expenses);

  let moneyDay = appData.moneyMonth / 30;
  alert( moneyDay );
}());
