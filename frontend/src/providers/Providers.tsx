import { ThemeProvider } from '@/context/ThemeContext';
import React from 'react';

const Providers = ({children}:{children:React.ReactNode}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}

export default Providers;
