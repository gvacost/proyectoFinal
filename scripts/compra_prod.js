let imgprod_arr = ['images/aceitenatura.webp','images/lucchetti-arroz.webp','images/lucchetti-tallarin.webp','images/lucchetti-tirabuzon.webp','images/pure-tomate.webp',
    'images/pureza-3ceros.webp','images/pureza-4ceros.webp','images/pureza-leudante.webp','images/tomate-triturado.webp'];
let precios_prod = [1500, 1900, 1200, 1200, 700, 800, 1000, 1100, 2400];
let nom_prod = ['Aceite Natura','Arroz Lucchetti','Tallarin Lucchetti','Tirabuzon Lucchetti','Pure de Tomate Vigente','Harina Pureza 000',
    'Harina Pureza 0000','Harina Pureza Leudante','Tomate Triturado Botella'];
let stock_prod =[15, 13, 24, 20, 30, 17, 19, 21, 25];
let stock_inicial = [15, 13, 24, 20, 30, 17, 19, 21, 25];

let lista =[];
let precios = [];
let cantProducto = [];



function getProductos(){

    for(let i =0; i<imgprod_arr.length; i++){
        let productos = document.querySelector('.productos')
        let article = document.createElement('article');

        let imagen_prod = document.createElement('img');
        imagen_prod.src = imgprod_arr[i];
        imagen_prod.alt = nom_prod[i];
        article.appendChild(imagen_prod);

        let nombre_u = document.createElement('h3');
        nombre_u.innerHTML = nom_prod[i];
        article.appendChild(nombre_u)

        let precio_unidad = document.createElement('h4');
        precio_unidad.innerHTML = '$'+ precios_prod[i];
        article.appendChild(precio_unidad);

        let stock = document.createElement('h4');
        stock.className = 'stock';
        stock.innerHTML = 'Stock Disponible ' + stock_prod[i];
        article.appendChild(stock);

        let cantidad = document.createElement('input'); //se crea el input para la cantidad de productos comprados
        cantidad.type = 'number';               //se especifica el tipo de variable
        cantidad.min = 0;                       //se determina el valor minimo que puede tener
        cantidad.value = 0;                     //seria el valor inicial
        cantidad.readOnly = true;               //esto es para que no se pueda modificar desde el input, solo con los botones que se ven mas abajo
        article.appendChild(cantidad);

        let button_add = document.createElement('button');      //se crea boton que aumenta la cantidad solicitada
        button_add.innerHTML = '+'
        article.appendChild(button_add);
        
        let button_rem = document.createElement('button');      //boton para disminuir la cantidad solicitada
        button_rem.innerHTML = '-'
        article.appendChild(button_rem);

        button_add.addEventListener('click', ()=> {                 //al boton creado le aplicamos un evento al hacer click y hace correr 
            let cantActual = parseInt(cantidad.value);              //la funcion creada que aumenta la cantidad solicitada y llama la 
            if (stock_prod[i] > 0) {                                //funcion que actualiza el stock para que automaticamente se acomode
                stock_prod[i] -= 1;
                cantidad.value = cantActual +1;
                actualizarStock(i);
            
        } else {                                                  //esa funcion usa el parametro del indice y el valor de la cantidad de productos comprados
            alert('El stock no es suficiente') ;                //en caso de que se llegue al stock=0, salta el mensaje de alerta
        }
        });

        button_rem.addEventListener('click', ()=>  {            //similar al boton anterior pero este reduce la cantidad comprada
            let cantActual = parseInt(cantidad.value, 10);      //y al actualizar el stock este sube hasta el limite del stock original
            if (cantActual > 0) {
                stock_prod[i] += 1;
                cantidad.value = cantActual - 1;
                actualizarStock(i);
            } 
        });

        let buttonCompra = document.createElement('button');        // boton para agregar lo solicitado a la compra
        buttonCompra.innerHTML = 'Comprar';
        article.appendChild(buttonCompra);

        buttonCompra.addEventListener('click', () =>{               //el evento al clickear la compra llama a la funcion compra
            let cantActual = parseInt(cantidad.value, 10);          
            if (cantActual==0){                                     //determina la cantidad de unidades a comprar, si es cero tira el alerta
                alert('Debe agregar unidades')
            }else{
            compraFinal(i, parseInt(cantidad.value))    
            }
        });

        productos.append(article);
    }
};
let listado = document.querySelector('.listadoCompra');

function compraFinal(i, cantidadFinal){
    let isInList = lista.indexOf(nom_prod[i]); //aca con el indexOF da el indice del nombre del producto y lo asignamos a la variable isInList

    if(isInList === -1){  //Si no esta en la lista va a dar -1, por lo que se procede a pushear cada dato correspondiente
        lista.push(nom_prod[i]);
        precios.push(precios_prod[i]);
        cantProducto.push(cantidadFinal);

        let agregado = document.createElement('li'); //se crea un li para cada compra
        agregado.id = 'item-' + nom_prod[i];   //el ponerle el id de esta forma hace que sea personalizado para poder comparar si ya esta en la lista de compra
        agregado.innerText = nom_prod[i] + ' x' + cantidadFinal + ' $' + (precios_prod[i] * cantidadFinal); //se agregan los datos del producto comprado, nombre, cantidad y precio
        listado.appendChild(agregado);
    } else {                                             //en caso de que el producto este en la lista, es decir isInList >=0
        cantProducto[isInList] = cantidadFinal;         // se actualiza la cantidad del producto en la primer linea del else
        let agregado = document.getElementById('item-' + nom_prod[i]);      //se asocia la variable agregado al producto que tenga el id correspondiente
        agregado.innerText = nom_prod[i] + ' x' + cantidadFinal + ' $' + (precios_prod[i] * cantidadFinal);  //se actualiza la lista con el producto y cantidad correspondiente
    }

    precio()
}


function precio(){
    let precioFinal = 0;

    for (let i = 0; i < lista.length; i++) {
        precioFinal += cantProducto[i] * precios[i]; //se va actualizando el precio total de la compra con cada producto que se agrega
    }

    let final = document.getElementById('precioFinal');
    if (!final) {                                       
        final = document.createElement('li');           //actualiza el precio final, reescribiendo el li existente, de lo contrario
        final.id = 'precioFinal';                       //se generan li de precio con cada producto agregado
    }
    final.innerText = 'Precio Final -- $' + precioFinal;
    listado.appendChild(final);

}

function actualizarStock(i) {           //el nombre de la funcion especifica que hace la misma
    document.querySelectorAll('.productos article')[i].querySelector('.stock').innerHTML = 'Stock Disponible ' + stock_prod[i];
};

getProductos();




