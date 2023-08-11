import { styled } from "..";
import { X } from 'phosphor-react'

export const CartContainer = styled('div', {
  position: 'fixed',
  backgroundColor: '$gray800',
  top: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
  transform: 'translateX(100%)',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',

  padding: 24,

  minHeight: '100vh',
  width: 480,
  maxWidth: '100%',
  zIndex: 10,

  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0)',
      },
    },
  },

  h3: {
    marginTop: '4.5rem',
    marginBottom: '2rem',
    color: '$gray100',
    fontSize: '$lg'
  }
})

export const ProductContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem'
})

export const ImageWrapper = styled('div', {
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: '0.5rem',
  width: 'fit-content'
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  p: {
    color: '$gray300',
    fontSize: '$md',
    lineHeight: 1.6,
  },

  strong: {
    fontSize: '$md',
    lineHeight: 1.6,
  },

  button: {
    color: '$green500',
    padding: 0,
    fontWeight: 'bold',
    lineHeight: 1.6,
    marginTop: '0.5rem',
  }
})

export const Summary = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
})

export const QuantityContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const Quantity = styled('p', {
  fontSize: '$md',
})

export const TotalPriceContainer = styled('div', {
  marginTop: '0.5rem',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'space-between'
})

export const TotalPrice = styled('p', {
  fontSize: '$xl',
})

export const BuyButton = styled('button', {
  marginTop: '3.5rem',
  width: '100%',
  padding: '1.25rem 2rem !important',
  backgroundColor: '$green500 !important',

  fontWeight: 'bold',
  fontSize: '$md',
  color: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.7,
  }
})

export const CloseButton = styled(X, {
  position: 'absolute',
  cursor: 'pointer',
  right: 24,
})