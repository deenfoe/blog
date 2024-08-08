import { BarLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

import { selectStop } from '../../redux/slices/ticketsSlice'

function LoadingBar() {
  const stop = useSelector(selectStop)
  return <div>{!stop && <BarLoader width="100%" height={5} color="#00b2ff" speedMultiplier={0.5} />}</div>
}

export default LoadingBar
