import React, { useContext } from 'react';

import Context from './../../context.js';

import followers from './../../images/followers.png';
import following from './../../images/following.png';

import NoRepos from './../../images/NoRepos.png';

import Repositories from './Repositories.js';

function IfExists(){

    const {userData} = useContext(Context);

    // Actions to create 'k' symbol when count of followes or following more then 1000

    let followersString = String(userData.followers);
    let followingString = String(userData.following);

    if(followingString.length == 4) {
        if(followingString[1] == 0) {
            followingString = followingString[0] + 'k';
        } else {
            followingString = followingString[0] + '.' + followingString[1] + 'k';
        }
    } else if (followingString.length == 5) {
        if(followingString[2] == 0) {
            followingString = followingString[0] + followingString[1] + 'k';
        } else {
            followingString = followingString[0] + followingString[1] + '.' + followingString[2] + 'k';
        }
    }

    if(followersString.length == 4) {
        if(followersString[1] == 0) {
            followersString = followersString[0] + 'k';
        } else {
            followersString = followersString[0] + '.' + followersString[1] + 'k';
        }
    } else if (followersString.length == 5) {
        if(followersString[2] == 0) {
            followersString = followersString[0] + followersString[1] + 'k';
        } else {
            followersString = followersString[0] + followersString[1] + '.' + followersString[2] + 'k';
        }
    }

    return(
        <div className="if_exists">
            <div className='info'>
                <img src={userData.avatar_url}></img>
                <div className='name'>{userData.name}</div>
                <a href={userData.html_url} target='_blank' >{userData.login}</a>
                <div className='follow-block'>
                    <div>
                        <img src={followers} alt='Followers icon'></img>
                        <span>{followersString} followers</span>
                    </div>
                    <div>
                        <img src={following} alt='Following icon'></img>
                        <span>{userData.following} following</span>
                    </div>
                </div>
            </div>
            <div className="repos-block">
                {userData.public_repos !== 0 ? <Repositories username={userData.login} countRepos={userData.public_repos} /> : 
                    <div className='no-repos'>
                        <img className="not-repos-img" src={NoRepos} alt="No repositories icon"></img>
                        <p className="text-block">
                            Repository list is empty
                        </p>
                    </div>}
            </div>
        </div>
    );
}

export default IfExists;