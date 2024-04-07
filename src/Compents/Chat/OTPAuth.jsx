import React, { useState } from "react";
import axios from "axios";

const OTPAuth = ({ onOTPVerified }) => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);

  const sendOTP = async () => {
    try {
      await axios.post("https://stackoverflow-backendagain.onrender.com/sendOTP", {
        emailAddress: email,
      });
      setIsOTPSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post("https://stackoverflow-backendagain.onrender.com/verifyOTP", {
        enteredOTP: otp,
      });
      onOTPVerified();
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      {!isOTPSent ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default OTPAuth;
