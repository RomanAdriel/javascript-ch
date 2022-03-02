# javascript-ch
Curso de Javascript de Coderhouse

# Flujo del Programa

1. Se realiza la carga de los datos del alumno en el form Datos de Alumno.
2. Al enviar el form, se instancia la clase Alumno y se actualizan todos los atributos con el contenido del mismo y, finalmente, se pushean a una lista que se utlizará para mostrar la información en pantalla.
3. Al enviar el form también se genera una key nueva en localStorage, que se consume en lugar del objeto de Alumno en caso de que no esté vacía (caso contrario, se instancia el Alumno desde cero y se genera una nueva lista).
4. Con cada submit del form, se muestra un `div`con el resultado de la aprobación del último alumno ingresado.
5. La botonera de ordenarmiento muestra el contenido de la lista de alumnos ordenados según el criterio que indica el botón. Una vez renderizada la lista, se pueda borrar con el botón pertinente.
6. En la sección `Listado de Alumnos Anteriores` se levanta una lista de manera asincrónica hardcodeada en db.json (esto se hace a través de un server mockeado usando `json-server`. Para ejecutar el servidor local, ejecutar `json-server --watch db.json`)
