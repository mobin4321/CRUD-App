import React from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    age: 0,
  });

  const [error, setError] = React.useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addUser = { ...formData };
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      setFormData({
        name: "",
        email: "",
        age: 0,
      });
      navigate("/all");
    }
  };

  return (
    <div className="container  my-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the Data</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Form;
