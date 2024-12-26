"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
console.log('#20. TypeScript homework example file');
function createPerson(name, age, isActive) {
    return {
        name,
        age,
        isActive
    };
}
const newPerson = createPerson('Олександр', 31, false);
console.log(newPerson);
/*
 * #2
 *
 * Задача: Розробити клас `Calculator` з методами `add` і `multiply`, які будуть логувати виклики цих методів за допомогою декоратора `LogMethodCalls`.
 *
 * Мета: Створити клас, що дозволяє виконувати базові арифметичні операції (додавання та множення) та логує деталі їх викликів для подальшого аналізу або дебагінгу.
 *
 * Вимоги до реалізації:
 * 1. Клас `Calculator` має містити метод `add`, який приймає два числа як аргументи та повертає їх суму.
 * 2. Клас `Calculator` має містити метод `multiply`, який приймає два числа як аргументи та повертає результат їх множення.
 * 3. Обидва методи (`add` і `multiply`) мають бути оздоблені декоратором `LogMethodCalls`. Цей декоратор має логувати ім'я викликаного методу та передані йому аргументи.
 * 4. Декоратор `LogMethodCalls` має бути реалізований так, щоб він міг бути застосований до будь-якого методу класу. При виклику методу, оздобленого цим декоратором, має виводитись лог у форматі: `Calling "<ім'я_методу>" with arguments: <аргументи_методу>`.
 * 5. Всі виводи логів мають здійснюватись через `console.log`.
 *
 */
// Декоратор — это специальная функция в TS и JS, которая позволяет модифицировать или добавлять поведение к классам, методам, свойствам 
// или параметрам без изменения их исходного кода.
function LogMethodCalls(target, propertyName, propertyDescriptor) {
    const originalMethod = propertyDescriptor.value; // Сохранение ссылки на оригинальный метод
    propertyDescriptor.value = function (...args) {
        // ...args - используется в методе (функции), чтобы собирать все передаваемые аргументы любого типа в массив под названием args (...-rest)
        console.log(`Calling "${propertyName}" with arguments: ${args.join(", ")}`); // Консолится имя метода и переданные аргументы в консоль
        // propertyName - это имя свойства (метода), к которому применяется декоратор. В случае add и multiply это будет строка "add" и "multiply"
        // ${args.join(", ")} — Вставка массива в строку
        // Метод join() используется для преобразования массива в строку
        const result = originalMethod.apply(this, args); // Вызов оригинального метода с переданными аргументами
        console.log(`${propertyName} executed with result: ${result}`); // Результат выполнения метода
        return result; // Результат оригинального метода
    };
    return propertyDescriptor; // Возвращение обновлённого дескриптора метода с новым логированием
}
class Calculator {
    // @LogMethodCalls — это синтаксис для применения декоратора к методу. 
    // Он автоматически вызывает декоратор и передаёт все необходимые параметры (target, propertyName, и propertyDescriptor).
    add(x, y) {
        return x + y; // Возвращает сумму двух чисел
    }
    multiply(x, y) {
        return x * y; // Возвращает произведение двух чисел
    }
}
__decorate([
    LogMethodCalls // Применение декоратора для метода add (сложение)
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "add", null);
__decorate([
    LogMethodCalls // Применение декоратора для метода multiply (умножение)
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "multiply", null);
const calculator = new Calculator();
console.log(calculator.add(2, 3));
console.log(calculator.multiply(3, 4));
/*
 * #3
 *
 * Задача: Реалізувати функціонал для створення профілю користувача в просторі імен UserProfile.
 *
 * Мета: Надати можливість створювати об'єкт профілю з унікальним ідентифікатором, ім'ям та електронною поштою.
 *
 * Вимоги до реалізації:
 * 1. Створити namespace `UserProfile`, що слугуватиме контейнером для визначення інтерфейсу профілю та функцій.
 * 2. Визначити всередині `UserProfile` інтерфейс `ProfileInterface`, який має містити властивості `id` (string), `name` (string) та `email` (string).
 * 3. Реалізувати функцію `createProfile` всередині `UserProfile`, яка приймає `name` та `email`, створює та повертає об'єкт `ProfileInterface` з унікальним `id`, вказаним ім'ям та електронною поштою.
 * 4. Функція `generateId` має бути приватною всередині `UserProfile` і слугувати для генерації унікального ідентифікатора для кожного профілю.
 *
 */
var UserProfile;
(function (UserProfile) {
    // Приватная функция для генерации уникального идентификатора
    function generateId() {
        return Math.random().toString(36).slice(2, 11); // Генерируется случайный ID
    }
    // Функция для создания профиля пользователя
    function createProfile(name, email) {
        const id = generateId(); // Генерация уникального ID
        return { id, name, email };
    }
    UserProfile.createProfile = createProfile;
})(UserProfile || (UserProfile = {}));
const profile = UserProfile.createProfile('John Doe', 'john@example.com');
console.log(profile);
