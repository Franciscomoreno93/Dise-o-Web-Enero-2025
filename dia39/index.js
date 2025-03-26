const btnContenido1 = document.getElementById('btnContenido1');
        const btnContenido2 = document.getElementById('btnContenido2');
        const contentDiv = document.getElementById('contentDiv');
        
        // Función para cargar contenido desde un archivo HTML
        async function cargarContenido(archivo) {
            try {
                // Añadir clase de carga y mostrar mensaje
                contentDiv.classList.add('loading');
                contentDiv.innerHTML = '<p>Cargando contenido...</p>';
                
                // Hacer la petición fetch
                const respuesta = await fetch(archivo);
                
                // Comprobar si la respuesta es correcta
                if (!respuesta.ok) {
                    throw new Error(`Error al cargar ${archivo}: ${respuesta.status} ${respuesta.statusText}`);
                }
                
                // Obtener el texto del archivo
                const contenido = await respuesta.text();
                
                // Actualizar el contenido del div
                contentDiv.innerHTML = contenido;
            } catch (error) {
                // Mostrar mensaje de error
                contentDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                console.error(error);
            } finally {
                // Quitar clase de carga
                contentDiv.classList.remove('loading');
            }
        }
        
        // Añadir event listeners a los botones
        btnContenido1.addEventListener('click', () => {
            cargarContenido('c1.html');
        });
        
        btnContenido2.addEventListener('click', () => {
            cargarContenido('c2.html');
        });