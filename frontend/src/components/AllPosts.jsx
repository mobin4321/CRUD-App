import React from "react";
import Card from "../components/Card";

function AllPosts() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  };

  const getData = async () => {
    const response = await fetch("http://localhost:5000/", {
      method: "GET",
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      setData(result);
    }
  };

  // data? means that this will not run if data is empty (optional rendering)
  const cards = data?.map((card) => (
    <Card
      key={card._id}
      id={card._id}
      name={card.name}
      email={card.email}
      age={card.age}
      handleDelete={() => deleteData(card._id)}
    />
  ));
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center ">All Data</h2>
      <div className="row ">{cards}</div>
    </div>
  );
}

export default AllPosts;
