import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages & components
import Navbar from "./components/NavbarHomePage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddAlbumForm from "./components/AddAlbumForm";
import MyAlbums from "./components/MyAlbums";
import MyAlbum from "./components/MyAlbum";
import AddSongForm from "./components/AddSongForm";
import AdminPanel from "./pages/AdminPanel";
import UpdateUserForm from "./components/UpdateUserForm";
import { AudioPlayer } from "./components/AudioPlayer";
import { useSongsContext } from "./hooks/useSongsContext";

function App() {
  const { user } = useAuthContext();
  const { songsdata } = useSongsContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/AdminPanel"
              element={
                user && user.role ? <AdminPanel /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/UpdateUser"
              element={
                user && user.role === "ADMIN" ? (
                  <UpdateUserForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/addalbum"
              element={user ? <AddAlbumForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/myalbums"
              element={user ? <MyAlbums /> : <Navigate to="/login" />}
            />
            <Route
              path="/myalbum/:id"
              element={user ? <MyAlbum /> : <Navigate to="/login" />}
            />
            <Route
              path="/addsong/:id"
              element={user ? <AddSongForm /> : <Navigate to="/login" />}
            />
            {/* <Route
              path='/addalbum'
              element={!user ? <AddAlbumForm /> : <Navigate to='/' />}
            />*/}
          </Routes>
        </div>
        {songsdata && <AudioPlayer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
