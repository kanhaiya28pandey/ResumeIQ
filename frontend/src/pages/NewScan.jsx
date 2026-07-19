import { useState } from "react";
import api from "../api/axiosInstance";
import DashboardLayout from "../layouts/DashboardLayout";
import UploadForm from "../components/newscan/UploadForm";
import AnalysisHeader from "../components/newscan/AnalysisHeader";
import PerformanceDashboard from "../components/newscan/PerformanceDashboard";
import SuggestionSection from "../components/newscan/SuggestionSection";
import CoverLetterSection from "../components/newscan/CoverLetterSection";
import InsightsDashboard from "../components/newscan/InsightsDashboard";
import AIDisabledCard from "../components/newscan/AIDisabledCard";

function NewScan() {
    const [file, setFile] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [coverLoading, setCoverLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const showSuggestions = JSON.parse(
        localStorage.getItem("showSuggestions") ?? "true"
    );
    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please upload a resume.");
            return;
        }
        setError("");
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobTitle", jobTitle);
        formData.append("jobDescription", jobDescription);

        try {
            setLoading(true);
            const res = await api.post("/analyze", formData);
            setResult(res.data);
            setCoverLetter("");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCoverLetter = async () => {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jobDescription);

        try {
            setCoverLoading(true);
            const res = await api.post(
                "/cover-letter",
                formData
            );

            setCoverLetter(res.data.coverLetter);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Unable to generate cover letter."
            );
        } finally {
            setCoverLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(coverLetter);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleNewScan = () => {
        setResult(null);
        setFile(null);
        setJobTitle("");
        setJobDescription("");
        setCoverLetter("");
        setError("");
        setCopied(false);
    }
    return (
        <DashboardLayout>
            {!result ? (
                <>
                    <div>
                        <h1
                            className="text-3xl font-bold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            New Scan
                        </h1>

                        <p
                            className="mt-2"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Upload your resume and compare it with any job description.
                        </p>
                    </div>

                    <UploadForm
                        file={file}
                        setFile={setFile}
                        jobTitle={jobTitle}
                        setJobTitle={setJobTitle}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        loading={loading}
                        error={error}
                        handleAnalyze={handleAnalyze}
                    />

                </>
            ) : (
                <>

                    <AnalysisHeader
                        file={file}
                        jobTitle={jobTitle}
                        matchScore={result.matchScore}
                        atsScore={result.atsScore}
                        atsGrade={result.atsGrade}
                        overallVerdict={result.overallVerdict}
                        onNewScan={handleNewScan}
                    />

                    <PerformanceDashboard
                        detectedDomain={result.detectedDomain}
                        matchScore={result.matchScore}
                        skillScore={result.skillScore}
                        semanticScore={result.semanticScore}
                        atsScore={result.atsScore}
                        atsGrade={result.atsGrade}
                        atsBreakdown={result.atsBreakdown}
                        matchedSkills={result.matchedSkills}
                        missingSkills={result.missingSkills}
                        criticalMissingSkills={result.criticalMissingSkills}
                        supportingMissingSkills={result.supportingMissingSkills}
                        matchedWeight={result.matchedWeight}
                        totalWeight={result.totalWeight}
                        suggestions={result.improveSuggestions}
                    />

                    <InsightsDashboard
                        summary={result.summary}
                        overallVerdict={result.overallVerdict}
                        experienceLevel={result.experienceLevel}
                        strengths={result.strengths}
                        weaknesses={result.weaknesses}
                        sections={result.sections}
                        matchedSkills={result.matchedSkills}
                        missingSkills={result.missingSkills}
                        criticalMissingSkills={result.criticalMissingSkills}
                        supportingMissingSkills={result.supportingMissingSkills}
                        detectedDomain={result.detectedDomain}
                        skillScore={result.skillScore}
                        semanticScore={result.semanticScore}
                        atsGrade={result.atsGrade}
                    />

                    {showSuggestions ? (
                        <>
                            <SuggestionSection
                                suggestions={result.improveSuggestions}
                            />

                            <CoverLetterSection
                                coverLetter={coverLetter}
                                coverLoading={coverLoading}
                                copied={copied}
                                onGenerate={handleCoverLetter}
                                onCopy={handleCopy}
                            />
                        </>
                    ) : (
                        <>
                            <AIDisabledCard
                                title="AI Suggestions Disabled"
                                description="AI-powered resume improvement suggestions are currently disabled."
                                buttonText="Enable AI Suggestions"
                            />

                            <AIDisabledCard
                                title="AI Cover Letter Disabled"
                                description="AI-generated cover letters are currently disabled."
                                buttonText="Enable AI Suggestions"
                            />
                        </>
                    )}
                </>
            )}

        </DashboardLayout>
    );
}
export default NewScan;