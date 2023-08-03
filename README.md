# Backend

[адреса бека](https://paws-and-claws-store-backend.onrender.com/)

- [Запити](#запити)
  - [Для стартової сторінки]
  - [Для отримання всіх продуктів]
  - [Для запитів по тваринах `onePet`]
  - [Для запитів по категоріях `oneCategory`]
  - [Для запитів по типах продуктів `oneProductType`]
  - [Для запитів для одного продукту `oneProduct`]
- [Пагінація](#пагінація)

## Запити

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
