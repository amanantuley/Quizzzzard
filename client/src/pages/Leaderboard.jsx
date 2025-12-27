import React, { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/scores/top`)
      .then((r) => setList(Array.isArray(r.data) ? r.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <LeaderboardTable items={list} isLoading={loading} onRefresh={load} />
    </div>
  );
}
