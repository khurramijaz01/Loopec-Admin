import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../schema/authSchema";
import "./Login.css";
import { EmployeeData, LoginCall } from "../../Apis/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../../assets/Logo.svg";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, setEmployeeData } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("fcm_token") || "dummy-device-token";
    setDeviceToken(token);
  }, []);

  const handleLogin = async (values) => {

    const data = {
      userName: values.userName,
      password: values.password,
      DeviceToken: deviceToken,
    };

    try {
      setIsLoading(true);
      const response = await LoginCall(data);
      console.log(response, "Login Call");

      if (response?.data?.errorCode === 200) {
        const user = response?.data?.data;
        const token = user?.accessToken;

        console.log(user, "USerrr");
        await login(user, token);

        if (user?.EmployeeId) {
          getEmployeeData(user?.EmployeeId);
        }
        toast.success("Login Successful!");
      } else {
        toast.error(
          "Login Failed: " + (response?.data?.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmployeeData = async (employeeId) => {
    console.log(employeeId, "test");
    try {
      const response = await EmployeeData(employeeId);
      if (response?.data?.status === 200) {
        setEmployeeData(response?.data?.result);
      }
      console.log(response, "Employee Data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={Logo} alt="Logo" />
          <p>Welcome back! Please sign in to your account.</p>
        </div>

        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <span
                    className="password-visibility-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setShowPassword((prev) => !prev);
                      }
                    }}
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isLoading ? <ClipLoader size={18} color="#fff" /> : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
