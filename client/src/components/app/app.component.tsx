import React from 'react';
import FamilyContainer from '../family/family.container';

const App: React.FC = () => {
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
