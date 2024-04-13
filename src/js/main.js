// Import our custom CSS
import '../scss/styles.scss'
import { Universe, Cell } from "conway-logic";
import { memory } from  "conway-logic/conway_logic_bg.wasm";
import '../assets/preview.png'

const title_render = () => {
    const text = "Conway's Game of Life";
    let i = 0;
    const speed = 150; // 타이핑 속도(ms)
    const typewriterText = document.getElementById('typewriter-text');

    function typeWriter() {
        if (i < text.length) {
        typewriterText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        } else {
            null;
        }
    }
    typeWriter();
};

const CELL_SIZE = 5; // px
const GRID_COLOR = "#0000aa"
const DEAD_COLOR = "#0000aa"
const ALIVE_COLOR = "#00A7E1"

const width = 64
const height = 64
const universe = Universe.new(width, height)

const canvas = document.getElementById('game-of-life-canvas')
canvas.height = (CELL_SIZE + 1) * height + 1
canvas.width = (CELL_SIZE + 1) * width + 1

const ctx = canvas.getContext('2d')
let ct = 0
const renderLoop = () => {
    ct = (ct + 1) % 1000
    if (ct === 0) {
    universe.init()
    }
    universe.tick()
    drawGrid()
    drawCells()

    requestAnimationFrame(renderLoop)
}

const drawGrid = () => {
    ctx.beginPath()
    ctx.strokeStyle = GRID_COLOR
  
    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0)
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1)
    }
  
    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1)
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1)
    }
  
    ctx.stroke()
  }

  const getIndex = (row, column) => {
    return row * width + column
  }
  

  const drawCells = () => {
    const cellsPtr = universe.cells()
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)
  
    ctx.beginPath()
  
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col)
  
        ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR
  
        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE,
        )
      }
    }
  
    ctx.stroke()
  }

title_render()
drawGrid()
drawCells()
requestAnimationFrame(renderLoop)