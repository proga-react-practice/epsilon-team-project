import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { FC } from "react";
import { BrowserRouter } from "react-router-dom"; 
import { lightTheme, darkTheme } from './themes';
import Router from "./AppRouter";

const App: FC = () => {
    const isDarkTheme = true; 

    return(
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <CssBaseline/>
            <BrowserRouter> 
              <Router />      
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
