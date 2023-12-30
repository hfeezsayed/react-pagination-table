import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(userList.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUserList(data.users));
  });

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className="container my-3 text-center">
      <h3 className="mb-3">Create Pagination in the react</h3>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>userName</th>
            <th>First Name</th>
            <th>LastName</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {records.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
