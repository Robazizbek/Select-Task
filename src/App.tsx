import React, { useState, useEffect, useCallback } from "react";
import { UserSelect } from "./components/UserSelect/UserSelect";
import "./App.css";
import { User } from "types/types";

const fetchUsers = async (page: number): Promise<User[]> => {
  const response = await fetch(
    `https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=50`
  );
  const data = await response.json();
  return data.data;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadUsers = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const data = await fetchUsers(page);
    setUsers((prevState) => [...prevState, ...data]);
    setLoading(false);

    if (data.length < 50) {
      setHasMore(false);
    }
  }, [page, users]);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const renderUserOption = (user: User) => (
    <div className="user-dropdown-item" key={user.id}>
      <div className="user-icon">{user.last_name[0]}</div>
      <div className="user-details">
        <div className="user-name">{`${user.last_name} ${user.first_name}`}</div>
        {user.job && <div className="user-job">{user.job}</div>}
      </div>
    </div>
  );

  const userLabel = (user: User) => `${user.last_name} ${user.first_name}`;

  return (
    <div className="App">
      <UserSelect
        options={users}
        selectedOption={selectedUser as User}
        onOptionSelect={handleSelectUser}
        renderOption={renderUserOption}
        label={userLabel}
        hasMore={hasMore}
        loading={loading}
        onScrollEnd={() => setPage((prevPage) => prevPage + 1)}
      />
    </div>
  );
};

export default App;
