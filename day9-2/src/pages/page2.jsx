import { useState } from "react";

import { Card } from "@mui/material";
import { Form, Input, Button, Table } from "antd";

import useNameStore from "../store/useNameStore";

function Page2() {

  const [name, setName] = useState("");

  const {
    page1,
    page2,
    page3,
    addPage2Name,
  } = useNameStore();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  return (
    <div style={{ marginTop: 30 }}>

      <Card style={{ padding: 20 }}>

        <h2>Page 2</h2>

        <Form
          onFinish={() => {
            addPage2Name(name);
            setName("");
          }}
        >

          <Input
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <Button htmlType="submit" type="primary">
            Add
          </Button>

        </Form>

      </Card>

      <br />

      <h3>Page1 Table</h3>
      <Table rowKey="id" columns={columns} dataSource={page1} pagination={false} />

      <br />

      <h3>Page2 Table</h3>
      <Table rowKey="id" columns={columns} dataSource={page2} pagination={false} />

      <br />

      <h3>Page3 Table</h3>
      <Table rowKey="id" columns={columns} dataSource={page3} pagination={false} />

    </div>
  );
}

export default Page2;