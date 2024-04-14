import updateRandomPosition from './insane_movements';
import title_render  from './title_render';
import '../scss/styles.scss';

import { Universe, Cell } from "conway-logic";
import { memory } from  "conway-logic/conway_logic_bg.wasm";
// Constants for canvas configuration
const CELL_SIZE = 5; // Cell size in pixels
const GRID_COLOR = "#0000aa"; // Color of the grid lines
const DEAD_COLOR = "#0000aa"; // Color representing dead cells
const ALIVE_COLOR = "#00A7E1"; // Color representing alive cells

const width = 64; // Width of the universe
const height = 64; // Height of the universe
const universe = Universe.new(width, height); // Initialize universe

const canvas = document.getElementById('game-of-life-canvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');
let ct = 0;

// Main rendering loop for the game
const renderLoop = () => {
    ct = (ct + 1) % 1000;
    if (ct === 0) {
        universe.init(); // Reinitialize the universe periodically
    }
    universe.tick(); // Compute the next generation
    drawGrid(); // Draw grid lines
    drawCells(); // Draw cells

    requestAnimationFrame(renderLoop);
};

// Function to draw grid lines
const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;
  
    // Draw vertical lines
    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }
  
    // Draw horizontal lines
    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }
  
    ctx.stroke();
};

// Helper function to get the array index of a cell
const getIndex = (row, column) => {
    return row * width + column;
};

// Function to draw the cells on the canvas
const drawCells = () => {
    const cellsPtr = universe.cells(); // Pointer to the cells in WebAssembly memory
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
  
    ctx.beginPath();
  
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);
            ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
  
            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE,
            );
        }
    }
  
    ctx.stroke();
};

// Initialize the rendering and game loop
title_render();
drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
setInterval(updateRandomPosition, 2900);