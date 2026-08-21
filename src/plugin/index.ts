import plugin from 'tailwindcss/plugin';

import { config } from './config';

const papyrusUIPlugin = plugin(props => {
  // Global base styles
  props.addBase({
    '[data-floating-ui-portal]': {
      position: 'fixed',
      zIndex: '1000',
    },
  });

  props.addComponents({
    // Input component styles
    '.input-base': {
      '@apply font-sans text-body-md-primary text-neutral-950 block w-full bg-transparent':
        {},
      WebkitTextFillColor: props.theme('colors.neutral.700'),

      '&::placeholder': {
        '@apply text-neutral-500 opacity-100': {},
        WebkitTextFillColor: props.theme('colors.neutral.500'),
      },

      '&:focus-visible': {
        outline: 'none',
      },

      '&:disabled:not(:placeholder-shown)': {
        '@apply text-neutral-950 opacity-disabled': {},
        WebkitTextFillColor: props.theme('colors.neutral.700'),
      },

      '&:disabled:placeholder-shown': {
        '@apply text-neutral-500 opacity-disabled': {},
        WebkitTextFillColor: props.theme('colors.neutral.500'),
      },
    },

    // Select component styles
    '.select-base': {
      '@apply font-sans text-body-md-primary text-neutral-950 block w-full appearance-none bg-transparent':
        {},
      WebkitAppearance: 'none',
      MozAppearance: 'none',

      '&::placeholder': {
        '@apply text-neutral-500 opacity-100': {},
        WebkitTextFillColor: props.theme('colors.neutral.500'),
      },

      '&:focus-visible': {
        outline: 'none',
      },

      '&:disabled:not(:placeholder-shown)': {
        '@apply text-neutral-950 opacity-disabled': {},
        WebkitTextFillColor: props.theme('colors.neutral.700'),
      },

      '&:disabled:placeholder-shown': {
        '@apply text-neutral-500 opacity-disabled': {},
        WebkitTextFillColor: props.theme('colors.neutral.500'),
      },
    },

    // Textarea component styles
    '.textarea-base': {
      '@apply font-sans text-body-md-primary text-neutral-950 block w-full bg-transparent':
        {},
      resize: 'vertical',

      '&::placeholder': {
        '@apply text-neutral-500 opacity-100': {},
        WebkitTextFillColor: props.theme('colors.neutral.500'),
      },

      '&:focus-visible': {
        outline: 'none',
      },

      '&:disabled:not(:placeholder-shown)': {
        '@apply text-neutral-950 opacity-disabled': {},
        WebkitTextFillColor: props.theme('colors.neutral.700'),
      },

      '&:disabled:placeholder-shown': {
        '@apply text-neutral-500 opacity-disabled': {},
        WebkitTextFillColor: props.theme('colors.neutral.500'),
      },
    },

    // Checkbox component styles
    '.checkbox-input': {
      '@apply appearance-none inline-block w-4 h-4 border border-neutral-400 leading-none bg-neutral-200 bg-origin-border bg-no-repeat bg-center transition-colors select-none cursor-pointer rounded':
        {},
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      verticalAlign: '-0.125em',
      WebkitPrintColorAdjust: 'exact',
      printColorAdjust: 'exact',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      userSelect: 'none',

      '&:disabled, &[readonly]': {
        '@apply cursor-default': {},
      },

      '&:disabled': {
        '@apply opacity-disabled': {},
      },

      '&:hover:not(:disabled):not([readonly])': {
        '@apply bg-neutral-300': {},
      },

      '&:focus-visible': {
        outline: 'none',
        '@apply ring': {},
      },

      '&:checked': {
        '@apply border-transparent bg-primary-600': {},
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M1 5.917 5.724 10.5 15 1.5'/%3E%3C/svg%3E\")",
        backgroundSize: '62.5%',
      },

      '&:checked:hover:not(:disabled):not([readonly])': {
        '@apply bg-primary-500': {},
      },
    },

    // Radio component styles
    '.radio-input': {
      '@apply appearance-none inline-block w-4 h-4 border border-neutral-400 leading-none bg-neutral-200 bg-origin-border bg-no-repeat bg-center transition-colors select-none cursor-pointer rounded-full':
        {},
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      verticalAlign: '-0.125em',
      WebkitPrintColorAdjust: 'exact',
      printColorAdjust: 'exact',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      userSelect: 'none',
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'><circle cx='8' cy='8' r='8' fill='white'/%3E%3C/svg%3E\")",
      backgroundSize: '0',

      '&:disabled, &[readonly]': {
        '@apply cursor-default': {},
      },

      '&:disabled': {
        '@apply opacity-disabled': {},
      },

      '&:hover:not(:disabled):not([readonly])': {
        '@apply bg-neutral-300': {},
      },

      '&:focus-visible': {
        outline: 'none',
        '@apply ring': {},
      },

      '&:checked': {
        '@apply border-transparent bg-primary-600': {},
        backgroundSize: '37.5%',
      },

      '&:checked:hover:not(:disabled):not([readonly])': {
        '@apply bg-primary-500': {},
      },
    },

    // Range component styles
    '.range-input': {
      '@apply appearance-none w-full bg-transparent py-2 cursor-pointer': {},
      WebkitAppearance: 'none',

      '&::-webkit-slider-runnable-track': {
        '@apply h-1 rounded-full bg-neutral-200': {},
        boxShadow: props.theme('boxShadow.inset'),
      },

      '&::-moz-range-track': {
        '@apply h-1 rounded-full bg-neutral-200': {},
        boxShadow: props.theme('boxShadow.inset'),
      },

      '&::-webkit-slider-thumb': {
        '@apply appearance-none w-3 h-3 rounded-full bg-primary-600 shadow-sm transition-transform':
          {},
        WebkitAppearance: 'none',
        marginTop: '-0.25rem',
        boxShadow: props.theme('boxShadow.sm'),
      },

      '&::-moz-range-thumb': {
        '@apply w-3 h-3 rounded-full border-none bg-primary-600 shadow-sm transition-transform':
          {},
        boxShadow: props.theme('boxShadow.sm'),
      },

      '&::-ms-thumb': {
        '@apply w-3 h-3 rounded-full border-none bg-primary-600 shadow-sm transition-transform':
          {},
        boxShadow: props.theme('boxShadow.sm'),
      },

      '&:hover::-webkit-slider-thumb': {
        transform: 'scale(1.33)',
      },

      '&:hover::-moz-range-thumb': {
        transform: 'scale(1.33)',
      },

      '&:focus-visible': {
        outline: 'none',
      },

      '&:focus-visible::-webkit-slider-thumb': {
        '@apply ring': {},
      },

      '&:focus-visible::-moz-range-thumb': {
        '@apply ring': {},
      },

      '&:disabled': {
        '@apply opacity-100 cursor-default': {},
      },

      '&:disabled::-webkit-slider-thumb': {
        '@apply bg-neutral-300 shadow-none': {},
        transform: 'none',
      },

      '&:disabled::-moz-range-thumb': {
        '@apply bg-neutral-300 shadow-none': {},
        transform: 'none',
      },
    },

    // List styles
    '.list': {
      paddingInlineStart: '1.5em',
      '& > li': {
        '@apply relative': {},
        '&:not(:last-child)': {
          marginBottom: '0.25em',
        },
        '&:before': {
          '@apply absolute inline-block text-center': {},
          width: '1em',
          marginInlineStart: '-1.5em',
        },
      },
    },

    // Table styles
    '.table': {
      '@apply w-full overflow-auto': {},
      '& tr': {
        '@apply border-b border-neutral-300': {},
      },
      '& th, & td': {
        '@apply text-left align-top': {},
      },
    },

    '.table-sm-primary': {
      '@apply font-sans text-body-sm-primary': {},
      '& th': {
        '@apply text-body-sm-primary-bold': {},
      },
      '& th, & td': {
        '@apply px-3 py-1.5': {},
      },
    },

    '.table-sm-secondary': {
      '@apply font-serif text-body-sm-secondary': {},
      '& th': {
        '@apply text-body-sm-secondary-bold': {},
      },
      '& th, & td': {
        '@apply px-3 py-1.5': {},
      },
    },

    '.table-md-primary': {
      '@apply font-sans text-body-md-primary': {},
      '& th': {
        '@apply text-body-md-primary-bold': {},
      },
      '& th, & td': {
        '@apply p-3': {},
      },
    },

    '.table-md-secondary': {
      '@apply font-serif text-body-md-secondary': {},
      '& th': {
        '@apply text-body-md-secondary-bold': {},
      },
      '& th, & td': {
        '@apply p-3': {},
      },
    },

    '.table-bordered': {
      '& th, & td': {
        '@apply border border-neutral-300': {},
      },
    },

    '.table-striped': {
      '& tr:nth-of-type(2n)': {
        '@apply bg-neutral-100': {},
      },
    },

    // Snackbar styles
    '.snackbar': {
      '@apply fixed flex items-center w-full max-w-sm z-50 pointer-events-none':
        {},
    },

    '.snackbar-top-start': {
      '@apply top-0 left-1/2 flex-col-reverse -translate-x-1/2 sm:left-auto sm:start-0 sm:flex-col sm:items-start sm:translate-x-0':
        {},
    },

    '.snackbar-top': {
      '@apply top-0 left-1/2 flex-col-reverse -translate-x-1/2 sm:flex-col': {},
    },

    '.snackbar-top-end': {
      '@apply top-0 left-1/2 flex-col-reverse -translate-x-1/2 sm:left-auto sm:end-0 sm:flex-col sm:items-end sm:translate-x-0':
        {},
    },

    '.snackbar-bottom': {
      '@apply bottom-0 left-1/2 flex-col -translate-x-1/2': {},
    },

    '.snackbar-bottom-start': {
      '@apply bottom-0 left-1/2 flex-col -translate-x-1/2 sm:left-auto sm:start-0 sm:items-start sm:translate-x-0':
        {},
    },

    '.snackbar-bottom-end': {
      '@apply bottom-0 left-1/2 flex-col -translate-x-1/2 sm:left-auto sm:end-0 sm:items-end sm:translate-x-0':
        {},
    },

    // Snackbar item styles
    '.snackbar-item': {
      '@apply w-full rounded-lg text-white px-4 py-3 shadow-lg transition overflow-hidden pointer-events-auto':
        {},
    },

    // Snackbar item placement styles (hidden state)
    '.snackbar-item-top-start': {
      '@apply translate-y-0 scale-0 opacity-0 sm:-translate-x-[200%] sm:opacity-100':
        {},
      '&:nth-child(2)': {
        '@apply absolute translate-y-2 scale-0 opacity-100 -z-10 sm:static sm:-translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(3)': {
        '@apply absolute translate-y-4 scale-0 opacity-100 -z-20 sm:static sm:-translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(n+4)': {
        '@apply hidden sm:block': {},
      },
      '&:nth-child(n+6)': {
        '@apply sm:hidden': {},
      },
      '&:not(:first-child)': {
        '@apply sm:mt-2': {},
      },
    },

    '.snackbar-item-top': {
      '@apply translate-y-0 scale-0 opacity-0': {},
      '&:nth-child(2)': {
        '@apply absolute translate-y-2 scale-0 opacity-100 -z-10': {},
      },
      '&:nth-child(3)': {
        '@apply absolute translate-y-4 scale-0 opacity-100 -z-20': {},
      },
      '&:nth-child(n+4)': {
        '@apply hidden': {},
      },
    },

    '.snackbar-item-top-end': {
      '@apply translate-y-0 scale-0 opacity-0 sm:translate-x-[200%] sm:opacity-100':
        {},
      '&:nth-child(2)': {
        '@apply absolute translate-y-2 scale-0 opacity-100 -z-10 sm:static sm:translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(3)': {
        '@apply absolute translate-y-4 scale-0 opacity-100 -z-20 sm:static sm:translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(n+4)': {
        '@apply hidden sm:block': {},
      },
      '&:nth-child(n+6)': {
        '@apply sm:hidden': {},
      },
      '&:not(:first-child)': {
        '@apply sm:mt-2': {},
      },
    },

    '.snackbar-item-bottom-start': {
      '@apply -translate-y-4 scale-0 opacity-0 sm:-translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:opacity-100':
        {},
      '&:nth-child(2)': {
        '@apply absolute -translate-y-2 scale-0 opacity-100 -z-10 sm:static sm:-translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(3)': {
        '@apply absolute translate-y-0 scale-0 opacity-100 -z-20 sm:static sm:-translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(n+4)': {
        '@apply hidden sm:block': {},
      },
      '&:nth-child(n+6)': {
        '@apply sm:hidden': {},
      },
      '&:not(:first-child)': {
        '@apply sm:mt-2': {},
      },
    },

    '.snackbar-item-bottom': {
      '@apply -translate-y-4 scale-0 opacity-0': {},
      '&:nth-child(2)': {
        '@apply absolute -translate-y-2 scale-0 opacity-100 -z-10': {},
      },
      '&:nth-child(3)': {
        '@apply absolute translate-y-0 scale-0 opacity-100 -z-20': {},
      },
      '&:nth-child(n+4)': {
        '@apply hidden': {},
      },
    },

    '.snackbar-item-bottom-end': {
      '@apply -translate-y-4 scale-0 opacity-0 sm:translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:opacity-100':
        {},
      '&:nth-child(2)': {
        '@apply absolute -translate-y-2 scale-0 opacity-100 -z-10 sm:static sm:translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(3)': {
        '@apply absolute translate-y-0 scale-0 opacity-100 -z-20 sm:static sm:translate-x-[200%] sm:translate-y-0 sm:scale-100 sm:z-auto':
          {},
      },
      '&:nth-child(n+4)': {
        '@apply hidden sm:block': {},
      },
      '&:nth-child(n+6)': {
        '@apply sm:hidden': {},
      },
      '&:not(:first-child)': {
        '@apply sm:mt-2': {},
      },
    },

    // Snackbar item visible placement styles
    '.snackbar-item-visible-top-start': {
      '@apply translate-y-0 scale-100 opacity-100 sm:translate-x-0': {},
      '&:nth-child(2)': {
        '@apply translate-y-2 scale-95 sm:translate-x-0 sm:translate-y-0 sm:scale-100':
          {},
      },
      '&:nth-child(3)': {
        '@apply translate-y-4 scale-90 sm:translate-x-0 sm:translate-y-0 sm:translate-y-0 sm:scale-100':
          {},
      },
    },

    '.snackbar-item-visible-top': {
      '@apply translate-y-0 scale-100 opacity-100': {},
      '&:nth-child(2)': {
        '@apply translate-y-2 scale-95': {},
      },
      '&:nth-child(3)': {
        '@apply translate-y-4 scale-90': {},
      },
    },

    '.snackbar-item-visible-top-end': {
      '@apply translate-y-0 scale-100 opacity-100 sm:translate-x-0': {},
      '&:nth-child(2)': {
        '@apply translate-y-2 scale-95 sm:translate-x-0 sm:translate-y-0 sm:scale-100':
          {},
      },
      '&:nth-child(3)': {
        '@apply translate-y-4 scale-90 sm:translate-x-0 sm:translate-y-0 sm:translate-y-0 sm:scale-100':
          {},
      },
    },

    '.snackbar-item-visible-bottom-start': {
      '@apply -translate-y-4 scale-100 opacity-100 sm:translate-x-0 sm:translate-y-0':
        {},
      '&:nth-child(2)': {
        '@apply -translate-y-2 scale-95 sm:translate-x-0 sm:translate-y-0 sm:scale-100':
          {},
      },
      '&:nth-child(3)': {
        '@apply translate-y-0 scale-90 sm:translate-x-0 sm:translate-y-0 sm:scale-100':
          {},
      },
    },

    '.snackbar-item-visible-bottom': {
      '@apply -translate-y-4 scale-100 opacity-100': {},
      '&:nth-child(2)': {
        '@apply -translate-y-2 scale-95': {},
      },
      '&:nth-child(3)': {
        '@apply translate-y-0 scale-90': {},
      },
    },

    '.snackbar-item-visible-bottom-end': {
      '@apply -translate-y-4 scale-100 opacity-100 sm:translate-x-0 sm:translate-y-0':
        {},
      '&:nth-child(2)': {
        '@apply -translate-y-2 scale-95 sm:translate-x-0 sm:translate-y-0 sm:scale-100':
          {},
      },
      '&:nth-child(3)': {
        '@apply translate-y-0 scale-90 sm:translate-x-0 sm:translate-y-0 sm:scale-100':
          {},
      },
    },
  });

  props.addUtilities({
    '.hide-scrollbar': {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '.scrollbar': {
      scrollbarWidth: 'thin',
      scrollbarColor: '#d1d5db #f3f4f6', // neutral-300 neutral-100

      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },

      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f3f4f6', // neutral-100
        borderRadius: '4px',
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#d1d5db', // neutral-300
        borderRadius: '4px',
        border: '1px solid #f3f4f6', // neutral-100

        '&:hover': {
          backgroundColor: '#9ca3af', // neutral-400
        },
      },

      '&::-webkit-scrollbar-corner': {
        backgroundColor: '#f3f4f6', // neutral-100
      },
    },
  });
}, config);

export default papyrusUIPlugin;
