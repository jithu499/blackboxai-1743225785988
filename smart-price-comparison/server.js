const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Sample product database
const products = [
  {
    id: 1,
    name: "Bose QuietComfort 45",
    description: "Noise cancelling wireless headphones",
    image: "amz.jpg",
    prices: [
      { retailer: "Amazon", price: 22999, url: "https://www.amazon.in/dp/B098FKXT8N" },
      { retailer: "Flipkart", price: 23999, url: "https://www.flipkart.com/bose-qc45" },
      { retailer: "Snapdeal", price: 21999, url: "https://www.snapdeal.com/product/bose-qc45" }
    ],
    rating: 4.8
  },
  {
    id: 2,
    name: "Apple Watch Series 8",
    description: "GPS + Cellular smartwatch",
    image: "flp.jpg", 
    prices: [
      { retailer: "Flipkart", price: 35999, url: "https://www.flipkart.com/apple-watch-8" },
      { retailer: "Amazon", price: 34999, url: "https://www.amazon.in/dp/B0BDHXJ1X1" }
    ],
    rating: 4.9
  }
];

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Search endpoint
app.get('/api/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = products.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.description.toLowerCase().includes(query)
  ).map(p => ({
    ...p,
    bestPrice: Math.min(...p.prices.map(pr => pr.price))
  }));
  
  res.json(results);
});

// Start server
app.listen(PORT, () => {
  console.log(`Price comparison API running on port ${PORT}`);
});