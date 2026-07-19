import { useState } from "react";
import { FileText, Copy, Download, Sparkles, ChevronDown, ChevronRight, } from "lucide-react";
import { Document, Packer, Paragraph, } from "docx";
import { saveAs } from "file-saver";

function CoverLetterSection({
  coverLetter,
  coverLoading,
  copied,
  onGenerate,
  onCopy,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleDownload = async () => {

    const doc = new Document({

      sections: [

        {

          children: [

            new Paragraph({

              text: "Cover Letter",

              heading: "Heading1",

            }),

            new Paragraph(""),

            ...coverLetter
              .split("\n")
              .map(
                line => new Paragraph(line)
              ),

          ],

        },

      ],

    });

    const blob = await Packer.toBlob(doc);

    saveAs(blob, "Cover_Letter.docx");

  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <FileText
            size={22}
            color="var(--accent)"
          />

          <div>

            <h2
              className="text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              AI Cover Letter
            </h2>

            <p
              style={{ color: "var(--text-secondary)" }}
            >
              Generate a personalized cover letter instantly.
            </p>

          </div>

        </div>

        {!coverLetter && (

          <button
            onClick={onGenerate}
            disabled={coverLoading}
            className="px-5 py-2 rounded-xl flex items-center gap-2"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            <Sparkles size={18} />

            {coverLoading
              ? "Generating..."
              : "Generate"}
          </button>

        )}

      </div>

      {/* Generated */}

      {coverLetter && (

        <>

          <button
            className="w-full flex justify-between items-center mt-6 p-4 rounded-xl"
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "var(--bg-page)",
              border: "1px solid var(--border-divider)",
            }}
          >

            <div>

              <h3
                className="font-semibold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                Generated Cover Letter
              </h3>

              <p
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Click to view
              </p>

            </div>

            {expanded ? (
              <ChevronDown />
            ) : (
              <ChevronRight />
            )}

          </button>

          {expanded && (

            <div
              className="mt-4 rounded-xl"
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-divider)",
              }}
            >

              <div className="flex justify-end gap-3 p-4">

                <button
                  onClick={onCopy}
                  className="px-4 py-2 rounded-lg flex gap-2 items-center"
                  style={{
                    background: "var(--bg-card)",
                  }}
                >
                  <Copy size={16} />

                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg flex gap-2 items-center"
                  style={{
                    background: "var(--bg-card)",
                  }}
                >
                  <Download size={16} />
                  Download
                </button>

              </div>

              <div
                className="px-6 pb-6 whitespace-pre-wrap leading-8"
                style={{
                  color: "var(--text-secondary)",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                {coverLetter}
              </div>

            </div>

          )}

        </>

      )}

    </div>
  );
}

export default CoverLetterSection;