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
- [Пагінація](#пагінація)

- [Запити для структури](#запити-для-структури)
  - [Для переліку тварин `pets`](#для-переліку-тварин-pets)
  - [Для переліку категорій `categories`](#для-переліку-категорій-categories)
  - [Для переліку типів продуктів `variantes` (_В таблиці `productTypes`_)](#для-переліку-типів-продуктів-variantes-в-таблиці-producttypes)
  - [Для отримання всієї структури `pets > categories > variants`](#для-отримання-всієї-структури-pets--categories--variants)

## Запити для продутків

### Для стартової сторінки

Повертає перші 12 продуктів відсортовані таким чином, щоб спочатку йшли продукти, що мають знижку на вагу від меньшої до більшої, далі всі інші продукти без знижок

- `/api/products`

### Для отримання всіх продуктів

Перелік всіх продуктів

- `/api/products/allItems`

_Присутня пагінація_

### Перелік всіх продуктів для тварин `:idPet`

- `/api/products/pets/:idPet`
- `/api/products/pets/:idPet?page=<номер сторінки>`

**Тварини:**

- `for_dogs`
- `for_cats`

_Присутня пагінація_

### Перелік всіх продуктів для категорії `:idCategory`

- `/api/products/categories/:idCategory`
- `/api/products/categories/:idCategory?page=<номер сторінки>`

**Категорії:**

- `food_for_dogs`
- `food_for_cats`

_Присутня пагінація_

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

### Пошук продуктів по ключовому слову

- `/api/products/getProductByName/card?productName=CANAGAN`
- `/api/products/getProductByName/card?brand=CANAGAN`

- `productName` (стрічка, обов'язково): назва продукту . Не менше 3 і не більше 230 символів

- `brand` (стрічка, обов'язково): бренд продукту . Не менше 3 і не більше 230 символів

_Присутня пагінація_

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
