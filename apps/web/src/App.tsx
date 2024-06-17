import { Navbar } from "@nextui-org/react";
import AddProblem from "./pages/AddProblems";
import ProblemPage from "./pages/ProblemPage";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/create" element={<AddProblem />} />
      </Routes>
      <footer>
        <p className="text-xs m-0">dotJudge 2024</p>
      </footer>
    </div>
  )
}