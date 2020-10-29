import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: '',
    };
  }

  ListItem = ({ value, index }) => {
    let state = value.state;
    return (
      <View>
        <TouchableOpacity style={[styles.item, state == true ? styles.success : styles.todo]} 
        onPress={() => this.changeState(index)}
        >
          <Text style={{fontSize: 18, flex: 0.7}}> 
            {value.text} 
          </Text> 
          <TouchableOpacity
          style={styles.button}
          onPress={() => this.deleteItem(index)}
          >
            <Text style={{color: 'red', margin: 5}}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        
      </View>
    );
  };

  NavBar = () => (
    <View style={{ height: 60, backgroundColor: 'white', justifyContent: 'center',alignItems:'center', marginBottom: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 15 }}>My TodoList</Text>
    </View>
  );

  deleteItem = (index) => {
    this.state.list.splice(index, 1);
    this.setState(
      {list: this.state.list}
    )
  };
  changeState = (index) => {
    this.state.list.map((value, i) => {
      index != i ? value : value.state = !value.state
    })
    this.setState(
      {list: this.state.list}
    )
  }
  // used to have a done btn
  // addSuccess = (index) => {
  //   this.state.list.map((value, i) => {
  //     index != i ? value : value.state = true
  //   })
  //   this.setState(
  //     {list: this.state.list}
  //   )
  // }

  addItem = () => {
    //ES5
    // this.state.list.push(this.state.text)

    if (this.state.text != '') {
    //ES6
      this.setState(
        {
          list: [...this.state.list, {text : this.state.text, state: false}],
          text: ''
        },
      ),
      this.textInput.clear()
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
        <this.NavBar />
        {this.state.list.length > 0 ? (
          <ScrollView>
            {this.state.list.map((value, index) => {
              return <this.ListItem value={value} index={index} key={index}/>
            })
             
            }
            
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={{alignItems: "center", justifyContent: "center", flexGrow: 1}}>
            
            <Text style={{fontSize: 24}}>No items in the list yet !</Text>
            <Image
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            />

          </ScrollView>
          
        )}
        <View>
            <>
              <TextInput
              style={styles.input}
              placeholder="Type your new task here!"
              maxLength={40}
              onChangeText={text => this.setState({text: text})}
              ref={input => { this.textInput = input }}
              />
              <Button
              style={styles.button}
              title="Add"
              onPress={this.addItem}
              />
            </>

        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
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

