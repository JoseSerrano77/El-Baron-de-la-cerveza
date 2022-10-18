

let divCervezas = document.getElementById("productos")

///FUNCION MOSTRAR CATALOGO
function mostrarCatalogo(array){
  
  divCervezas.innerHTML = ""
  array.forEach((marca)=>{
      let nuevaCerveza = document.createElement("div")
      nuevaCerveza.innerHTML = `<div id="${marca.id}" class= "card " style="width: 18rem;">
                                        <img class="card-img-top img-fluid" style="height: 250px;" src="assets/img/${marca.imagen}" alt="${marca.marca} de ${marca.tipo}">
                                        <div class="card-body">                                   
                                            <h4 class="card-title ">${marca.marca}</h4>
                                            <p class="tipoCervCard">Tipo: ${marca.tipo}</p>
                                            <p class="tipoCervCard">Volumen: ${marca.volumen}</p>
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



  
  
  ///FUNCION OCULTAR CATALOGO
  function ocultarCatalogo(){
    divCervezas.innerHTML = ""
  }


//FUNCION PARA BUSCAR PRODUCTOS
 function buscar() {
// ocultarCatalogo();
let inputCerv = document.getElementById("imputCerveza")
 let buscarCerv = deposito.filter((cervesa) => cervesa.tipo.toLowerCase().includes(inputCerv.value.toLowerCase()) || cervesa.marca.toLowerCase().includes(inputCerv.value.toLowerCase()) 
  || cervesa.formato.toLowerCase().includes (inputCerv.value.toLowerCase()) );
 
if (buscarCerv.length == 0 ) {

  Swal.fire({

    title: "No hay resultado para su busqueda",
    // themes: "dark",
    confirmButtonText:"Volver",
    confirmButtonColor: '#212529',
     width:` 35em`,
     
  })
  ocultarCatalogo(deposito)
} 
else{
  
   for (let tipoEncontrado of buscarCerv) {
    
    //  tipoEncontrado.infoCerveza();///////se muestra en consola///
    mostrarCatalogo(buscarCerv)
   }
  // mostrarCatalogo(buscarCerv)
}
}

///BOTON BUSCAR
let btnBuscar2 = document.getElementById("btnBuscarT")
  //  btnBuscar2.onclick =  buscar()

  btnBuscar2.addEventListener("click", ()=>{
     buscar()
})
 

//BOTON MOSTRAR CATALOGO
let btnMostrarCatalogo = document.getElementById("verBusqueda")
  btnMostrarCatalogo.addEventListener("click", ()=>{
      mostrarCatalogo(deposito)
  })


//BOTON OCULTAR CATALOGO
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
  btnOcultarCatalogo.onclick = ocultarCatalogo




  ///BOTON MOSTRAR ELEMENTOS CARRITO
  let botonCarrito = document.getElementById("botonCarrito")
  botonCarrito.addEventListener("click",()=>{
    cargarProductosCarrito(miCarrito)
  })

  
  //DOM
  let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
  let modalBody = document.getElementById("modal-body")
  let parrafoCompra = document.getElementById('precioTotal')



///FUNCION AGREGAR PRODUCTOS AL CARRITO
function agregarCarrito(array){
  miCarrito.push(array)
 
  localStorage.setItem("miCarrito",JSON.stringify(miCarrito))
 
  }

  
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
    
    
    } 


    
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
      

       mostrarCatalogo(deposito)