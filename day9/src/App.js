import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Button, Space } from "antd";

import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";

function App() {
  return (
    <BrowserRouter>

      <div style={{ padding: 20 }}>

        <Space>

          <Link to="/">
            <Button type="primary">Page 1</Button>
          </Link>

          <Link to="/page2">
            <Button type="primary">Page 2</Button>
          </Link>

          <Link to="/page3">
            <Button type="primary">Page 3</Button>
          </Link>

        </Space>

        <Routes>

          <Route path="/" element={<Page1 />} />

          <Route path="/page2" element={<Page2 />} />

          <Route path="/page3" element={<Page3 />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;