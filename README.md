# Backend

[адреса бека](https://paws-and-claws-store-backend.onrender.com/)

- [Запити для продутків]
  - [Для стартової сторінки]
  - [Для отримання всіх продуктів]
  - [Для запитів по тваринах `onePet`]
  - [Для запитів по категоріях `oneCategory`]
  - [Для запитів по типах продуктів `oneProductType`]
  - [Для запитів для одного продукту `oneProduct`]
- [Пагінація]

- [Запити для структури]
  - [Для переліку тварин `pets`]
  - [Для переліку категорій `categories`]
  - [Для переліку типів продуктів `variantes` (*В таблиці `productTypes`*)]

### Для стартової сторінки

Повертає перші 12 продуктів відсортовані таким чином, щоб спочатку йшли продукти, що мають знижку на вагу від меньшої до більшої, далі всі інші продукти без знижок

- `/api/products`

### Для отримання всіх продуктів

Повертає всі продукти без групування по назві

- `/api/products/allItems`

### Для запитів по тваринах `onePet`

- `/api/poducts/pets/:onePet`
- `/api/products/pets/:onePet?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

**Тварини:**

- `for_dogs`
- `for_cats`

_Присутня пагінація_

### Для запитів по категоріях `oneCategory`

- `/api/products/categories/:oneCategory`
- `/api/products/categories/:oneCategory?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

**Категорії:**

- `food_for_dogs`
- `food_for_cats`

_Присутня пагінація_

### Для запитів по типах продуктів `oneProductType`

- `/api/products/product_types/:oneProductType`
- `/api/products/product_types/:oneProductType?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

**Типи продукту:**

- `dry_dog_food`
- `wet_dog_food`
- `food_for_puppies`
- `dry_cat_food`
- `wet_cat_food`
- `food_for_kittens`

_Присутня пагінація_

### Для запитів для одного продукту `oneProduct`

- `/api/products/:oneProduct`

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
    "limit": 12, // Кількість лементів на сторінці
    "totalPages": 4, // Загальна кільксть стрінок
    "page": 2, // Поточна сторінка
    "pagingCounter": 13,
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
        "_id": "64cef53b53f2bc3e1c80705e",
        "ua": "Товари для собак",
        "en": "For Dogs",
        "code": "for_dogs"
    },
    {
        "_id": "64cef53b53f2bc3e1c80705f",
        "ua": "Товари для котів",
        "en": "For Cats",
        "code": "for_cats"
    }
]
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
        "_id": "64cef5e853f2bc3e1c807064",
        "ua": "Корм для котів",
        "en": "Food for Cats",
        "code": "food_for_cats",
        "_pet": {
            "_id": "64cef53b53f2bc3e1c80705f",
            "ua": "Товари для котів",
            "en": "For Cats",
            "code": "for_cats"
        }
    }
]
```

### Для переліку типів продуктів `variantes` (*В таблиці `productTypes`*)

Повертає масив типів продуктів для поточної категорії і тварини, включаючи дані про батьківські категорію і тварину

- `/api/structure/pets/:idPet/categories/:idCategory/variants`

**Приклад:**

- `/api/structure/pets/64cef53b53f2bc3e1c80705f/categories/64cef5e853f2bc3e1c807064/variants`

**Результат:**

```js
[
    {
        "_id": "64d0055d76de8bce9cf3eebf",
        "ua": "Сухий корм для котів",
        "en": "Dry Cat Food",
        "code": "dry_cat_food",
        "_pet": {
            "_id": "64cef53b53f2bc3e1c80705f",
            "ua": "Товари для котів",
            "en": "For Cats",
            "code": "for_cats"
        },
        "_category": {
            "_id": "64cef5e853f2bc3e1c807064",
            "ua": "Корм для котів",
            "en": "Food for Cats",
            "code": "food_for_cats",
            "_pet": "64cef53b53f2bc3e1c80705f"
        }
    },
    {
        "_id": "64d0055d76de8bce9cf3eec0",
        "ua": "Консерви для котів",
        "en": "Wet Cat Food",
        "code": "wet_cat_food",
        "_pet": {
            "_id": "64cef53b53f2bc3e1c80705f",
            "ua": "Товари для котів",
            "en": "For Cats",
            "code": "for_cats"
        },
        "_category": {
            "_id": "64cef5e853f2bc3e1c807064",
            "ua": "Корм для котів",
            "en": "Food for Cats",
            "code": "food_for_cats",
            "_pet": "64cef53b53f2bc3e1c80705f"
        }
    },
    {
        "_id": "64d0055d76de8bce9cf3eec1",
        "ua": "Корм для кошенят",
        "en": "Food for Kittens",
        "code": "food_for_kittens",
        "_pet": {
            "_id": "64cef53b53f2bc3e1c80705f",
            "ua": "Товари для котів",
            "en": "For Cats",
            "code": "for_cats"
        },
        "_category": {
            "_id": "64cef5e853f2bc3e1c807064",
            "ua": "Корм для котів",
            "en": "Food for Cats",
            "code": "food_for_cats",
            "_pet": "64cef53b53f2bc3e1c80705f"
        }
    }
]
```