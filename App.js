import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'TASKS'
const App = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState('')
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
    readData()
  }, [])

  ListItem = ({ value, index }) => {
    let state = value.state;
    return (
      <View>
        <TouchableOpacity style={[styles.item, state == true ? styles.success : styles.todo]}
          onPress={() => changeState(index)}
        >
          <Text style={{ fontSize: 18, flex: 0.7 }}>
            {value.text}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteItem(value)}
          >
            <Text style={{ color: 'red', margin: 5 }}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>

      </View>
    );
  };

  NavBar = () => (
    <View style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 15 }}>My TodoList</Text>
    </View>
  );

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
      let tmp = [...list, { text: text, state: false }]
      saveData(tmp);
      setList(tmp)
      setText('')
      textInput.clear()
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
      <NavBar />
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
    alignItems: "center"
  },
  success: {
    borderLeftColor: 'green',
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
});
export default App;
