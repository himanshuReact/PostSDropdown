import "./styles.css";
import axios from "axios";
import { useState } from "react";

const UserDropdown = ({ data, users, setPosts }) => {
  console.log("users are final", users);
  const handleUser = (e) => {
    console.log(e.target.value);
    const posts = data.filter((row) => row.userId == e.target.value);
    setPosts(posts.map((post) => post.title));
  };

  return (
    <div>
      <div>
        <select onChange={(e) => handleUser(e)}>
          {users.map((row, index) => (
            <option value={row}>{row}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useState(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((data) => {
      setData(data.data);
      uniqueUsers(data.data);
      console.log("Test tetst data", data);
    });
  }, []);

  const uniqueUsers = (data, setPosts) => {
    console.log("data in unique users", data);
    let users = data.map((user) => user.userId);
    users = [...new Set(users)];
    console.log("users are", users);
    setUsers(users);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <UserDropdown data={data} users={users} setPosts={setPosts} />

      {posts.map((post, index) => {
        return (
          <div id={index}>
            <div> {post}</div>
          </div>
        );
      })}
    </div>
  );
}
