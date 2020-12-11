import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TodoProvider } from './context/todos.context';
import MainScreen from "./screens/MainScreen";
import DoneTasksScreen from "./screens/DoneTasksScreen"
import CreateTaskScreen from "./screens/CreateTaskScreen"

const App = () => {

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
          <Tab.Screen name="Todo Tasks" component={MainScreen} />
          <Tab.Screen name="DoneTasks" component={DoneTasksScreen} options={{ title: 'Done Tasks' }} />
          <Tab.Screen name="CreateTask" component={CreateTaskScreen} options={{ title: 'Create Task' }} />

        </Tab.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}



export default App;
