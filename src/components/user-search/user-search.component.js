export const UserSearchComponent = ({ term = '', onKeyUpHandler }) => {
    return (
        <>
            <label htmlFor='user-search'>Search User: &nbsp;</label>
            <input id='user-search' type='text' value={term} onChange={onKeyUpHandler} />
        </>
    );
}