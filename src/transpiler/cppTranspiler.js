/**
 * Transpiler pentru conversia pseudocodului în C++
 */

export function generateCPP(ast) {
    if (!ast) return '// Eroare în transpilare: AST invalid';

    let code = '';
    let variables = new Set(); // Pentru declarațiile de variabile

    // Adăugăm header-ele necesare
    code += '#include <iostream>\n';
    code += '#include <string>\n';
    code += '#include <cmath>\n';
    code += '#include <vector>\n\n';
    code += 'using namespace std;\n\n';
    code += 'int main() {\n';
    
    // Colectăm variabilele și generăm codul pentru fiecare instrucțiune
    if (ast && ast.children) {
        // Colectăm variabilele
        collectVariables(ast, variables);
        
        // Declarăm variabilele la început
        if (variables.size > 0) {
            code += '    // Declararea variabilelor\n';
            for (const variable of variables) {
                code += `    double ${variable} = 0;\n`;
            }
            code += '\n';
        }
        
        // Generăm codul pentru fiecare instrucțiune
        for (const node of ast.children) {
            code += transpileNode(node, 1); // Începem cu indentare de nivel 1
        }
    }
    
    // Adăugăm return la final
    code += '    return 0;\n';
    code += '}\n';
    
    return code;
}

function collectVariables(node, variables) {
    if (!node) return;
    
    // Colectăm variabile din asignări și input
    if (node.type === 'ASSIGNMENT') {
        variables.add(node.value);
    } else if (node.type === 'INPUT') {
        variables.add(node.value);
    } else if (node.type === 'IF') {
        collectVariablesFromBlock(node.value.thenBlock, variables);
        if (node.value.elseBlock) {
            collectVariablesFromBlock(node.value.elseBlock, variables);
        }
    } else if (node.type === 'WHILE' || node.type === 'DO-WHILE') {
        collectVariablesFromBlock(node.value.block, variables);
    } else if (node.type === 'FOR') {
        if (node.value.init) {
            variables.add(node.value.init.value);
        }
        collectVariablesFromBlock(node.value.block, variables);
    }
    
    // Recursiv pentru copii
    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            collectVariables(child, variables);
        }
    }
}

function collectVariablesFromBlock(block, variables) {
    if (block && block.children) {
        for (const child of block.children) {
            collectVariables(child, variables);
        }
    }
}

function getIndentation(level) {
    return '    '.repeat(level);
}

function transpileNode(node, indentLevel) {
    if (!node) return '';
    
    const indent = getIndentation(indentLevel);
    
    switch (node.type) {
        case 'ASSIGNMENT':
            return transpileAssignment(node, indent);
        case 'INPUT':
            return transpileInput(node, indent);
        case 'OUTPUT':
            return transpileOutput(node, indent);
        case 'OUTPUTSTR':
            return transpileOutputStr(node, indent);
        case 'OUTPUTEXP':
            return transpileOutputExp(node, indent);
        case 'IF':
            return transpileIf(node, indentLevel);
        case 'WHILE':
            return transpileWhile(node, indentLevel);
        case 'FOR':
            return transpileFor(node, indentLevel);
        case 'DO-WHILE':
            return transpileDoWhile(node, indentLevel);
        default:
            return `${indent}// Nod neprelucrat: ${node.type}\n`;
    }
}

function transpileAssignment(node, indent) {
    const varName = node.value;
    
    if (node.children && node.children.length > 0) {
        const expression = transpileExpression(node.children);
        return `${indent}${varName} = ${expression};\n`;
    }
    
    return `${indent}${varName} = 0; // Asignare implicită\n`;
}

function transpileInput(node, indent) {
    return `${indent}cin >> ${node.value};\n`;
}

function transpileOutput(node, indent) {
    return `${indent}cout << ${node.value} << endl;\n`;
}

function transpileOutputStr(node, indent) {
    return `${indent}cout << "${node.value}" << flush;\n`;
}

function transpileOutputExp(node, indent) {
    if (node.children && node.children.length > 0) {
        const expression = transpileExpression(node.children);
        return `${indent}cout << (${expression}) << endl;\n`;
    } else if (node.value) {
        return `${indent}cout << ${node.value} << endl;\n`;
    }
    return `${indent}cout << endl;\n`;
}

function transpileIf(node, indentLevel) {
    const indent = getIndentation(indentLevel);
    const ifNode = node.value;
    
    let code = `${indent}if (${transpileExpression(ifNode.condition)}) {\n`;
    
    // Generăm codul pentru blocul then
    if (ifNode.thenBlock && ifNode.thenBlock.children) {
        for (const childNode of ifNode.thenBlock.children) {
            code += transpileNode(childNode, indentLevel + 1);
        }
    }
    
    code += `${indent}}\n`;
    
    // Generăm codul pentru blocul else dacă există
    if (ifNode.elseBlock && ifNode.elseBlock.children) {
        code += `${indent}else {\n`;
        for (const childNode of ifNode.elseBlock.children) {
            code += transpileNode(childNode, indentLevel + 1);
        }
        code += `${indent}}\n`;
    }
    
    return code;
}

function transpileWhile(node, indentLevel) {
    const indent = getIndentation(indentLevel);
    const whileNode = node.value;
    
    let code = `${indent}while (${transpileExpression(whileNode.condition)}) {\n`;
    
    // Generăm codul pentru corpul buclei
    if (whileNode.block && whileNode.block.children) {
        for (const childNode of whileNode.block.children) {
            code += transpileNode(childNode, indentLevel + 1);
        }
    }
    
    code += `${indent}}\n`;
    
    return code;
}

function transpileDoWhile(node, indentLevel) {
    const indent = getIndentation(indentLevel);
    const doWhileNode = node.value;
    
    let code = `${indent}do {\n`;
    
    // Generăm codul pentru corpul buclei
    if (doWhileNode.block && doWhileNode.block.children) {
        for (const childNode of doWhileNode.block.children) {
            code += transpileNode(childNode, indentLevel + 1);
        }
    }
    
    code += `${indent}} while (${transpileExpression(doWhileNode.condition)});\n`;
    
    return code;
}

function transpileFor(node, indentLevel) {
    const indent = getIndentation(indentLevel);
    const forNode = node.value;
    
    // Variabila de control
    const varName = forNode.init ? forNode.init.value : '';
    
    // Inițializare
    let initCode = '';
    if (forNode.init && forNode.init.children) {
        initCode = `${varName} = ${transpileExpression(forNode.init.children)}`;
    }
    
    // Condiție
    let condition = '';
    if (forNode.condition) {
        condition = transpileExpression(forNode.condition);
    }
    
    // Incrementare
    let increment = '';
    if (forNode.increment && forNode.increment.children) {
        increment = `${varName} = ${transpileExpression(forNode.increment.children)}`;
    } else {
        increment = `${varName}++`;
    }
    
    let code = `${indent}for (${initCode}; ${condition}; ${increment}) {\n`;
    
    // Generăm codul pentru corpul buclei
    if (forNode.block && forNode.block.children) {
        for (const childNode of forNode.block.children) {
            code += transpileNode(childNode, indentLevel + 1);
        }
    }
    
    code += `${indent}}\n`;
    
    return code;
}

function transpileExpression(tokens) {
    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) return '';
    
    // Pentru expresii simple
    if (tokens.length === 1) {
        const token = tokens[0];
        if (token.type === 'NUMBER' || token.type === 'IDENTIFIER') {
            return token.value;
        }
    }
    
    // Pentru expresii complexe care folosesc notația postfixată
    const stack = [];
    
    for (const token of tokens) {
        if (token.type === 'NUMBER' || token.type === 'IDENTIFIER') {
            stack.push(token.value);
        } 
        else if (token.type === 'OPERATOR') {
            // Convertim operatorii din pseudocod în operatori C++
            const operator = mapOperator(token.value);
            
            if (operator === '!') {
                // Operatorul unary not
                const operand = stack.pop();
                stack.push(`!(${operand})`);
            } 
            else if (operator === 'int') {
                // Funcția de conversie la int
                const operand = stack.pop();
                stack.push(`static_cast<int>(${operand})`);
            } 
            else {
                // Operatori binari
                const right = stack.pop();
                const left = stack.pop();
                stack.push(`(${left} ${operator} ${right})`);
            }
        }
    }
    
    return stack.length > 0 ? stack[0] : '';
}

function mapOperator(operator) {
    const operatorMap = {
        'egal': '==',
        'diferit': '!=',
        'si': '&&',
        'sau': '||',
        'not': '!',
        'int': 'int',
        'mod': '%',
        'div': '/'
    };
    
    return operatorMap[operator] || operator;
}