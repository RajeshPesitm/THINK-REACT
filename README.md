```txt
Promt 1: 
Make this part visible on click
Also keep rest of the things intact.
i mean,
const handleCategoryClick = (category) => {
setSelectedCategory(category);
};

Preserve this part intact

src/components/ProductTableCollection.js lines, 65 70-85
src/App.js lines 5-6, 21-23
```

```txt
Prompt 2:
Add View Button for each <tr>.
when view Button is Clicked then this <tr> expands inside <tbody> and two more buttons Update and delete appears.

Update Allows updating {name}, {product.price}, {product.stocked} in mongodb database.

if convinient, create additional components in ./src/components

src/components/ProductRow.js
```

[1. Features Updated](./Updates.md) – Creating NODE.js Express server + mongoDB connection 

[2. Backend Setup](./backend/README.md) – Creating NODE.js Express server + mongoDB connection 
