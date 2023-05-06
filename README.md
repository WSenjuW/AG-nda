# AG-nda 
AG-nda es una aplicación Movil para android ( tipo calendario ), fue desarrollada con React-Native ( EXPO ), esta aplicación fue desarrollada con un fin de educativo, para plasmar nuevos conocimientos en un proyecto, por lo tanto no esta demasiado optimizada, intensare sacar otras versiones en un futuro, ahora me gustaría dejar unas aclaraciones importantes sobre app:

 - Tiene un almacenamiento local, por lo tanto no se puede guardar los datos de la app y pasar a otro dispositivo.
 - Los temas solamente son 2 Light y Dark (en un futuro agreguemos la opción de customizar temas ).
 - El lenguaje de la app actualmente es español pero el código de la app esta en ingles ("i'm sorry").
 - Al borrar los datos de la aplicación serán borrada todas las notas, deberías tenerlo en cuenta.

Por ahora es lo único que creo que es necesariamente saber antes de descargar la app, Espero que si la utilizas espero que te sea de utilidad y cualquier contribución u opinion siempre sera bien recibida, cualquiera puede usarla sin ningún costo, y esta prohibida su venta.


# Tecnical info

Next we will attach an image that represents the order of the components:
![bitmap](https://user-images.githubusercontent.com/93448122/234439807-907695ad-4615-4118-afa7-cc3abb64abb8.png)

## App
Este componente tiene una logica simple, solamente renderiza un componente `InfoContext` como padre y el componente `Principal` como hijo.

## InfoContext
  
  Este componente maneja una variable que se usa globalmente en toda la aplicación la cual atraves de un useContext se accede a un useReducer que almacena todas la notas de la app y también almacena la ubicación.
 
  - DataContext (useContext)
  - Info (UseReducer)

### Info
  
Es un objeto que tiene 3 propiedades:
  - notes (array con las notas)
  - themeIndex (el indice del tema elegido por el usuario)
  - themeList (array con la lista de temas)

Para modificar las propiedades del Reducer "Info" en cualquier caso siempre hay que llamar al un tipo de acción ya definida que es la que manipula el contenido del reducer.
 
 Para modificar la propiedad notes hay 3 acciones posibles AGREGAR, ACTUALIZAR , BORRAR; Para cualquiera de esas acciones se necesitas 2 elementos , primero llamar al tipo de acción y a su vez entregar un objeto con 2 propiedades:
  
 - oldItem ( elemento a modificar / "undefined" si es un nuevo elemento o si se va a eliminar una nota)
 - item (elemento modificado)

 Para modificar el tema, se llama al tipo de acción.
  
 ### Almacenamiento de datos
 
 Para guardar los datos usamos ASyncStorage 
 
 {{{				Contenido Sobre el guardado de datos 				}}}
 
 ## Principal
 
 Este componente es un poco mas complejo que el anteriormente, este componte almacena la vista principal de la app, En el mismo hay 2 estados y 2 llamados al contexto y una referencia:
 
 - modal( State )
 - showMenu( state )
 - info ( context )
 - drawerRef ( reference )
 
 
modal: la función de este estado es diferenciar la acción a seguir, si crear una nueva nota o si modificar una existente, si es una nota nueva, adquiere el estado 'undefined' , si se edita una nota modal adquiere un objeto con la información de una nota.
	
showMenu: tiene la función de interruptor para volver a renderizar el componente con el nuevo tema.


### Estructura retornada

A continuación explicaremos los elementos que se retornan en el componente, en orden descendente según su jerarquía de padre, hijo, etc:

  - `DrawerLayoutAndroid`: es el elemento con mayor jerarquía, el mismo es un elemento es nativo de ReactNative y en el mismo se encuentra el manejo del componente Menu de la app.
	
  - `View`(container): este elemento cumple la función de base para el resto de elementos retornados.
	
 - `StatusBar`: es un componente nativo de reactNative.
	
  - `BtnMenu`: este componente tiene la función de cambiar el estado "showModal" para que se pueda mostrar el componente Menu( mas abajo hay un apartado en el cual se habla de los botones de la app , este esta incluido).
	
   - `BtnAddNewNote`: este componente se encarga de cambiar el estado modal a "undefined" para que se cree una nota nueva ( mas abajo hay un apartado en el cual se habla de los botones de la app , este esta incluido).
	
  - `SafeAreaView`: este componente cumple la función de contenedor de las notas de la app, pero también la de informar sino hay ninguna nota, por eso dentro del mismo elemento hay un renderizado condicional que varia el resultado renderizado según la longitud del array con las notas dentro de info.
Dentro del mismo también se renderiza el componente ItemDate que es el elemento que representa cada nota.
	
  - `ModalComponent`: en este componente es en el único que se puede modificar las notas, crear o eliminar, el mismo tenia la función de ser un modal por esa razón el mismo esta presente en un renderizado condicional, si el estado modal tiene algún valor diferente a "null" se renderizara el componente.

	
	
	
	
	
	
	
## Menu
Este es un componente bastante simple, no usamos estados , pero hacemos un llamado al DataContext para poder acceder a la información el tema seleccionado actualmente.

### Estructura retornada
A continuación explicaremos los elementos que se retornan en el componente, en orden descendente según su jerarquía de padre, hijo, etc:
	
- `View` ( menuBox ) : este elemento funciona como base de componente menu para ubicar el resto de elementos en el componente Menu 
	
	- `TouchableOpacity` : es un elemento nativo de ReactNative, esta para darle la funcionalidad de click y funcionar a modo de botón personalizado.
	
	- `Text`: este texto muestra el tema seleccionado actualmente por el usuario.
	
	- `Text` ( infoDeveloped ) : este texto simplemente es para dar información sobre el desarrollador.

	
	
	
	
	
	
	
## ModalComponent

Este componente tiene 5 estados y una llamada al contextoGlobal. A continuación explicaremos la funciones de cada uno, pero dejaremos de lado a las referencias ya que solamente sirven almacenar valores para las animaciones del Componente( el llamado del use effect también es para el inicio de las animaciones apenas se renderice por primera vez el componente en pantalla).
Este componente al inicializarse tiene una validación importante la cual usa para diferenciar si tiene que crear una nueva nota o si tiene que actualizar una ya existente, para esto valida si la propiedad modal proveniente del estado modal del componente Principal ( su padre ) tiene una nota dentro o si tiene valor "undefined" , si es el ultimo caso mencionado procederá a actualizar estados con valores predeterminados para notas nuevas, y en el caso contrario , procederá actualizar algunos estados con la información de la nota proveniente de la propiedad modal.

Antes de explicar los estados , me gustaría aclarar como esta estructura de las notas que almacenamos, las notas son sencillas, son un  objetos con 3 propiedades:

- date : almacena un objeto Date con la fecha de la nota.
- note: es el texto de la nota en formato de string.
- id : son una serie de números y guiones que funcionan a modo de identificador único.

### Estados

- idNumber: es el identificador 
- fecha : objeto Date con la fecha.
- text : string con la nota.
- showModal : este componente tiene la función de interruptor para mostrar el componente DateTimePicker ( package datetimepicker).
- mode : sirve para cambiar el tipo de DateTimePicker, si queremos cambiar la fecha o si queremos cambiar solamente la hora.

## Estructura Retornada

- Animated.View : Es un componente nativo de react Native que hace de base para el resto de elementos en el componente.
	- `View` ( boxAuxiliar ) : este componente renderiza la función del modal , crear o editar una nota y también un botón para cerrar el modal.
	
		- `Text` : función del modal, editar o crear nueva nota.
	
		- `TouchableOpacity` : botón para cerrar el componente.
	
	- `View` ( BoxHoraFecha ) : almacena los botones para actualizar la fecha.
	
		- `TouchableOpacity` : botón Fecha.
	
		- `TouchableOpacity` : botón Hora.
	
	- `View` ( BoxAsuntos ) : este componente presenta un titulo "Asunto" y también un text input.
	
		- `Text` : titulo.
	
		- `TextInput`
	
	- `View` ( btnBox ) : este elemento tiene la función de mostrar los botones para agregar o borrar notas.
	
		- `BtnRemoveNoteModal` : este componente esta en un renderizado condicional, solo aparece si se manipula una nota ya existente, este botón tiene la función de eliminar una nota existente.
	
		- `BtnAddNoteModal` : este botón tiene la función de confirmar la acción de crear una nota nueva o de remplazar una existente.
	
	- `DateTImePicker` : este componente es parte de un renderizado condicional , el mismo tiene la función de mostrar un modal que permite modificar el estado fecha.
	
