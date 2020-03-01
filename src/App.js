import React from 'react';
import './App.css';
import { Tabs } from 'antd';
import Users from './components/Users';
import Todo from './components/Todo';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs type="card">
        <TabPane tab="Todos" key="1">
          <Todo />
        </TabPane>
        <TabPane tab="Users" key="2">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
