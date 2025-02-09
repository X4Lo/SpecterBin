import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import {
  Code2Icon,
  CopyIcon,
  DownloadIcon,
  EyeIcon,
  PencilIcon,
  SaveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import DateTimeInput from "@/components/DateTimeInput";
import { PastesManager } from "@/services/pastesManager";
import { PasteObject } from "@/types/PasteObject";
import PasteCreatedModal from "@/components/PasteCreatedModal";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { value: "plain", label: "Plain Text" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "markdown", label: "Markdown" },
  { value: "yaml", label: "YAML" },
];

const burnAfterOptions = [
  { value: "1h", label: "1 Hour" },
  { value: "1d", label: "1 Day" },
  { value: "3d", label: "3 Days" },
  { value: "1w", label: "1 Week" },
  { value: "2w", label: "2 Weeks" },
  { value: "1m", label: "1 Month" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" },
  { value: "never", label: "Never" },
];

interface PasteFormValues {
  title: string;
  content: string;
  password?: string;
  syntaxHighlightingStyle: string;
  burnAfter: string;
  burnAfterRead: boolean;
  availableDate?: Date;
}

const NewPastePage: React.FC = () => {
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pasteId, setPasteId] = useState("");
  const { toast } = useToast();

  const form = useForm<PasteFormValues>({
    defaultValues: {
      title: "",
      content: "",
      syntaxHighlightingStyle: "plain",
      burnAfter: "never",
      burnAfterRead: false,
      availableDate: undefined,
    },
  });

  const watchContent = form.watch("content");
  const watchSyntaxHighlightingStyle = form.watch("syntaxHighlightingStyle");

  useEffect(() => {
    if (watchContent && watchSyntaxHighlightingStyle !== "plain") {
      const highlighted = hljs.highlight(watchContent, {
        language: watchSyntaxHighlightingStyle,
      }).value;
      setHighlightedCode(highlighted);
    } else {
      setHighlightedCode(watchContent);
    }
  }, [watchContent, watchSyntaxHighlightingStyle]);

  function onSubmit(data: PasteFormValues) {
    if (data.content.trim() == "") {
      toast({
        title: "Error",
        description: "The content cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    let burnAfterDate: Date | undefined = undefined; // never

    if (data.burnAfter != "never") {
      burnAfterDate = addToCurrentDate(data.burnAfter);
    }

    const pasteObject: PasteObject = {
      isPasswordProtected: data.password ? true : false,

      availableDate: data.availableDate,
      burnAfterDate: burnAfterDate,
      burnAfterRead: data.burnAfterRead,

      password: data.password,
      title: data.title,
      syntaxHighlightingStyle: data.syntaxHighlightingStyle,
      content: data.content,
    };

    PastesManager.createPaste(pasteObject).then((paste) => {
      setPasteId(paste.id!);
      setIsModalOpen(true);
    });

    form.reset({
      title: "",
      content: "",
      password: "",
      syntaxHighlightingStyle: "plain",
      burnAfter: "never",
      burnAfterRead: false,
      availableDate: undefined,
    });
  }

  function addToCurrentDate(amount: string): Date | undefined {
    let currentDate = new Date();

    const parsedAmount = parseInt(amount.substring(0, 1));

    if (amount.endsWith("h")) {
      currentDate.setHours(
        currentDate.getHours() + parsedAmount,
        currentDate.getMinutes()
      );
    } else if (amount.endsWith("d")) {
      currentDate.setDate(currentDate.getDate() + parsedAmount);
    } else if (amount.endsWith("w")) {
      currentDate.setDate(currentDate.getDate() + parsedAmount * 7);
    } else if (amount.endsWith("m")) {
      currentDate.setMonth(currentDate.getMonth() + parsedAmount);
    } else if (amount.endsWith("y")) {
      currentDate.setFullYear(currentDate.getFullYear() + parsedAmount);
    }

    return currentDate;
  }

  function exportToFile() {
    const content = form.getValues("content");
    const title = form.getValues("title") || "untitled";
    let syntaxHighlightingStyle = form.getValues("syntaxHighlightingStyle");

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
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(form.getValues("content"));
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto z-30">
        <div className="mb-8 flex items-center gap-3">
          <Code2Icon className="h-8 w-8" />
          <h1 className="text-3xl font-bold">DevBin</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Details Inputs */}
            <div className="flex flex-wrap gap-4 items-end">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title (Optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="syntaxHighlightingStyle"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormLabel>Language</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-48">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password  (Optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableDate"
                render={({ field }) => (
                  <FormItem className="w-48">
                    <FormLabel>Available After</FormLabel>
                    <FormControl>
                      <DateTimeInput value={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="burnAfter"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormLabel>Burn After</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {burnAfterOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="burnAfterRead"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Burn after read</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Content Input */}
            <div className="flex justify-between items-center">
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(value) =>
                  value && setMode(value as "editor" | "preview")
                }
              >
                <ToggleGroupItem value="editor" aria-label="Editor mode">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Editor
                </ToggleGroupItem>
                <ToggleGroupItem value="preview" aria-label="Preview mode">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview
                </ToggleGroupItem>
              </ToggleGroup>

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
                <Button type="submit" className="flex gap-2">
                  <SaveIcon className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {mode === "editor" ? (
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your code or text here"
                          className="min-h-[400px] font-mono"
                          onKeyDown={(e) => {
                            if (e.key === "Tab") {
                              e.preventDefault();
                              const start = e.currentTarget.selectionStart;
                              const end = e.currentTarget.selectionEnd;
                              const value = e.currentTarget.value;
                              e.currentTarget.value =
                                value.substring(0, start) +
                                "  " +
                                value.substring(end);
                              e.currentTarget.selectionStart =
                                e.currentTarget.selectionEnd = start + 2;
                              field.onChange(e);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="relative">
                  <pre className="rounded-md p-4 overflow-x-auto min-h-[400px] border-1">
                    <code
                      className={`language-${watchSyntaxHighlightingStyle}`}
                      dangerouslySetInnerHTML={{
                        __html: highlightedCode || "No content to preview",
                      }}
                    />
                  </pre>
                </div>
              )}
            </div>
          </form>
        </Form>
        <PasteCreatedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pasteId={pasteId}
        />
      </div>
    </div>
  );
};

export default NewPastePage;
