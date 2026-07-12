import { useState } from "react";
import { UploadCloud, FileText, Sparkles, Copy, Check } from "lucide-react";
import api from "../api/axiosInstance";
import Sidebar from "../components/Sidebar";
import ScoreRing from "../components/ScoreRing";
import SkillTag from "../components/SkillTag";

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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please upload a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    setLoading(true);
    try {
      const res = await api.post("/analyze", formData);
      setResult(res.data);
      setCoverLetter("");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverLetter = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    setCoverLoading(true);
    try {
      const res = await api.post("/cover-letter", formData);
      setCoverLetter(res.data.coverLetter);
    } catch (err) {
      setError(err.response?.data?.detail || "Could not generate cover letter");
    } finally {
      setCoverLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-page)" }}>
      <Sidebar />

      <div className="flex-1 p-8 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          New Scan
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          Upload your resume and paste a job description to get started
        </p>

        <form
          onSubmit={handleAnalyze}
          className="p-6 rounded-2xl mb-8 flex flex-col gap-4 animate-fade-in-up"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div>
            <label className="text-sm block mb-2" style={{ color: "var(--text-secondary)" }}>Resume (PDF or DOCX)</label>
            <label
              className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl cursor-pointer"
              style={{ background: "var(--bg-page)", border: "1px dashed var(--border-subtle)" }}
            >
              {file ? (
                <>
                  <FileText size={28} style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>{file.name}</span>
                </>
              ) : (
                <>
                  <UploadCloud size={28} style={{ color: "var(--text-muted)" }} />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>Click to upload your resume</span>
                </>
              )}
              <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Job Title</label>
            <input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg outline-none"
              style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              placeholder="Backend Developer"
            />
          </div>

          <div>
            <label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Job Description</label>
            <textarea
              required
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg outline-none resize-none"
              style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              placeholder="Paste the job description here..."
            />
          </div>

          {error && <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {loading && <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>

        {result && (
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div
              className="p-6 rounded-2xl flex items-center justify-around"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <ScoreRing score={result.matchScore} label="Match Score" />
              <ScoreRing score={result.atsScore} label="ATS Score" />
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <h2 className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Matched Skills</h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {result.matchedSkills.length === 0 ? (
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No matched skills found</p>
                ) : (
                  result.matchedSkills.map((s) => <SkillTag key={s} skill={s} matched />)
                )}
              </div>

              <h2 className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Missing Skills</h2>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.length === 0 ? (
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No missing skills, great match!</p>
                ) : (
                  result.missingSkills.map((s) => <SkillTag key={s} skill={s} matched={false} />)
                )}
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <h2 className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Suggestions to Improve</h2>
              <ul className="flex flex-col gap-2">
                {result.improveSuggestions.map((s, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)" }}>•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Cover Letter</h2>
                {!coverLetter && (
                  <button
                    onClick={handleCoverLetter}
                    disabled={coverLoading}
                    className="text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    {coverLoading ? (
                      <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Sparkles size={14} />
                    )}
                    {coverLoading ? "Generating..." : "Generate Cover Letter"}
                  </button>
                )}
              </div>

              {coverLetter && (
                <div className="relative">
                  <button
                    onClick={handleCopy}
                    className="absolute top-0 right-0 text-xs px-2 py-1 rounded-md flex items-center gap-1"
                    style={{ background: "var(--bg-page)", color: "var(--text-secondary)" }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <p className="text-sm whitespace-pre-line mt-8" style={{ color: "var(--text-secondary)" }}>
                    {coverLetter}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewScan;