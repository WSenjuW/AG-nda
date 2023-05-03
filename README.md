# AG-nda 
AG-nda es una aplicacion mobil para android ( tipo calendario ), fue desarrolada con React-Native ( EXPO ), esta aplicacion fue desarollada con un fin de educativo, para plasmar nuevos conocimientos en un proyecto, por lo tanto no esta demasiado optimizada, intenare sacar otras versiones en un duturo, ahora me gustaria dejar unas aclaraciones imporantes sobre app:

 - Tiene un almacenamiento local, por lo tanto no se puede guardar los datos de la app y pasar a otro dipositivo.
 - Los temas son solo 2 Light y Dark (en un futuro agregremos la opcion de customizar los temas ).
 - El lenguaje de la app actualmete es español pero el codigo de la app esta en ingles ("sorry").
 - Al borrar los datos de la aplicacion seran borrada todas las notas, deberias tenerlo en cuenta.

Por ahora es lo unico que creo que es necesariamente saber antes de descargar la app, Espero que si la utilizas te sirva y cualquier contribucion u opinion siempre sera bien recibida, cualquiera puede usarla sin ningun costo, 

Next we will attach an image that represents the order of the components:
![bitmap](https://user-images.githubusercontent.com/93448122/234439807-907695ad-4615-4118-afa7-cc3abb64abb8.png)

## App Componet
Este componente tiene una logica simple, solamente renderiza un componente <InfoContext> como padre y el componente <Principal> como hijo.

## InfoContext
  
  Este componente maneja una variable que se usa globalmente en toda la aplicacion la cual atravez de un useContext se accede a un useReducer que almacena todas la notas de la app y tambien almacena la ubicacion.
 
  - DataContext (useContext)
  - Info (UseReducer)

### Info
  
Es un objeto que tiene 3 propiedades:
  - notes (array con las notas)
  - themeIndex (el inidce del tema elegido por el usuario)
  - themeList (arrray con la lista de temas)

Para modificar las propiedades del Reducer "Info" en cualquier caso siempre hay que llamar al un tipo de accion ya definida que es la que manipula el contenido del reducer.
 
 Para modificar la priopiedad notes hay 3 acciones posibles AGREGAR, ACTUALIZAR , BORRAR; Para cualquiera de esas acciones se necesitas 2 elementos , primero llamar al tipo de accion y a su vez entregar un objeto con 2 propiedades:
  
 - oldItem ( elemento a modificar / "undefined" si es un nuevo elemento o si se va a eleminar una nota)
 - item (elemento modificado)

 Para modificar el tema simplente se llama al tipo de accion.
  
 ### Almacenamiento de datos
 
 Para guardar los datos usamos ASyncStorage 
