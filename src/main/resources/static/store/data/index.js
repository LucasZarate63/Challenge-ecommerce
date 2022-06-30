const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!',

      provincias: ["Buenos Aires", "Jujuy", "Salta", "Chaco", "Formosa", "San Luis", "San Juan", "Mendoza", "Catamarca", "Sant. del Estero", "Tucuman", "Santa Fe", "Misiones", "Corrientes", "Cordoba", "Neuquen", "Rio Negro", "Tierra del Fuego", "Santa Cruz", "La Rioja", "Entre Rios", "La Pampa", "Chubut"],
      shippingPrice: 0,
      provinciaSeleccted: [],

      // LocalStorage Products
      cartStorage: [],

      productsCartStorage: [],
      productsCartId: [],
      subtotalCart: 0,
      totalPurchase: 0,

      // LocalStorage Favs
      favStorage: [],

      productsFavStorage: [],
      productsFavId: [],

      //// Login & Register
      email: [],
      password: [],
      firstName: "",
      lastName: "",
      emailRegister: "",
      passwordRegister: "",
      description: "",

      ////
      productsBack: [],
      dataPro: [],
      lowStock: [],
      funkos: [],
      mangas: [],
      covers: [],
      productSelect: {},
      offMessage: ' 15% OFF',

      //// addresses and shippment
      addresses: [],
      shippmentAddress: [],
      contactName: "",
      contactLastName: "",
      contactNumber: "",
      contactEmail: "",


      //// newAddresse
      newZipCode: [],
      newStreetName: [],
      newStreetNumber: [],
      newFloorApartment: [],
      newProvince: [],
      newLocality: [],
    }
  },
  created() {
    axios.get(`/api/clients/current`)
      .then(data => {
        this.addresses = data.data.addresses
      }),
      axios.get(`/api/products`)
        .then(data => {
          this.productsBack = data.data
          this.productsLowStock()
          this.funkoFilter()
          this.coversFilter()
          this.mangasFilter()

        }),

      this.productsCartStorage = JSON.parse(localStorage.getItem("cart"))
    if (this.productsCartStorage) {
      this.cartStorage = this.productsCartStorage
    }

  },
  mounted() {
  },
  methods: {
    logOut() {
      axios.post('/api/logout')
        .then(response => setTimeout(() => {
          window.location.href = './index.html'
        }, 1000))
    },
    productForModal(product) {
      this.productSelect = product
      return this.productSelect.name
    },
    productsLowStock() {
      let prodLowStockVar = this.productsBack
      this.lowStock = []
      prodLowStockVar.forEach(product => {
        if (product.stock <= 5) {
          this.lowStock.push(product)
        }
      })
    },
    funkoFilter() {
      let products = this.productsBack
      this.funkos = []
      products.forEach(product => {
        if (product.subcategory === "Funko POP!") {
          this.funkos.push(product)
        }
      })
    },
    coversFilter() {
      let products = this.productsBack
      this.covers = []
      products.forEach(product => {
        if (product.subcategory === "Iphone Cases") {
          this.covers.push(product)
        }
      })
    },
    mangasFilter() {
      let products = this.productsBack
      this.mangas = []
      products.forEach(product => {
        if (product.subcategory === "Static Figures") {
          this.mangas.push(product)
        }
      })
    },
    addProductFav(product) {
      this.productsFavId = this.favStorage.map(product => product.id)
      if (!this.productsFavId.includes(product.id)) {
        product.quantity = 1
        this.favStorage.push(product)
        localStorage.setItem("fav", JSON.stringify(this.favStorage))
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '30%',
        padding: '1rem',
        background: '#ECC038',
        backdrop: false,
        title: 'Agregado',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      })
    },
    deleteProductFav(product) {
      this.productsFavId = this.productsFavStorage
      if (!this.productsFavId.includes(product.id)) {
        this.favStorage.pop(product)
        localStorage.setItem("fav", JSON.stringify(this.favStorage))
      }
    },
    addProductCart(product) {
      this.productsCartId = this.cartStorage.map(product => product.id)
      if (!this.productsCartId.includes(product.id)) {
        product.quantity = 1
        this.cartStorage.push(product)
        localStorage.setItem("cart", JSON.stringify(this.cartStorage))
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '30%',
        padding: '1rem',
        background: '#ECC038',
        backdrop: false,
        title: 'Guardado',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      })
        .catch(function (error) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Stock no disponible',
            showConfirmButton: false,
            timer: 1500
          })
        })

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '30%',
        padding: '1rem',
        background: '#ECC038',
        backdrop: false,
        title: 'Guardado',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      })
        .catch(function (error) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Stock no disponible',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    addProductCartModal(product) {
      let input = document.getElementById(`${product.id}`)
      this.productsCartId = this.cartStorage.map(product => product.id)
      if (!this.productsCartId.includes(product.id)) {
        product.quantity = input.value
        this.cartStorage.push(product)
        localStorage.setItem("cart", JSON.stringify(this.cartStorage))
      }
      input.value = 1
    },
    deleteProductCart(product) {
      this.productsCartStorage = this.productsCartStorage.filter(prod => prod.id !== product.id)
      this.cartStorage = this.productsCartStorage
      localStorage.setItem("cart", JSON.stringify(this.productsCartStorage))
    },
    emptyCart() {
      this.cartStorage = [];
      localStorage.removeItem("cart");
    },
    sumCart(productCart) {
      let localS = JSON.parse(localStorage.getItem("cart"))
      let localSCopy = [...localS]
      let localSFilterToModify = localS.filter(product => product.id == productCart.id)

      if (productCart.stock > productCart.quantity) {
        localSFilterToModify[0].quantity = ++productCart.quantity
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Stock no disponible',
          showConfirmButton: false,
          timer: 1500
        })
      }
      let localScopyFiltered = localSCopy.filter(prod => prod.id != productCart.id)
      localScopyFiltered.push(localSFilterToModify[0])
      localStorage.clear()
      localStorage.setItem("cart", JSON.stringify(localScopyFiltered))
    },
    minusCart(productCart) {
      let localS = JSON.parse(localStorage.getItem("cart"))
      let localSCopy = [...localS]
      let localSFilterToModify = localS.filter(product => product.id == productCart.id)

      if (productCart.quantity > 1) {
        localSFilterToModify[0].quantity = --productCart.quantity
      }

      let localScopyFiltered = localSCopy.filter(prod => prod.id != productCart.id)
      localScopyFiltered.push(localSFilterToModify[0])
      localStorage.clear()
      localStorage.setItem("cart", JSON.stringify(localScopyFiltered))
    },
    editQuantity(productCart) {
      let input = document.getElementById(`${productCart.id}`);

      let localS = JSON.parse(localStorage.getItem("cart"))
      let localSCopy = [...localS]
      let localSFilterToModify = localS.filter(product => product.id == productCart.id)

      if (productCart.quantity != input.value && input.value <= productCart.stock) {
        localSFilterToModify[0].quantity = input.value
      }

      let localScopyFiltered = localSCopy.filter(prod => prod.id != productCart.id)
      localScopyFiltered.push(localSFilterToModify[0])
      localStorage.clear()
      localStorage.setItem("cart", JSON.stringify(localScopyFiltered))
    },
    shippingCost() {
      if (this.provinciaSeleccted == "Buenos Aires") {
        this.shippingPrice = 600
      }
      if (this.provinciaSeleccted == "Jujuy" || this.provinciaSeleccted == "Salta" || this.provinciaSeleccted == "Chaco" || this.provinciaSeleccted == "Formosa" || this.provinciaSeleccted == "San Luis" || this.provinciaSeleccted == "San Juan" || this.provinciaSeleccted == "Catamarca" || this.provinciaSeleccted == "Mendoza" || this.provinciaSeleccted == "Sant. del Estero" || this.provinciaSeleccted == "Tucuman") {
        this.shippingPrice = 1200
      }
      if (this.provinciaSeleccted == "Santa Fe" || this.provinciaSeleccted == "Misiones" || this.provinciaSeleccted == "Corrientes" || this.provinciaSeleccted == "Cordoba" || this.provinciaSeleccted == "La Rioja" || this.provinciaSeleccted == "Entre Rios" || this.provinciaSeleccted == "La Pampa") {
        this.shippingPrice = 900
      }
      if (this.provinciaSeleccted == "Neuquen" || this.provinciaSeleccted == "Rio Negro" || this.provinciaSeleccted == "Tierra del Fuego" || this.provinciaSeleccted == "Santa Cruz" || this.provinciaSeleccted == "Chubut") {
        this.shippingPrice = 1400
      }

    },
    showAlertAddress() {
      Swal.fire({
        title: 'Quieres agregar la dirección?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('/api/newAddress', `{
            "zipCode": ${this.newZipCode},
            "streetNumber": ${this.newStreetNumber},
            "floorApartment": "${this.newFloorApartment}",
            "streetName": "${this.newStreetName}",
            "province": "${this.newProvince}",
            "locality": "${this.newLocality}"}`, { headers: { "Content-Type": "application/json" } })
            .then(() =>
              Swal.fire('Dirección agregada!', '', 'success')).then(() => window.location.reload())

            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: error.response.data,
                timer: 2000,
              })
            })
        }
      })
    },
    login() {
      axios.post('/api/login', `email=${this.email}&password=${this.password}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        .catch(error => console.log(error))
    },
    register() {
      let registerObject = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.emailRegister,
        password: this.passwordRegister
      }
      axios.post('/api/clientRegister', registerObject)
        .then(response =>
          axios.post('/api/login', `email=${this.emailRegister}&password=${this.passwordRegister}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        )
        .catch(error => console.log(error))
    },
    downloadFile() {
      var props = {
        outputType: "save",
        returnJsPDFDocObject: true,
        fileName: "Factura Kobe 2022",
        orientationLandscape: false,
        compress: true,
        logo: {
          src: "https://i.imgur.com/nk6nhDrh.jpg",
          width: 105.33, //aspect ratio = width/height
          height: 30.66,
          margin: {
            top: -4, //negative or positive num, from the current position
            left: -2 //negative or positive num, from the current position
          }
        },
        business: {
          name: "0003 -",
          address: "",
          phone: "Payment Date: 01/01/2021 18:12",
          email: "Invoice Date: 02/02/2021 10:17",
          email_1: "Responsable inscripto Cuit: 30-20219031-6",
          website: "INICIO ACT.: 01/06/2009 ING. BRUTOS: 28003732",
        },
        contact: {
          label: "Factura para:",
          name: this.contactName,
          lastName: this.contactLastName,
          address: `hoal`,
          phone: this.contactNumber,
          email: this.contactEmail,
        },
        invoice: {
          label: "IVA: ",
          num: "Consumidor final",
          invDate: "kobeestore05@gmail.com",
          invGenDate: "www.kobe.com",
          headerBorder: true,
          tableBodyBorder: true,
          header: [
            {
              title: "#",
              style: {
                width: 10
              }
            },
            {
              title: "Nombre",
              style: {
                width: 30
              }
            },
            {
              title: "Descripción",
              style: {
                width: 80
              }
            },
            { title: "Serie" },
            { title: "Precio" },
            { title: "Cantidad" },
            { title: "Total" }
          ],
          table: Array.from(Array(this.cartStorage.length), (item, index) => ([
            index + 1,
            this.cartStorage[index].name,
            this.cartStorage[index].description,
            this.cartStorage[index].serie,
            ("$" + this.cartStorage[index].price),
            this.cartStorage[index].quantity,
            ("$" + (this.cartStorage[index].quantity * this.cartStorage[index].price))
          ])),
          additionalRows: [{
            col1: 'Total:',
            col2: this.cartStorage[0].name,
            col3: 'ALL',
            style: {
              fontSize: 14 //optional, default 12
            }
          },
          {
            col1: 'SubTotal:',
            col2: this.cartStorage[0].name,
            col3: 'ALL',
            style: {
              fontSize: 10 //optional, default 12
            }
          }],
          invDescLabel: "Observaciones",
          invDesc: this.description,
        },
        footer: {
          text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };


      var pdfObject = jsPDFInvoiceTemplate.default(props);

    },


    generateOrders() {
      let orders = []
      if (this.cartStorage.length != 0) {
        this.cartStorage.forEach(product => {
          let order = {
            productId: product.id,
            quantity: product.quantity
          }
          orders.push(order)
        })
      }
      return orders
    },

    createPurchase() {
      axios.post('/api/purchases',
        {
          "orders": this.generateOrders(),
          "address": `${this.shippmentAddress.streetName} ${this.shippmentAddress.streetNumber},  ${this.shippmentAddress.locality}, ${this.shippmentAddress.province}`,
          "zipCode": this.shippmentAddress.zipCode,
          "totalAmount": this.sumPriceProd(),
          "typePayment": "DEBIT"
        }
        , { headers: { 'content-type': 'application/json' } })
    },

    cardTransactionCredit() {
      Swal.fire({
        title: 'Quieres realizar la transaccion?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          
          axios.post('https://homebankingapplication.herokuapp.com/api/cardTransaction', {
            "cardType": "CREDIT",
            "amount": this.sumPriceProd(),
            "cardNumber": "1111-1111-1111-1111",
            "cardHolder": "Melba Morel",
            "cvv": "666",
            "thruDate": "23/05/2022",
            "description": "prueba description"
          },
            { headers: { "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "OPTIONS,POST,GET" } })
            .then(() =>
              Swal.fire('Transferido!', '', 'success')).then(this.createPurchase()).then(this.downloadFile()).then(this.emptyCart())
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: error.response.data,
                timer: 2000,
              })
            })
        }
      })
    },
    async isLogged(){
      try{
        const {data} = await axios.post(`/api/clients/current`)

      }catch(error){
        console.log(error)
      }
    },

    sumPriceProd() {
      this.subtotalCart = 0
      this.cartStorage.forEach(product => {
        this.subtotalCart += (product.price * product.quantity)
      })
      return this.subtotalCart
    },


    logOut() {
      axios.post('/api/logout')
        .then(response => setTimeout(() => {
          window.location.href = './index.html'
        }, 1000))
    },

  },
  computed: {
    sumPriceShipping() {
      if (this.subtotalCart < 20000) {
        this.totalPurchase = (this.subtotalCart + this.shippingPrice)
      } else if (this.subtotalCart > 20000) {
        this.totalPurchase = this.subtotalCart
      }
      return this.totalPurchase
    },
    sumPrice() {
      this.subtotalCart = 0
      this.cartStorage.forEach(product => {
        this.subtotalCart += (product.price * product.quantity)
      })
      return this.subtotalCart
    },
  },
}).mount('#app')

