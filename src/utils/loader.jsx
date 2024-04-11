import { CircularProgress, ThemeProvider, LinearProgress } from "@mui/material"
import { colorTheme } from "../components/styles/mui";

export function Loading () {
    return (
        <div className="w-full h-full">
            <div className="flex h-full w-full items-center justify-center place-self-center">
                <ThemeProvider theme={colorTheme}>
                    <LinearProgress className="w-60"/>
                </ThemeProvider>
            </div>
        </div>
    )
}

export function CircularLoading () {
    return(
        <ThemeProvider theme={colorTheme}>
            <CircularProgress size="1rem" color='primary'/>
        </ThemeProvider>
    )
}