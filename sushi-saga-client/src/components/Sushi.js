import React, { Fragment } from 'react'

const Sushi = (props) => {
let { name, isEaten, img_url, price, id } = props.info
  return (
    <div className='sushi'>
  <div className='plate' onClick={() => props.eatMe(id)}>
    {
          isEaten ? null : <img name={name} src={img_url} width='100%' />
    }
  </div>
  <h4 className='sushi-details'>
    {name} - ${price}
  </h4>
</div>
  )
}




export default Sushi