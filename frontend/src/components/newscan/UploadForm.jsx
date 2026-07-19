import { UploadCloud, FileText } from "lucide-react";

function UploadForm({
  file,
  setFile,
  jobTitle,
  setJobTitle,
  jobDescription,
  setJobDescription,
  loading,
  error,
  handleAnalyze,
}) {
  return (
    <form
      onSubmit={handleAnalyze}
      className="p-6 rounded-2xl flex flex-col gap-5 animate-fade-in-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div>
        <label
          className="text-sm block mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Resume (PDF or DOCX)
        </label>

        <label
          className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl cursor-pointer transition-all"
          style={{
            background: "var(--bg-page)",
            border: "2px dashed var(--border-subtle)",
          }}
        >
          {file ? (
            <>
              <FileText size={34} style={{ color: "var(--accent)" }} />
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {file.name}
              </p>
            </>
          ) : (
            <>
              <UploadCloud
                size={34}
                style={{ color: "var(--text-muted)" }}
              />

              <div className="text-center">
                <p
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Click to upload your resume
                </p>

                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  PDF or DOCX (Max 10MB)
                </p>
              </div>
            </>
          )}

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>

      <div>
        <label
          className="text-sm block mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Job Title
        </label>

        <input
          type="text"
          value={jobTitle}
          required
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Software Engineer"
          className="w-full px-4 py-3 rounded-xl outline-none"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label
          className="text-sm block mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Job Description
        </label>

        <textarea
          rows={8}
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full px-4 py-3 rounded-xl outline-none resize-none"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {error && (
        <p style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="py-3 rounded-xl font-semibold"
        style={{
          background: "var(--accent)",
          color: "#fff",
        }}
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>
    </form>
  );
}

export default UploadForm;