// Javascript библиотека для кодирования информации
const SHA256 = require('crypto-js/sha256');
const jwt = require('jsonwebtoken');
// ТО ЖЕ САМОЕ ЧТО И ВНИЗУ, НО С ПРИМЕНЕНИЕМ БИБЛИОТЕКИ JSONWEBTOKEN ДЛЯ ПРОСТОТЫ

var data = {
    id: 3
};
var token = jwt.sign(data, 'secretKey');

var response = jwt.verify(token, 'secretKey');
console.log(response);
// var msg = 'I am a user 256';
// var crypt = SHA256(msg).toString();

// console.log(`Our msg is *** ${crypt}`);

// Определим как можно узнать изменил ли пользователь пришедшие данные
// Например у нас есть объект с данными на сервере
// var data = {
//     id: 4
// };
// Отправляем по запросу пользователю эти данные, но добавляем также закодированную строку
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'секретный ключ').toString()
// };
// 'Секретный ключ' находится на сервере... пользователи и взломщики не имеют к нему доступа

// Получили от пользователя данные обратно
// 1) Данные не изменены
// var dataResponse = data;
// 2)Данные изменены 3-й стороной
// token.data.id = 5;
// var dataResponseChanged = data;

//Проводим сравнение ХЭШЭЙ для двух полученных данных добавляя к ним наш
// "Секретный ключ"
// if(token.hash === SHA256(JSON.stringify(dataResponse) + 'секретный ключ').toString()) {
//     console.log('Data is legal');
// }else{
//     console.log('Data is illegal, someone made changes !');
// }



