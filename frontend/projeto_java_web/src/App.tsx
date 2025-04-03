import { HashRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/mainPage';
import NewUser from './pages/newUser/newUser';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <ToastContainer />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/cadastro" element={<NewUser/>} ></Route>
                    <Route path=''></Route>
                    <Route></Route>
                    <Route></Route>
                </Routes>
            </HashRouter> 
        </>
    )
}

export default App
