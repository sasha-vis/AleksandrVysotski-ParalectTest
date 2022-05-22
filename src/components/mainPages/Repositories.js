import React,{ useEffect, useState, useContext } from "react";
import Context from './../../context.js';

function Repositories(props){
    // default settings
    const token = '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';
    const {userData, setUserData} = useContext(Context);
    const {ifLoad, setIfLoad} = useContext(Context);

    const reposPerPage = 4;
    const pagesCount = Math.ceil(props.countRepos / reposPerPage);
    const pagesCountArr = [];
    for (let i = 1; i <= pagesCount; i++){
        pagesCountArr.push(i);
    }
    
    const [currentPage, setCurrentPage] = useState(1);
    const [reposData, setReposData] = useState([]);

    useEffect(() => {
        getReposData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [userData]);

    useEffect(() => {
        getReposData();
    }, [currentPage]);

    // Function for getting repositories data of user
    async function getReposData() {

        setIfLoad(true);

        fetch(`https://api.github.com/users/${props.username}/repos?per_page=${reposPerPage}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setIfLoad(false);
            setReposData(data);
        });
    }

    // Function for next request when we use arrows
    function nextRequest(btn){
        if (btn.closest('div').id === 'next-page-btn' && currentPage < pagesCount) {
            setCurrentPage(+currentPage+1);
        } else if (btn.closest('div').id === 'previous-page-btn' && currentPage > 1) {
            setCurrentPage(+currentPage-1);
        }
    }

    // Function for next request when we use pages buttons (1, 2, 3, 4, ...)
    function changePage(btn){
        setCurrentPage(btn.closest('li').innerHTML);
    }

    return(
        <div className="repositories">
            <h3>Repositories ({props.countRepos})</h3>
            <ul className="repos-list">
                {reposData.map((item, index) =>
                    <li key={index}>
                        <a href={item.html_url} target="_blank" className="repo-title">{item.name}</a>
                        <p className="repo-desc">{item.description}</p>
                    </li>)}
            </ul>
            <div className="margin-block"></div>
            <div className="controllers">
                <div>{currentPage*reposPerPage-(reposPerPage-1)}-{currentPage*reposPerPage>props.countRepos ? props.countRepos : currentPage*reposPerPage} of {props.countRepos} items</div>
                <div className="controllers-nav">
                    <div id="previous-page-btn" className="arrow-left" onClick={(event) => nextRequest(event.target)}><span></span></div>
                    {/* This ul with pages need if user have maximum 5 repositories, but I dont test this, maybe my application will work and without it */}
                    {pagesCount <= 5 ? 
                    <ul>
                        {pagesCountArr.map((item, index) =>
                        <li key={index}>
                            {item}
                        </li>)}
                    </ul> : 
                    <ul>
                        {/* My interesting pagination... */}
                        {pagesCountArr.map((item, index) => {
                            return (+item - currentPage <= 1 && (currentPage - +item <= 1)) || (+item === pagesCount || +item === 1) ?
                            <li className={currentPage == item ? 'current-page' : ''} key={index} data-id={index} onClick={(event) => changePage(event.target)}>
                                {item}
                            </li> : (document.querySelector(`li[data-id="${index-1}"]`) != null && (document.querySelector(`li[data-id="${index-1}"]`).innerHTML == '...' || document.querySelector(`li[data-id="${index-1}"]`).innerHTML == '') ? <li className="empty-li" key={index} data-id={index}></li> : <li className="spots" key={index} data-id={index}>...</li>)
                        })}
                    </ul>}
                    <div id="next-page-btn" className="arrow-right" onClick={(event) => nextRequest(event.target)}><span></span></div>
                </div>
            </div>
        </div>
    );
}

export default Repositories;