$('document').ready(function(){

    // Variables
    const listaProductos = $('#lista-productos');
    const contenedorCarrito = $('#listaCarrito tbody');
    const totalAPagar = $('#carrito__totalAPagar');
    const carritoCantidad = $('.carrito__cantidad');
    const carrito = $('#carrito__contenido');
    const vaciarCarritoBtn = $('#vaciar-carrito');
    const comprarCarritoBtn = $('#comprar-carrito'); 
    
    //Clase constructora del Carrito
    class Carrito {

        constructor() {
            this.articulosCarrito = []; 
        }

        agregar(infoProducto){
            const existeProducto = this.articulosCarrito.some(producto => producto.id === infoProducto.id);
            if(existeProducto){ 
                const productos = this.articulosCarrito.map(producto => {
                    if(producto.id === infoProducto.id) {
                        producto.cantidad++;
                        return producto;
                    } else {
                        return producto;
                    }
                });
                this.articulosCarrito = [...productos];
            } else {
                this.articulosCarrito = [...this.articulosCarrito, infoProducto];
            }
            this.guardarLS();
        }

        quitar(id) {
            const indice = this.articulosCarrito.findIndex(p => p.id === id);
            if (indice != -1) {
                this.articulosCarrito.splice(indice, 1);
                this.guardarLS();
            }
        }

        guardarLS() {
            localStorage.setItem('carrito', JSON.stringify(this.articulosCarrito));
        }    

        obtenerLS() {
            this.articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [] ;
        }
        
        obtenerConteo(){
            return this.articulosCarrito.length;
        }
    
        calcularPrecioTotal(){
            this.total = 0;
            this.articulosCarrito.forEach( producto => {
                let totalItem = producto.precio.replace('$', '') * producto.cantidad;
                this.total = this.total + totalItem;
            }); 
            totalAPagar.html(`Total a Pagar: $${this.total}`);
          
        }

        vaciar(){
            return this.articulosCarrito = [];
        }

        procesarPedido(){
            if(this.articulosCarrito.length === 0){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'El carrito esta vacio!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else{
                location.href = "compra.html"
            }
        }
    }

    const miCarrito = new Carrito();

    //Eventos
    cargarEventos();

    function cargarEventos(){   
        listaProductos.on('click', agregarProducto);
        carrito.on('click', eliminarProducto);
        vaciarCarritoBtn.on('click', vaciarCarrito);
        comprarCarritoBtn.on('click', finalizarPedido);
    }

    miCarrito.obtenerLS();
    carritoCantidad.html(miCarrito.obtenerConteo());
    renderizarCarrito();


    //Funciones
    //Añadir el producto al carrito
    function agregarProducto(e){
        e.preventDefault();

        if(e.target.classList.contains('producto__btnAgregarCarrito')){
            const productoSeleccionado = e.target.parentElement.parentElement;

            const objetoProducto = datosProducto(productoSeleccionado);
            miCarrito.agregar(objetoProducto);

            carritoCantidad.html(miCarrito.obtenerConteo());
            renderizarCarrito();
        }
    }

    //Datos del producto
    function datosProducto(producto){
    const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('a').getAttribute('data-id'), 
            cantidad: producto.querySelector('input').value,
        }
        return infoProducto;
    } 

    //Renderizar productos en el carrito
    function renderizarCarrito(){
        
        contenedorCarrito.empty();
    
        miCarrito.articulosCarrito.forEach((producto) => {
            const {imagen, titulo, precio, cantidad, id} = producto;
            contenedorCarrito.append( `
            <tr>  
                <td>  
                    <img src="${imagen}" width=100>
                </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>$${precio.replace('$', '') * cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${id}">x</a>
                </td>
            </tr>
            `);  
        });
    
        miCarrito.guardarLS();
        miCarrito.calcularPrecioTotal();
    }


    // Eliminar el producto del carrito
    function eliminarProducto(e){
        e.preventDefault();

        if(e.target.classList.contains('borrar-producto')){
            const productoId = e.target.getAttribute('data-id');
            miCarrito.quitar(productoId);

            carritoCantidad.html(miCarrito.obtenerConteo());
            renderizarCarrito();  
        }   
    }
    

    // vaciar carrito
    function vaciarCarrito(){       
        miCarrito.vaciar();
        carritoCantidad.html(miCarrito.obtenerConteo());
        renderizarCarrito();  
        localStorage.clear();
    }

    
    //Procesar pedido
    function finalizarPedido(e){
        e.preventDefault();
        miCarrito.procesarPedido();
    }


    //Modal Agregar Producto
    $(".modal__open").on("click", function(){
        Swal.fire({
            position: 'bottom-end',
            width: '30rem',
            icon: 'success',
            title: '¡Producto agregado al Carrito!',
            showConfirmButton: false,
            timer: 1500
        })
    });

});