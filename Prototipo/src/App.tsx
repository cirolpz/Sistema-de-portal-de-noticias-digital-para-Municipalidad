import { Carousel } from './components/Carousel'
import { CrearNoticiaForm } from './components/CrearNoticiaForm'
import { Header } from './components/Header'
import Mapa from './components/Mapa'
import { NoticiaAccordion } from './components/NoticiasAccordion'
import SesionModal from './components/SesionModal'
import { useNoticias } from './Context/NoticiasContext'

function App() {
  const { formVisible, sesionModalVisible } = useNoticias()

  return (
    <>
      <Header />
      <Carousel />
      <div className='flex'>
        <NoticiaAccordion />
        <Mapa />
      </div>

      {formVisible &&
        <CrearNoticiaForm />
      }
      {sesionModalVisible &&
        <SesionModal />
      }
    </>
  )
}

export default App
