import {Routes,Route} from 'react-router-dom'
import CategoriesPreviews from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import './shop.style.scss'

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoriesPreviews/>}/>
      <Route path=":category" element={<Category/>}/>
    </Routes>
   
  )
}

export default Shop
