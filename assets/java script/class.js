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
  //  const cargarTienda = async() =>{
  //  fetch("cervezas.json")
  //  .then((res) => res.json())
  // .then((info) => {console.log(info)})


  
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
////////// UTILIZO OPERADOR OR/////////////////CAPTURA O ASIGNA ARRAY VACIO SI ES FALSY
let miCarrito = JSON.parse(localStorage.getItem("miCarrito")) || []


/////INICIALIZACION ARRAY DEPOSITO////////////////////////
// const deposito = [];

// deposito.push(cervesa1,cervesa2,cervesa3,cervesa4,cervesa5,cervesa6,cervesa7,cervesa8,cervesa9,cervesa10,cervesa11,cervesa12);
// localStorage.setItem("deposito",JSON.stringify(deposito)) /////////////JSON///////////
// console.log(deposito); //OK
////////////////////////////////////////////////////////////////////////////////////////////////////

localStorage.getItem("deposito") ? deposito = JSON.parse(localStorage.getItem("deposito")) : cargarTienda()


//Revisa si existe en el local y lo trae 

// if(localStorage.getItem("deposito")){
//   deposito = JSON.parse(localStorage.getItem("deposito"))
// }
// else{
//   console.log("Seteando por primera vez el array")
//   //Invoco la function async
//   cargarTienda()
// }
