import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages & components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddAlbumForm from './components/AddAlbumForm'
import MyAlbum from './components/MyAlbum'
import AddSongForm from './components/AddSongForm';
import AdminPanel from "./pages/AdminPanel";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route
              path="/AdminPanel"
              element={!user ? <AdminPanel /> : <AdminPanel />}
            />
            <Route
              path='/addalbum'
              element={<AddAlbumForm />}
            />

            <Route
              path='/myalbum'
              element={<MyAlbum />}
            />
            <Route
              path='/addsong'
              element={<AddSongForm />}
            />
            {/* <Route
              path='/addalbum'
              element={!user ? <AddAlbumForm /> : <Navigate to='/' />}
            />*/}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
