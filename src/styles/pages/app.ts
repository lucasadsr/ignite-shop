import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: 'center',
})

export const HeaderContainer = styled('header', {
  position: 'relative',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0.375rem',
    padding: '0.75rem',
    backgroundColor: '$gray800',
    border: 'none',
    cursor: 'pointer',
    position: 'relative'
  },

  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    color: '$white',
    fontSize: '0.875rem',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: 999,
    border: '3px solid $gray900',
    backgroundColor: '$green500',
    right: '-0.4375rem',
    top: '-0.4375rem',
  }
})