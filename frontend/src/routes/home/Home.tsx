import Footer from '../../components/Footer'
import Guide from './Guide'
import Hero from './Hero'
import Map from './Map'
import SimpleSteps from './SimpleSteps'
import Testimonial from './Testimonial'

const Home = () => {
  return (
    <div className='overflow-hidden relative'>
      <Hero />
      <Guide />
      <Map />
      <Testimonial />
      <SimpleSteps />
      <Footer />
    </div>
  )
}

export default Home