import { useNavigate } from "react-router-dom";
import "./Landing.scss";
import Image from "../../assets/images/undraw_mobile_ux_re_59hr 1.svg";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing__mid">
        <img src={Image} />
        <div className="landing__mid-text">
          <h1>Get things done with TODO</h1>
          <p>
            Lorem ipsum dolor sit amet, consecturer adispicing elit. Sed
            poseuere gravida parus id eu condimentum est diam quam. Condimentum
            blandit diam.
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/register")}
        className="landing__startBtn"
      >
        Get Started
      </button>
    </div>
  );
}

export default Landing;
