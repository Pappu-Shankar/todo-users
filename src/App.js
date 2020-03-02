import React from 'react';
import "antd/dist/antd.css";
import { Tabs } from 'antd';
import Users from './components/Users';
import Todo from './components/Todo';
import { Layout } from 'antd';

const { Content } = Layout;
const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Content
        className="site-layout-background"
        style={{
          padding: 28,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Tabs type="card">
          <TabPane tab="Todos" key="1">
            <Todo />
          </TabPane>
          <TabPane tab="Users" key="2">
            <Users />
          </TabPane>
        </Tabs>
      </Content>
    </div>
  );
}

export default App;
