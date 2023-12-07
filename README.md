# Backend

[адреса бека](https://paws-and-claws-store-backend.onrender.com/)

- [Запити для продутків](#запити-для-продутків)

  - [Для стартової сторінки](#для-стартової-сторінки)
  - [Для отримання всіх продуктів](#для-отримання-всіх-продуктів)
  - [Перелік всіх продуктів для тварин `:idPet`](#перелік-всіх-продуктів-для-тварин-idpet)
  - [Перелік всіх продуктів для категорії `:idCategory`](#перелік-всіх-продуктів-для-категорії-idcategory)
  - [Перелік всіх продуктів для типу продуктів `:idVariant`](#перелік-всіх-продуктів-для-типу-продуктів-idvariant)
  - [Повертає дані для одного типу продуктів `:idProduct`](#повертає-дані-для-одного-продукту-idproduct)
  - [Пошук по ключовому слову](#пошук-продуктів-по-ключовому-слову)

  -[Пошук товару по коду продукта](#пошук-детальної-інфорації-про-продукт-по-коду-товаку-idproduct)

- [Пагінація](#пагінація)
- [Сортування](#сортування)

- [Запити для структури](#запити-для-структури)

  - [Для переліку тварин `pets`](#для-переліку-тварин-pets)
  - [Для переліку категорій `categories`](#для-переліку-категорій-categories)
  - [Для переліку типів продуктів `variantes` (_В таблиці `productTypes`_)](#для-переліку-типів-продуктів-variantes-в-таблиці-producttypes)
  - [Для отримання всієї структури `pets > categories > variants`](#для-отримання-всієї-структури-pets--categories--variants)

- [Запити для для кошика товарів](#запити-на-корзину-товарів)

  - [Для отримання акуальної кількості товарів](#для-отримання-акуальної-кількості-товарів)

  - [Запити для авторизації](#запитина-на-авторизацію)

    - [Реєстрація](#реєстрація)

- [Запити для авторизації](#запитина-на-авторизацію)

  - [Реєстрація](#реєстрація)

## Запити для продутків

### Для стартової сторінки

Повертає перші 12 продуктів відсортовані таким чином, щоб спочатку йшли продукти, що мають знижку на вагу від меньшої до більшої, далі всі інші продукти без знижок

- `/api/products`

### Для отримання всіх продуктів

Перелік всіх продуктів

- `/api/products/allItems`

_Присутня пагінація_
_Присутнє сортування_

### Перелік всіх продуктів для тварин `:idPet`

- `/api/products/pets/:idPet`
- `/api/products/pets/:idPet?page=<номер сторінки>`

**Тварини:**

- `for_dogs`
- `for_cats`

_Присутня пагінація_
_Присутнє сортування_

### Пошук детальної інфорації про продукт по коду товаку  'idProduct'

- `/api/products/copy/:idProduct`

### Перелік всіх продуктів для категорії `:idCategory`

- `/api/products/categories/:idCategory`
- `/api/products/categories/:idCategory?page=<номер сторінки>`

**Категорії:**

- `food_for_dogs`
- `food_for_cats`

_Присутня пагінація_
_Присутнє сортування_

### Перелік всіх продуктів для типу продуктів `:idVariant`

- `/api/products/product_types/:idVariant`
- `/api/products/product_types/:idVariant?page=<номер сторінки>`

**Типи продукту:**

- `dry_dog_food`
- `wet_dog_food`
- `food_for_puppies`
- `dry_cat_food`
- `wet_cat_food`
- `food_for_kittens`

_Присутня пагінація_
_Присутнє сортування_

### Пошук продуктів по ключовому слову

- `/api/products/searchByKeyword/card?findBy=CANAGAN`

- `findBy` (стрічка, обов'язково): пошук бо назві або бренду товара . Не менше 3 і не більше 230 символів. Приведення до нижнього реєстру присутнє

_Присутня пагінація_

_Присутнє сортування_

### Повертає дані для одного продукту `:idProduct`

- `/api/products/:idProduct`

## Пагінація

При запиті з пагінацією нам повертається об'єкт

```javascript
{
  "docs": [ // Масив даних про продукти
    {
      "pet": {
        "ua": "Товари для котів",
        "en": "For Cats",
        "code": "for_cats"
      },
      "category": {
        "ua": "Корм для котів",
        "en": "Food for Cats",
        "code": "food_for_cats"
      },
      "producingCountry": {
        "ua": "Чехія",
        "en": "Czech Republic",
        "code": "cz"
      },
      "_id": "Ідентифікатор",
      "productName": "Назва продукту",
      "brand": "BRIT CARE",
      "size": 400,
      "price": 221,
      "count": 61,
      "productType": "Сухий корм для котів",
      "shortDescription": "Короткий опис",
      "fullDescription": "Повний опис",
      "ingredients": "Склад",
      "mainImage": "https://i.ibb.co/fxYyCqy/card13.png",
      "images": [],
      "favorite": false,
      "reviews": [],
      "productCode": "Код продукту"
    },
    // ...
  ],
    "totalDocs": 40, // Загальна кількість елементів
    "limit": 12, // Кількість елементів на сторінці
    "totalPages": 4, // Загальна кільксть стрінок
    "page": 2, // Поточна сторінка
    "hasPrevPage": true, // Чи є попередня сторінка
    "hasNextPage": true, // Чи є наступна сторінка
    "prevPage": 1, // Попередня сторінка
    "nextPage": 3 // Наступна сторінка
}
```

## Сортування

- `sortBy` (стрічка, необов'язково): сортуівння по ціні . Можливі значення 'expensive' або 'cheap'

## Запити для структури

### Для переліку тварин `pets`

Повертає масив всіх `pets`

- `/api/structure/pets`

**Результат:**

```js
[
  {
    _id: "64cef53b53f2bc3e1c80705e",
    ua: "Товари для собак",
    en: "For Dogs",
    code: "for_dogs",
  },
  {
    _id: "64cef53b53f2bc3e1c80705f",
    ua: "Товари для котів",
    en: "For Cats",
    code: "for_cats",
  },
];
```

### Для переліку категорій `categories`

Повертає масив категорій для поточної тварини, включаючи дані про батьківську тварину

- `/api/structure/pets/:idPet/categories`

**Приклад:**

- `/api/structure/pets/64cef53b53f2bc3e1c80705f/categories`

**Результат:**

```js
[
  {
    _id: "64cef5e853f2bc3e1c807064",
    ua: "Корм для котів",
    en: "Food for Cats",
    code: "food_for_cats",
    _pet: {
      _id: "64cef53b53f2bc3e1c80705f",
      ua: "Товари для котів",
      en: "For Cats",
      code: "for_cats",
    },
  },
];
```

### Для переліку типів продуктів `variantes` (_В таблиці `productTypes`_)

Повертає масив типів продуктів для поточної категорії і тварини, включаючи дані про батьківські категорію і тварину

- `/api/structure/pets/:idPet/categories/:idCategory/variants`

**Приклад:**

- `/api/structure/pets/64cef53b53f2bc3e1c80705f/categories/64cef5e853f2bc3e1c807064/variants`

**Результат:**

```js
[
  {
    _id: "64d0055d76de8bce9cf3eebf",
    ua: "Сухий корм для котів",
    en: "Dry Cat Food",
    code: "dry_cat_food",
    _pet: {
      _id: "64cef53b53f2bc3e1c80705f",
      ua: "Товари для котів",
      en: "For Cats",
      code: "for_cats",
    },
    _category: {
      _id: "64cef5e853f2bc3e1c807064",
      ua: "Корм для котів",
      en: "Food for Cats",
      code: "food_for_cats",
      _pet: "64cef53b53f2bc3e1c80705f",
    },
  },
  {
    _id: "64d0055d76de8bce9cf3eec0",
    ua: "Консерви для котів",
    en: "Wet Cat Food",
    code: "wet_cat_food",
    _pet: {
      _id: "64cef53b53f2bc3e1c80705f",
      ua: "Товари для котів",
      en: "For Cats",
      code: "for_cats",
    },
    _category: {
      _id: "64cef5e853f2bc3e1c807064",
      ua: "Корм для котів",
      en: "Food for Cats",
      code: "food_for_cats",
      _pet: "64cef53b53f2bc3e1c80705f",
    },
  },
  {
    _id: "64d0055d76de8bce9cf3eec1",
    ua: "Корм для кошенят",
    en: "Food for Kittens",
    code: "food_for_kittens",
    _pet: {
      _id: "64cef53b53f2bc3e1c80705f",
      ua: "Товари для котів",
      en: "For Cats",
      code: "for_cats",
    },
    _category: {
      _id: "64cef5e853f2bc3e1c807064",
      ua: "Корм для котів",
      en: "Food for Cats",
      code: "food_for_cats",
      _pet: "64cef53b53f2bc3e1c80705f",
    },
  },
];
```

### Для отримання всієї структури `pets > categories > variants`

Повертає всі `pets`, `categories`, `variants` враховуючи вкладеність

- `/api/structure/all`

**Результат:**

```js
[
  {
    _id: "64cef53b53f2bc3e1c80705e",
    ua: "Товари для собак",
    en: "For Dogs",
    code: "for_dogs",
    _categories: [
      {
        _id: "64cef5e853f2bc3e1c807063",
        ua: "Корм для собак",
        en: "Food for Dogs",
        code: "food_for_dogs",
        _pet: "64cef53b53f2bc3e1c80705e",
        _variants: [
          {
            _id: "64d0055d76de8bce9cf3eebd",
            ua: "Сухий корм для собак",
            en: "Dry Dog Food",
            code: "dry_dog_food",
            _pet: "64cef53b53f2bc3e1c80705e",
            _category: "64cef5e853f2bc3e1c807063",
          },
          {
            _id: "64d0055d76de8bce9cf3eebe",
            ua: "Консерви для собак",
            en: "Wet Dog Food",
            code: "wet_dog_food",
            _pet: "64cef53b53f2bc3e1c80705e",
            _category: "64cef5e853f2bc3e1c807063",
          },
          {
            _id: "64d0055d76de8bce9cf3eebc",
            ua: "Корм для цуценят",
            en: "Food for Puppies",
            code: "food_for_puppies",
            _pet: "64cef53b53f2bc3e1c80705e",
            _category: "64cef5e853f2bc3e1c807063",
          },
        ],
      },
    ],
  },
  {
    _id: "64cef53b53f2bc3e1c80705f",
    ua: "Товари для котів",
    en: "For Cats",
    code: "for_cats",
    _categories: [
      {
        _id: "64cef5e853f2bc3e1c807064",
        ua: "Корм для котів",
        en: "Food for Cats",
        code: "food_for_cats",
        _pet: "64cef53b53f2bc3e1c80705f",
        _variants: [
          {
            _id: "64d0055d76de8bce9cf3eebf",
            ua: "Сухий корм для котів",
            en: "Dry Cat Food",
            code: "dry_cat_food",
            _pet: "64cef53b53f2bc3e1c80705f",
            _category: "64cef5e853f2bc3e1c807064",
          },
          {
            _id: "64d0055d76de8bce9cf3eec0",
            ua: "Консерви для котів",
            en: "Wet Cat Food",
            code: "wet_cat_food",
            _pet: "64cef53b53f2bc3e1c80705f",
            _category: "64cef5e853f2bc3e1c807064",
          },
          {
            _id: "64d0055d76de8bce9cf3eec1",
            ua: "Корм для кошенят",
            en: "Food for Kittens",
            code: "food_for_kittens",
            _pet: "64cef53b53f2bc3e1c80705f",
            _category: "64cef5e853f2bc3e1c807064",
          },
        ],
      },
    ],
  },
];
```

## Запити на корзину товарів

### Для отримання акуальної кількості товарів

Перший запит яки перевіряє достуану кількість

## Приклад запиту

```json
POST /api/products/checkBasket/card

{
  "value": "0085941615",
  "array": [
    {
      "productCode": "0085941615",
      "count": 1
    },
    {
      "productCode": "0054033275",
      "count": 5
    }
  ]
}




```

### Для замовлення товару

Відніамє товари в базі

## Приклад запиту

```json
POST /api/products/buyProduct

{
  "value": "0085941615",
  "array": [
    {
      "productCode": "0085941615",
      "count": 1
    },
    {
      "productCode": "0054033275",
      "count": 5
    }
  ]
}
```

## Запитина на авторизацію

### Реєстрація

- `/api/auth/register`

Регулярний вираз для email - /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Регулярний вираз для password - /^(?=._[a-z])(?=._[A-Z]).{6,}$/

Приклад запиту

```json
POST /api/auth/register

{
  "name": "Poly",
  "email": "poly@gmail.com",
  "password": "Qwerty123"
}


```

Приклад відповіді

```json
{
  "code": 201,
  "data": {
    "user": {
      "name": "Artem",
      "email": "qwerty@email.com",
      "accessToken": "Tajkasdkasndjkasndkja",
      "refreshToken": "fxMxMlqHq4GzPzW_6XSDrTKEd3ZB-9Lsoy3vIkDCdUE0"
    }
  }
}
```

### Логін

- `/api/auth/login`

Приклад запиту

```json
POST /api/auth/login

{
"email": "qwerty@email.com",
"password": "Qweadadarty"
}

```

Приклад відповіді

```json
{
  "code": 200,
  "data": {
    "user": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzllODJlMTJjYTdlYjMxZDllNyIsImlhdCI6MTcwMTg5NjQ3NiwiZXhwIjoxNzAxODk2Nzc2fQ.YoKqbtyuZKA5nvIGMGK21ssrfHTm9dxpClKEQW3Npc0",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBkNDllODJlMTJjYTdlYjMxZDllNyIsImlhdCI6MTcwMTg3NiwiZXhwIjoxNzAyNTAxMjc2fQ.1ZDRam0FRrZ7Wz9M_JzK5p-Vy8REjJ26vEunPol1MvE"
    }
  }
}
```

### Вихід

- `/api/auth/logout`

Приклад запиту

In request headers BEARER TOKEN

Приклад відповіді

```json
{
  "message": "Logout success"
}
```

### Рефреш

- `/api/auth/refresh`

Приклад запиту

```json
POST /api/auth/refresh

{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBkNDllODJlMTJjYTdlYjMxZDllNyIsImlhdCI6MTcwMTg5NjQ4OCwiZXhwIjoxNzAyNTAxMjg4fQ.mQkzy8T_egfm8JhAmYX5XeZkRpnNMhKW-E2W-b8"
}

```

Приклад відповіді

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBkNDllODJlMTJjYTdlYjMxZDllNyIsImlhdCI6MTcwMTg5NjUwMywiZXhwIjoxNzAxODkAzfQ.u7JfJhPZzk-XfLDkwc1tuzRsjyz9-Nuujv3FHul6OQI",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBkNDllODJlMTJjYTdlYjMxZDllNyIsImlhdCI6MTcwMTg5NjUwMywiZXhwIjoxNzAyNTAxMzAzfQ.gJFBMQVzWlOUrghMV5L7v3XDWLsGBMiDqYsZI86w"
}
```

### На користувача

- `/api/auth/current`

Приклад запиту

In request headers BEARER TOKEN

Приклад відповіді

```json
{
  "name": "Artem",
  "email": "qwerty@email.com"
}
```
