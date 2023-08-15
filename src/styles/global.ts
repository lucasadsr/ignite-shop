import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',

    '@media screen and (max-width: 1024px)': {
      paddingInline: '0.5rem',
    }
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400
  },
})