import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AIDisabledCard({
    title,
    description,
}) {
    const navigate = useNavigate();

    return (
        <div
            className="rounded-2xl p-8 animate-fade-in"
            style={{
                background: "var(--bg-card)",
                border: "1px dashed var(--border-subtle)",
            }}
        >
            <div className="flex items-start gap-4">

                <div
                    className="p-3 rounded-xl"
                    style={{
                        background: "rgba(124,111,240,.12)",
                    }}
                >
                    <Sparkles
                        size={24}
                        style={{
                            color: "var(--accent)",
                        }}
                    />
                </div>

                <div className="flex-1">

                    <h3
                        className="text-xl font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {title}
                    </h3>

                    <p
                        className="mt-2"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {description}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/profile", {
                                state: {
                                    tab: "preferences",
                                },
                            })
                        }
                        className="mt-6 flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: "var(--accent)",
                            color: "#fff",
                        }}
                    >
                        Enable AI Suggestions

                        <ArrowRight size={18} />
                    </button>

                </div>

            </div>
        </div>
    );
}

export default AIDisabledCard;