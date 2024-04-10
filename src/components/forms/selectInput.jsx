
export const inputStyleGoldNugget = {
    control: (baseStyles) => 
        ({
        ...baseStyles,
        padding:0,
        border:0,
        backgroundColor:'red',
        minHeight: 0,
        height: 0,
        boxShadow:0,
        ':focus-visible': {
            ...baseStyles[':focus-visible'],
            outline: 'none',
        }
        }),
        indicatorsContainer: (styles) => ({...styles,padding:0, cursor:'pointer', height:12 }),
        dropdownIndicator: (styles) => ({...styles, paddingLeft:1 }),
        valueContainer: (styles) => ({...styles,padding:0, fontSize:12, height:12}),
        menu: (styles) => ({...styles,width:80, borderRadius:0, padding:0 }),
        placeholder: (styles) => ({ ...styles, color:'black', height:12, fontSize:12 }),
        singleValue: (styles) => ({ ...styles, color:'black'}),    
}

export const themeGoldNugget = {
   theme: (theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#d1d5db',
          primary25: '#cceee2',
          primary50: '#cceee2',
          neutral20: '#214738',
          neutral30: '#214738',
          neutral40: '#214738',
        },
    })
}