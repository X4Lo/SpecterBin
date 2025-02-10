import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pastesService } from "@/services/pastesService";
import { PasteObject } from "@/types/PasteObject";
import { PastesManager } from "@/services/pastesManager";

import PastePasswordModal from "@/components/PastePasswordModal";
import { Code2Icon, CopyIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import hljs from "highlight.js";
import Loader from "@/components/Loader";

const PasteViewPage: React.FC = () => {
  const { pasteId } = useParams<{ pasteId: string }>();
  const [pasteObject, setPasteObject] = useState<PasteObject>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [highlightedCode, setHighlightedCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!pasteId) {
      navigate("/new");
      return;
    }

    pastesService
      .getPasteById(pasteId)
      .then((result) => {
        setPasteObject({ ...result, hasBeenDecrypted: false });
      })
      .catch((error) => {
        if (error.response.status == 403) {
          navigate("/not-available");
        } else {
          navigate("/not-found");
        }
      });
  }, []);

  useEffect(() => {
    if (!pasteObject) return;

    if (!pasteObject.isPasswordProtected) {
      highlightContent();
      setIsLoading(false);
    }

    if (
      pasteObject.isPasswordProtected &&
      !pasteObject.hasBeenDecrypted &&
      !pasteObject.password
    ) {
      setIsPasswordModalOpen(true);
    } else if (
      pasteObject.isPasswordProtected &&
      !pasteObject.hasBeenDecrypted &&
      pasteObject.password
    ) {
      PastesManager.readPaste(pasteObject)
        .then((paste) => {
          setPasteObject(paste);
          setIsPasswordModalOpen(false);
          setIsLoading(false);
          setErrorMessage(undefined);

          // Syntax Hightlighting
          highlightContent();
        })
        .catch((error) => {
          // todo: handle incorrect password
          setErrorMessage("Incorrect Password!");
          setPasteObject({
            ...pasteObject,
            password: undefined,
            hasBeenDecrypted: false,
          });
        });
    }
  }, [pasteObject]);

  const exportToFile = () => {
    const content = pasteObject?.content!;
    const title = pasteObject?.title || "untitled";
    let syntaxHighlightingStyle = pasteObject?.syntaxHighlightingStyle;

    if (syntaxHighlightingStyle == "plain") syntaxHighlightingStyle = "txt";

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.${syntaxHighlightingStyle}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function copyToClipboard() {
    navigator.clipboard.writeText(pasteObject?.content || "");
  }

  const highlightContent = () => {
    if (!pasteObject) return;

    if (
      pasteObject.content &&
      pasteObject.syntaxHighlightingStyle !== "plain"
    ) {
      const highlighted = hljs.highlight(pasteObject.content, {
        language: pasteObject.syntaxHighlightingStyle || "plain",
      }).value;
      setHighlightedCode(highlighted);
    } else {
      setHighlightedCode(pasteObject.content!);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    if (!pasteObject) {
      navigate("/new");
      return;
    }

    setPasteObject({ ...pasteObject, password: password });
  };

  const handlePasswordClose = () => {
    setIsPasswordModalOpen(true);
  };

  return (
    <div className="flex-1 bg-background p-6 overflow-auto">
      <div className="container mx-auto max-w-5xl z-30">
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {/* Paste Title */}
            {pasteObject?.title && (
              <div className="mb-8 flex items-center gap-3">
                <Code2Icon className="h-8 w-8" />
                <h1 className="text-3xl font-bold">{pasteObject?.title}</h1>
              </div>
            )}

            {/* Content Preview */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2"></div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex gap-2"
                >
                  <CopyIcon className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={exportToFile}
                  className="flex gap-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <pre className="rounded-md p-4 overflow-x-auto min-h-[400px] border-2 border-gray-300">
                  <code
                    className={`language-${pasteObject?.syntaxHighlightingStyle}`}
                    dangerouslySetInnerHTML={{
                      __html: highlightedCode || "No content to preview",
                    }}
                  />
                </pre>
              </div>
            </div>
          </>
        )}

        <PastePasswordModal
          isOpen={isPasswordModalOpen}
          errorMessage={errorMessage}
          onClose={handlePasswordClose}
          onSubmit={handlePasswordSubmit}
        />
      </div>
    </div>
  );
};

export default PasteViewPage;
