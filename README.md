# AG-nda 
AG-nda es una aplicacion mobil para android ( tipo calendario ), fue desarrollada con React-Native ( EXPO ), esta aplicacion fue desarollada con un fin de educativo, para plasmar nuevos conocimientos en un proyecto, por lo tanto no esta demasiado optimizada, intenare sacar otras versiones en un futuro, ahora me gustaria dejar unas aclaraciones imporantes sobre app:

 - Tiene un almacenamiento local, por lo tanto no se puede guardar los datos de la app y pasar a otro dipositivo.
 - Los temas solamente son 2 Light y Dark (en un futuro agregremos la opcion de customizar temas ).
 - El lenguaje de la app actualmete es español pero el codigo de la app esta en ingles ("i'm sorry").
 - Al borrar los datos de la aplicacion seran borrada todas las notas, deberias tenerlo en cuenta.

Por ahora es lo unico que creo que es necesariamente saber antes de descargar la app, Espero que si la utilizas espero que te sea de ultilidad y cualquier contribucion u opinion siempre sera bien recibida, cualquiera puede usarla sin ningun costo, y esta prohibida su venta.


# Tecnical info

Next we will attach an image that represents the order of the components:
![bitmap](https://user-images.githubusercontent.com/93448122/234439807-907695ad-4615-4118-afa7-cc3abb64abb8.png)

# App
Este componente tiene una logica simple, solamente renderiza un componente <InfoContext> como padre y el componente <Principal> como hijo.

# InfoContext
  
  Este componente maneja una variable que se usa globalmente en toda la aplicacion la cual atravez de un useContext se accede a un useReducer que almacena todas la notas de la app y tambien almacena la ubicacion.
 
  - DataContext (useContext)
  - Info (UseReducer)

## Info
  
Es un objeto que tiene 3 propiedades:
  - notes (array con las notas)
  - themeIndex (el inidce del tema elegido por el usuario)
  - themeList (arrray con la lista de temas)

Para modificar las propiedades del Reducer "Info" en cualquier caso siempre hay que llamar al un tipo de accion ya definida que es la que manipula el contenido del reducer.
 
 Para modificar la priopiedad notes hay 3 acciones posibles AGREGAR, ACTUALIZAR , BORRAR; Para cualquiera de esas acciones se necesitas 2 elementos , primero llamar al tipo de accion y a su vez entregar un objeto con 2 propiedades:
  
 - oldItem ( elemento a modificar / "undefined" si es un nuevo elemento o si se va a eleminar una nota)
 - item (elemento modificado)

 Para modificar el tema simplente se llama al tipo de accion.
  
 ## Almacenamiento de datos
 
 Para guardar los datos usamos ASyncStorage 
 
 {{{				Contenido Sobre el guardado de datos 				}}}
 
 # Principal
 
 Este componente es un poco mas complejo que el  descipto anteriormente, este componte almacena la vista principal de la app, En el mismo hay 2 estados y 2 llamados al contexto y una referencia:
 
 - modal( State )
 - showMenu( state )
 - info ( context )
 - drawerRef ( reference )
 
 
modal: la funcion de este estado es diferenciar la accion a seguir, si crear una nueva nota o si modificar una existente, si es una nota nueva, adquiere el estado 'undefined' , si se edita una nota modal adquiere un objeto con la informacion de una nota.
	
showMenu: este estado tiene la funcion simplemente acutualizarse para volver a renderizar el componente con el nuevo tema.


## return

A continuacion explicaremos los elementos que se renderizan en el componente, en orden desendente segun su jerarquia de padre, hijo, etc:

  - `DrawerLayoutAndroid`: es el elemento con mayor jeraquia a la hora de renderizar el componente, el mismo es un elemento es nativo de ReactNative y en el mismo se encuentra el manejo del componente Menu de la app.
	
  - `View`(container): este elemento cumple la funcion de fondo, tambien la funcion de base para el resto de elementos a renderizar.
	
 - `StatusBar`: es un componente nativo de reactNative.
	
  - `BtnMenu`: este componente tiene la funcion de cambiar el estado "showModal" para que se pueda mostrar el componente Menu( mas abajo hay un apartado en el cual se habla de los botones de la app , este esta incluido).
	
   - `BtnAddNewNote`: este componente se encarga de cambiar el estado modal a "undefined" para que se cree una nota nueva ( mas abajo hay un apartado en el cual se habla de los botones de la app , este esta incluido).
	
  - `SafeAreaView`: este componete cumple la funcion de contenedor de las notas de la app, pero tambien la de informar sino hay ninguna nota, por eso dentro del mismo elemento hay un rederizado condicional que varia el resultado renderizado segun la longitud del array con las notas dentro de info.
Dentro del mismo tambien se renderiza el componente ItemDate que es el elemento que representa cada nota.
	
  - `ModalComponent`: en este componente es en el unico que se puede modificar las notas, crear o eliminar, el mismo tenia la funcion de ser un modal por esa razon el mismo esta prensente en un renderizado condicional, si el estado modal tiene algun valor diferente a "null" se renderizara el componente.

	
	
	
	
	
	
	
# Menu
Este es un componente bastante simple, no usamos estados , pero hacemos un llamado al DataContext para poder acceder a la informacion el thema seleccionado actualmente.

### Estructura retornada
A continuacion explicaremos los elementos que se renderizan en el componente, en orden desendente segun su jerarquia de padre, hijo, etc:
	
- `View` ( menuBox ) : este elemento funciona como base de componente menu para ubicar el resto de elementos en el componente Menu 
	
	- `TouchableOpacity` : es un elemento nativo de ReactNative, esta para darle la funcionalidad de click y funcionar a modo de boton personalizado.
	
	- `Text`: este texto muestra el tema seleccionado actulmente por el usuario.
	
	- `Text` ( infoDeveloped ) : este texto simplemente es para dar informacion sobre el desarrolador.

	
	
	
	
	
	
	
# ModalComponent

Este componente tiene 5 estados y una llamada al contextoGlobal. A continucion explicaremos la funciones de cada uno, pero dejaremos de lado a las referencias ya que solamente sirven almacenar valores para las animaciones del Componente( el llamado del use effect tambien es para el inicio de las animaciones apenas se renderice por primera vez el componente en pantalla).
Este componente al inicializarce tiene una validacion imortante la cual usa para diferenciar si tiene que crear una nueva nota o si tiene que actualizar una ya existente, para esto valida si la propiedad modal proverninete del estado modal del componente Principal ( su padre ) tiene una nota dentro o si tiene valor "undefined" , si es el ultimo caso mensionado procedera a actulizar estados con valores predeterminados para notas nuevas, y en el caso contrario , procedera actualizar algunos estados con la informacion de la nota proventinte de la propiedad modal.

Antes de explicar los estados , me gustaria aclarar como esta estructura de las notas que alamacenamos, las notas son sencillas, son un  objetos con 3 propiedades:

- date : almacena un objeto Date con la fecha de la nota.
- note: es el texto de la nota en formato de string.
- id : son una serie de numeros y guiones que funcionan a modo de identificador unico.

### Estados

- idNumber: es el identificador 
- fecha : objeto Date con la fehca.
- text : string con la nota.
- showModal : este componente tiene la funcion de interruptor para mostrar el componente DateTimePicker ( package datetimepicker).
- mode : sive para cambiar el tipo de DateTimePicker, si queremos cambiar la fecha o si queremnos cambiar solamnete la hora.

## Return

- Animated.View : Es un componente nativo de react Native que hace de base para el resto de elementos en el componente.
	- `View` ( boxAuxiliar ) : este componente renderiza la funcion del modal , crear o editar una nota y tambien un boton para cerrar el modal.
	
		- `Text` : funcion del modal, editar o crear nueva nota.
	
		- `TouchableOpacity` : boton para cerrar el componente.
	
	- `View` ( BoxHoraFecha ) : almacena los botones para actualizar la fecha.
	
		- `TouchableOpacity` : buton Fecha.
	
		- `TouchableOpacity` : boton Hora.
	
	- `View` ( BoxAsuntos ) : este componente presenta un titulo "Asunto" y tambien un text input.
	
		- `Text` : titulo.
	
		- `TextInput`
	
	- `View` ( btnBox ) : este elemento tiene la funcion de mostrar los botones para agregar o borrar notas.
	
		- `BtnRemoveNoteModal` : este componente esta en un renderizado condicional, solo aparece si se manipula una nota ya existente, este boton tiene la funcion de eliminar una nota existenete.
	
		- `BtnAddNoteModal` : este boton tiene la funcion de confirmar la accion de crear una nota nueva o de remplazar una existente.
	
	- `DateTImePicker` : este componente es parte de un renderizado condicional , el mismo tiene la funcion de mostrar un modal que permite modificar el estado fecha.
	
