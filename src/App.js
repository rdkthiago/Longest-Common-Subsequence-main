// Função principal para encontrar a Maior Subsequência Comum (LCS)
function longestCommonSubsequence(text1, text2) {
    let rows = text1.length;
    let columns = text2.length;

    // Verifica se uma das strings é vazia, nesse caso, não há subsequência comum
    if (rows === 0 || columns === 0) {
        return 0;
    }

    // Cria uma tabela para armazenar os resultados intermediários
    let dpTable = new Array(rows + 1).fill(0).map(() => new Array(columns + 1).fill(0));

    // Preenche a tabela utilizando a lógica do algoritmo de LCS
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
                dpTable[i][j] = dpTable[i - 1][j - 1] + 1;
            } else {
                dpTable[i][j] = Math.max(dpTable[i - 1][j], dpTable[i][j - 1]);
            }
        }
    }

    // Exibe a tabela no console (para fins de depuração)
    console.log(dpTable);

    // Chama a função auxiliar para obter a subsequência
    return subSequence(text1, text2, dpTable);
}

// Função auxiliar para reconstruir a subsequência a partir da tabela
function subSequence(text1, text2, dpTable) {
    let subsequence = "";
    let row = text1.length;
    let column = text2.length;

    // Reconstrói a subsequência seguindo a lógica do algoritmo
    while (row > 0 && column > 0 && dpTable[row][column] !== 0) {
        if (dpTable[row][column] === dpTable[row - 1][column]) {
            row = row - 1;
        } else if (dpTable[row][column] === dpTable[row][column - 1]) {
            column = column - 1;
        } else {
            subsequence += text1.charAt(row - 1);
            row = row - 1;
            column = column - 1;
        }
    }

    // Retorna a subsequência invertida (o algoritmo constrói do fim para o início)
    return subsequence.split("").reverse().join("");
}

// Exemplo de uso
console.log(longestCommonSubsequence("abc", "cab"));
