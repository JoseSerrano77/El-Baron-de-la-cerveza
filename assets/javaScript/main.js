

let divCervezas = document.getElementById("productos")

///FUNCION MOSTRAR CATALOGO
function mostrarCatalogo(array){
 
  divCervezas.innerHTML = ""
  array.forEach((marca)=>{
      let nuevaCerveza = document.createElement("div")
      nuevaCerveza.innerHTML = `<div id="${marca.id}" class= "card " style="width: 15rem;">
                                        <img class="card-img-top img-fluid" style="height: 250px " src="assets/img/${marca.imagen}" alt="${marca.marca} de ${marca.tipo}">
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
      let inputCerv = document.getElementById("imputCerveza").value;
      let buscarCerv = deposito.filter((cervesa) => cervesa.tipo.toLowerCase().includes(inputCerv.toLowerCase()) || cervesa.marca.toLowerCase().includes(inputCerv.toLowerCase()) );
      
      if (buscarCerv.length == 0 ) {

        Swal.fire({

                  title: "No hay resultado para su busqueda",
                  // themes: "dark",
                  confirmButtonText:"Volver",
                  confirmButtonColor: '#212529',
                  width:` 35em`,
                  })
        // ocultarCatalogo(deposito)
        document.getElementById("imputCerveza").value= ""
      } 
      else{
        
       
          mostrarCatalogo(buscarCerv)
        
        
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





///FUNCION AGREGAR PRODUCTOS AL STORAGE DEL CARRITO
function agregarCarrito(array){
 
    let cervezaAgregada = miCarrito.find((elem)=> (elem.id == array.id))
 
    if(cervezaAgregada == undefined){
      
      miCarrito.push(array)
       localStorage.setItem("miCarrito",JSON.stringify(miCarrito));
       
       const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        })
        Toast.fire({
        icon: 'success',
        iconColor:`#198754`,
        title: 'Producto agregado al carrito'
        })

        contadorCarrito.innerText = miCarrito.length 
        // console.log(miCarrito.length )
        botonCarrito.style.backgroundColor = "#09e014";
        // carritoCounter();
      }
  
      else{
       
          Swal.fire({
              title: "Producto en Carrito",
              text: `Este producto ya se encuentra en el carrito`,
              icon: "info",
              iconColor: '#198754',
              timer:2500,
              confirmButtonText:"Aceptar",
              confirmButtonColor:  '#212529',
              width:` 30em`,
          })
      }
  }
  
  // }
 
 
  
  
  // ///BOTON CARRITO
  let botonCarrito = document.getElementById("botonCarrito")
  
  botonCarrito.addEventListener("click",()=>{
    cargarProductosCarrito(miCarrito)
  })
 
////FUNCION-PARA CARGAR ELEMENTOS DEL CARRITO

let modalBody = document.getElementById("modalCarrito")


  function cargarProductosCarrito(array){
    
    modalBody.innerHTML ="" //hace que empiece por defecto en cero, ya que lo vamos a apretar muchas veces
    array.forEach((productoCarrito)=>{ //por cada iteracion se va ir sumando al modalBody
      // const {id, marca, tipo, formato, volumen, precio,imagen, contador} = productoCarrito
      
      let cervezaEnCarrito = document.createElement("div")
      cervezaEnCarrito .innerHTML += `
      <div   id ="productoCarrito${productoCarrito.id}" >
      <div class="parent">
      <img  class="imgCerv" style="height: 200px " src="./assets/img/${productoCarrito.imagen}"alt="${productoCarrito.marca} de ${productoCarrito.tipo}">
               <div class="card-body"> 
                <h4 class="card-title">${productoCarrito.marca}</h4>
                <p class="tipoCervCard"> Tipo: ${productoCarrito.tipo}</p> 
                <p class="precioCard "> Precio: $${productoCarrito.precio}</p> 
                
                <button class= "btn btn-danger trash" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt" > </i></button>
              </div>    
      
       </div> 
       </div> `
      
       modalBody.append(cervezaEnCarrito)
      
                        //BOTON ELIMINAR
                      let btnEliminar = document.getElementById(`botonEliminar${productoCarrito.id}`)
                      let idCarrito = productoCarrito.id
     
                      ///ELIMINAR DE CARRITO
                        btnEliminar.addEventListener("click", ()=>{
                          let productosIndex = miCarrito.findIndex(element => element.id == idCarrito)
                          miCarrito.splice( productosIndex, 1)
                          console.log(productosIndex)
                          localStorage.setItem("miCarrito",JSON.stringify(miCarrito))
                          console.log(miCarrito)
                          //  alert ("ok")
                           cargarProductosCarrito(miCarrito)
                       
                          
                          contadorCarrito.innerText = miCarrito.length
                          // carritoCounter();

                          if (miCarrito.length==0){
                  
                            botonCarrito.style.backgroundColor = " hwb(0 30% 69%)";
                                  }
                          

                                  })
       
    }) //FIN FOREACH
    

                  //BOTON FINALIZAR        
                  botonFinalizarCompra.addEventListener("click", ()=>{
                    
                    if (miCarrito.length>=1){
                  
                              
                      Swal.fire({
                        title: '¿Desea finalizar su compra?',
                        icon: 'info',
                        iconColor: '#198754',
                        showCancelButton: true,
                        confirmButtonText: 'Si',
                        cancelButtonText: 'No',
                        confirmButtonColor: '#212529',
                        cancelButtonColor: 'red',
                    }).then((resultado)=>{
                              if(resultado.isConfirmed){
                                  
                                  miCarrito = []
                                  localStorage.removeItem("miCarrito")
                                  contadorCarrito.innerText ="0"
                                   botonCarrito.style.backgroundColor = " hwb(0 30% 69%)";
                                  cargarProductosCarrito(miCarrito)
                                  
                                  
                                  Swal.fire({
                                  icon: 'success',
                              iconColor:`#198754`,
                               timer:2500,
                            confirmButtonColor:  '#212529',
                            title:'Su compra fue realizada',
                                  })        
                              }
                                  else{
                                      Swal.fire({
                                          title: 'Compra no realizada',
                                          icon: 'info',
                                          iconColor:`#198754`,
                                          text: `Gracias por su compra.`,
                                          confirmButtonColor: '#212529',
                                          timer:2500
                                      })
                                  }
                    })
                  } // FIN IF miCarrito.lenght
                              })
                             
    totalCarrito(array) /// Le asignamos el array del carrito
    
    }

// FIN-FUNCION-PARA CARGAR ELEMENTOS AL CARRITO///////



    ///FUNCION CALCULAR TOTAL CARRITO/
        let parrafoCompra = document.getElementById('precioTotal')
        function totalCarrito (array){
        let acumCompra = 0
      
        acumCompra = array.reduce((acumCompra,productoCarrito)=>{
        return acumCompra + productoCarrito.precio}, 0)////EMPIEZA DESDE 0
        acumCompra == 0?  parrafoCompra.innerHTML = `<strong>No hay productos en tu carrito.</strong>`: parrafoCompra.innerHTML = `<strong>Total de su compra: $${acumCompra}</strong>`
    
    
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