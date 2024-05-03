import { Button } from "@/components/ui/button";
import LoginImg from "../assets/hero_healthcare.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
        navigate("/login");
      }
    });
  }, []);

  const navigationHandler = () => {
    navigate("/stats");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white h-[100vh] w-[100vw] rounded-lg p-8 flex flex-col items-center justify-center gap-y-10">
        <div className="flex justify-center">
          <div className="rounded-full p-2 mb-4">
            <img src={LoginImg} alt="Icon" />
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <Button onClick={navigationHandler}>Monitor your health</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
