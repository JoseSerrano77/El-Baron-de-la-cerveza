/////// CLASE CONSTRUCTORA/////////////////////////////
class Cerveza {
    constructor(id, marca, tipo, formato, volumen, precio,imagen) {
        this.id = id,
        this.marca = marca,
        this.tipo = tipo,
        this.formato = formato,
        this.volumen = volumen,
        this.precio = precio,
        this.imagen = imagen
    }
  
    infoCerveza() {
      console.log(
        `Cervesa: ${this.id}, Marca: ${this.marca} ,Tipo: ${this.tipo} , Formato:${this.formato} ,Volumen:${this.volumen} , Precio: ${this.precio}`
      ); //////METODO///////////////////////////
    }
  }

   const deposito = []
 
  
const cargarTienda = async() =>{
    const response = await fetch("./assets/javaScript/cervezas.json")
    const data = await response.json()
    console.log(data)


    for (let cerveza of data){
        let productoNuevo = new Cerveza (cerveza.id, cerveza.marca, cerveza.tipo, cerveza.formato, cerveza.volumen, cerveza.precio)
        deposito.push(productoNuevo)
    }
    localStorage.setItem("deposito", JSON.stringify(deposito) )
    
}

cargarTienda()

/////INICIALIZACION ARRAY PARA GUARDAR PRODUCTOS EN EL CARRITO////////////////////////
let miCarrito = JSON.parse(localStorage.getItem("miCarrito")) || []


localStorage.getItem("deposito") ? deposito = JSON.parse(localStorage.getItem("deposito")) : cargarTienda()

