import { Navigate, Route, Routes } from "react-router-dom"
import AddressLookupPage from "./pages/AddressLookupPage"
import BlackjackGame from "./pages/BlackjackGame"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lookup" />} />
      <Route path="/lookup" element={<AddressLookupPage />} />
      <Route path="/blackjack" element={<BlackjackGame />} />
    </Routes>
  )
}