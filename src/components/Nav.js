import React, { useState, useContext } from 'react';

import logo from './../images/GitHubLogo.png';
import searchIconSmall from './../images/SearchIconSmall.png';

import Input from './common/Input';

import Context from './../context.js';

function Nav(){

    // this token for github
    // const token = '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';

    const {userData, setUserData} = useContext(Context);
    const {ifLoad, setIfLoad} = useContext(Context);

    const [inputValue, setInputValue] = useState('');

    // Change input value function
    function handleChange(value){
        setInputValue(value);
    }

    // Event function for searh field when we use Enter
    function onKeyUpHandler(event){
        if (event.keyCode === 13) {
            getUserData(inputValue);
        }
    }

    // Function for getting users data
    async function getUserData(username) {

        // Start loader
        setIfLoad(true);
        
        fetch(`https://api.github.com/users/${username}`, {
            method: 'GET',
            // headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `Bearer ${token}`
            // }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Stop loader
            setIfLoad(false);
            // Change users state
            if (inputValue === '') return setUserData(null);
            setUserData(data);
        });
    }

    return(
        <nav className="nav">
            <div className="container">
                <div className="nav-wrapper">
                    <div className="logo-block">
                        <img src={logo} alt="Logo image"></img>
                    </div>
                    <div className="search-block">
                        <img src={searchIconSmall} alt="Search icon"></img>
                        <Input value={inputValue} onChange={(event) => handleChange(event.target.value)} onKeyUp={onKeyUpHandler} className="search-field" type="text" placeholder="Enter GitHub username" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;