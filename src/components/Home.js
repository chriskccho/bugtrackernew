const Home = ({loggedIn}) => {

    return (
        <div>
            {loggedIn ? <h1>Hello {`${localStorage.getItem('username')}`}</h1> : <h1>Please log in</h1>}
        </div>
    )
}

export default Home
