# AG-nda 
AG-nda is a Android Mobile app (type calendar), it was developed with React Native (EXPO).


Next we will attach an image that represents the order of the components:
![bitmap](https://user-images.githubusercontent.com/93448122/234439807-907695ad-4615-4118-afa7-cc3abb64abb8.png)

# <App Componet/>

  Este componente tiene una logica simple, solamente renderiza el componente <InfoContext> y el componente <Principal> como hijo,

# <InfoContext/>
  
  Este componente maneja una variable que se usa globalmente en toda la aplicacion la cual atravez de un useContext se accede a un useReducer que almacena todas la notas de la app y tambien almacena la ubicacion.
 
 UseContext Name: DataContext;
 UseReducer Name: info

useReducer:
  useReducer maneja un objeto con lista con las notas de la app y tambien maneja los temas de la app.
useReducer maneja cada accion de adicion y de remocion de item en la lista de notas, a su vez hay 3 acciones que se pueden hacer con la lista de notas AGREGAR, ACTUALIZAR, BORRAR.
