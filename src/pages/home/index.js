import React, { useEffect, useState } from "react";
import { logout } from "../../utils/general";
import { useNavigate } from "react-router-dom";
import { getAuthMe } from "../../utils/api";

function Home() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState(null);
  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  const getDataUser = async () => {
    const user = await getAuthMe();
    if (user?.status === 200) {
      setDataUser(user?.data);
    } else if (user?.response?.status === 401) {
      alert("Token expired, silahkan logout terlebih dahulu!");
      setDataUser(null);
    } else {
      setDataUser(null);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div>
      <div>
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          Data User :
        </p>
        {dataUser !== null ? (
          <div>
            <img
              src={dataUser?.image}
              alt="img-dummy"
              width={100}
              height={100}
            />
            <p>
              Name : {dataUser?.firstName} {dataUser?.lastName}
            </p>
            <p>Birth Date : {dataUser?.birthDate}</p>
            <p>Email : {dataUser?.email}</p>
            <p>Phone: {dataUser?.phone}</p>
            <p>Gender: {dataUser?.gender}</p>
          </div>
        ) : (
          <p>Data Tidak Tersedia</p>
        )}
      </div>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default Home;
