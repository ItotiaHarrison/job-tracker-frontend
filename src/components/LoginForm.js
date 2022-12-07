import { useState } from "react";
import { Error, FormField } from "../styles";


export default function Login(onLogin) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <div id="loginContainer">
        <section id="loginModal">
          <span className="smallText">Welcome back! 👋</span>

          <form onSubmit={handleSubmit}>
            <p>Sign in to your account</p>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">{isLoading ? "Loading..." : "Sign In"}</button>

            <FormField>
              {errors.map((err) => (
                <Error key={err}>{err}</Error>
              ))}
            </FormField>
          </form>


        </section>
      </div>

    </>
  );
}
