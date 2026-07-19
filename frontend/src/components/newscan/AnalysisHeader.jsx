import { Target, FileCheck, Award, Briefcase } from "lucide-react";

function AnalysisHeader({
    file,
    jobTitle,
    matchScore,
    atsScore,
    atsGrade,
    overallVerdict,
    onNewScan,
}) {

    const verdictColor = () => {
        switch (overallVerdict) {
            case "Excellent Match":
                return "var(--success)";

            case "Good Match":
                return "#3b82f6";

            case "Moderate Match":
                return "var(--warning)";

            case "Poor Match":
                return "var(--danger)";

            default:
                return "var(--text-secondary)";
        }
    };

    return (
        <div
            className="rounded-2xl p-7 animate-fade-in-up"
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
            }}
        >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                {/* Left */}

                <div className="flex-1">

                    <h1
                        className="text-3xl font-bold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Resume Analysis
                    </h1>

                    <p
                        className="mt-3"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        <strong>Resume :</strong>{" "}
                        {file?.name || "Resume.pdf"}
                    </p>

                    <p
                        className="mt-1"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        <strong>Job :</strong>{" "}
                        {jobTitle}
                    </p>

                    {/* Stats */}

                    <div className="flex flex-wrap gap-3 mt-6">

                        {/* Match */}

                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: "rgba(79,209,168,.15)",
                                color: "var(--success)",
                            }}
                        >
                            <Target size={17} />

                            <span className="font-medium">
                                Match {matchScore.toFixed(1)}%
                            </span>
                        </div>

                        {/* ATS */}

                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: "rgba(255,193,7,.15)",
                                color: "#f5b301",
                            }}
                        >
                            <FileCheck size={17} />

                            <span className="font-medium">
                                ATS {atsScore}%
                            </span>
                        </div>

                        {/* Grade */}

                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: "rgba(124,111,240,.15)",
                                color: "var(--accent)",
                            }}
                        >
                            <Award size={17} />

                            <span className="font-medium">
                                Grade {atsGrade}
                            </span>
                        </div>

                        {/* Verdict */}

                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: `${verdictColor()}22`,
                                color: verdictColor(),
                            }}
                        >
                            <Briefcase size={17} />

                            <span className="font-medium">
                                {overallVerdict}
                            </span>
                        </div>

                    </div>

                </div>

                {/* Right */}

                <button
                    onClick={onNewScan}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                        background: "var(--accent)",
                        color: "#fff",
                    }}
                >
                    + New Scan
                </button>

            </div>
        </div>
    );
}

export default AnalysisHeader;