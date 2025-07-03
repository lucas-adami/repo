import { Toaster } from 'sonner'
import './App.css'
import { BucketDecider } from './components/pages/bucket/BucketDecider'
import { Route, Routes } from 'react-router-dom'
import { BucketSession } from './components/pages/bucket/BucketSession'
import { UserSession } from './components/pages/user/UserSession'
import { Home } from './components/pages/home/Home'
import { ProductSession } from './components/pages/product/ProductSession'

function App() {


  return (
    <div className='flex items-center justify-center' >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bucket/:name' element={<BucketSession />} />
        <Route path='/buckets' element={<BucketDecider />} />
        <Route path='/users' element={<UserSession />} />
        <Route path='/products' element={<ProductSession />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
