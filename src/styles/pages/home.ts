import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  maxHeight: 560,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  minWidth: 540,

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    cursor: 'initial',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 6,

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300'
    },

    button: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      backgroundColor: '$green500',
      border: 'none',
      cursor: 'pointer',

      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.7,
      }
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  },

  '@media screen and (max-width: 1024px)': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  }
})

export const ProductInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
})

export const SliderContainer = styled('div', {
  position: 'relative',
  marginLeft: 'auto',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  '.arrow': {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fill: '#fff',
    cursor: 'pointer',
  },
  
  '.arrow--left': {
    left: 5,
  },
  
  '.arrow--right': {
    left: 'auto',
    right: 5,
  },
  
  '.arrow--disabled': {
    fill: 'rgba(255, 255, 255, 0.5)',
  },
})
