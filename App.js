import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task])
      setTask('')
  }

  const handleDeleteTask = (index) => {
    let newTaskItems = [...taskItems]
    newTaskItems.splice(index, 1)
    setTaskItems(newTaskItems)
  }

  return (
    <View style={styles.container}>
      <Text>To-do list</Text>
      <TextInput 
        style={styles.input}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder={'Write a task'}
      />
      <Button
        title="Add task"
        onPress={handleAddTask}
      />
      <FlatList 
        data={taskItems}
        renderItem={({ item, index}) => (
          <View style={styles.task}>
            <Text>{item}</Text>

            <TouchableOpacity style={styles.delete} onPress={() => handleDeleteTask(index)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },

  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    padding: 10,
    margin: 5,
    borderWidth: 1,
  },

  delete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
