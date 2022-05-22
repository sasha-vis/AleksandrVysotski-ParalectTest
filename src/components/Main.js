import React, { useState, useContext } from 'react';
import Context from './../context.js';

import IfEmpty from './mainPages/IfEmpty.js';
import IfExists from './mainPages/IfExists.js';
import IfNotExists from './mainPages/IfNotExists.js';

import Loader from './common/Loader.js';

function Main(){

    const {userData} = useContext(Context);
    const {ifLoad} = useContext(Context);

    return(
        <main className="main">
            <div className="container">
                <div className="main-wrapper">
                    {userData === null ? <IfEmpty /> : (userData.message === undefined ? <IfExists /> : <IfNotExists />)}
                    {ifLoad === true ? <Loader /> : ''}
                </div>
            </div>
        </main>
    );
}

export default Main;