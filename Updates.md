✅ Feature update completed
Implemented Excel import/export support at both levels:

ProductTable.js  

Added Import all and Export all buttons above the category table grid  
Imports upload to POST /products/import  
Exports download from GET /products/export  

ProductTableCollection.js  

Added Import and Export buttons for each category card  
Exports download from GET /products/export?category=<Category>  
Imports upload to POST /products/import?category=<Category>  

App.js  

Added fetchProducts() refresh helper  
Passed onProductsUpdated through FilterableProductTable and CategoryDetail  

server.js  

Added Excel export endpoint:  
GET /products/export  
GET /products/export?category=...  
Added Excel import endpoint:  
POST /products/import  
optional ?category=... to assign missing category values  
Added multer + xlsx support  

package.json  

Added dependencies:  
multer  
xlsx

styles.module.css  

Added toolbar/button styles for import/export UI  

🔧 Notes  
After pulling these changes, run:
```bash
cd backend
npm install
```
Then restart the backend server.