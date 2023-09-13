import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    age: 0,
  });

  const [error, setError] = React.useState("");

  const { id } = useParams();

  React.useEffect(() => {
    getSingleUser();
  }, []);

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "GET",
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      setFormData(result);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const updatedUser = { ...formData };
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("Updated Successfully");
      setTimeout(() => {
        setError("");
        setFormData({
          name: "",
          email: "",
          age: 0,
        });
        navigate("/all");
      }, 1300);
    }
  };

  return (
    <div className="container  my-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit Data</h2>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleInput}
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default Update;
