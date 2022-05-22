import userNotFound from './../../images/UserNotFound.png';

function IfNotExists(){
    return(
        <div className="if_empty">
            <img className="not-found-img" src={userNotFound} alt="User not found icon"></img>
            <p className="text-block">
                User not found
            </p>
        </div>
    );
}

export default IfNotExists;