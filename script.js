let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Startspieler

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td onclick="cellClicked(${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;

    // Überprüfe, ob das Spiel vorbei ist und zeichne eine Linie, wenn ja
    if (isGameOver()) {
        drawWinningLine();
    }
}

function cellClicked(index) {
    const clickedCell = document.getElementsByTagName('td')[index];
    
    if (fields[index] === null && !isGameOver()) { // Nur ausführen, wenn das Feld leer ist und das Spiel nicht vorbei ist
        const symbol = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        clickedCell.innerHTML = symbol;
        fields[index] = currentPlayer;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        clickedCell.onclick = null; // Entfernt den Event-Handler, damit das Feld nicht erneut geklickt werden kann
        render(); // Aktualisiere das Spielbrett
    }
}

function isGameOver() {
    // Überprüfe auf mögliche Gewinnkombinationen
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
        [0, 4, 8], [2, 4, 6] // Diagonale Linien
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return true; // Wenn eine Gewinnkombination gefunden wurde, ist das Spiel vorbei
        }
    }

    // Überprüfe, ob alle Felder gefüllt sind (Unentschieden)
    if (!fields.includes(null)) {
        return true; // Wenn alle Felder gefüllt sind und es keinen Gewinner gibt, ist das Spiel vorbei
    }

    return false; // Das Spiel ist noch nicht vorbei
}

function drawWinningLine() {
    // Code, um eine Linie in die Tabelle zu zeichnen, die die Gewinnkombination verbindet
    // In diesem Beispiel wird die Linie einfach mit der Hintergrundfarbe des Feldes gezeichnet, das den Sieg enthält
    const table = document.getElementsByTagName('table')[0];
    const winningCombination = getWinningCombination();
    if (winningCombination) {
        const [a, b, c] = winningCombination;
        const cells = table.getElementsByTagName('td');
        const color = fields[a] === 'circle' ? '#00B0EF' : '#FFC000';
        cells[a].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        cells[b].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        cells[c].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        cells[a].innerHTML = generateSymbolSVG(fields[a]);
        cells[b].innerHTML = generateSymbolSVG(fields[b]);
        cells[c].innerHTML = generateSymbolSVG(fields[c]);
    }
}

function getWinningCombination() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
        [0, 4, 8], [2, 4, 6] // Diagonale Linien
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination;
        }
    }

    return null; // Keine Gewinnkombination gefunden
}

function generateSymbolSVG(player) {
    if (player === 'circle') {
        return generateCircleSVG();
    } else if (player === 'cross') {
        return generateCrossSVG();
    } else {
        return ''; // Leerer String, wenn das Feld leer ist
    }
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    render();
}

function generateCircleSVG() {
    const fillColor = '#00B0EF';
    const width = 70;
    const height = 70;

    const svgCode = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="30" fill="none" stroke="${fillColor}" stroke-width="5">
                <animate attributeName="r" from="0" to="30" dur="400ms" fill="freeze" />
            </circle>
        </svg>
    `;
    
    return svgCode;
}

function generateCrossSVG() {
    const color = "#FFC000";
    const width = 70;
    const height = 70;
    const animationDuration = "400ms";

    const svgCode = `
        <svg width="${width}" height="${height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="${animationDuration}" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="${animationDuration}" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="${animationDuration}" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="${animationDuration}" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}