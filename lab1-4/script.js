const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

const vertexColorInput = document.getElementById('vertexColor');
const vertexDiameterInput = document.getElementById('vertexDiameter');
const edgeColorInput = document.getElementById('edgeColor');
const edgeThicknessInput = document.getElementById('edgeThickness');
const resetButton = document.getElementById('resetButton');

// Початкові значення
const defaultVertexColor = '#ff0000';
const defaultVertexDiameter = '6';
const defaultEdgeColor = '#008080';
const defaultEdgeThickness = '4';

// Завантаження збережених значень з localStorage або встановлення початкових значень
const savedVertexColor = localStorage.getItem('vertexColor') || defaultVertexColor;
const savedVertexDiameter = localStorage.getItem('vertexDiameter') || defaultVertexDiameter;
const savedEdgeColor = localStorage.getItem('edgeColor') || defaultEdgeColor;
const savedEdgeThickness = localStorage.getItem('edgeThickness') || defaultEdgeThickness;

vertexColorInput.value = savedVertexColor;
vertexDiameterInput.value = savedVertexDiameter;
edgeColorInput.value = savedEdgeColor;
edgeThicknessInput.value = savedEdgeThickness;

let vertexColor = vertexColorInput.value;
let vertexDiameter = vertexDiameterInput.value;
let edgeColor = edgeColorInput.value;
let edgeThickness = edgeThicknessInput.value;

vertexColorInput.addEventListener('input', () => {
    vertexColor = vertexColorInput.value;
    localStorage.setItem('vertexColor', vertexColor);
    drawGraph();
});

vertexDiameterInput.addEventListener('input', () => {
    vertexDiameter = vertexDiameterInput.value;
    localStorage.setItem('vertexDiameter', vertexDiameter);
    drawGraph();
});

edgeColorInput.addEventListener('input', () => {
    edgeColor = edgeColorInput.value;
    localStorage.setItem('edgeColor', edgeColor);
    drawGraph();
});

edgeThicknessInput.addEventListener('input', () => {
    edgeThickness = edgeThicknessInput.value;
    localStorage.setItem('edgeThickness', edgeThickness);
    drawGraph();
});

resetButton.addEventListener('click', () => {
    localStorage.setItem('vertexColor', defaultVertexColor);
    localStorage.setItem('vertexDiameter', defaultVertexDiameter);
    localStorage.setItem('edgeColor', defaultEdgeColor);
    localStorage.setItem('edgeThickness', defaultEdgeThickness);

    vertexColorInput.value = defaultVertexColor;
    vertexDiameterInput.value = defaultVertexDiameter;
    edgeColorInput.value = defaultEdgeColor;
    edgeThicknessInput.value = defaultEdgeThickness;

    vertexColor = defaultVertexColor;
    vertexDiameter = defaultVertexDiameter;
    edgeColor = defaultEdgeColor;
    edgeThickness = defaultEdgeThickness;

    drawGraph();
});

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Координати центру кола
    const centerX = 200;
    const centerY = 200;

    // Радіус кола
    const radius = 50;

    // Малюємо коло
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = edgeThickness;
    ctx.stroke();

    // Координати точки на колі
    const pointAngle = Math.PI / 4; // Наприклад, 45 градусів
    const pointX = centerX + radius * Math.cos(pointAngle);
    const pointY = centerY + radius * Math.sin(pointAngle);

    // Координати кінцевих точок ліній
    const lines = [
        {x: 350, y: 150},  // Точка 1
        {x: 450, y: 250},  // Точка 2
        {x: 300, y: 350}   // Точка 3
    ];

    // Малюємо лінії
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = edgeThickness;
    lines.forEach(point => {
        ctx.beginPath();
        ctx.moveTo(pointX, pointY);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    });

    // З'єднуємо третю точку з другою
    ctx.beginPath();
    ctx.moveTo(lines[1].x, lines[1].y);
    ctx.lineTo(lines[2].x, lines[2].y);
    ctx.stroke();

    // Координати нової точки, трохи нижче і правіше третьої точки
    const newPoint = {
        x: lines[2].x + 100,
        y: lines[2].y + 20
    };

    // Малюємо лінію від першої точки до нової точки
    ctx.beginPath();
    ctx.moveTo(lines[0].x, lines[0].y);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.stroke();

    // Малюємо заокруглені лінії від нової точки до першої точки
    // Перша заокруглена лінія з лівого боку
    ctx.beginPath();
    ctx.moveTo(newPoint.x, newPoint.y);
    ctx.quadraticCurveTo(newPoint.x - 100, newPoint.y - 60, lines[0].x, lines[0].y);
    ctx.stroke();

    // Друга заокруглена лінія з правого боку
    ctx.beginPath();
    ctx.moveTo(newPoint.x, newPoint.y);
    ctx.quadraticCurveTo(newPoint.x + 50, newPoint.y - 120, lines[0].x, lines[0].y);
    ctx.stroke();

    // Малюємо точку на колі
    ctx.beginPath();
    ctx.arc(pointX, pointY, vertexDiameter, 0, Math.PI * 2);
    ctx.fillStyle = vertexColor;
    ctx.fill();

    // Малюємо кінцеві точки
    lines.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, vertexDiameter, 0, Math.PI * 2);
        ctx.fillStyle = vertexColor;
        ctx.fill();
    });

    // Малюємо нову кінцеву точку
    ctx.beginPath();
    ctx.arc(newPoint.x, newPoint.y, vertexDiameter, 0, Math.PI * 2);
    ctx.fillStyle = vertexColor;
    ctx.fill();
}

drawGraph();
