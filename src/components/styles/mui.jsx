import { createTheme } from "@mui/material";

export const colors = {
    primary: '#DE5B30',
    secondary : '#582D3E',
}

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: colors.secondary,
            dark:colors.secondary
        },
    }
    
})

export const nobgCompletion = { spellcheck: 'false' };
