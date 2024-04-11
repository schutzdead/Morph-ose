import { CircularProgress, ThemeProvider, LinearProgress } from "@mui/material"
import { colorTheme } from "../components/styles/mui";

export function Loading () {
    return (
        <ThemeProvider theme={colorTheme}>
            <LinearProgress />
        </ThemeProvider>
    )
}

export function CircularLoading () {
    return(
        <ThemeProvider theme={colorTheme}>
            <CircularProgress size="1rem" color='primary'/>
        </ThemeProvider>
    )
}