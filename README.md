# Backend

[адреса бека](https://paws-and-claws-store-backend.onrender.com/)

- [Запити](#запити)
  - [Для сторінок `/products`](#для-сторінок-products)
  - [Для сторінок `/products/pets/:onePet`](#для-сторінок-productspetsonepet)
  - [Для сторінок `/products/categories/:oneCategory`](#для-сторінок-productscategoriesonecategory)
  - [Для сторінок `/products/product_types/:oneProductType`](#для-сторінок-productsproduct_typesoneproducttype)
  - [Для сторінок одного продукту `/products/:oneProduct`](#для-сторінок-одного-продукту-productsoneproduct)
- [Пагінація](#пагінація)

## Запити

### Для сторінок `/products`

- `/api/products`
- `/api/products?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

_Присутня пагінація_

### Для сторінок `/products/pets/:onePet`

- `/api/poducts/pets/<Тварина>`
- `/api/products/pets/<Тварина>?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

**Тварини**

- `for_dogs`
- `for_cats`

_Присутня пагінація_

### Для сторінок `/products/categories/:oneCategory`

- `/api/products/categories/<Категорія>`
- `/api/products/categories/<Категорія>?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

**Категорії**

- `food_for_dogs`
- `food_for_cats`

_Присутня пагінація_

### Для сторінок `/products/product_types/:oneProductType`

- `/api/products/product_types/<Тип продукту>`
- `/api/products/product_types/<Тип продукту>?page=<номер сторінки>&limit=<кількість елементів на сторінці>`

**Типи продукту**

- `dry_dog_food`
- `wet_dog_food`
- `food_for_puppies`
- `dry_cat_food`
- `wet_cat_food`
- `food_for_kittens`

_Присутня пагінація_

### Для сторінок одного продукту `/products/:oneProduct`

- `/api/products/<поле _id продукту з БД>`

## Пагінація

При запиті з пагінацією нам поертається об'єкт

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
