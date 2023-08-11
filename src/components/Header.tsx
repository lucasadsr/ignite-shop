import Image from 'next/image'
import logoImage from '../assets/logo.svg'
import { HeaderContainer } from '../styles/pages/app'
import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { Cart } from './Cart'

export function Header() {
  const { cartCount, handleCartClick } = useShoppingCart()

  return (
    <HeaderContainer>
      <Image src={logoImage} alt='' />
      <button onClick={() => handleCartClick()} >
        <Handbag width={24} height={24} color='#8D8D99' weight='bold' />
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>
      <Cart />
    </HeaderContainer>
  )
}