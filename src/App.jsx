import 'bootstrap/dist/css/bootstrap.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BsFillPinAngleFill } from "react-icons/bs"

import {Example1} from './pages/Example1'
import {Example2} from './pages/Example2'

function App() {
  return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
    <h4>Infinite Scroll</h4>
    <Tabs defaultActiveKey="first">
      <Tab eventKey="first" title="React Only">
        <Example1 />
      </Tab>
      <Tab eventKey="second" title="React Query">
        <Example2 />
      </Tab>
      <Tab eventKey="third" title="About">
        <p>
          <BsFillPinAngleFill/>{' '}
          <a href="https://react-query-v2.tanstack.com/reference/useInfiniteQuery">React Query Refernece</a>
        </p>
      </Tab>
    </Tabs>
  </div>
  )
}

export default App
