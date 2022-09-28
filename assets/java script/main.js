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
  let carritoDeCompras = []



  /////INICIALIZACION ARRAY DEPOSITO////////////////////////
  const deposito = [];
  deposito.push(cervesa1,cervesa2,cervesa3,cervesa4,cervesa5,cervesa6,cervesa7,cervesa8,cervesa9,cervesa10,cervesa11,cervesa12);
  localStorage.setItem("deposito",JSON.stringify(deposito)) /////////////JSON///////////
  console.log(deposito); //OK
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let divCervezas = document.getElementById("productos")

//////////////////////////////////////////////////////////////////////////////////////////////
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
                   console.log(btnAgregarCarrito)
                   
        btnAgregarCarrito.addEventListener("click", () =>{
          console.log(marca)

          agregarCarrito(marca)

        })
      

    })

}



/////////////////////////////////////////////////////////////////////////////////////////////
function agregarCarrito(array){
  carritoDeCompras.push(array)
console.log(carritoDeCompras)

localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras)) /////////////JSON///////////
  console.log(carritoDeCompras); //OK

}


function ocultarCatalogo(){
    divCervezas.innerHTML = ""
}

///////////////////////////////////////////////////preventdefault investigar


/////////////////////////////////////////////////
function buscar() {
  ocultarCatalogo();
  
  let inputCerv = document.getElementById("imputCerveza").value;

   let buscarCerv = deposito.filter(
    (cervesa) => cervesa.tipo.toLowerCase() == inputCerv.toLowerCase() || cervesa.marca.toLowerCase() == inputCerv.toLowerCase() || cervesa.formato.toLowerCase() == inputCerv.toLowerCase() );

  //let buscarCerv = deposito.filter( (cervesa) => cervesa.tipo.toLowerCase().includes(imputCerv.value.toLowerCase()))

  console.log(buscarCerv);
  
 
  if (buscarCerv == 0 ) {
    Swal.fire('No hay resultados para su busqueda')
    // alert("No hay resultados para su busqueda");
    //imputCerv.value =""
  } 
  else {
    //alert("Puede visualizar  el resultado de su busqueda en la consola.");
    console.log(`El resultado es el siguiente:`);
    console.log(buscarCerv);

    for (let tipoEncontrado of buscarCerv) {
      tipoEncontrado.infoCerveza();///////se muestra en consola///
    }

    mostrarCatalogo(buscarCerv)
  }
 }




let btnMostrarCatalogo2 = document.getElementById("verBusqueda")


    btnMostrarCatalogo2.addEventListener("click", ()=>{
        mostrarCatalogo(deposito)
    })


//btn ocultar adjuntamos evento
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
    btnOcultarCatalogo.onclick = ocultarCatalogo


let btnBuscar2 = document.getElementById("btnBuscarT")
    btnBuscar2.onclick =  buscar




    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click",()=>{
      cargarProductosCarrito(carritoDeCompras)
    })

    
    let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
    

   
    let modalBody = document.getElementById("modal-body")

//////////////////////FUNCION-PARA CARGAR ELEMENTOS AL CARRITO////////////////////////////////////////////////////////////////////////////

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
        
        
      let btnEliminar = document.getElementById(`botonEliminar${productoCarrito.id}`)
      let id = productoCarrito.id
   
      btnEliminar.addEventListener("click", ()=>{
         let productosIndex = carritoDeCompras.findIndex(element => element.id == id)
     
         carritoDeCompras.splice( productosIndex, 1)
         console.log(productosIndex)
         localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras))
         console.log(carritoDeCompras)
         cargarProductosCarrito(carritoDeCompras)
      })
         
         
      })
      // alert(`cantidad ${array.length}`)/////////  puedo usar un modal para preguntar si esta seguro que desea eliminar
     
      // let itemsCarrito = document.getElementById("iconoCArrito")
      
      // console.log(itemsCarrito)
      totalCarrito(array) /// Le asignamos el array del carrito
      }
////////////////////// FIN-FUNCION-PARA CARGAR ELEMENTOS AL CARRITO////////////////////////////////////////////////////////////////////////////


      let parrafoCompra = document.getElementById('precioTotal')
      ////////////////////////CALCUALAR TOTAL CARRITO/////////////////
      function totalCarrito (array){
        let acumCompra = 0
        // console.log(array.length)
        // alert(`cantidad ${array.length}`)
        acumCompra = array.reduce((acumCompra,productoCarrito)=>{
          return acumCompra + productoCarrito.precio

        }, 0)////EMPIEZA DESDE 0

        // console.log(`el total de la compra es: ${acumCompra}`)

        if(acumCompra == 0){
          parrafoCompra.innerHTML = `<strong>Tu carrito en este momento está vacío.</strong>`
        }
        else{
        parrafoCompra.innerHTML = `<strong>El total de la compra es: $${acumCompra}</strong>`
       
      }


      } 

     