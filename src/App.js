import { FilterableProductTable } from './components';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "grains", price: "$1", stocked: true, name: "barley" }

];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}