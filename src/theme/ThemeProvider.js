import { createTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme({

})

export default function ThemeProvider2({ children }) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}