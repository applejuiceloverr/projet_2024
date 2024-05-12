const HomeUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1 className="text-white">Welcome to your personal home page, {user.nom || user.username}!</h1>
      </div>
    );
  };
  export default HomeUser;