import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = createClient();

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5,
  },
];

const getAsync = promisify(client.get).bind(client);

const getItemById = (id) => listProducts.find((item) => item.itemId === id);

const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
};

app.get('/list_products', async (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const item = getItemById(Number(req.params.itemId));
  const stock = await getCurrentReservedStockById(Number(req.params.id));
  console.log('list: ' + stock);
  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    stock = stock === null ? item.initialAvailableQuantity : stock;
    item.currentQuantity = stock;
    res.json({ item });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const item = getItemById(Number(req.params.itemId));
  const stock = await getCurrentReservedStockById(Number(req.params.id));
  console.log(stock);
  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    if (stock === null) {
      stock = item.initialAvailableQuantity;
    }
    if (stock < 1) {
      res.json({ status:"Not enough stock available", itemId: `${item.itemId}` });
    } else {
      reserveStockById(item.itemId, stock - 1);
      console.log(stock);
      res.json({ status:"Reservation confirmed", itemId: `${item.itemId}` });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
