type Point = {row: number, col: number}

type TerrainCosts = {
    [key: number]: number 
}

type PriorityQueueItem = [number, number, number, number];
// Represents an item in the priority queue: [cost, row, col, current_cell_terrain_type]

/**
 * Represents a cell with its cost: { cost: number; point: Point }
 */
type CellWithCost = { cost: number; point: Point };


class MinHeap {
  private heap: PriorityQueueItem[] = [];

  /**
   * Returns the number of elements in the heap.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Inserts an item into the heap.
   * @param item The item to insert, of type PriorityQueueItem.
   */
  push(item: PriorityQueueItem): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  /**
   * Removes and returns the item with the smallest cost (root of the heap).
   * @returns The item with the smallest cost, or undefined if the heap is empty.
   */
  pop(): PriorityQueueItem | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!; // Move last element to root
    this.bubbleDown();
    return min;
  }

  /**
   * Restores the heap property by moving the last element up.
   * Used after pushing a new item.
   */
  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] > this.heap[index][0]) {
        // Swap if parent cost is greater than current item cost
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Restores the heap property by moving the root element down.
   * Used after popping the root item.
   */
  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild: PriorityQueueItem | undefined;
      let rightChild: PriorityQueueItem | undefined;
      let swap: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild[0] < element[0]) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild[0] < element[0]) ||
          (swap !== null && rightChild[0] < leftChild![0])
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) {
        break;
      }

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

class MaxHeap {
  private heap: CellWithCost[] = [];

  /**
   * Returns the number of elements in the heap.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Returns the element with the largest cost (root of the heap) without removing it.
   * @returns The element with the largest cost, or undefined if the heap is empty.
   */
  peek(): CellWithCost | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  /**
   * Inserts an item into the heap.
   * @param item The item to insert, of type CellWithCost.
   */
  push(item: CellWithCost): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  /**
   * Removes and returns the item with the largest cost (root of the heap).
   * @returns The item with the largest cost, or undefined if the heap is empty.
   */
  pop(): CellWithCost | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!; // Move last element to root
    this.bubbleDown();
    return max;
  }

  /**
   * Restores the heap property by moving the last element up.
   * Used after pushing a new item.
   */
  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      // Compare based on cost for MaxHeap
      if (this.heap[parentIndex].cost < this.heap[index].cost) {
        // Swap if parent cost is smaller than current item cost
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Restores the heap property by moving the root element down.
   * Used after popping the root item.
   */
  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild: CellWithCost | undefined;
      let rightChild: CellWithCost | undefined;
      let swap: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        // Compare based on cost for MaxHeap
        if (leftChild.cost > element.cost) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        // Compare based on cost for MaxHeap
        if (
          (swap === null && rightChild.cost > element.cost) ||
          (swap !== null && rightChild.cost > leftChild!.cost)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) {
        break;
      }

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

export function searchTer(
    terrainMap: number[][],
    startPoint: Point,
    costs: TerrainCosts,
    terrainChnagePenalty: number,
): Map<string,number>{
    const rows = terrainMap.length;
    const cols = terrainMap[0].length;

    if ( rows === 0 || cols === 0){
        return new Map();
    }

    const dist: Map<string, number> = new Map();
    for ( let r = 0; r < rows; r++ ){
        for (let c = 0; c < cols; c++){
            dist.set(`${r}-${c}`, Infinity)
        }
    }

    const [startR, startC] = [startPoint.row, startPoint.col]

    const initialTerrain = terrainMap[startR][startC]
    dist.set(`${startR}-${startC}`, 0)

    const pq = new MinHeap()
    pq.push([0, startR, startC, initialTerrain])

    const dc = [-1,-1,-1,0,0,1,1,1];
    const dr = [-1,0,1,-1,1,-1,0,1];

    while ( pq.size() > 0){
        const popped = pq.pop()
        if ( !popped ){
            continue
        }
        const [currentCost, r, c, currentCellType] = popped;

        if ( currentCost > (dist.get(`${r}-${c}`) || Infinity)){
            continue;
        }

        for ( let i = 0; i < 8; i++ ){
            const nr = r + dr[i]
            const nc = c + dc[i]

            if ( nr < 0 || nr >= rows || nc < 0 || nc >= cols){
                continue
            }

            const neibType = terrainMap[nr][nc];
            const travelCost = costs[currentCellType] !== undefined ? costs[currentCellType] : Infinity

            let penalty = 0
            if ( currentCellType !== neibType ){
                penalty = terrainChnagePenalty
            }

            const newCost = currentCost + travelCost + penalty

            if ( (nr !== startR || nc !== startC) && newCost < (dist.get(`${nr}-${nc}`) || Infinity )){
                dist.set(`${nr}-${nc}`, newCost)
                pq.push([newCost, nr, nc, neibType])
            }

            // console.log(`${r}-${c}:\n`)
            // for (let r = 0; r < rows; r++) {
            //   let rowCosts = [];
            //   for (let c = 0; c < cols; c++) {
            //     const cost = dist.get(`${r}-${c}`);
            //     rowCosts.push(cost === Infinity ? "Inf" : cost);
            //   }
            //   console.log(`[${rowCosts.map(val => String(val).padStart(3, ' ')).join(', ')}]`);
            // }
        }

    }

    return dist  
} 


export function findNClosestCells(
  allCosts: Map<string, number>, 
  n: number,
  mapData: number[][]
): CellWithCost[] {
  const maxHeap = new MaxHeap();

  allCosts.forEach((cost, key) => {
    if (cost !== Infinity) { 
      const parts = key.split('-').map(Number);
      if (parts.length === 2) {
        if ( mapData[parts[0]][parts[1]] !== 0){
        const currentCell: CellWithCost = { cost: cost, point: {row: parts[0], col: parts[1]} };

        if (maxHeap.size() < n) {
          maxHeap.push(currentCell);
        } else if (maxHeap.peek() && currentCell.cost < maxHeap.peek()!.cost) {
          maxHeap.pop();
          maxHeap.push(currentCell);
        }
      }
      }
    }
  });

  const closestCells: CellWithCost[] = [];
  while (maxHeap.size() > 0) {
    closestCells.push(maxHeap.pop()!);
  }

  // return closestCells.map(cell => cell.point);
  return closestCells;
}







function printDistMap(dist: Map<string, number>, rows: number, cols: number) {
    console.log("--- Distance Map (dist) ---");
    for (let r = 0; r < rows; r++) {
        let rowCosts = [];
        for (let c = 0; c < cols; c++) {
            const cost = dist.get(`${r}-${c}`);
            rowCosts.push(cost === Infinity ? "  ∞" : String(cost).padStart(3, ' '));
        }
        console.log(`[${rowCosts.join(', ')}]`);
    }
    console.log("---------------------------\n");
}




// if ( typeof window === 'undefined')
// console.log("--- Test Case 1: Simple Flat Terrain ---");

// const terrainMap1 = [
//     [3, 3, 3],
//     [3, 3, 3],
//     [3, 3, 3]
// ];
// const startPoint1: Point = { row: 1, col: 1 };
// const costs1: TerrainCosts = {
//     0: 100, // Sea cost (irrelevant here)
//     1: 100, // River cost (irrelevant here)
//     3: 1    // Land cost
// };
// const terrainChangePenalty1 = 0;
// const n1 = 5; // Find 5 closest cells

// const dist1 = searchTer(terrainMap1, startPoint1, costs1, terrainChangePenalty1);
// printDistMap(dist1, 3, 3);

// // Expected dist1 (costs from (1,1) with landCost=1, no penalty):
// // [ [  2,   1,   2],
// //   [  1,   0,   1],
// //   [  2,   1,   2] ]

// const closestCells1 = findNClosestCells(dist1, n1, terrainMap1);
// console.log(`Closest ${n1} cells (cost, point) for Test Case 1:`);
// // Sort by cost for predictable output
// closestCells1.sort((a, b) => {
//     const costA = dist1.get(`${a.row}-${a.col}`) || Infinity;
//     const costB = dist1.get(`${b.row}-${b.col}`) || Infinity;
//     if (costA !== costB) return costA - costB;
//     if (a.row !== b.row) return a.row - b.row;
//     return a.col - b.col;
// });
// closestCells1.forEach(p => console.log(`  Cost: ${dist1.get(`${p.row}-${p.col}`)}, Point: (${p.row}, ${p.col})`));
// console.log("\n");

// // Expected closestCells1 (5 cells):
// // (1,1) cost 0
// // (0,1) cost 1
// // (1,0) cost 1
// // (1,2) cost 1
// // (2,1) cost 1
// // (0,0) cost 2 (or other cost 2 cells, depends on heap tie-breaking)
// // Test Case 2: Terrain Change Penalty
// // Scenario: A 3x3 grid with different terrain types. High penalty for changing.
// // Expected: Paths that avoid terrain changes will be cheaper, even if longer in terms of direct neighbor steps.

// // TypeScript

// // Test Case 2: Terrain Change Penalty
// console.log("--- Test Case 2: Terrain Change Penalty ---");

// const terrainMap2 = [
//     [3, 3, 0], // 0 is sea
//     [3, 3, 0],
//     [1, 1, 1]  // 1 is river
// ];
// const startPoint2: Point = { row: 0, col: 0 };
// const costs2: TerrainCosts = {
//     0: 10,   // Sea travel is 10
//     1: 2,    // River travel is 2
//     3: 1     // Land travel is 1
// };
// const terrainChangePenalty2 = 5; // High penalty for changing terrain
// const n2 = 6;

// const dist2 = searchTer(terrainMap2, startPoint2, costs2, terrainChangePenalty2);
// printDistMap(dist2, 3, 3);

// // Expected dist2 (from (0,0), landCost=1, riverCost=2, seaCost=10, penalty=5):
// // Cell (0,0): 0
// // Cell (0,1): Cost from (0,0) (type 3) to (0,1) (type 3) = 0 + 1 + 0 = 1
// // Cell (1,0): Cost from (0,0) (type 3) to (1,0) (type 3) = 0 + 1 + 0 = 1
// // Cell (1,1): Cost from (0,0) -> (0,1) -> (1,1) = 0 + 1 + 1 = 2 (or via (1,0))
// // Cell (0,2): Cost from (0,1) (type 3) to (0,2) (type 0) = 1 + 1 + 5 = 7 (penalty for 3->0)
// // Cell (1,2): Cost from (1,1) (type 3) to (1,2) (type 0) = 2 + 1 + 5 = 8 (penalty for 3->0)
// // Cell (2,0): Cost from (1,0) (type 3) to (2,0) (type 1) = 1 + 1 + 5 = 7 (penalty for 3->1)
// // Cell (2,1): From (2,0) (type 1) to (2,1) (type 1) = 7 + 2 + 0 = 9
// //              From (1,1) (type 3) to (2,1) (type 1) = 2 + 1 + 5 = 8 (this path is better!)
// // Cell (2,2): From (2,1) (type 1) to (2,2) (type 1) = 8 + 2 + 0 = 10
// //              From (1,2) (type 0) to (2,2) (type 1) = 8 + 10 + 5 = 23 (much worse due to 0->1 penalty)

// const closestCells2 = findNClosestCells(dist2, n2, terrainMap2);
// console.log(`Closest ${n2} cells (cost, point) for Test Case 2:`);
// closestCells2.sort((a, b) => {
//     const costA = dist2.get(`${a.row}-${a.col}`) || Infinity;
//     const costB = dist2.get(`${b.row}-${b.col}`) || Infinity;
//     if (costA !== costB) return costA - costB;
//     if (a.row !== b.row) return a.row - b.row;
//     return a.col - b.col;
// });
// closestCells2.forEach(p => console.log(`  Cost: ${dist2.get(`${p.row}-${p.col}`)}, Point: (${p.row}, ${p.col})`));
// console.log("\n");