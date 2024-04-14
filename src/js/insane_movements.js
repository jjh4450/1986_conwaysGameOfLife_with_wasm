export default function title_render(){
    const xMax = window.innerWidth - 100; // iframe width
    const yMax = window.innerHeight - 100; // iframe height
    console.log(xMax, yMax);
    const xPos = Math.floor(Math.random() * xMax);
    const yPos = Math.floor(Math.random() * yMax);
    document.documentElement.style.setProperty('--x-pos', `${xPos}px`);
    document.documentElement.style.setProperty('--y-pos', `${yPos}px`);
};