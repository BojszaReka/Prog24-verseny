import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Menu from './components/menu'
import Simple from './components/navBar'


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
        <Router>
            <Routes>
              <Route path='/' element={<Menu />}></Route>
              <Route path='/simple' element={<Simple />}></Route>
            </Routes>
        </Router>
    </ChakraProvider>
  </React.StrictMode>,
)