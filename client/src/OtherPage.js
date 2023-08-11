import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
    return (
        <div>
            Soy otra página dedicada a amar a Edgeworth.
            <Link to ="/">Volver</Link>
        </div>
    );
};

export default OtherPage;