import { StatusBar } from 'expo-status-bar';
import React, { Component, useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, Button } from 'react-native';
import Notification from "./notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ListItem from "./ListItem";
import ListItemRO from "./ListItemRO";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from "./Navbar"
import { TodoProvider } from './context/todos.context';
import { TodoContext } from './context/todos.context';

const App = () => {

  function DoneTasksScreen() {
    const [todos, dispatch] = useContext(TodoContext);

    const list = todos.filter((v) => v.state === true)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
        <NavBar title="Done Tasks" />

        {list.length > 0 ? (
          <ScrollView>
            {list.map((value, index) => {
              return <ListItemRO value={value} key={index}></ListItemRO>
            })

            }

          </ScrollView>
        ) : (
            <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>

              <Text style={{ fontSize: 24 }}>No items in the list yet !</Text>

            </ScrollView>

          )}

      </SafeAreaView>
    );
  }
  function MainScreen() {
    const [todos, dispatch] = useContext(TodoContext);

    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [displayNotification, setDisplayNotification] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    //TODO Categories
    const categories = {
      "shopping": "purple",
      "tech": "blue"
    }

    //Datepicker functions
    const showDatePicker = () => {

      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      setDate(date);
      hideDatePicker();
    };

    // saveData = async (tmpList) => {
    //   try {
    //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tmpList))
    //     // alert('Data successfully saved')
    //   } catch (e) {
    //     console.log(e)
    //     alert('Failed to save the data to the storage')
    //   }
    // }
    // readData = async () => {
    //   try {
    //     const list = await AsyncStorage.getItem(STORAGE_KEY)
    //     if (list !== null) {
    //       setList(JSON.parse(list))
    //     }
    //   } catch (e) {
    //     alert('Failed to fetch the data from storage')
    //   }
    // }
    // const clearStorage = async () => {
    //   try {
    //     await AsyncStorage.clear()
    //     alert('Storage successfully cleared!')
    //   } catch (e) {
    //     alert('Failed to clear the async storage.')
    //   }
    // }
    // useEffect(() => {
    //   // clearStorage(),
    //   readData()
    // }, [])

    const deleteItem = (item) => {
      // could have use splice aswell

      //OLD V1
      // let tmp = list.filter((val) => val != item)

      dispatch({
        type: "DEL_TODO",
        payload: item
      });
      // OLD V1
      // saveData(tmp);
      // setList(tmp);
    };
    const changeState = (index) => {
      dispatch({
        type: "MOD_TODO_STATE",
        payload: index
      });
      // let tmp = list.map((value, i) => {
      //   if (index != i) {
      //     return value
      //   } else {
      //     value.state = !value.state;
      //     return value
      //   }
      // })
      // saveData(tmp);
      // setList(tmp);

    }
    const editItem = (item, index) => {
      // let tmp = list.map((v, i) => i != index ? v : item);
      // saveData(tmp);
      dispatch({
        type: "MOD_TODO",
        payload: { item, index }
      })
      // setIsEditing(false);
      // setList(tmp);
    }
    const addItem = () => {
      //OLD V1

      //ES5
      // list.push(this.state.text)

      // if (text != '') {
      //   //ES6
      //   let tmp = [...list, { text: text, state: false, description: description, dueDateString: date }]
      //   saveData(tmp);
      //   setList(tmp)
      //   setText('')
      //   setDescription('')
      //   setDate(new Date())
      //   textInput.clear()
      //   descriptionInput.clear()
      // } else if (displayNotification == false) {
      //   setDisplayNotification(true);
      //   setTimeout(() => setDisplayNotification(false), 3000);
      // }
      if (text != '') {
        dispatch({
          type: "ADD_TODO",
          payload: { text: text, state: false, description: description, dueDateString: date }
        });
        setText('')
        setDescription('')
        setDate(new Date())
        textInput.clear()
        descriptionInput.clear()
      } else if (displayNotification == false) {
        setDisplayNotification(true);
        setTimeout(() => setDisplayNotification(false), 3000);
      }
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
        <NavBar title="Your List" />
        {displayNotification ? <Notification></Notification> : null}

        {todos.length > 0 ? (
          <ScrollView>
            {todos.map((value, index) => {
              return <ListItem value={value} index={index} handleEdit={editItem} handleStateChange={changeState} handleDelete={deleteItem} key={index} />
            })

            }

          </ScrollView>
        ) : (
            <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>

              <Text style={{ fontSize: 24 }}>No items in the list yet !</Text>

            </ScrollView>

          )}
        <View>
          <>
            <TextInput
              style={styles.input}
              placeholder="Type your new task here!"
              maxLength={40}
              onChangeText={text => setText(text)}
              ref={input => { textInput = input }}
            />
            <TextInput
              style={styles.input}
              placeholder="A little description maybe?"
              maxLength={200}
              onChangeText={description => setDescription(description)}
              ref={input => { descriptionInput = input }}
            />
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Button
              style={styles.button}
              title="Add"
              onPress={addItem}
            />
          </>

        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  function CreateTaskScreen() {
    const [todos, dispatch] = useContext(TodoContext);
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [displayNotification, setDisplayNotification] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const addItem = () => {
      if (text != '') {
        dispatch({
          type: "ADD_TODO",
          payload: { text: text, state: false, description: description, dueDateString: date }
        });
        setText('')
        setDescription('')
        setDate(new Date())
        textInput.clear()
        descriptionInput.clear()
      } else if (displayNotification == false) {
        setDisplayNotification(true);
        setTimeout(() => setDisplayNotification(false), 3000);
      }
    };

    //Datepicker functions
    const showDatePicker = () => {

      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      setDate(date);
      hideDatePicker();
    };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
        <NavBar title="Add a new task !" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="Type your new task here!"
            maxLength={40}
            onChangeText={text => setText(text)}
            ref={input => { textInput = input }}
          />
          <TextInput
            style={styles.input}
            placeholder="A little description maybe?"
            maxLength={200}
            onChangeText={description => setDescription(description)}
            ref={input => { descriptionInput = input }}
          />
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Button
            style={styles.button}
            title="Add"
            onPress={addItem}
          />
        </View>
      </SafeAreaView>
    );
  }
  const Tab = createBottomTabNavigator();
  return (
    <TodoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Todo Tasks') {
                iconName = 'ios-time'
              } else if (route.name === 'CreateTask') {
                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
              } else if (route.name === 'DoneTasks') {
                iconName = focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Todo Tasks" component={MainScreen} options={{ tabBarBadge: 3 }} />
          <Tab.Screen name="DoneTasks" component={DoneTasksScreen} options={{ tabBarLabel: 'Done Tasks' }} />
          <Tab.Screen name="CreateTask" component={CreateTaskScreen} options={{ tabBarLabel: 'Create Task' }} />

        </Tab.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}


const styles = StyleSheet.create({

  // Donnez le style que vous souhaitez Ã  vos composant

  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  item: {
    margin: 5,
    padding: 5,
    borderLeftWidth: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: "wrap",
    alignItems: "center"
  },
  success: {
    borderLeftColor: 'green',
  },
  edit: {
    borderLeftColor: 'orange',
  },
  todo: {
    borderLeftColor: 'red',
  },
  button: {
    borderColor: 'red',
    borderWidth: 1
  },

  buttonSuccess: {
    borderColor: 'green',
    borderWidth: 1
  },
  input: {
    fontSize: 24,
    textAlign: "center"
  },
  date: {
    fontSize: 14,
    flex: 0.3
  }
});
export default App;
