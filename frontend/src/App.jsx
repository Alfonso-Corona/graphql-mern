import { Route, Routes } from "react-router-dom"
import SignUnPage from "./pages/SignUpPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import TransactionPage from "./pages/TransactionPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUnPage/>} />
      <Route path="/transaction/:id" element={<TransactionPage/>}/>
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </>
  )
}

export default App
