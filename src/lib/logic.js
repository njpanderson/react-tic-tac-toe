const lines = [];

export function getLines(squares) {
  const rowSize = Math.round(Math.sqrt(squares.length));

  // Check cached lines exist (and are current shape)
  if (lines.length === (squares.length / 2) + 2)
    return lines;

  /**
   * Create rows and columns
   * E.g. for the following grid:
   *
   *  0  1  2
   *  3  4  5
   *  6  7  8
   *
   * An array of lines is generated by traversing each row in turn and pushing
   * a sub-array of n items for the row and column
   */
  for (let a = 0; a < squares.length; a += rowSize) {
    // Row line, eg: 0, 1, 2; 3, 4, 5; 6, 7, 8
    lines.push(Array.from(Array(rowSize).fill(0), (x, i) => a + i));
    // Column line, eg: 0, 3, 6; 1, 4, 5; 2, 5, 8
    lines.push(Array.from(Array(rowSize).fill(0), (x, i) => (a / rowSize) + (i * rowSize)));
  }

  // Create diagonal line from top left to bottom right, e.g: (0, 4, 8)
  lines.push(Array.from(Array(rowSize).fill(0), (x, i) => i + (i * (rowSize))));

  // Create diagonal line from top right to bottom left, e.g: (2, 4, 6)
  lines.push(Array.from(Array(rowSize).fill(rowSize - 1), (x, i) => x + (i * (rowSize - 1))));

  return lines;
}

export function calculateWinner(squares) {
  const lines = getLines(squares);

  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].map((i) => squares[i]);

    if (values.every((value) => value === 'X'))
      return {
        char: 'X',
        cells: lines[i]
      };

    if (values.every((value) => value === '0'))
      return {
        char: '0',
        cells: lines[i]
      };
  }

  return null;
}
