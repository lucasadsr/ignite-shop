import Image from 'next/image'
import logoImage from '../../assets/logo.svg'
import { HeaderContainer } from './styles'
import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { Cart } from '../Cart'
import Link from 'next/link'

export function Header() {
  const { cartCount, handleCartClick } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImage} alt='' />
      </Link>
      <button onClick={() => handleCartClick()} >
        <Handbag width={24} height={24} color='#8D8D99' weight='bold' />
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>
      <Cart />
    </HeaderContainer>
  )
}