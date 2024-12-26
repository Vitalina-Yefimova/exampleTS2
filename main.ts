console.log('#20. TypeScript homework example file')

/*
 * #1
 *
 * Задача: Розробити функцію `createPerson`, яка створює об'єкт особи з заданими властивостями.
 *
 * Мета: Створити універсальну функцію, що дозволяє ефективно генерувати об'єкти особи з певними характеристиками для подальшого використання у програмі.
 *
 * Вимоги до реалізації:
 * 1. Функція має приймати три параметри: `name` (рядок), `age` (число), `isActive` (булеве значення) і явно повертати об'єкт, що відповідає інтерфейсу `PersonInterface`.
 * 2. Інтерфейс `PersonInterface` має описувати структуру об'єкта особи з властивостями `name`, `age`, і `isActive`.
 * 3. Функція має забезпечувати створення об'єкта з коректними типами властивостей відповідно до `PersonInterface`.
 * 4. Тип повернення функції має бути явно вказаний як `PersonInterface`, що забезпечує відповідність повернутого об'єкта визначеному інтерфейсу.
 *
 */

interface PersonInterface {
  name: string
  age: number
  isActive: boolean
}

function createPerson(name: string, age: number, isActive: boolean): PersonInterface {
  return {
    name,
    age,
    isActive
  }
}

const newPerson = createPerson('Олександр', 31, false)
console.log(newPerson)


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

function LogMethodCalls(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = propertyDescriptor.value // Сохранение ссылки на оригинальный метод
  propertyDescriptor.value = function (...args: any[]) { // Переопределение метода для добавления логирования
    // ...args - используется в методе (функции), чтобы собирать все передаваемые аргументы любого типа в массив под названием args (...-rest)
    console.log(`Calling "${propertyName}" with arguments: ${args.join(", ")}`) // Консолится имя метода и переданные аргументы в консоль
    // propertyName - это имя свойства (метода), к которому применяется декоратор. В случае add и multiply это будет строка "add" и "multiply"
    // ${args.join(", ")} — Вставка массива в строку
    // Метод join() используется для преобразования массива в строку
    const result = originalMethod.apply(this, args)  // Вызов оригинального метода с переданными аргументами
    console.log(`${propertyName} executed with result: ${result}`) // Результат выполнения метода
    return result // Результат оригинального метода
  }
  return propertyDescriptor // Возвращение обновлённого дескриптора метода с новым логированием
}

class Calculator { // Содержит методы для выполнения арифметических операций
// @LogMethodCalls — это синтаксис для применения декоратора к методу. 
// Он автоматически вызывает декоратор и передаёт все необходимые параметры (target, propertyName, и propertyDescriptor).
  @LogMethodCalls // Применение декоратора для метода add (сложение)
  add(x: number, y: number): number {
    return x + y // Возвращает сумму двух чисел
  }
  @LogMethodCalls // Применение декоратора для метода multiply (умножение)
  multiply(x: number, y: number): number {
    return x * y // Возвращает произведение двух чисел
  }
}

const calculator = new Calculator()
console.log(calculator.add(2, 3))
console.log(calculator.multiply(3, 4))


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

namespace UserProfile {
  export interface ProfileInterface {  // Интерфейс для профиля пользователя
    id: string
    name: string
    email: string
  }
// Приватная функция для генерации уникального идентификатора
  function generateId(): string {
    return Math.random().toString(36).slice(2, 11) // Генерируется случайный ID
  }
    // Функция для создания профиля пользователя
  export function createProfile(name: string, email: string): ProfileInterface {
    const id = generateId()// Генерация уникального ID
    return { id, name, email }
  }
}


const profile = UserProfile.createProfile('John Doe', 'john@example.com')
console.log(profile)