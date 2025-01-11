# Developer's Word

<div style="display: flex; align-items: center;">
    <img src="https://i.ibb.co.com/Zcfr6yN/6sense.png" style="width: 100%; height: auto; margin-right: 5px;" />
</div>
<div>
    <p>Please contact me if you encounter any problems</p>
    <ul>
    <li class="display:flex; align-items: center;"><a href="https://www.linkedin.com/in/gaziehsanul/">linkedin.com/in/gaziehsanul/</a> </li>
    <li class="display:flex; align-items: center;">antik.edu@gmail.com</li>
    <li class="display:flex; align-items: center;">+88-01869694519</li>
    </ul>
</div>

## Live Link:

```
https://6sense-server.vercel.app/
```

## Github Link:

```
https://github.com/antik1801/PRODUCTS_CRUD_ASSESSMENT
```

## Technology used:

<ul>
    <li>ExpressJS</li>
    <li>TypeScript</li>
    <li>Mongoose</li>
    <li>Mongodb</li>
    <li>Zod validation</li>
    <li>SHA-285 Encryption</li>
    <li>Modular pattern</li>
    <li>Vercel</li>
</ul>

# API and data Models:

# API DOCUMENTATIONS:
```
https://documenter.getpostman.com/view/22565658/2sAYQWJtJS
```

## [POST]

```
https://6sense-server.vercel.app/api/v1/products/create-product
```

## Data:

```
{
  "name": "Alpha Sorter",
  "description": "High-quality wireless headphones with noise-cancellation features.",
  "discount": "10",
  "image": "https://example.com/images/headphones.jpg",
  "price": 99.99,
  "category": "gadget",
  "status": "In Stock"
}

```

## [GET]

```
https://6sense-server.vercel.app/api/v1/products
https://6sense-server.vercel.app/api/v1/products?name=example_name
https://6sense-server.vercel.app/api/v1/products?category=example_category
```

# [PUT]

```
https://6sense-server.vercel.app/api/v1/products/ObjectID
```

## Data Model:

```
{
    "discount": "30",
    "description": "Updated Portable Bluetooth speaker with 10-hour battery life and water resistance",
    "status": "Stock Out"
}
```
# [DELETE]
```
https://6sense-server.vercel.app/api/v1/products/ObjectID
```
