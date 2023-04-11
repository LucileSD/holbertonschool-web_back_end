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

const getItemById = (id) => listProducts.find((item) => item.itemId === parseInt(id));

const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
};

app.get('/list_products', (request, response) => {
  response.json(listProducts);
});

app.get('/list_products/:itemId', async (request, response) => {
  const stock = await getCurrentReservedStockById(request.params.itemId);
  const item = getItemById(request.params.itemId);
  if (!item) {
    response.json({ status: 'Product not found' });
  } else {
    response.json({ ...item, currentQuantity: item.initialAvailableQuantity - stock });
  }
});

app.get('/reserve_product/:itemId', async (request, response) => {
  const item = getItemById(request.params.itemId);
  const stock = await getCurrentReservedStockById(request.params.itemId);
  if (!item) {
    response.json({ status: 'Product not found' });
  } else if (item.initialAvailableQuantity < 1) {
    response.json({ status: 'Not enough stock available', itemId: item.itemId });
  } else {
    reserveStockById(item.itemId, stock);
    response.json({ status: 'Reservation confirmed', itemId: item.itemId });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
