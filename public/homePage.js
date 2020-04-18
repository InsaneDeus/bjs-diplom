//кнопка выхода
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => response.success ? location.reload() : console.error("Ошибка!"));

//Информация о пользователе
ApiConnector.current(response => response.success ? ProfileWidget.showProfile(response.data) : console.error("Ошибка!"));

//курсы валют
const ratesBoard = new RatesBoard();

function getVolRate(){
    ApiConnector.getStocks(response => {
        if(response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
        else{
            console.error("Ошибка!")
        };
    });
};

getVolRate();

setInterval(getVolRate, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

//Пополнение баланса
moneyManager.addMoneyCallback = (dataObject) =>
    ApiConnector.addMoney(dataObject, response => {
        if(!response.success){
            moneyManager.setMessage(true, response.data);
        }
        else {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(false, "Пополнение прошло успешно");
        };
    });

//Конвертация валюты
moneyManager.conversionMoneyCallback = (dataObject) => 
    ApiConnector.convertMoney(dataObject, response => {
        if(!response.success){
            moneyManager.setMessage(true, response.data);
        }
        else {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(false, "Конвертация прошла успешно");
        };
    });

//Перевод средств
moneyManager.sendMoneyCallback = (dataObject) =>
    ApiConnector.transferMoney(dataObject, response => {
        if(!response.success){
            moneyManager.setMessage(true, response.data);
        }
        else {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(false, "Перевод прошёл успешно");
        };
    });

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

//начальный список избранного
ApiConnector.getFavorites(response => {
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    else{
        console.error("Ошибка!")
    };
});

//Добавление пользователей в избранное
favoritesWidget.addUserCallback = (dataObject) => 
    ApiConnector.addUserToFavorites(dataObject, response => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(false, "Пользователь добавлен в избранное");
        }
        else{
            moneyManager.setMessage(true, response.data);
        };
    });

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (dataObject) => 
    ApiConnector.removeUserFromFavorites(dataObject, response => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(false, "Пользователь удалён из избранного");
        }
        else{
            moneyManager.setMessage(true, response.data);
        };
    });