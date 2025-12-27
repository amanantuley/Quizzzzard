const fetch = global.fetch;

function fallbackQuiz({ topic, count, difficulty }) {
	const title = `Quick ${topic} Quiz (${difficulty})`;
	const description = `Auto-generated practice quiz on ${topic}.`;
	const questions = Array.from({ length: count }).map((_, i) => {
		const idx = Math.floor(Math.random() * 4);
		return {
			text: `Question ${i + 1}: Basic concept in ${topic}?`,
			options: [
				`${topic} fact A`,
				`${topic} fact B`,
				`${topic} fact C`,
				`${topic} fact D`,
			],
			answerIndex: idx,
		};
	});
	return { title, description, questions };
}

async function callOpenAI({ topic, count, difficulty }) {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) return null;
	if (typeof fetch !== "function") return null;

	const sys = "You generate multiple-choice quizzes in strict JSON.";
	const user = `Create a ${count}-question multiple-choice quiz on "${topic}" (difficulty: ${difficulty}).
Return JSON with keys: title, description, questions[]. Each question has text, options[4], answerIndex.`;

	const body = {
		model: process.env.OPENAI_MODEL || "gpt-4o-mini",
		messages: [
			{ role: "system", content: sys },
			{ role: "user", content: user }
		],
		temperature: 0.4,
	};

	const resp = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${apiKey}`,
		},
		body: JSON.stringify(body),
	});
	if (!resp.ok) return null;
	const data = await resp.json();
	const content = data?.choices?.[0]?.message?.content;
	try {
		const parsed = JSON.parse(content);
		if (!parsed?.questions?.length) return null;
		return parsed;
	} catch {
		return null;
	}
}

async function generateQuiz({ topic, count = 10, difficulty = "medium" }) {
	// Try LLM; if missing or fails, fallback
	try {
		const llm = await callOpenAI({ topic, count, difficulty });
		if (llm) return llm;
	} catch {}
	return fallbackQuiz({ topic, count, difficulty });
}

module.exports = { generateQuiz };
