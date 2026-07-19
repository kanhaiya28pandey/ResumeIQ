function ImprovementRoadmap({ roadmap = [] }) {
    if (roadmap.length === 0) {
        return (
            <div
                className=" rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
                style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)"
                }}
            >
                <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "var(--text-primary)" }}
                >
                    🎯 Improvement Roadmap
                </h3>

                <p
                    style={{ color: "var(--text-secondary)" }}
                >
                    Great! No major skill gaps found 🎉
                </p>
            </div>
        );
    }

    return (

        <div
            className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)"
            }}
        >

            <h3
                className="text-xl font-semibold mb-6"
                style={{
                    color: "var(--text-primary)"
                }}
            >
                🎯 Improvement Roadmap
            </h3>

            <div className="space-y-5">

                {roadmap.map((item, index) => (

                    <div
                        key={item.skill}
                        className=" rounded-xl p-2 transition-all duration-300 hover:bg-white/5 animate-fade-in-up "
                        style={{
                            animationDelay: `${index * 120}ms`,
                            animationFillMode: "forwards",
                        }}
                    >

                        <div className="flex justify-between mb-2">
                            <span
                                className="font-medium"
                                style={{
                                    color: "var(--text-primary)"
                                }}
                            >
                                {item.skill}
                            </span>

                            <span
                                className="text-sm"
                                style={{
                                    color: "var(--accent)"
                                }}
                            >
                                {item.increase}
                            </span>
                        </div>

                        <div
                            className="h-2 rounded-full overflow-hidden"
                            style={{
                                background: "var(--border-subtle)"
                            }}
                        >

                            <div
                                className=" h-full rounded-full transition-all duration-700 ease-out "
                                style={{
                                    width: `${item.progress}%`,
                                    background:
                                        "linear-gradient(90deg,#7C6FF0,#4FD1A8)"
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ImprovementRoadmap;