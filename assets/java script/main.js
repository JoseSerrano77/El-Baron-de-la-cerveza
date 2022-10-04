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

//////////////////OBJETOS////////////////////////////

const cervesa1 = new Cerveza("H1", "Heineken", "Lager", "porron", "330ml", 220,"HeinekenLager473.jpg");

const cervesa2 = new Cerveza("H2", "Heineken", "Lager", "lata", "473ml", 260,"HeinekenLager473.jpg");

const cervesa3 = new Cerveza("H3", "Heineken", "Lager", "lata", "710ml", 420,"HeinekenLager710.jpg");

const cervesa4 = new Cerveza("G1", "Grolsch", "Ipa", "lata", "473ml", 280,"grolschlPilsnerr473.jpg"); ///lager

const cervesa5 = new Cerveza("G2", "Grolsch", "Lager", "porron", "450", 1540,"grolschlPilsnerr473.jpg");

const cervesa6 = new Cerveza( "I1", "Imperial Golden", "lager","lata", "710",220,"imperialgolden710.jpg");

const cervesa7 = new Cerveza("I2", "Imperial", "Lager", "lata", "473", 220,"imperialLager473.jpg");

const cervesa8 = new Cerveza("I3", "Imperial", "Ipa", "lata", "473", 230,"imperialIPA473.jpg");

const cervesa9 = new Cerveza("I4", "Imperial ", "Apa", "lata", "473", 220,"imperialApa473.jpg");

const cervesa10 = new Cerveza("I5","Imperial", "amberLager", "lata","473",220,"imperialAmberLager2473.jpg");

const cervesa11 = new Cerveza("I6", "Imperial", "Roja", "lata", "473", 220,"imperialRoja473.jpg");

const cervesa12 = new Cerveza("I7","Imperial","Cream Stout","lata","473", 250,"imperialCreamStout473.jpg");


/////INICIALIZACION ARRAY PARA GUARDAR PRODUCTOS EN EL CARRITO////////////////////////
////////// UTILIZO OPERADOR OR/////////////////CAPTURA O ASIGNA ARRAY VACIO SI ES FALSY
let miCarrito = JSON.parse(localStorage.getItem("miCarrito")) || []


/////INICIALIZACION ARRAY DEPOSITO////////////////////////
const deposito = [];
deposito.push(cervesa1,cervesa2,cervesa3,cervesa4,cervesa5,cervesa6,cervesa7,cervesa8,cervesa9,cervesa10,cervesa11,cervesa12);
localStorage.setItem("deposito",JSON.stringify(deposito)) /////////////JSON///////////
console.log(deposito); //OK
////////////////////////////////////////////////////////////////////////////////////////////////////




///FUNCION AGREGAR PRODUCTOS AL CARRITO
function agregarCarrito(array){
miCarrito.push(array)
// console.log(miCarrito)
localStorage.setItem("miCarrito",JSON.stringify(miCarrito))
// console.log(miCarrito); //OK

}


///FUNCION OCULTAR CATALOGO
function ocultarCatalogo(){
  divCervezas.innerHTML = ""
}////////////////////////////////////////////////preventdefault investigar

let divCervezas = document.getElementById("productos")

///FUNCION MOSTRAR CATALOGO
function mostrarCatalogo(array){
  
  divCervezas.innerHTML = ""
  array.forEach((marca)=>{
      let nuevaCerveza = document.createElement("div")
      nuevaCerveza.innerHTML = `<div id="${marca.id}" class= "card " style="width: 18rem;">
                                        <img class="card-img-top img-fluid" style="height: 250px;" src="./assets/img/${marca.imagen}"alt="${marca.marca} de ${marca.tipo}">
                                        <div class="card-body">                                   
                                            <h4 class="card-title ">${marca.marca}</h4>
                                            <p class="tipoCervCard">Tipo: ${marca.tipo}</p>
                                            <p class="precioCard ">Precio: $ ${marca.precio}</p>                                  
                                            <button id="agregarBtn${marca.id}" class="btn-donate" type="submit"   >Agregar al carrito</button>
                                        </div>
                                    </div>`
      divCervezas.append(nuevaCerveza)  

      let btnAgregarCarrito = document.getElementById(`agregarBtn${marca.id}`)/// de esta manera logramos que cada button tenga si id correspondiente.
                //  console.log(btnAgregarCarrito)
            
        //BOTON AGREGAR CARRITO
        btnAgregarCarrito.addEventListener("click", () =>{
        console.log(marca)
        agregarCarrito(marca)

        // SWEETALERT
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-center',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          
          
          
          })
          Toast.fire({
          icon: 'success',
          iconColor:`#198754`,
          title: 'Producto agregado al carrito'
          })
  

      })
    

  })

}





//FUNCION PARA BUSCAR PRODUCTOS
 function buscar() {
// ocultarCatalogo();
let inputCerv = document.getElementById("imputCerveza").value;
 let buscarCerv = deposito.filter(
  (cervesa) => cervesa.tipo.toLowerCase().includes (inputCerv.toLowerCase()) || cervesa.marca.toLowerCase().includes (inputCerv.toLowerCase()) 
  || cervesa.formato.toLowerCase().includes (inputCerv.toLowerCase()) );
  // (cervesa) => cervesa.tipo.toLowerCase() == inputCerv.toLowerCase() || cervesa.marca.toLowerCase() == inputCerv.toLowerCase() || cervesa.formato.toLowerCase() == inputCerv.toLowerCase() );
//let buscarCerv = deposito.filter( (cervesa) => cervesa.tipo.toLowerCase().includes(imputCerv.value.toLowerCase()))

if (buscarCerv == 0 ) {

  Swal.fire({

    title: "No hay resultado para su busqueda",
    // themes: "dark",
    confirmButtonText:"Volver",
    confirmButtonColor: '#212529',
     width:` 35em`,
    
  
  })
 
} 
else{
  // console.log(`El resultado es el siguiente:`);
  // console.log(buscarCerv);
  for (let tipoEncontrado of buscarCerv) {
    tipoEncontrado.infoCerveza();///////se muestra en consola///
  }
  mostrarCatalogo(buscarCerv)
}
}



//BOTON MOSTRAR CATALOGO
let btnMostrarCatalogo = document.getElementById("verBusqueda")
  btnMostrarCatalogo.addEventListener("click", ()=>{
      mostrarCatalogo(deposito)
  })


//BOTON OCULTAR CATALOGO
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
  btnOcultarCatalogo.onclick = ocultarCatalogo

///BOTON BUSCAR
let btnBuscar2 = document.getElementById("btnBuscarT")
  // btnBuscar2.onclick =  buscar
  btnBuscar2.onclick = (e)=>{
    e.preventDefault()
    buscar()
  }


  ///BOTON MOSTRAR ELEMENTOS CARRITO
  let botonCarrito = document.getElementById("botonCarrito")
  botonCarrito.addEventListener("click",()=>{
    cargarProductosCarrito(miCarrito)
  })

  
  //DOM
  let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
  let modalBody = document.getElementById("modal-body")
  let parrafoCompra = document.getElementById('precioTotal')


////FUNCION-PARA CARGAR ELEMENTOS AL CARRITO
  function cargarProductosCarrito(array){
   
    modalBody.innerHTML ="" //hace que empiece por defecto en cero, ya que lo vamos a apretar muchas veces
    array.forEach((productoCarrito)=>{ //por cada iteracion se va ir sumando al modalBody

      let cervezaEnCarrito = document.createElement("div")
    
      // modalBody.innerHTML +=`
      cervezaEnCarrito .innerHTML += `
      <div class="card border-primary mb-3 " id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
          <img class="card-img-top" src="./assets/img/${productoCarrito.imagen}"alt="${productoCarrito.marca} de ${productoCarrito.tipo}">
              <div class="card-body">
                <h4 class="card-title">${productoCarrito.marca}</h4>
                <p class="tipoCervCard"> Tipo: ${productoCarrito.tipo}</p> 
                <p class="precioCard "> Precio: $${productoCarrito.precio}</p> 
                <button class= "btn btn-danger trash" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt" > </i></button>
              </div>    
      
       </div> `

       modalBody.append(cervezaEnCarrito)
      
      //BOTON ELIMINAR
    let btnEliminar = document.getElementById(`botonEliminar${productoCarrito.id}`)
    let id = productoCarrito.id
     
    ///ELIMINAR DE CARRITO
    btnEliminar.addEventListener("click", ()=>{
       let productosIndex = miCarrito.findIndex(element => element.id == id)
       miCarrito.splice( productosIndex, 1)
       console.log(productosIndex)
       localStorage.setItem("miCarrito",JSON.stringify(miCarrito))
       console.log(miCarrito)
      //  alert ("ok")
       cargarProductosCarrito(miCarrito)
    })
       
    })
    totalCarrito(array) /// Le asignamos el array del carrito
    }
// FIN-FUNCION-PARA CARGAR ELEMENTOS AL CARRITO///////


   

    ///FUNCION CALCULAR TOTAL CARRITO/
    function totalCarrito (array){
      let acumCompra = 0
      
      acumCompra = array.reduce((acumCompra,productoCarrito)=>{
        return acumCompra + productoCarrito.precio}, 0)////EMPIEZA DESDE 0

    acumCompra == 0?  parrafoCompra.innerHTML = `<strong>Tu carrito en este momento está vacío.</strong>`: parrafoCompra.innerHTML = `<strong>El total de la compra es: $${acumCompra}</strong>`
    //   if(acumCompra == 0){
    //     parrafoCompra.innerHTML = `<strong>Tu carrito en este momento está vacío.</strong>`
    //   }
    //   else{
    //   parrafoCompra.innerHTML = `<strong>El total de la compra es: $${acumCompra}</strong>`
     
    // }
    } 

    mostrarCatalogo(deposito)

    ///clase 13
    // Swal.fire({
    //   title: "prueba"
    // })

    // Toastify({
    //   text: "This is a toast",
    //   className: "info",
    //   style: {
    //     background: "linear-gradient(to right, #00b09b, #96c93d)",
    //   }
    // }).showToast();

    //LUXON
   const DateTime = luxon.DateTime 
    // console.log (DateTime)
    const fechaAhora = DateTime.now()
    console.log(fechaAhora)
    console.log(fechaAhora.year)
    console.log(fechaAhora.day)

      let divFechaHoy = document.getElementById("fechaHoy")
      let fecha = fechaAhora.toLocaleString (DateTime.DATE_FULL)
      divFechaHoy.innerHTML= `${fecha}`
      
