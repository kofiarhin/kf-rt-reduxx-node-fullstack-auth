import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();

  const { user, isError, message } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "kofi arhin",
    email: "kofiarhin@gmail.com",
    password: "password",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerUser({ name, email, password }));
    if (!res.error) {
      navigate("/login");
    }
  };
  return (
    <div>
      <h1 className="heading">Register</h1>

      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter name"
          />

          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Email"
          />

          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <p className="error"> {message} </p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
