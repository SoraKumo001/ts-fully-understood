/**
 *位置設定用
 *
 * @interface Pos
 */
interface Pos {
    x: number;
    y: number;
}
/**
 *マウス/タップによるドラッグ操作ノード
 *
 * @class CloudNode
 */
declare class CloudNode {
    private node;
    private downFlag;
    private downPos;
    private basePos;
    constructor(node: HTMLElement);
    private static convertPos;
    private mouseDown;
    private mouseMove;
    private mouseUp;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    setPos(x: number, y: number): void;
}
/**
 *メイン動作
 *
 */
declare function Main(): void;
