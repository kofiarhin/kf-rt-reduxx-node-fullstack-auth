import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password });
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
