const OFFSET = 0;//偏移值
export default class Score {
  constructor(props) {
    const {root, value} = props;
    this.props = props;
    this.root = root;
    this.value = value;
    this.render();

    this.circle = document.getElementById('circle-end');
    this.point = document.getElementById('circle-point');
    this.circleLine = document.getElementById('circle-line');
    this.circleArrow = document.getElementById('circle-arrow');

    const degree = this.getDegree(value);

   this.renderCircle(degree);
  this.renderArrow(degree);
    // var score =0;
    // var timer =setInterval(() =>{
    //   var degree = this.getDegree(score);
    //   console.log(score)
    //   this.renderCircle(degree)
    //   this.renderArrow(degree);
    //   score = score + 1;
    //   if( score > value){
    //     score = 0;
    //     clearInterval(timer)
    //   }
    // },26)
  }

  isOver180(end) {
    const center = {x:109, y: 109};
    const start = {x:10, y:157};
    const endX = 2 * center.x  - start.x;
    if(end.x >= endX) {
      return true;
    }
  }

  getDegree(score) {
    return ((180 - 2 * OFFSET) / 100) * score - 90 + OFFSET;
  }

  renderArrow(degree) {
    let {x, y} = this.getPosition(degree, 109, 109, 78);
    x = x - 4.5;
    y = y - 11.5;
    this.circleArrow.setAttribute('transform', `translate(${x},${y}) rotate(${degree},4.5 11.5)`);
  }

  renderCircle(degree) {
    let {x, y} = this.getPosition(degree, 109, 109);
    this.circle.setAttribute('cx', x);
    this.circle.setAttribute('cy', y);
    const isOverPI = this.isOver180({x, y});

    // x = Math.ceil(x);
    // y = Math.ceil(y);

    this.circleLine.setAttribute('d', `M10 157 A109,109 0,${isOverPI?1:0},1 ${x} ${y}`);
  }

  getPosition(degree, cx, cy, R = 109) {
    return {
      x: cx + Math.sin((2 * Math.PI / 360) * degree) * R,
      y: cy - Math.cos((2 * Math.PI / 360) * degree) * R
    };
  }

  render() {
    const html = `<svg width="100%" height="177" viewBox="0 0 218 157" preserveAspectRatio="xMidYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g transform="translate(2,5)">
          <path d="M10 157 A 109 109,0,1,1,208 157" stroke-width="1" fill="none" stroke="#FFECED"/>
          <path id="circle-line" stroke-width="1" fill="none" stroke="#FF979C"/>
          <path d="M20 157 A 99 99,0,1,1,198 157" stroke-dasharray="3 3" stroke-width="1" fill="none" stroke="#FF979C"/>
          <circle id="circle-end" cx="10" cy="10" r="4.5" fill="#FF979C" stroke="#FFECED" stroke-width="2"/>
          <g id="circle-arrow" transform="translate(27.684995265047775,83.95544214197943) rotate(-80,4.5 11.5)">
            <path d="M4.5 0 l -4.5 11.5 a 4 4 0 1 0 9 0 Z" fill="#FF979C" stroke-width="2" stroke="#FF979C"/>
            <circle id="circle-inner" r="3" cx="1" cy="109" fill="#fff"/>
          </g>
         
          </g>
     </svg>
    `
    this.root.innerHTML = html;
  }
}
new Score({
  root: window.root,
  value: 77
});
