/* React & Context */
import { AppContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginHandler } from "./utils/utils";

/* Shadcn Comps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* Toast and spinner and lucide comps */
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { pageLoading, setPageLoading } = useContext(AppContext);

  useEffect(() => {
    setPageLoading(true);

    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      setPageLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginHandler(userData);

    if (response.status == 200) {
      localStorage.setItem("token", response.data);
      navigate("/dashboard");
    } else {
      toast.error(response.data);
      setLoading(false);
    }

    // setUserData({          Enable this if you want to reset form everytime user enters and submit email or password incorrect
    //   email: "",
    //   password: "",
    // });
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  if (pageLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <CircleLoader size={400} />;
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-[Helvetica]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  value={userData.email}
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  value={userData.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-black hover:underline"
              >
                Forgot password?
              </a>
            </div> */}

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-gray-600">
          <div>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-black hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
