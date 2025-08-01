import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "../lib/Puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth, puterReady } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const next = location.search.split("next=")[1] || "/";

  useEffect(() => {
    if (!puterReady) return; // Wait until Puter.js is loaded
    if (auth.isAuthenticated) navigate(next);
  }, [puterReady, auth.isAuthenticated, next]);

  const handleLogin = async () => {
    if (!puterReady) {
      alert("Puter.js is not ready. Please try again shortly.");
      return;
    }
    await auth.signIn();
  };

  const handleLogout = async () => {
    if (!puterReady) {
      alert("Puter.js is not ready. Please try again shortly.");
      return;
    }
    await auth.signOut();
  };

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>

          <div>
            {isLoading || !puterReady ? (
              <button className="auth-button animate-pulse" disabled>
                <p>Checking system...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={handleLogout}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={handleLogin}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
