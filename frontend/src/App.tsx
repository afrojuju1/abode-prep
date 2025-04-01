import { Navigate, Route, Routes } from "react-router-dom"
import AddressLookupPage from "./pages/AddressLookupPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lookup" />} />
      <Route path="/lookup" element={<AddressLookupPage />} />
    </Routes>
  )
}