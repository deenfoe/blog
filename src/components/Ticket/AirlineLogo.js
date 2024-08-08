import PropTypes from 'prop-types'

function AirlineLogo({ company }) {
  const logoUrl = `//pics.avs.io/99/36/${company}.png`
  return <img src={logoUrl} alt="airline logo" width={99} height={36} style={{ display: 'block' }} />
}

AirlineLogo.propTypes = {
  company: PropTypes.string.isRequired,
}

export default AirlineLogo
