import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useRef } from "react";
const CodeEditor = ({ onCodeChange }) => {

  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
    editor.focus();

    // Înregistrează limbajul personalizat
    monaco.languages.register({ id: "pseudocode" });

    const keywords = ["citeste", "scrie", "daca", "atunci", "altfel"];
    const operators = ["sau", "si", "egal", "diferit"];


    let regkw = new RegExp(keywords.join("|"));
    let regop = new RegExp(operators.join("|"));
    // Setează regulile de tokenizare (highlighting) pentru pseudocode
    monaco.languages.setMonarchTokensProvider("pseudocode", {
      keywords,
      tokenizer: {
        root: [
          [regkw, "keyword"],
          [regop, "operator"],
          [/[a-zA-Z_]\w*/, "identifier"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
          [/[+\/\-*=<>!]+/, "operator"],
          [/\/\/.*/, "comment"],
        ],
      },
    });

    // Configurarea limbajului (comentarii, paranteze etc.)
    monaco.languages.setLanguageConfiguration("pseudocode", {
      comments: { lineComment: "//" },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
    });

    // Configurare completare automată
    monaco.languages.registerCompletionItemProvider("pseudocode", {
      provideCompletionItems: () => ({
        suggestions: keywords.map((kw) => ({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
        })),
      }),
    });

    // Definirea temei personalizate
    monaco.editor.defineTheme("pseudocode-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "569cd6" },
        { token: "identifier", foreground: "9cdcfe" },
        { token: "number", foreground: "b5cea8" },
        { token: "string", foreground: "ce9178" },
        { token: "operator", foreground: "c23c25" },
        { token: "comment", foreground: "608b4e" },
      ],
      colors: {},
    });

    monaco.editor.setTheme("pseudocode-theme");
  }

  const editorRef = useRef();

  return (
    <Editor
      className="w-75% h-[50vh]"
      theme="pseudocode-theme"
      defaultLanguage="pseudocode"
      defaultValue={localStorage.getItem("code") || "// Scrie pseudocod aici"}
      onMount={handleEditorMount}
      onChange={(value) => {onCodeChange(value); localStorage.setItem("code", value);}}
    />
  );
};

export default CodeEditor;
