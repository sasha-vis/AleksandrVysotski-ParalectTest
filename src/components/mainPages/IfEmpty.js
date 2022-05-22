import searchIcon from './../../images/SearchIcon.png';

function IfEmpty(){
    return(
        <div className="if_empty">
            <img src={searchIcon} alt="Search icon"></img>
            <p className="text-block">
                Start with searching<br/>a GitHub user
            </p>
        </div>
    );
}

export default IfEmpty;