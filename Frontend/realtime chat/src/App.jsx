
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route to='/' element ={<Chat/>}/>
          <Route to='/register' element ={<Register/>}/>
          <Route to='/login' element ={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App