import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    console.log('rrr', response);
    setTodoList(response.data.task);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        console.log('Success');
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('Task cannot be added');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log('Deleting ID:', id);
      const response = await api.delete(`/tasks/${id}`); //backtick!!!
      if (response.status === 200) {
        console.log('Success');
        getTasks();
      } else {
        throw new Error('Task cannot be deleted');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const updateTask = async (id, isCompleted) => {
    try {
      const response = await api.put(`/tasks/${id}`, { isCompleted }); //backtick!!!
      if (response.status === 200) {
        console.log('Success');
        getTasks();
      } else {
        throw new Error('Task cannot be updated');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </Container>
  );
}

export default App;
