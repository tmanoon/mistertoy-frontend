import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/style/main.css'

import { About } from './pages/About.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

export function App() {

  return (
    <Provider store={store}>
        <Router>
            <section className="app">
                <AppHeader />
                <main className='main-layout'>
                    <Routes>
                        <Route element={<HomePage />} path="/" />
                        <Route element={<About />} path="/about" />
                        <Route element={<ToyIndex />} path="/toy" />
                        <Route element={<ToyEdit />} path="/toy/edit" />
                        <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                        <Route element={<ToyDetails />} path="/toy/:toyId" />
                        <Route element={<Dashboard />} path="/toy/dashboard" />
                        {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Router>
    </Provider>

)
}

