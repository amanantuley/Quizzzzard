export async function generateQuiz({ topic, count = 10, difficulty = "medium" }) {
	const base = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
	const resp = await fetch(`${base}/ai/generate-quiz`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ topic, count, difficulty }),
	});
	if (!resp.ok) throw new Error("Failed to generate quiz");
	return resp.json();
}
