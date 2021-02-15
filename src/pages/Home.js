import React from 'react';
import AdicionarMes from '../components/AdicionarMes';
import Meses from '../components/Meses';

export default function Home() {
    return (
        <React.Fragment>
            <React.Fragment>
                <AdicionarMes />
                <Meses />
            </React.Fragment>
        </React.Fragment>
    )
}
