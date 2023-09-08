import { useState, useEffect } from "react";
import { loginUser, reset } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);
  const [formData, setFormData] = useState({
    email: "kofiarhin@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    const res = await dispatch(loginUser({ email, password }));

    if (!res.error) {
      navigate("/profile");
    }
  };
  return (
    <div>
      <h1 className="heading">Login</h1>

      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
