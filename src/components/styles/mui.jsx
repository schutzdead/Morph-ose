import { createTheme } from "@mui/material";

export const colors = {
    primary: '#ffffff',
    secondary : '#9ca3af',
    secondaryLight : '#d1d5db',
    secondaryDark : '#6b7280',
    typo: '#000000',
    test:'#8c3096'
}

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: colors.typo,
            dark:colors.secondaryLight
        },
    }
    
})



// WebkitBoxShadow: "0 0 0 1000px white inset"
export const nobgCompletion = { spellcheck: 'false' };
