import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addPage3Name } from "../feautures/nameSlice";

import { Card } from "@mui/material";

import { Form, Input, Button, Table } from "antd";

function Page3() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.names);

  const [name, setName] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  return (
    <div style={{ marginTop: 30 }}>

      <Card style={{ padding: 20 }}>

        <h2>Page 3</h2>

        <Form
          onFinish={() => {
            dispatch(addPage3Name(name));
            setName("");
          }}
        >

          <Input
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <Button htmlType="submit" type="primary">
            Add
          </Button>

        </Form>

      </Card>

      <br />

      <h3>Page1 Table</h3>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data.page1}
        pagination={false}
      />

      <br />

      <h3>Page2 Table</h3>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data.page2}
        pagination={false}
      />

      <br />

      <h3>Page3 Table</h3>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data.page3}
        pagination={false}
      />
    </div>
  );
}

export default Page3;