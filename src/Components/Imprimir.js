import React from 'react'
import QRCode from 'react-qr-code'

// HACER ESTE COMPONENTE

export const Imprimir = ({urlMesa, dominio}) => {




  return (
    <QRCode style={{ margin: '0 auto', border: '1px solid white'}} size={132} value={dominio+urlMesa} />

  )
}
