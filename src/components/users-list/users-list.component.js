import { UserComponent } from '../user/user.component';
import './users-list.css';
import { userClicked } from '../../services/users.service';
import { UserSearchComponent } from '../user-search/user-search.component';

export const UsersListComponent = ({ 
    users = [],
    term = '',
    loading = true,
    onKeyUpHandler,
    updateUser,
    deleteUser
}) => {
    return (
        loading ? 
            (<header className='text-center'>
                <h1>Loading...</h1>
            </header>) :
            <>
                <header className='text-center'>
                    <h2>List of Users: ({users.length})</h2>
                    <div>
                        <UserSearchComponent term={term} onKeyUpHandler={onKeyUpHandler} />
                    </div>
                </header>
                <main>
                    <ul className='users-list'>
                    {   
                        users.length ? 
                        users.map(user => {
                            return (
                                <li key={user.id}> 
                                    <UserComponent 
                                        user={user}
                                        onClickHandler={userClicked}
                                        followersHandler={updateUser}
                                        deleteUser={deleteUser}
                                    />
                                </li>
                            );
                        }) :
                        (
                            <li> 
                                <p>No Users Found</p>
                            </li>
                        )
                    }
                    </ul>
                </main>
            </>
    );
}