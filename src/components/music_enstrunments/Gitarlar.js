import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Gitarlar Ana Sayfası
function Gitarlar() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gitarlar</h1>
      <div className="grid grid-cols-3 gap-4">
        <Link to="/gitarlar/klasik" className="p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300">Klasik Gitarlar</Link>
        <Link to="/gitarlar/akustik" className="p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300">Akustik Gitarlar</Link>
        <Link to="/gitarlar/elektro" className="p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300">Elektro Gitarlar</Link>
      </div>
    </div>
  );
}

export default Gitarlar;