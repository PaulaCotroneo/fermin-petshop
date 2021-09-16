$('document').ready(function(){
    
    // Variables
    const listaProductos = $('#lista-productos');


    //Cargar los productos en el DOM
    renderizarProductos();

    function renderizarProductos(){
        productosDatos.map((item) => {
            listaProductos.append( 
                    `<div class="producto">
                        <img class="producto__imagen" src=${item.imagen} alt=${item.descripImagen}/> 
                        <div class="producto__informacion"> 
                            <h4>${item.nombre}</h4>  
                            <p>Fermín ${item.categoria}</p>  
                            <label>Cantidad:</label>
                            <input type="number" min="1" value="1" value=${item.cantidad}></input>
                            <div class="producto__precio">  
                                <p class="precio">$${item.precio}</p>  
                                <p class="oferta">$${item.oferta}</p> 
                            </div>  
                        <a href="#" class="producto__btnAgregarCarrito modal__open" data-id= ${item.id}>Agregar Al Carrito</a>  
                    </div>`
            );       
        });
    }

     
    //Ajax
    const URL = 'https://jsonplaceholder.typicode.com/comments?postId=1';

    $.get(URL, function(response, status) {

        if (status === 'success') {
            for (const data of response) {
                $('.testimonios').append(`  
                    <div class="cliente">
                        <div class="cliente__informacion">
                            <p>${data.body}</p>
                            <h4>${data.email}</h4>
                        </div>
                    </div>`)
            }
        } 
    });

    
    //Animacion Scroll Secciones
    $('#navegacion__nosotros').click(function(e){
        e.preventDefault();
    
        $('html, body').animate({
            scrollTop: $('#nosotros').offset().top
        }, 1000);
    });

    $('#navegacion__tienda').click(function(e){
        e.preventDefault();
    
        $('html, body').animate({
            scrollTop: $('#tienda').offset().top
        }, 1500);
    });

    $('#navegacion__contacto').click(function(e){
        e.preventDefault();
    
        $('html, body').animate({
            scrollTop: $('#contacto').offset().top
        }, 2000);
    });
    
});
