import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Button, Image } from 'react-native';
import Notification from "./notification";
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const STORAGE_KEY = 'TASKS'
const App = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [displayNotification, setDisplayNotification] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const categories = {
    "shopping": "purple",
    "tech": "blue"
  }
  const showDatePicker = () => {

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };
  saveData = async (tmpList) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tmpList))
      // alert('Data successfully saved')
    } catch (e) {
      console.log(e)
      alert('Failed to save the data to the storage')
    }
  }
  readData = async () => {
    try {
      const list = await AsyncStorage.getItem(STORAGE_KEY)
      if (list !== null) {
        setList(JSON.parse(list))
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }
  useEffect(() => {
    // clearStorage(),
    readData()
  }, [])

  ListItem = ({ value, index }) => {
    const [display, setDisplay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDatePickerVisibleItem, setDatePickerVisibilityItem] = useState(false);

    //destructuring value prop
    let { state, description, text, dueDateString } = value;

    //declare states with those values
    const [dueDate, setDueDate] = useState(new Date(dueDateString))
    const [itemText, setItemText] = useState(text)
    const [itemDescription, setItemDescription] = useState(description)

    let todoMonth = dueDate.getMonth();
    let todoDay = dueDate.getDate();
    let todoYear = dueDate.getFullYear()
    let displayedDate = todoDay + '/' + (todoMonth + 1) + '/' + todoYear;
    let displayedDescription = description ? description : "No description provided"
    //old
    // const descriptionView = <Text style={{ width: "100%" }}>{itemDescription}</Text>
    // const noDescriptionMsg = <Text style={{ width: "100%" }}>No description provided</Text>

    const showDatePickerItem = () => {
      setDatePickerVisibilityItem(true);
    };

    const hideDatePickerItem = () => {
      setDatePickerVisibilityItem(false);
    };

    const handleConfirmItem = (date) => {
      setDueDate(date)

      hideDatePickerItem();
    };

    getDateStyle = () => {
      let currDate = new Date();
      let currMonth = currDate.getMonth();
      let currYear = currDate.getFullYear();
      if (currMonth > todoMonth && currYear >= todoYear) {
        return { color: 'red' }
      } else if (currMonth == todoMonth && currYear == todoYear) {
        return { color: 'orange' }
      } else {
        return { color: 'green' }
      }
    }

    handleDisplay = () => setDisplay(!display)

    const confirmEdit = (item, index) => {
      let tmp = list.map((v, i) => i != index ? v : item);
      saveData(tmp);
      setIsEditing(false);
      setList(tmp);
    }
    return (

      <View>
        {!isEditing ? (
          <TouchableOpacity style={[styles.item, state == true ? styles.success : styles.todo]}
            onPress={() => changeState(index)}
          >
            <Text style={{ fontSize: 18, flex: 0.7 }}>
              {text}
            </Text>
            <Text style={styles.date, getDateStyle()}>
              {displayedDate}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteItem(value)}
            >
              <Text style={{ color: 'red', margin: 5 }}>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { setIsEditing(true), setDisplay(true) }}
            >
              <Text style={{ color: 'orange', margin: 5 }}>📝</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles}
              onPress={handleDisplay}
            >
              <Text style={{ color: 'grey', margin: 5 }}>{display ? '⬆️' : '⬇️'}</Text>
            </TouchableOpacity>
            {/* if displayBtn is pressed, then, show either the item description or the no description message. Else dont do anything */}
            {/* {display ? (itemDescription ? descriptionView : noDescriptionMsg) : null} */}
            {display ? <Text style={{ width: "100%" }}>{displayedDescription}</Text> : null}
          </TouchableOpacity>
        ) : (
            <View style={[styles.item, styles.edit]}>
              {/* <TouchableOpacity style={[styles.item, state == true ? styles.success : styles.todo]}
              onPress={() => changeState(index)}
            > */}
              <TextInput
                style={{ fontSize: 18, flex: 0.7 }}
                placeholder={text}
                maxLength={40}
                onChangeText={newtext => setItemText(newtext)}
              />
              <Text style={styles.date, getDateStyle()}>
                {displayedDate}
              </Text>
              <Button title="⏱️" onPress={showDatePickerItem} />
              <DateTimePickerModal
                isVisible={isDatePickerVisibleItem}
                mode="date"
                date={dueDate}
                onConfirm={handleConfirmItem}
                onCancel={hideDatePickerItem}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => { setIsEditing(false), setDueDate(new Date(dueDateString)) }}
              >
                <Text style={{ color: 'red', margin: 5 }}>❌</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSuccess}
                //inject destructured props into a new object
                onPress={() => confirmEdit({ state, description: itemDescription, text: itemText, dueDateString: dueDate }, index)}
              >
                <Text style={{ color: 'green', margin: 5 }}>✔️</Text>
              </TouchableOpacity>
              <TextInput
                style={{ width: "100%" }}
                placeholder={displayedDescription}
                maxLength={200}
                onChangeText={newDescription => setItemDescription(newDescription)}
              />
              {/* <TouchableOpacity
                style={styles}
                onPress={handleDisplay}
              >
                <Text style={{ color: 'grey', margin: 5 }}>V</Text>
              </TouchableOpacity> */}
              {/* if displayBtn is pressed, then, show either the item description or the no description message. Else dont do anything */}
              {/* {display ? (itemDescription ? descriptionView : noDescriptionMsg) : null} */}
              {/* </TouchableOpacity> */}
            </View>

          )}



      </View>
    );
  };

  NavBar = () => (
    <View style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 15 }}>My TodoList</Text>
    </View>
  );

  //TODO  Edit option + Date d'échéance ? (color changes if within day / week / month)+ catégories (shopping, tech...)
  // Edit state + maybe opacity change and update method + error notif

  deleteItem = (item) => {
    // could have use splice aswell
    let tmp = list.filter((val) => val != item)
    saveData(tmp);
    setList(tmp);
  };
  changeState = (index) => {
    let tmp = list.map((value, i) => {
      if (index != i) {
        return value
      } else {
        value.state = !value.state;
        return value
      }
    })
    saveData(tmp);
    setList(tmp);

  }

  addItem = () => {
    //ES5
    // list.push(this.state.text)

    if (text != '') {
      //ES6
      let tmp = [...list, { text: text, state: false, description: description, dueDateString: date }]
      saveData(tmp);
      setList(tmp)
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
      <NavBar />
      {displayNotification ? <Notification></Notification> : null}
      {list.length > 0 ? (
        <ScrollView>
          {list.map((value, index) => {
            return <ListItem value={value} index={index} key={index} />
          })

          }

        </ScrollView>
      ) : (
          <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>

            <Text style={{ fontSize: 24 }}>No items in the list yet !</Text>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />

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
