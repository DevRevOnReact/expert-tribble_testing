
import { Provider } from 'react-redux'
import './App.css'
import UserTable from './components/Table'
import store from './store/store'
import cl from './components/style.module.scss'
import { Marquee } from './ui/Marquee'

function App() {

  return (
    <>
 <Provider store={store}>
      <div className={cl.main}>
      <Marquee text={'база водителей и пешеходов'} repeat={10} />
        <UserTable />
      </div>
    </Provider>
    </>
  )
}

export default App
