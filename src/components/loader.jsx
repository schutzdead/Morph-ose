import { LinearProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { colorTheme } from "./styles/mui";

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