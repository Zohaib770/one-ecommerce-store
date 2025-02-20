import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header.tsx"
import Main from './components/Main.tsx'
import Shop from './components/Shop.tsx'
import Footer from './components/Footer.tsx'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }/>
        <Route path="/shop" element={
            <>
              <Header />
              <Shop />
              <Footer />
            </>
          }/>
      </Routes>
  </Router>
  )
}

export default App
