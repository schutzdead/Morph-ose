import { CircularProgress, ThemeProvider, LinearProgress } from "@mui/material"
import { colorTheme } from "../components/styles/mui";

export function Loading () {
    return (
        <div className="w-full">
            <div className="flex items-center justify-center place-self-center h-[250px]">
                <ThemeProvider theme={colorTheme}>
                    <LinearProgress color="primary" className="w-60"/>
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