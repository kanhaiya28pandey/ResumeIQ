import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Sidebar from "../components/Sidebar";
import AnalysisHeader from "../components/newscan/AnalysisHeader";
import PerformanceDashboard from "../components/newscan/PerformanceDashboard";
import InsightsDashboard from "../components/newscan/InsightsDashboard";
import SuggestionSection from "../components/newscan/SuggestionSection";
import CoverLetterSection from "../components/newscan/CoverLetterSection";

function ScanDetails() {
    const { id } = useParams();
    const [scan, setScan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [coverLoading, setCoverLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        const loadScan = async () => {
            try {
                const res = await api.get(`/scan/${id}`);
                setScan(res.data);
            } catch (err) {
                setError(
                    err.response?.data?.detail ||
                    "Unable to load scan."
                );
            } finally {
                setLoading(false);
            }
        };
        loadScan();
    }, [id]);

    const handleCopy = () => {
        navigator.clipboard.writeText(
            coverLetter
        );

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 2000);

    };

    const handleCoverLetter = async () => {

        try {

            setCoverLoading(true);

            const res = await api.post(
                "/cover-letter-history",
                {
                    scanId: id,
                }
            );

            setCoverLetter(
                res.data.coverLetter
            );

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Unable to generate cover letter."
            );

        } finally {

            setCoverLoading(false);

        }

    };
    const showSuggestions = JSON.parse(
        localStorage.getItem("showSuggestions") ?? "true"
    );

    if (loading) {

        return (

            <div
                className="min-h-screen flex"
                style={{
                    background: "var(--bg-page)",
                }}
            >

                <Sidebar />

                <main className="flex-1 flex items-center justify-center">

                    <div
                        className="w-12 h-12 rounded-full border-4 animate-spin"
                        style={{
                            borderColor: "var(--accent)",
                            borderTopColor: "transparent",
                        }}
                    />

                </main>

            </div>

        );

    }

    if (error) {

        return (

            <div
                className="min-h-screen flex"
                style={{
                    background: "var(--bg-page)",
                }}
            >

                <Sidebar />

                <main className="flex-1 flex items-center justify-center">

                    <div
                        className="rounded-2xl p-8"
                        style={{
                            background: "var(--bg-card)",
                            border:
                                "1px solid var(--border-subtle)",
                        }}
                    >

                        <h2
                            className="text-xl font-semibold"
                            style={{
                                color: "var(--danger)",
                            }}
                        >
                            {error}
                        </h2>

                    </div>

                </main>

            </div>

        );

    }

    return (

        <div
            className="min-h-screen flex"
            style={{
                background: "var(--bg-page)",
            }}
        >

            <Sidebar />

            <main className="flex-1 p-8 space-y-8">
                <AnalysisHeader
                    file={{
                        name: "Saved Resume",
                    }}
                    jobTitle={scan.jobTitle}
                    matchScore={scan.matchScore}
                    atsScore={scan.atsScore}
                    atsGrade={scan.atsGrade}
                    overallVerdict={scan.overallVerdict}
                    onNewScan={() => window.history.back()}
                />

                <PerformanceDashboard
                    detectedDomain={scan.detectedDomain}
                    matchScore={scan.matchScore}
                    skillScore={scan.skillScore}
                    semanticScore={scan.semanticScore}
                    atsScore={scan.atsScore}
                    atsGrade={scan.atsGrade}
                    atsBreakdown={scan.atsBreakdown}
                    matchedSkills={scan.matchedSkills}
                    missingSkills={scan.missingSkills}
                    criticalMissingSkills={
                        scan.criticalMissingSkills
                    }
                    supportingMissingSkills={
                        scan.supportingMissingSkills
                    }
                    matchedWeight={scan.matchedWeight}
                    totalWeight={scan.totalWeight}
                    suggestions={
                        scan.improveSuggestions
                    }
                />

                <InsightsDashboard
                    summary={scan.summary}
                    overallVerdict={
                        scan.overallVerdict
                    }
                    experienceLevel={
                        scan.experienceLevel
                    }
                    strengths={scan.strengths}
                    weaknesses={scan.weaknesses}
                    sections={scan.sections}
                    matchedSkills={
                        scan.matchedSkills
                    }
                    missingSkills={
                        scan.missingSkills
                    }
                    criticalMissingSkills={
                        scan.criticalMissingSkills
                    }
                    supportingMissingSkills={
                        scan.supportingMissingSkills
                    }
                    detectedDomain={
                        scan.detectedDomain
                    }
                    skillScore={scan.skillScore}
                    semanticScore={
                        scan.semanticScore
                    }
                    atsGrade={scan.atsGrade}
                />

                {showSuggestions && (
                    <>
                        <SuggestionSection
                            suggestions={scan.improveSuggestions}
                        />

                        <CoverLetterSection
                            coverLetter={coverLetter}
                            coverLoading={coverLoading}
                            copied={copied}
                            onGenerate={handleCoverLetter}
                            onCopy={handleCopy}
                        />
                    </>
                )}

            </main>

        </div>

    );

}

export default ScanDetails;

