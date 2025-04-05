import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { lexer } from '../interpretor/lexer';
import { parser } from '../interpretor/parser';
import { generateCPP } from '../transpiler/cppTranspiler';

const CppOutputEditor = ({ pseudocode }) => {
  const [cppCode, setCppCode] = useState('// Codul C++ va apărea aici');

  useEffect(() => {
    try {
      // Transpilăm codul doar dacă avem pseudocod
      if (pseudocode && pseudocode.trim() !== '') {
        const tokens = lexer(pseudocode);
        const ast = parser(tokens);
        const generatedCode = generateCPP(ast);
        setCppCode(generatedCode);
      } else {
        setCppCode('// Scrie pseudocod în partea stângă pentru a genera cod C++');
      }
    } catch (error) {
      setCppCode(`// Eroare în transpilare:\n// ${error.message}`);
      console.error('Eroare de transpilare:', error);
    }
  }, [pseudocode]);

  return (
    <div className="h-full">
      <Editor
        className="h-[50vh]"
        theme="vs-dark"
        defaultLanguage="cpp"
        value={cppCode}
        options={{
          readOnly: true,
          automaticLayout: true,
          padding: { top: 20 },
          wordWrap: 'on',
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default CppOutputEditor;