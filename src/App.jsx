import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: #fff;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1rem;
`;

const UserCard = ({ user }) => {
  return (
    <Card>
      <img src={user.avatar} alt={user.first_name} />
      <h2>{`${user.first_name} ${user.last_name}`}</h2>
      <p>{user.email}</p>
    </Card>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const json = await response.json();
      setUsers(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar>
        <h1>Brand Name</h1>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>
      {loading ? (
        <Loader>
          <p>Loading...</p>
        </Loader>
      ) : (
        <CardGrid>
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </CardGrid>
      )}
    </>
  );
};

export default App;
