import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./Login";
import { Home } from "./pages/home";


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />

        </Routes>

      </Router>

    </>
  )
}

export default App
