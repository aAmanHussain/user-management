import { loadFollowers } from '../../services/users.service';
import './user.css';

export const UserComponent = ({ user = [], onClickHandler, followersHandler, deleteUser }) => {
    const { login, avatar_url: avatarUrl, followers = [], followersLoaded } = user;
    
    const loadUserFollowers = async () => {
        try {
            const response = await loadFollowers(login);
            const data = await response.json();
            user.followersLoaded = true;
            user.followers = data;
            followersHandler(user);
        } catch(ex) {
            user.followersLoaded = true;
            user.followers = [];
            followersHandler(user);
        }
    };
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th colSpan="2">
                        <h4 className='user-login' onClick={(event) => onClickHandler(event, user)}>{login}</h4>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Avatar</td>
                    <td>
                        <img className='avatar' src={avatarUrl} alt={login} /> 
                    </td>
                </tr>
                <tr>
                    <td>Followers:</td>
                    <td>
                        {   
                            (
                                followersLoaded ? 
                                (
                                    (followers ? followers.length: 0)
                                )
                                : <input type='button' onClick={loadUserFollowers} value='LOAD FOLLOWERS' />
                            )
                        }
                    </td>
                </tr>
                <tr>
                    <td>Remove</td>
                    <td>
                        <input type='button' onClick={() => deleteUser(user)} value='DELETE USER' /> 
                    </td>
                </tr>
            </tbody>
        </table>
    );
}