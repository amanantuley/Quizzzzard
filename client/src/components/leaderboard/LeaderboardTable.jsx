import React, { useMemo, useState } from "react";
import "./leaderboard.css";

/**
 * @param {{
 *  items?: Array<{ userName?: string, score?: number, total?: number, quizTitle?: string }>,
 *  isLoading?: boolean,
 *  onRefresh?: () => void
 * }} props
 */
export default function LeaderboardTable({ items = [], isLoading = false, onRefresh }) {
	const [sort, setSort] = useState({ key: "score", dir: "desc" });

	const sorted = useMemo(() => {
		const data = Array.isArray(items) ? [...items] : [];
		const getPct = (x) => {
			const total = Number(x?.total || 0) || 0;
			const score = Number(x?.score || 0) || 0;
			return total > 0 ? (score / total) : 0;
		};
		data.sort((a, b) => {
			if (sort.key === "user") {
				return sort.dir === "asc"
					? String(a.userName || "").localeCompare(String(b.userName || ""))
					: String(b.userName || "").localeCompare(String(a.userName || ""));
			}
			// default: score percentage
			const pa = getPct(a);
			const pb = getPct(b);
			return sort.dir === "asc" ? pa - pb : pb - pa;
		});
		return data.map((x, i) => ({ ...x, rank: i + 1, pct: getPct(x) }));
	}, [items, sort]);

	const changeSort = (key) => {
		setSort((prev) => ({ key, dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc" }));
	};

	return (
		<section className="lb" aria-labelledby="leaderboard-heading">
			<div className="lb-header">
				<h2 id="leaderboard-heading">Top Performers</h2>
				<div className="lb-actions">
					{onRefresh && (
						<button type="button" className="lb-btn" onClick={onRefresh} disabled={isLoading}>
							{isLoading ? "Refreshing…" : "Refresh"}
						</button>
					)}
				</div>
			</div>

			<div className="lb-table-wrap">
				<table className="lb-table">
					<thead>
						<tr>
							<th scope="col" className="col-rank" aria-sort="none">#</th>
							<th scope="col">
								<button className="lb-th" type="button" onClick={() => changeSort("user")} aria-label="Sort by user">
									User{sort.key === "user" ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
								</button>
							</th>
							<th scope="col">
								<button className="lb-th" type="button" onClick={() => changeSort("score")} aria-label="Sort by score">
									Score{sort.key === "score" ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
								</button>
							</th>
							<th scope="col" className="col-pct">Accuracy</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							[...Array(5)].map((_, i) => (
								<tr key={`sk-${i}`} className="lb-skeleton">
									<td className="col-rank">{i + 1}</td>
									<td>
										<div className="sk-line" style={{ width: "140px" }} />
									</td>
									<td>
										<div className="sk-line" style={{ width: "80px" }} />
									</td>
									<td className="col-pct">
										<div className="sk-line" style={{ width: "60px" }} />
									</td>
								</tr>
							))
						) : sorted.length === 0 ? (
							<tr>
								<td colSpan={4} className="lb-empty">
									No scores yet. Be the first to play!
								</td>
							</tr>
						) : (
							sorted.map((row) => (
								<tr key={`${row.userName}-${row.rank}`}>
									<td className="col-rank">
										<span className={row.rank <= 3 ? `medal rank-${row.rank}` : "rank"} aria-label={`Rank ${row.rank}`}>
											{row.rank}
										</span>
									</td>
									<td>
										<div className="user">
											<div className="avatar" aria-hidden="true">{String(row.userName || "?").charAt(0).toUpperCase()}</div>
											<div className="meta">
												<div className="name">{row.userName || "Unknown"}</div>
												<div className="sub">{row.quizTitle || "Quiz"}</div>
											</div>
										</div>
									</td>
									<td>
										<span className="score">
											{row.score ?? 0}
											<span className="total">/{row.total ?? 0}</span>
										</span>
									</td>
									<td className="col-pct">
										<div className="pct-bar" aria-label={`Accuracy ${(row.pct * 100).toFixed(0)}%`}>
											<div className="pct-fill" style={{ width: `${Math.round(row.pct * 100)}%` }} />
											<span className="pct-label">{Math.round(row.pct * 100)}%</span>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
