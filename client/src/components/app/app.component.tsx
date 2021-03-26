import React from 'react';
import FamilyContainer from '../family/family.container';
import { AppProps } from './types';

const App: React.FC<AppProps> = ({isLoggedIn}) => {
    if (!isLoggedIn) return <>Login Page</>
    return (
        <div>
            App component
            <div style={{ marginTop: 40 }}>
                <FamilyContainer />
            </div>
        </div>
    );
};

export default App;
