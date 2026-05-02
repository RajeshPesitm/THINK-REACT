```txt
Promt: 
before using mogo db i have hard coded App.js like this
could you make mongo db backend replacement for this hard code, and replace 
existing App.js
import { useState } from 'react';
import { FilterableProductTable, CategoryDetail, Layout } from './components';

const PRODUCTS = [<-- replace this part and make data fetched from mongo db. Keep remaining part intact
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "grains", price: "$1", stocked: true, name: "barley" },
  { category: "spices", price: "$1", stocked: false, name: "turmeric" }
];

export default function App() {
 ......
}
```


[Backend Setup](./backend/README.md) – Creating NODE.js Express server + mongoDB connection 
