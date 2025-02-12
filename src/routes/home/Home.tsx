import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Guide from './Guide'
import Hero from './Hero'
import Map from './Map'

const Home = () => {
  return (
    <div className='overflow-hidden relative'>
      <Navbar />
      <Hero />
      <Guide />
      <Map />
      <Footer />
    </div>
  )
}

export default Home