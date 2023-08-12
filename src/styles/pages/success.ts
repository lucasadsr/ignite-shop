import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    textDecoration: 'none',
    fontSize: '$lg',
    color: '$green500',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300'
    }
  }
})

export const ImagesWrapper = styled('div', {
  display: 'flex',
})

export const ImageContainer = styled('div', {
  height: '8.75rem',
  width: '8.75rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 999,
  padding: '0.25rem',
  marginTop: '4rem',
  boxShadow: '0px 0px 60px 0px rgba(0, 0, 0, 0.80)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:not(:first-child)': {
    marginLeft: '-2rem',
  },

  img: {
    objectFit: 'cover',
    width: '100%',
  }
})