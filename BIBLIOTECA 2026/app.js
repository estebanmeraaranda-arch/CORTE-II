// app.js

/**
 * Función requerida por las instrucciones.
 * Recibe un array, extrae el nombre, añade 'Carné de socio' al inicio, y el nombre al final.
 */
function procesarSolicitud(solicitud) {
    // 1. Extraer nombre (el primer elemento del array)
    let nombre = solicitud.shift();
    
    // 2. Añadir 'Carné de socio' al inicio
    solicitud.unshift('Carné de socio');
    
    // 3. Añadir el nombre al final
    solicitud.push(nombre);
    
    return solicitud;
}

let recordCounter = 0;

// Event Listener para el botón principal
document.getElementById('processBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('userName').value.trim();
    const booksInput = document.getElementById('bookList').value;
    
    const nombre = nameInput || 'Usuario Anónimo';
    
    // Separamos los libros por coma, quitamos espacios extra y filtramos valores vacíos
    const libros = booksInput 
        ? booksInput.split(',').map(libro => libro.trim()).filter(libro => libro !== '') 
        : [];
    
    // Construimos el array inicial con el nombre en la posición 0
    let arregloInicial = [nombre, ...libros];
    
    // Pasamos el array por nuestra lógica de la biblioteca
    let arregloModificado = procesarSolicitud(arregloInicial);
    
    // Incrementamos el contador
    recordCounter++;

    // Elemento contenedor en el DOM
    const resultContainer = document.getElementById('resultContainer');
    
    // Contenedor individual para esta solicitud en el historial
    const requestBlock = document.createElement('div');
    requestBlock.className = 'result-item'; // Clase que da el estilo de sub-bloque

    // Encabezado del bloque
    const requestHeader = document.createElement('span');
    requestHeader.className = 'record-id';
    requestHeader.textContent = `Registro #${recordCounter}`;

    // Contenedor de etiquetas
    const tagsGroup = document.createElement('div');
    tagsGroup.className = 'tag-container';
    tagsGroup.style.marginTop = '0'; // Anular margen superior para el historial
    
    // Iteramos sobre el array modificado
    arregloModificado.forEach(item => {
        // Creamos <span> individual por cada elemento con clase .tag
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = item;
        
        // Inyectamos dentro del grupo de etiquetas
        tagsGroup.appendChild(span);
    });

    // Armar el bloque de solicitud
    requestBlock.appendChild(requestHeader);
    requestBlock.appendChild(tagsGroup);

    // Añadir al historial (al inicio para que los recientes salgan primero)
    resultContainer.prepend(requestBlock);

    // Limpiar los campos del formulario
    document.getElementById('userName').value = '';
    document.getElementById('bookList').value = '';
});
