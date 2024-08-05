function AirlineLogo({ company }) {
  const logoUrl = `//pics.avs.io/99/36/${company}.png`
  return <img src={logoUrl} alt="airline logo" />
}

export default AirlineLogo
