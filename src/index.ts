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
class CloudNode {
  private node: HTMLElement;
  private downFlag = false;
  private downPos: Pos = { x: 0, y: 0 };
  private basePos: Pos = { x: 0, y: 0 };

  public constructor(node: HTMLElement) {
    this.node = node;
    node.addEventListener("mousedown", e => this.mouseDown(e));
    node.addEventListener("touchstart", e => this.mouseDown(e));
    window.addEventListener("mousemove", e => this.mouseMove(e));
    window.addEventListener("touchmove", e => this.mouseMove(e));
    window.addEventListener("mouseup", () => this.mouseUp());
    window.addEventListener("touchend", () => this.mouseUp());
  }
  private static convertPos(e: MouseEvent | TouchEvent) {
    let p = { x: 0, y: 0 };
    if ("targetTouches" in e) {
      let touch = e.targetTouches[0];
      p = { x: touch.pageX, y: touch.pageY };
    } else p = { x: e.clientX, y: e.clientY };

    return p;
  }
  private mouseDown(e: MouseEvent | TouchEvent) {
    this.downFlag = true;
    this.downPos = CloudNode.convertPos(e);
    this.basePos = { x: this.node.offsetLeft, y: this.node.offsetTop };
  }
  private mouseMove(e: MouseEvent | TouchEvent) {
    if (this.downFlag) {
      const p = CloudNode.convertPos(e);
      this.node.style.left = this.basePos.x + p.x - this.downPos.x + "px";
      this.node.style.top = this.basePos.y + p.y - this.downPos.y + "px";
    }
  }
  private mouseUp() {
    this.downFlag = false;
  }
  public getX() {
    return this.node.offsetLeft;
  }
  public getY() {
    return this.node.offsetTop;
  }
  public getWidth() {
    return this.node.clientWidth;
  }
  public getHeight() {
    return this.node.clientHeight;
  }
  public setPos(x: number, y: number) {
    this.node.style.left = x + "px";
    this.node.style.top = y + "px";
  }
}

/**
 *メイン動作
 *
 */
function Main(){
  const cloudNode = new CloudNode(<HTMLElement>(
    document.querySelector("div:nth-child(1)")
  ));
  cloudNode.setPos(
    (window.innerWidth - cloudNode.getWidth()) / 2,
    (window.innerHeight - cloudNode.getHeight()) / 2
  );
  let count = 0;
  const typeNode: HTMLElement[] = [];
  setInterval(() => {
    typeNode.forEach(node => {
      node.style.top = node.offsetTop + 2 + "px";
      if (node.offsetTop > document.body.clientWidth) {
        document.body.removeChild(node);
        typeNode.splice(typeNode.indexOf(node), 1);
      }
    });

    count++;
    if (count / 100 > 1) {
      count = Math.random() * 100;
      const node = document.createElement("div");
      node.innerText = Math.random() * 20 < 1 ? "肩" : "型";
      node.style.position = "absolute";
      node.style.fontSize = "3em";
      node.style.top = cloudNode.getY() + cloudNode.getHeight() - 20 + "px";
      node.style.left =
        cloudNode.getX() + Math.random() * cloudNode.getWidth() + "px";
      node.style.animation = `rot ${Math.random() + 0.1}s linear infinite`;
      document.body.appendChild(node);
      typeNode.push(node);
    }
  }, 1);
}

//DOMロード後に起動
addEventListener("DOMContentLoaded", Main);
