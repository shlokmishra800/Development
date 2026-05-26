
import { useState } from "react";

const Login = () => {
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const handleLogin = () => {
    alert("Login clicked (implement auth)");
  };

  const handleCreateAccount = () => {
    alert(`New account created for ${newUser.name}`);
    setShowNewAccount(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-red-600 to-black flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {!showNewAccount ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-2 active:scale-95"
            >
              Sign In
            </button>
            <p
              className="text-blue-600 cursor-pointer text-sm"
              onClick={() => setShowNewAccount(true)}
            >
              Don't have an account? Create new one
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={handleCreateAccount}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-2 active:scale-95"
            >
              Create Account
            </button>
            <p
              className="text-blue-600 cursor-pointer text-sm"
              onClick={() => setShowNewAccount(false)}
            >
              Back to Sign In
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
