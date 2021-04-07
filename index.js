const fs = require('fs').promises;
const fs1 = require('fs');
const fileExists = require('fs').existsSync;
const path = require('path');

const pathToIndividualProd = path.join(
  __dirname,
  'src',
  'assets',
  'products-data',
  'individual-products'
);

(async () => {
  const fileNames = await fs.readdir(pathToIndividualProd);
  const items = [];
  for (const fileName of fileNames) {
    const fileContent = (await fs.readFile(path.join(pathToIndividualProd, fileName))).toString('utf8');
    const prodData = JSON.parse(fileContent);
    items.push({
      id: prodData.id,
      name: prodData.name
    })
  }
  const itemContent = JSON.stringify(items);
  await fs.writeFile(path.join(pathToIndividualProd, 'prod_list.json'), itemContent, {
    encoding: 'utf8',
    flag: 'w'
  });
})()


