# AG-nda 
AG-nda is a Mobile application for android (calendar type), it was developed with React-Native (EXPO), this application was developed for an educational purpose, to translate new knowledge into a project, therefore it is not too optimized, intensare release other versions in the future, now I would like to leave some important clarifications about the app:

 - It has a local storage, therefore it is not possible to save the data of the app and move to another device.
 - The themes are only 2 Light and Dark (in the future we will add the option to customize themes).
 - The language of the app is currently Spanish but the code of the app is in English ("I'm sorry").
 - When deleting the data of the application all the notes will be deleted, you should take it into account.

For now I think this is the only thing you need to know before downloading the app, I hope that if you use it I hope it will be useful to you and any contribution or opinion will always be well received, anyone can use it at no cost, and its sale is prohibited.


# technical information

Next we will attach an image that represents the order of the components:
![bitmap](https://user-images.githubusercontent.com/93448122/234439807-907695ad-4615-4118-afa7-cc3abb64abb8.png)

# App
This component has a simple logic, it only renders an 'InfoContext' component as a parent and the `Principal` component as a child.


# InfoContext
  
This component handles a variable that is used globally throughout the application which through a useContext accesses a useReducer that stores all the notes of the app and also stores the location.
 
  - DataContext (Context)
  - Info (Reducer)

## Info
  
It is an object that has 3 properties:
  - notes (array with notes)
  - themeIndex (theme's index selected by the user)
  - themeList (array with theme list)

To modify the Reducer's properties "Info" it is necessary to call a type of action already defined that is the one that manipulates the content of the reducer.
 
To modify the notes property there are 3 possible actions ADD, UPDATE, DELETE. To perform any of these actions you need to call the action type and attach an object with 2 properties:
  
 - oldItem (item to be modified / "undefined" if it is a new item or if a note is to be deleted)
 - item (modified element)
  
 ## Almacenamiento de datos
 
 Para guardar los datos usamos ASyncStorage 
 
 {{{				Contenido Sobre el guardado de datos 				}}}
 



 # Principal
 This component stores the main view of the app, In it there are 2 states and 2 context calls and a reference:
 
 - modal(State)
 - showMenu(state)
 - info (context)
 - drawerRef (reference)
 
 
modal: This state can have 3 values, "null" is the default value, "undefined" if a new note is to be created, or it can have an object that has the data of a note, either to modify or delete it.
	
showMenu: it has the switch function to re-render the component with the new theme.


## return
Next we will explain the elements that will be returned in the component, in descending order according to their hierarchy of parent, child, etc:

  - `DrawerLayoutAndroid`: It is the element with the highest hierarchy, it is a native element of ReactNative and is responsible for displaying Menu component.
	
  - `View`(container): This element fulfills the basic function for the rest of the elements.
	
 - `StatusBar`: It is a native component.
	
  - `BtnMenu`:This component has the function of changing the `ShowModal` state so that the `Menu` component can be displayed (there is a section below in which the buttons of the app are discussed, this is included).
	
   - `BtnAddNewNote`:This component is responsible for changing the `modal` state to "undefined" so that a new note is created (there is a section below in which we talk about the buttons of the app, this is included).
	
  - `SafeAreaView`: It is the container that shows the notes of the app, but also informs if there is no note, inside this component there is a conditional rendering that varies according to the length of the array with the notes inside info. Inside it, the `ItemDate` component is also rendered, which is the element that represents each note.
	
  - `ModalComponent`: In this component is the only one in which the notes can be modified, it is in a conditional rendering, if the `modal` state has any value other than "null" the component will be rendered.

	

	
## Menu
This is a fairly simple component, we do not use states, but we make a call to the DataContext to be able to access the information the currently selected theme.

## Return
Next we will explain the elements that will be returned in the component, in descending order according to their hierarchy of parent, child, etc:
	
- `View`(menuBox):This element works as a menu component base to locate the rest of the elements in the `Menu` component.
	
	- `TouchableOpacity`:It is a native component.
	
	- `Text`:This text shows the theme's name selected by the user.
	
	- `Text` (infoDeveloped): name of the developer.

	
	
	
	
	
# ModalComponent

This component has 5 states and a Global context call. Next we will explain the functions of each one, but we will leave aside the references since they only serve to store values for the animations of the Component.
This component when initialized has an important validation, which serves to differentiate if it has to create a new note or if it has to update an existing one, for this it validates if the modal property coming from the modal state of the Main component (its parent) has a note inside or if it has "undefined" value, if it is the last mentioned case it will proceed to update states with default values for new notes, and otherwise, it will proceed to update some states with the information of the note coming from the modal property.

Before explaining the states, I would like to clarify how this structure of the notes that we store, are an objects with 3 properties:

- date : Stores a Date object with the date of the note.
- note: It is the text of the note in string format.
- id : They are a series of numbers and dashes that function as a unique identifier.

### States

- idNumber: it is the ID 
- fecha : object Date with the date.
- text : String with the message.
- showModal :This component has the switch function to display the DateTimePicker component (package datetimepicker).
- mode : It is used to change the type of DateTimePicker, if we want to change the date or if we want to change only the time.

## Return

- `Animated.View`:It is a native component of react Native that acts as the basis for the rest of the elements in the component.
	- `View` ( boxAuxiliar ) : this component renders the modal function, create or edit a note and also a button to close the modal.
	
		- `Text` : function of the modal, edit or create new note.
	
		- `TouchableOpacity` : button to close the component.
	
	- `View` ( BoxHoraFecha ) : stores the buttons to update the date.
	
		- `TouchableOpacity` : Date button.
	
		- `TouchableOpacity` : Hour button.
	
	- `View` ( BoxAsuntos ) : this component has a title "Asunto" and also a text input.
	
		- `Text` : title.
	
		- `TextInput`
	
	- `View` ( btnBox ) : this item has the function of displaying the buttons for adding or deleting notes.
	
		- `BtnRemoveNoteModal` :this component is in a conditional rendering, it only appears if an existing note is manipulated, this button has the function of deleting an existing note.
	
		- `BtnAddNoteModal` : this button has the function of confirming the action of creating a new note or replacing an existing one.
	
	- `DateTImePicker` : this component is part of a conditional rendering, it has the function of displaying a modal that allows modifying the date state.
	
