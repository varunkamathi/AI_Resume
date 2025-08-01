import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "../lib/Puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, kv, puterReady } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [wiping, setWiping] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) || [];
    setFiles(files);
  };

  useEffect(() => {
    if (puterReady) loadFiles();
  }, [puterReady]);

  useEffect(() => {
    if (puterReady && !isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [puterReady, isLoading, auth.isAuthenticated]);

  const handleDelete = async () => {
    if (!puterReady) return;
    setWiping(true);
    try {
      await Promise.all(files.map((file) => fs.delete(file.path)));
      await kv.flush();
      await loadFiles();
    } catch (err) {
      console.error("Failed to wipe app:", err);
    }
    setWiping(false);
  };

  if (isLoading || !puterReady) {
    return <div className="text-center py-10">Loading Puter environment...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error}
        <button onClick={clearError} className="ml-2 underline text-blue-500">
          Clear
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Authenticated as: <span className="text-blue-600">{auth.user?.username}</span>
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Existing files:</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div key={file.id} className="bg-gray-100 px-4 py-2 rounded-md">
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleDelete}
        disabled={wiping}
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        {wiping ? "Wiping..." : "Wipe App Data"}
      </button>
    </div>
  );
};

export default WipeApp;
