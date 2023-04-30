const fs = require('fs');
const csv = require('csv-stringify');

const data = [
    { id: 1, name: 'iPhone X', price: '400$' },
    { id: 2, name: 'iPhone 7 Plus', price: '200$' },
    { id: 3, name: 'iPhone 6', price: '100$' }
];

function appendData(data, id, name, price){
    const unique = data.every(product => product.id !== id);
    if(unique){
        data.push({id, name, price}); 
        csv.stringify(data, (err, output) => {
            if (err) {
                console.error(err);
            } else {
                fs.writeFileSync('filespart2/list.csv', output);
                console.log('Appended');
            }
        });
    } else {
        console.error('Error. Product with this ID already exists');
    }
}

function deleteData(id){
    const index = data.findIndex(product => product.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    csv.stringify(data, (err, output) => {
      if (err) {
        console.error(err);
      } else {
        fs.writeFileSync('filespart2/list.csv', output);
        console.log('Deleted');
      }
    });
  } else {
    console.error('Error. Product with this ID was not found');
  }
}

function changeData(id, name, price){
    const index = data.findIndex(product => product.id === id);
    if (index !== -1) {
        data[index] = { id, name, price };
        csv.stringify(data, (err, output) => {
            if (err) {
                console.error(err);
            } else {
                fs.writeFileSync('filespart2/list.csv', output);
                console.log('Updated');
            }
        });
    } else {
        console.error('Error. Product with this ID was not found');
    }
}
   

function getData(id){
    const fileContent = fs.readFileSync('filespart2/list.csv', 'utf8');
    const row = fileContent.split('\n');
    let product = null;
    for(let i = 0; i < row.length; i++) {
        const col = row[i].split(',');
        if(col[0] == id) {
            product = { id: parseInt(col[0]), name: col[1], price: col[2] };
            break;
        }
    }
    if(product) {
        console.log(product);
    } else {
        console.error('Error. Product with this ID was not found');
    }
}

appendData(data, 4, 'iPhone 100', '500$');
appendData(data, 4, 'iPhone 500', '500$');
appendData(data, 6, 'iPhone 500', '500$');


getData(2);
getData(6);

deleteData(4);
deleteData(6);

changeData(3, 'iPhone 4', '50$');
changeData(9, 'iPhone 4', '50$');