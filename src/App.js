import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import UsersList from "./pages/admin/users/UsersList";
import CreateUser from "./pages/admin/users/CreateUser";
import EditUser from "./pages/admin/users/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/users/userslist" element={<UsersList />} />
        <Route path="/admin/users/createuser" element={<CreateUser />} />
        <Route path="/admin/users/edituser/:id" element={<EditUser />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
