'use strict';

const { User } = require('./sqldb');
const { Cliente } = require('./sqldb');
const { Interes } = require('./sqldb');
const { CategoriaProducto } = require('./sqldb');
const { Categoria } = require('./sqldb');
const { Opinion } = require('./sqldb');
const { Producto } = require('./sqldb');
const products = require('./DATA.json');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const CLIENTE_CANTIDAD = 20;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2
  },
  wordsPerSentence: {
    max: 14,
    min: 4
  }
});
const categories = []
const intereses = []


CategoriaProducto.destroy({ where: {} })
  .then(() => CategoriaProducto.bulkCreate(
    generateCategories()
  )
    .then(() => {
      console.log('finished populating CategoriaProducto')
      Cliente.destroy({ where: {} })
        .then(() => Cliente.bulkCreate(
          generateClientes()
        )
          .then(() => {
            console.log('finished populating clients')
            Interes.destroy({ where: {} })
              .then(() => Interes.bulkCreate(
                intereses
              )
                .then(() => console.log('finished populating Interes'))
                .catch(err => console.log('error populating Interes', err)));
            Producto.destroy({ where: {} })
              .then(() => Producto.bulkCreate(
                generateProductos()
              )
                .then(() => {
                  console.log('finished populating productos')
                  Opinion.destroy({ where: {} })
                    .then(() => Opinion.bulkCreate(
                      generateOpinions()
                    )
                      .then(() => console.log('finished populating opiniones'))
                      .catch(err => console.log('error populating opiniones', err)));
                  Categoria.destroy({ where: {} })
                    .then(() => {
                      console.log(categories, 'CATEGORIAS')
                      Categoria.bulkCreate(
                        categories
                      )
                        .then(() => console.log('finished populating Categoria'))
                        .catch(err => console.log('error populating Categoria', err))
                    });
                })
                .catch(err => console.log('error populating productos', err)));
          })
          .catch(err => console.log('error populating clients', err)));
    })
    .catch(err => console.log('error populating CategoriaProducto', err)));





function generateClientes() {
  generateIntereses(1);
  const userList = [
    {
      id: 1,
      username: 'Admin',
      password: 'admin',
      email: 'admin@admin.com',
    }
  ]

  for (let i = 0; i < CLIENTE_CANTIDAD + 1; i++) {
    generateIntereses(i + 2)
    userList.push(
      {
        id: i + 2,
        username: `User${i}`,
        password: '12345678',
        email: `user${i}@user${i}.com`,
      }
    )
  }
  return userList;
}

function generateProductos() {
  const productList = products.map((product, index) => {
    chooseCategories(product, index + 1)
    console.log(index + 1, 'INDEXXX')
    console.log(categories)
    const cantidadInicial = Math.floor(Math.random() * (200 - 100)) + 100;
    return {
      id: index + 1,
      nombre: product.title.trim(),
      descripcion: JSON.stringify(product.description)?.replace('Amazon', 'PowerBuy').replace('amazon', 'PowerBuy'),
      cantidadDisponible: Math.floor(Math.random() * cantidadInicial),
      cantidadInicial,
      caracteristicas: JSON.stringify(product.feature)?.replace('Amazon', 'PowerBuy').replace('amazon', 'PowerBuy'),
      imagenes: JSON.stringify(product.image),
      precio: product.price ? product.price : 2590.90
    }
  })
  return productList;
}

function generateOpinions() {
  return Array(200).fill(1).map((_, index) => {
    const valoraciones = ['Muy Bueno', 'Bueno', 'Malo', 'Muy Malo']
    const cli = Math.ceil(Math.random() * CLIENTE_CANTIDAD);
    const prod = Math.ceil(Math.random() * 70);
    return {
      id: index + 1,
      valoracion: Math.floor(Math.random() * 6),
      opinion: lorem.generateParagraphs(Math.ceil(Math.random() * 5)),
      ClienteId: cli,
      ProductoId: prod
    }
  })
}

function generateCategories() {
  return [
    {
      categoria: 'Portátiles'
    },
    {
      categoria: 'Cámaras'
    },
    {
      categoria: 'Smartphones'
    },
    {
      categoria: 'Televisores'
    },
    {
      categoria: 'Apple'
    },
    {
      categoria: 'Asus'
    },
    {
      categoria: 'Sony'
    },
    {
      categoria: 'Panasonic'
    },
    {
      categoria: 'Xiaomi'
    },
    {
      categoria: 'GoPro'
    },
    {
      categoria: 'Drones'
    },
    {
      categoria: 'HP'
    },
    {
      categoria: 'Chuwi'
    },
    {
      categoria: 'CHiQ'
    },
    {
      categoria: 'Google'
    },
    {
      categoria: 'LG'
    },
    {
      categoria: 'Philips'
    },
    {
      categoria: 'Samsung'
    },

  ]
}

function chooseCategories(product, productId) {
  switch (product.type) {
    case 'CAMERA':
      categories.push({
        CategoriaProductoCategoria: 'Cámaras',
        ProductoId: productId
      });
      break;
    case 'LAPTOP':
      categories.push({
        CategoriaProductoCategoria: 'Portátiles',
        ProductoId: productId
      });
      break;
    case 'SMARTPHONE':
      categories.push({
        CategoriaProductoCategoria: 'Smartphones',
        ProductoId: productId
      });
      break;
    case 'TV':
      categories.push({
        CategoriaProductoCategoria: 'Televisores',
        ProductoId: productId
      });
      break;
  }

  if (JSON.stringify(product).includes('CHiQ')) {
    categories.push({
      CategoriaProductoCategoria: 'CHiQ',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Google')) {
    categories.push({
      CategoriaProductoCategoria: 'Google',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('LG')) {
    categories.push({
      CategoriaProductoCategoria: 'LG',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Philips')) {
    categories.push({
      CategoriaProductoCategoria: 'Philips',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Samsung')) {
    categories.push({
      CategoriaProductoCategoria: 'Samsung',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Apple')) {
    categories.push({
      CategoriaProductoCategoria: 'Apple',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('ASUS')) {
    categories.push({
      CategoriaProductoCategoria: 'Asus',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('CHUWI')) {
    categories.push({
      CategoriaProductoCategoria: 'Chuwi',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('HP')) {
    categories.push({
      CategoriaProductoCategoria: 'HP',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Asus')) {
    categories.push({
      CategoriaProductoCategoria: 'Asus',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Sony')) {
    categories.push({
      CategoriaProductoCategoria: 'Sony',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Panasonic')) {
    categories.push({
      CategoriaProductoCategoria: 'Panasonic',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Xiaomi')) {
    categories.push({
      CategoriaProductoCategoria: 'Xiaomi',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('GoPro')) {
    categories.push({
      CategoriaProductoCategoria: 'GoPro',
      ProductoId: productId
    })
  }
  if (JSON.stringify(product).includes('Drones') || JSON.stringify(product).includes('DJI')) {
    categories.push({
      CategoriaProductoCategoria: 'Drones',
      ProductoId: productId
    })
  }
}

function generateIntereses(clientId) {
  const list = [
    'Portátiles',
    'Cámaras',
    'Smartphones',
    'Televisores',
    'Apple',
    'Asus',
    'Sony',
    'Panasonic',
    'Xiaomi',
    'GoPro',
    'Drones',
    'HP',
    'Chuwi'
  ];

  let generator = Array(Math.ceil(Math.random() * 7)).fill(1)
  const used = []
  generator = generator.map(_ => {
    const pos = Math.floor(Math.random() * list.length);
    if (!used.includes(pos)) {
      used.push(pos)
      return list[pos]
    }
  })
  generator.forEach(item => {
    if (item) {
      intereses.push({
        CategoriaProductoCategoria: item,
        ClienteId: clientId
      })
    }
  })
}