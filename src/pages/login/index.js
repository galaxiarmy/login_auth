import React, { useState } from "react";
import { loginAuthentication } from "../../utils/api";
import { coreService } from "../../utils/general";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      username: username,
      password: password,
      expiresInMins: 60,
    };
    if (username !== "" && password !== "") {
      const auth = await loginAuthentication(payload);
      if (auth?.status === 200) {
        coreService.setItem("isLoggedIn", true);
        coreService.setItem("accessToken", auth?.data?.token);
        navigate("/home", {
          replace: true,
        });
      } else {
        alert("Email atau Password salah!");
      }
    } else {
      alert("username dan password tidak boleh kosong!");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <input
          placeholder="username"
          onChange={(e) => {
            setUsername(e?.target?.value);
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => {
            setPassword(e?.target?.value);
          }}
        />
        <button onClick={handleSubmit}>login</button>
      </div>
    </div>
  );
}

export default Login;
