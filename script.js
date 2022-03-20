import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

function setupInput() {
	window.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(e) {
	switch (e.key) {
		case "ArrowUp":
			moveUp();
			break;

		case "ArrowDown":
			moveDown();
			break;

		case "ArrowLeft":
			moveLeft();
			break;

		case "ArrowRight":
			moveRight();
			break;
		default:
			setupInput();
			return;
	}
	setupInput();
}

function moveUp() {
	return slideTiles(grid.cellsByColumn);
}

function moveDown() {
	return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveLeft() {
	return slideTiles(grid.cellsByRow);
}

function moveRight() {
	return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function slideTiles(cells) {
	cells.forEach((group) => {
		for (let i = 1; i < group.length; i++) {
			const cell = group[i];
			if (cell.tile == null) continue;
			let lastValidCell;
			for (let j = i - 1; j >= 0; j--) {
				const moveToCell = group[j];
				if (!moveToCell.canAccept(cell.tile)) break;
				lastValidCell = moveToCell;
			}
			if (lastValidCell != null) {
				if (lastValidCell.tile != null) {
					lastValidCell.mergeTile = cell.tile;
				} else {
					lastValidCell.tile = cell.tile;
				}
				cell.tile = null;
			}
		}
	});
}
