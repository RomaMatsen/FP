/*------------------------------------------------------розділ констант та стартових значень------------------------------------------------------------------------*/
//параметри робочого поля
const POINTS_COUNT_X = 225                                //кількість робочих клітин в ширину
const POINTS_COUNT_Y = 180                                //кількість робочих клітин в висоту
const POINT_SIZE = 4                                     //розмір робочої клітини в точках
const ABSOLUTE_TOP = 28                                  //верхня координата робочого поля (без необхідності не змінювати)
const ABSOLUTE_LEFT = 60                                 //ліва координата робочого поля (без необхідності не змінювати)
//параметри лупи
const LUPA_ROW_COLUMN_COUNT = 11                           //кількість клітин лупи на кожну сторону (тільки непарна кількість)
const LUPA_POINT_SIZE = 8                                //розмір клітини лупи в точках
//константи параметрів створення обєктів
const BORDER_YES = true;     const BORDER_NOT = false;     //наявність рамки
const MOUSE_CLICK_YES = true; const MOUSE_CLICK_NOT = false; //можливість клікати по обєкту
const MOUSE_MOVE_YES = true;  const MOUSE_MOVE_NOT = false;  //наявність реакції руху "над" обєктом
const TEXT_YES = true;       const TEXT_NOT = false;       //наявність тексту в обєкті
const DEFAULT_COLOR = "rgb(0, 0, 0)";                           //стартовий колір фону робочого поля
//параметри кольорової палітри
let currentFrontColor = 'rgba(255, 165, 0)';                 //стартовий колір для лівої кнопки
let currentBackColor = 'rgb(0, 255, 255)';                   //стартовий колір для правої кнопки

/*-------------------------------------------------------------розділ функцій-------------------------------------------------------------------------------------*/
{//функції скороченого написання
function max(a, b) {return Math.max(a, b);}
function min(a, b) {return Math.min(a, b);}
function abs(a) {return Math.abs(a);}
function round(a) {return Math.round(a);}
function floor(a) {return Math.floor(a);}
}

function showCurrentColors(numberFront, numberBack) {//рефреш вибраних кольорів
if (+numberBack<+numberFront) {//якщо права кнопка опинилася над лівою
    const bc = document.getElementById("GradientCube1").style.backgroundColor;
    document.getElementById("GradientCube1").style.backgroundColor = document.getElementById("GradientCube20").style.backgroundColor;
    document.getElementById("GradientCube20").style.backgroundColor = bc;
    numberFront = 21-numberFront;
    numberBack = 21-numberBack;
    }
//отримання параметрів кольорів
let w = document.getElementById("GradientCube1").style.backgroundColor;
const redFrontColor=w.slice(4, w.indexOf(","));
const greenFrontColor=w.slice(w.indexOf(",")+2, w.lastIndexOf(","));
const blueFrontColor=w.slice(w.lastIndexOf(",")+2, -1);
w = document.getElementById("GradientCube20").style.backgroundColor;
const redBackColor=w.slice(4, w.indexOf(","));
const greenBackColor=w.slice(w.indexOf(",")+2, w.lastIndexOf(","));
const blueBackColor=w.slice(w.lastIndexOf(",")+2, -1);
const redStepColor = (redBackColor-redFrontColor)/19;
const greenStepColor = (greenBackColor-greenFrontColor)/19;
const blueStepColor = (blueBackColor-blueFrontColor)/19;
for (let i=1; i<numberFront; i++) {//формування градієнту до кольору лівої кнопки
    w = document.getElementById('GradientCube'+i);
    w.style.backgroundColor = `rgb(${+redFrontColor+round(redStepColor*(i-1))}, ${+greenFrontColor+round(greenStepColor*(i-1))}, ${+blueFrontColor+round(blueStepColor*(i-1))})`;
    w.style.border = '0px';
    w.style.left = round(6+12/(numberFront-1)*(numberFront-i))+"px";
    w.style.width = round(15+23/(numberFront-1)*(i-1))+"px";
    w.style.height = 5+"px";
    w.style.top = ABSOLUTE_TOP+(i-1)*5+"px";}
//градієнтна ячейка кольору лівої кнопки
w = document.getElementById("GradientCube"+numberFront);
w.style.backgroundColor = `rgb(${+redFrontColor+round(redStepColor*(numberFront-1))}, ${+greenFrontColor+round(greenStepColor*(numberFront-1))}, ${+blueFrontColor+round(blueStepColor*(numberFront-1))})`;
w.style.border = `1px solid rgb(${redBackColor}, ${greenBackColor}, ${blueBackColor})`;
w.style.left = 5+"px";
w.style.width = 38+"px";
w.style.height = 25+"px";
w.style.top = ABSOLUTE_TOP+(numberFront-1)*5+"px";
for (let i=+numberFront+1; i<numberBack; i++) {//формування градієнту від кольору лівої кнопки до кольору правої кнопки
    w = document.getElementById("GradientCube"+i);
    w.style.backgroundColor = `rgb(${+redFrontColor+round(redStepColor*(i-1))}, ${+greenFrontColor+round(greenStepColor*(i-1))}, ${+blueFrontColor+round(blueStepColor*(i-1))})`;
    w.style.border = '0px';
    w.style.left = round(6+12/(numberBack-numberFront-1)*min(numberBack-i, i-numberFront))+"px";
    w.style.width = round(10+28/(numberBack-numberFront-1)*max(i-numberFront-1, numberBack-i-1))+"px";
    w.style.height = 5+"px";
    w.style.top = ABSOLUTE_TOP+22+(i-1)*5+"px";}
//градієнтна ячейка кольору правої кнопки
w = document.getElementById("GradientCube"+numberBack);
w.style.backgroundColor = `rgb(${+redFrontColor+round(redStepColor*(numberBack-1))}, ${+greenFrontColor+round(greenStepColor*(numberBack-1))}, ${+blueFrontColor+round(blueStepColor*(numberBack-1))})`;
w.style.border = `1px solid rgb(${redFrontColor}, ${greenFrontColor}, ${blueFrontColor})`;
w.style.left = 5+"px";
w.style.width = 38+"px";
w.style.height = 25+"px";
w.style.top = ABSOLUTE_TOP+22+(numberBack-1)*5+"px";
for (let i=+numberBack+1; i<=20; i++) {//формування градієнту після кольору правої кнопки
    w = document.getElementById("GradientCube"+i);
    w.style.backgroundColor = `rgb(${+redFrontColor+round(redStepColor*(i-1))}, ${+greenFrontColor+round(greenStepColor*(i-1))}, ${+blueFrontColor+round(blueStepColor*(i-1))})`;
    w.style.border = '0px';
    w.style.left = round(6+12/(20-numberBack-1)*(i-numberBack-1))+"px";
    w.style.width = round(15+23/(20-numberBack-1)*(20-i))+"px";
    w.style.height = 5+"px";
    w.style.top = ABSOLUTE_TOP+44+(i-1)*5+"px";}
}

{//отримання координат обєкта з його назви
function getXFromName(name) {return name.substr(4, name.length) % POINTS_COUNT_X;}
function getYFromName(name) {return floor(name.substr(4, name.length)/POINTS_COUNT_X);}
}

function mouseClickIsOn() {//натискання кнопки миші
    numberOfMouseButtonClick = event.which; makeEventMousePres(numberOfMouseButtonClick);
}

function mouseClickIsOff() {//відпускання кнопки миші
document.getElementById("CoordY1").style.visibility = 'hidden';
document.getElementById("CoordX1").style.visibility = 'hidden';
document.getElementById("PerimetrOfRectangle").style.visibility = 'hidden';
document.getElementById("SquareOfRectangle").style.visibility = 'hidden';
document.getElementById("WidthOfRectangle").style.visibility = 'hidden';
document.getElementById("HeightOfRectangle").style.visibility = 'hidden';
document.getElementById("LengthOfLine").style.visibility = 'hidden';
document.getElementById("SquareOfCircle").style.visibility = 'hidden';
document.getElementById("WidthOfCircle").style.visibility = 'hidden';
document.getElementById("HeightOfCircle").style.visibility = 'hidden';
if (moveInUse) {
    moveInUse = false;
    //console.log(event.currentTarget.getAttribute('id'));
    switch(lastEvent) {
        case "Drag_Point": {
            let startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
            while (!undoPoints[startIndex].checkPoint) startIndex++;
            offsetFigureToHook_X = undoPoints[startIndex].x;
            offsetFigureToHook_Y = undoPoints[startIndex].y;
            break;
        }
        case "Drag_Rectangle": {
            rectangleFirst_X = rectangleFirst_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            rectangleFirst_Y = rectangleFirst_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            rectangleLast_X = rectangleLast_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            rectangleLast_Y = rectangleLast_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            break;
        }
        case "Drag_Line": {
            lineFirst_X = lineFirst_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            lineFirst_Y = lineFirst_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            lineLast_X = lineLast_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            lineLast_Y = lineLast_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            break;
        }
        case "Drag_Circle": {
            circleFirst_X = circleFirst_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            circleFirst_Y = circleFirst_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            circleLast_X = circleLast_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            circleLast_Y = circleLast_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            break;
        }
        case "Drag_Section": {
            sectionFirst_X = sectionFirst_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            sectionFirst_Y = sectionFirst_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            sectionLast_X = sectionLast_X + round((event.clientX - moveFirst_X)/POINT_SIZE);
            sectionLast_Y = sectionLast_Y + round((event.clientY - moveFirst_Y)/POINT_SIZE);
            break;
        }
    }
    undoNumber++;
    showHelpLines(floor((event.clientX-ABSOLUTE_LEFT)/POINT_SIZE), floor((event.clientY-ABSOLUTE_TOP)/POINT_SIZE), currentBackColor);
}
if (pointInUse) {
    pointInUse = false;
    removeUndoPoints();
    const linkCurTarg = event.currentTarget.getAttribute('id');
    const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    if (undoPoints.length-startIndex >= 50) {
        let min_X = POINTS_COUNT_X;
        let max_X = 0;
        let min_Y = POINTS_COUNT_Y;
        let max_Y = 0;
        for (let i=startIndex; i<undoPoints.length; i++) {
            if (min_X > undoPoints[i].x) min_X = undoPoints[i].x;
            if (max_X < undoPoints[i].x) max_X = undoPoints[i].x;
            if (min_Y > undoPoints[i].y) min_Y = undoPoints[i].y;
            if (max_Y < undoPoints[i].y) max_Y = undoPoints[i].y;
        }
        const linkMoveCube = document.getElementById("MoveCube");
        const p = document.getElementById('Cube' + 1.0*(round((min_Y+max_Y)/2)*POINTS_COUNT_X + round((min_X+max_X)/2)));
        linkMoveCube.style.visibility = 'visible';
        linkMoveCube.style.left = p.style.left;
        linkMoveCube.style.top = p.style.top;
        offsetFigureToHook_X = undoPoints[startIndex].x;
        offsetFigureToHook_Y = undoPoints[startIndex].y;
    }
    showHelpLines(getXFromName(linkCurTarg), getYFromName(linkCurTarg), currentBackColor);
}
if (rectangleInUse) {
    rectangleInUse = false;
    removeUndoPoints();
    const smco=event.currentTarget.getAttribute('id');
    showHelpLines(getXFromName(smco), getYFromName(smco), currentBackColor);
    const w = document.getElementById("MoveCube");
    const p = document.getElementById('Cube' + 1.0*(max(rectangleFirst_Y+1, rectangleLast_Y+1)*POINTS_COUNT_X + round((rectangleFirst_X + rectangleLast_X)/2 + abs(rectangleFirst_X - rectangleLast_X)/4)));
    w.style.visibility = 'visible';
    w.style.left = p.style.left;
    w.style.top = p.style.top;
    //offsetFigureToHook_X = rectangleFirst_X - w.style.left.slice(0, -2);
    //offsetFigureToHook_Y = rectangleFirst_Y - w.style.top.slice(0, -2);
}
if (lineInUse) {
    lineInUse = false;
    removeUndoPoints();
    const smco = event.currentTarget.getAttribute('id');
    showHelpLines(getXFromName(smco), getYFromName(smco), currentBackColor);
    const w = document.getElementById("MoveCube");
    const p = document.getElementById('Cube' + 1.0*(round((lineFirst_Y + lineLast_Y)/2)*POINTS_COUNT_X + round((lineFirst_X + lineLast_X)/2)));
    w.style.visibility = 'visible';
    w.style.left = p.style.left;
    w.style.top = p.style.top;
}
if (circleInUse) {
    circleInUse = false;
    removeUndoPoints();
    const smco=event.currentTarget.getAttribute('id');
    showHelpLines(getXFromName(smco), getYFromName(smco), currentBackColor);
    const w = document.getElementById("MoveCube");
    const p = document.getElementById('Cube' + 1.0*(round((circleFirst_Y + circleLast_Y)/2 + abs(circleFirst_Y - circleLast_Y)/2.5)*POINTS_COUNT_X + round((circleFirst_X + circleLast_X)/2 + abs(circleFirst_X - circleLast_X)/2.5)));
    w.style.visibility = 'visible';
    w.style.left = p.style.left;
    w.style.top = p.style.top;
}
if (sectionInUse) {
    sectionInUse = false;
    removeUndoPoints();
    const smco = event.currentTarget.getAttribute('id');
    showHelpLines(getXFromName(smco), getYFromName(smco), currentBackColor);
    const w = document.getElementById("MoveCube");
    const p = document.getElementById('Cube' + 1.0*(round((sectionFirst_Y + sectionLast_Y)/2 + abs(sectionFirst_Y - sectionLast_Y)/2.5)*POINTS_COUNT_X + round((sectionFirst_X + sectionLast_X)/2 + abs(sectionFirst_X - sectionLast_X)/2.5)));
    w.style.visibility = 'visible';
    w.style.left = p.style.left;
    w.style.top = p.style.top;
}
numberOfMouseButtonClick = 0;
}

function addUndoPoint(objName, currentUndoNumber, chP) {//додати точку в стек для відновлення
const undoPoint = {
    color: document.getElementById(objName).style.backgroundColor,
    x: getXFromName(objName),
    y: getYFromName(objName),
    undoNumbers: currentUndoNumber,
    checkPoint: chP}
undoPoints.push(undoPoint);
}
function removeUndoPoints(s) {//відновити точку та видалити її з стеку
    if (undoPoints.length==0) return;
    const lastUndoNumber = undoPoints.at(-1).undoNumbers;
    while (lastUndoNumber==undoPoints.at(-1).undoNumbers) {
        if (s=="UndoCube") {
            if (redoPoints.length==0) {document.getElementById("RedoCube").src = "img/redo.jpg"}
            const undoPoint = {
                color: points[undoPoints.at(-1).y*POINTS_COUNT_X+undoPoints.at(-1).x].style.backgroundColor,
                x: undoPoints.at(-1).x,
                y: undoPoints.at(-1).y,
                undoNumbers: undoPoints.at(-1).undoNumbers};
            redoPoints.push(undoPoint);
        }
        points[undoPoints.at(-1).y*POINTS_COUNT_X+undoPoints.at(-1).x].style.backgroundColor = undoPoints.at(-1).color;
        undoPoints.pop();
        if (undoPoints.length==0) break;
    }
}

function line(x1, y1, x2, y2, color, lineStyle, thikness, chP) {
function showLine(x1, y1, x2, y2, color, lineStyle, thikness, chP) {//зображення лінії
    //якщо вся лінія за межами
    if (x1<0 && x2<0) return;
    if (x1>=POINTS_COUNT_X && x2>=POINTS_COUNT_X) return;
    if (y1<0 && y2<0) return;
    if (y1>=POINTS_COUNT_Y && y2>=POINTS_COUNT_Y) return;
    //якщо 1 координати за межами
    if (x1<0) {y1 = round((0-x1)*(y2-y1)/(x2-x1)+y1); x1 = 0;}
    //(x-x1)/(x2-x1)=(y-y1)/(y2-y1)
    //y=(x-x1)(y2-y1)/(x2-x1)+y1
    //x=(y-y1)(x2-x1)/(y2-y1)+x1
    if (y1<0) {x1 = round((0-y1)*(x2-x1)/(y2-y1)+x1); y1 = 0;}
    if (x2<0) {y2 = round((0-x1)*(y2-y1)/(x2-x1)+y1); x2 = 0;}
    if (y2<0) {x2 = round((0-y1)*(x2-x1)/(y2-y1)+x1); y2 = 0;}
    if (x1>=POINTS_COUNT_X) {y1 = round((POINTS_COUNT_X-1-x1)*(y2-y1)/(x2-x1)+y1); x1 = POINTS_COUNT_X-1;}
    if (y1>=POINTS_COUNT_Y) {x1 = round((POINTS_COUNT_Y-1-y1)*(x2-x1)/(y2-y1)+x1); y1 = POINTS_COUNT_Y-1};
    if (x2>=POINTS_COUNT_X) {y2 = round((POINTS_COUNT_X-1-x1)*(y2-y1)/(x2-x1)+y1); x2 = POINTS_COUNT_X-1;}
    if (y2>=POINTS_COUNT_Y) {x2 = round((POINTS_COUNT_Y-1-y1)*(x2-x1)/(y2-y1)+x1); y2 = POINTS_COUNT_Y-1;}
    //точка
    if (x1==x2 && y1==y2) {
        addUndoPoint(points[y1*POINTS_COUNT_X+x1].getAttribute('id'), undoNumber, chP);
                     points[y1*POINTS_COUNT_X+x1].style.backgroundColor = color;
        return;}
    //горизонтальна лінія
    let k=0;
    if (y1 == y2) {
        for (let i=x1; true; i=round(i+(x2-x1)/abs(x2-x1))) {
            if (x1<x2 && i>x2) break;
            if (x1>x2 && i<x2) break;
            if (lineStyle=="helpStyle" && k%20 != 0) {k++; continue;}
            if (lineStyle=="orientStyle" && k%10 != 0) {k++; continue;}
            if (lineStyle=="dashed" && (k%(3*thikness) >= 2*thikness)) {k++; continue;}
            if (lineStyle=="doted" && (k%(3*thikness) >= thikness)) {k++; continue;}
            if (lineStyle=="dashdot" && ((k%(6*thikness)>=thikness && k%(6*thikness)<2*thikness) || (k%(6*thikness)>=5*thikness))) {k++; continue;}
            addUndoPoint(points[y1*POINTS_COUNT_X+i].getAttribute('id'), undoNumber, chP);
                         points[y1*POINTS_COUNT_X+i].style.backgroundColor = color;
            k++;
        }
        return;}
    //вертикальна лінія
    k=0;
    if (x1 == x2) {
        for (i=y1; true; i=round(i+(y2-y1)/abs(y2-y1))) {
            if (y1<y2 && i>y2) break;
            if (y1>y2 && i<y2) break;
            if (lineStyle=="helpStyle" && k%20 != 0) {k++; continue;}
            if (lineStyle=="orientStyle" && k%10 != 0) {k++; continue;}
            if (lineStyle=="dashed" && (k%(3*thikness) >= 2*thikness)) {k++; continue;}
            if (lineStyle=="doted" && (k%(3*thikness) >= thikness)) {k++; continue;}
            if (lineStyle=="dashdot" && ((k%(6*thikness)>=thikness && k%(6*thikness)<2*thikness) || (k%(6*thikness)>=5*thikness))) {k++; continue;}
            addUndoPoint(points[i*POINTS_COUNT_X+x1].getAttribute('id'), undoNumber, chP);
                         points[i*POINTS_COUNT_X+x1].style.backgroundColor = color;
            k++;
        }
        return;}
    //нахилена лінія
    k=0;
    if (y1 != y2 && x1 != x2) {
        if ( abs(x1-x2) >= abs(y1-y2) ) {
            for (i=0; i<=abs(x1-x2); i++) {
                if (lineStyle=="orientStyle" && k%10 != 0) {k++; continue;}
                if (lineStyle=="dashed" && (k%(3*thikness) >= 2*thikness)) {k++; continue;}
                if (lineStyle=="doted" && (k%(3*thikness) >= thikness)) {k++; continue;}
                if (lineStyle=="dashdot" && ((k%(6*thikness)>=thikness && k%(6*thikness)<2*thikness) || (k%(6*thikness)>=5*thikness))) {k++; continue;}
                addUndoPoint(points[round(y1+((y2-y1)/abs(x2-x1))*i)*POINTS_COUNT_X+round(x1+i*(x2-x1)/abs(x2-x1))].getAttribute('id'), undoNumber, chP);
                                points[round(y1+((y2-y1)/abs(x2-x1))*i)*POINTS_COUNT_X+round(x1+i*(x2-x1)/abs(x2-x1))].style.backgroundColor = color;
                k++;
            }
        } else {
            if (y1 < y2) j=x1; else j=x2;
            for (i=0; i<=abs(y1-y2); i++) {
                if (lineStyle=="orientStyle" && k%10 != 0) {k++; continue;}
                if (lineStyle=="dashed" && (k%(3*thikness) >= 2*thikness)) {k++; continue;}
                if (lineStyle=="doted" && (k%(3*thikness) >= thikness)) {k++; continue;}
                if (lineStyle=="dashdot" && ((k%(6*thikness)>=thikness && k%(6*thikness)<2*thikness) || (k%(6*thikness)>=5*thikness))) {k++; continue;}
                addUndoPoint(points[(y1+i*(y2-y1)/abs(y2-y1))*POINTS_COUNT_X+round(x1+((x2-x1)/abs(y2-y1))*i)].getAttribute('id'), undoNumber, chP);
                                points[(y1+i*(y2-y1)/abs(y2-y1))*POINTS_COUNT_X+round(x1+((x2-x1)/abs(y2-y1))*i)].style.backgroundColor = color;
                k++;
            }
        }
    }
}//procedure showLine
if (thikness>1 && lineStyle!="double") {//якщо товщина лінії більша ніж 1 і тип не double
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    if (x1==x2) //якщо лінія вертикальна
        for (let i=0; i<thikness; i++) showLine(round(x1-thikness/2+i), y1, round(x2-thikness/2+i), y2, color, lineStyle, thikness, chP);
    if (y1==y2) //якщо лінія горизонтальна
        for (let i=0; i<thikness; i++) showLine(x1, round(y1-thikness/2+i), x2, round(y2-thikness/2+i), color, lineStyle, thikness, chP);
    if (x1!=x2 && y1!=y2) //якщо лінія коса
        for (let i=0; i<thikness; i++) {
            //нижня права четверть
            if (deltaX>0 && deltaY>0)
                if (deltaX>=deltaY) {showLine(round(x1+deltaY/deltaX*(thikness/2-i)), round(y1-(thikness/2-i)), round(x2+deltaY/deltaX*(thikness/2-i)), round(y2-(thikness/2-i)), color, lineStyle, thikness, chP);
                    if (deltaX+deltaY>=2 && i<thikness-1) showLine(round(x1+deltaY/deltaX*(thikness/2-i)), round(y1-(thikness/2-i))+1, round(x2+deltaY/deltaX*(thikness/2-i))-1, round(y2-(thikness/2-i)), color, lineStyle, thikness, chP);}
                    else {showLine(round(x1+(thikness/2-i)), round(y1-deltaX/deltaY*(thikness/2-i)), round(x2+(thikness/2-i)), round(y2-deltaX/deltaY*(thikness/2-i)), color, lineStyle, thikness, chP);
                        if (deltaX+deltaY>=2 && i<thikness-1) showLine(round(x1+(thikness/2-i)), round(y1-deltaX/deltaY*(thikness/2-i))+1, round(x2+(thikness/2-i))-1, round(y2-deltaX/deltaY*(thikness/2-i)), color, lineStyle, thikness, chP);}
            //верхня ліва четверть
            if (deltaX<0 && deltaY<0)
                if (abs(deltaX)>=abs(deltaY)) {showLine(round(x1-deltaY/deltaX*(thikness/2-i)), round(y1+(thikness/2-i)), round(x2-deltaY/deltaX*(thikness/2-i)), round(y2+(thikness/2-i)), color, lineStyle, thikness, chP);
                    if (abs(deltaX+deltaY)>=2 && i<thikness-1) showLine(round(x1-deltaY/deltaX*(thikness/2-i)), round(y1+(thikness/2-i))-1, round(x2-deltaY/deltaX*(thikness/2-i))+1, round(y2+(thikness/2-i)), color, lineStyle, thikness, chP);}
                    else {showLine(round(x1-(thikness/2-i)), round(y1+deltaX/deltaY*(thikness/2-i)), round(x2-(thikness/2-i)), round(y2+deltaX/deltaY*(thikness/2-i)), color, lineStyle, thikness, chP);
                        if (abs(deltaX+deltaY)>=2 && i<thikness-1) showLine(round(x1-(thikness/2-i)), round(y1+deltaX/deltaY*(thikness/2-i))-1, round(x2-(thikness/2-i))+1, round(y2+deltaX/deltaY*(thikness/2-i)), color, lineStyle, thikness, chP);}
            //верхня права четверть
            if (deltaX>0 && deltaY<0)
                if (deltaX>=abs(deltaY)) {showLine(round(x1+deltaY/deltaX*(thikness/2-i)), round(y1-(thikness/2-i)), round(x2+deltaY/deltaX*(thikness/2-i)), round(y2-(thikness/2-i)), color, lineStyle, thikness, chP);
                    if (deltaX+abs(deltaY)>=2 && i<thikness-1) showLine(round(x1+deltaY/deltaX*(thikness/2-i))+1, round(y1-(thikness/2-i)), round(x2+deltaY/deltaX*(thikness/2-i)), round(y2-(thikness/2-i))+1, color, lineStyle, thikness, chP);}
                    else {showLine(round(x1-(thikness/2-i)), round(y1+deltaX/deltaY*(thikness/2-i)), round(x2-(thikness/2-i)), round(y2+deltaX/deltaY*(thikness/2-i)), color, lineStyle, thikness, chP);
                        if (deltaX+abs(deltaY)>=2 && i<thikness-1) showLine(round(x1-(thikness/2-i))+1, round(y1+deltaX/deltaY*(thikness/2-i)), round(x2-(thikness/2-i)), round(y2+deltaX/deltaY*(thikness/2-i))+1, color, lineStyle, thikness, chP);}
            //нижня ліва четверть
            if (deltaX<0 && deltaY>0)
                if (abs(deltaX)>=deltaY) {showLine(round(x1-deltaY/deltaX*(thikness/2-i)), round(y1+(thikness/2-i)), round(x2-deltaY/deltaX*(thikness/2-i)), round(y2+(thikness/2-i)), color, lineStyle, thikness, chP);
                    if (abs(deltaX)+deltaY>=2 && i<thikness-1) showLine(round(x1-deltaY/deltaX*(thikness/2-i))-1, round(y1+(thikness/2-i)), round(x2-deltaY/deltaX*(thikness/2-i)), round(y2+(thikness/2-i))-1, color, lineStyle, thikness, chP);}
                    else {showLine(round(x1+(thikness/2-i)), round(y1-deltaX/deltaY*(thikness/2-i)), round(x2+(thikness/2-i)), round(y2-deltaX/deltaY*(thikness/2-i)), color, lineStyle, thikness, chP);
                        if (abs(deltaX)+deltaY>=2 && i<thikness-1) showLine(round(x1+(thikness/2-i))-1, round(y1-deltaX/deltaY*(thikness/2-i)), round(x2+(thikness/2-i)), round(y2-deltaX/deltaY*(thikness/2-i))-1, color, lineStyle, thikness, chP);}
            }
    return;
    }//if (thikness>1 && lineStyle!="double")
if (lineStyle=="double") {//якщо тип лінії double
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    for (let i=1; i<=floor(thikness/3); i++) {//"верхня" лінія
        if (abs(deltaX)>=abs(deltaY)) {//якщо лінія ширша
            showLine(round(x1+deltaY/deltaX*(floor(thikness/3)-i+1)), round(y1-(thikness-2*floor(thikness/3))/2-floor(thikness/3)+i-1),
                     round(x2+deltaY/deltaX*(floor(thikness/3)-i+1)), round(y2-(thikness-2*floor(thikness/3))/2-floor(thikness/3)+i-1), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaY>0) 
                showLine(round(x1+deltaY/deltaX*(floor(thikness/3)-i+1)), round(y1-(thikness-2*floor(thikness/3))/2-floor(thikness/3)+i-1)+1,
                        round(x2+deltaY/deltaX*(floor(thikness/3)-i+1))-deltaX/abs(deltaX), round(y2-(thikness-2*floor(thikness/3))/2-floor(thikness/3)+i-1), color, "solid", 1);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaY<0) 
                showLine(round(x1+deltaY/deltaX*(floor(thikness/3)-i+1))+deltaX/abs(deltaX), round(y1-(thikness-2*floor(thikness/3))/2-floor(thikness/3)+i-1),
                         round(x2+deltaY/deltaX*(floor(thikness/3)-i+1)), round(y2-(thikness-2*floor(thikness/3))/2-floor(thikness/3)+i-1)+1, color, "solid", 1, chP);
            }
        if (abs(deltaX)<abs(deltaY)) {//якщо лінія вища
            showLine(round(x1+(thikness-2*floor(thikness/3))/2+floor(thikness/3)-(floor(thikness/3)-i+1)), round(y1-deltaX/deltaY*i),
                     round(x2+(thikness-2*floor(thikness/3))/2+floor(thikness/3)-(floor(thikness/3)-i+1)), round(y2-deltaX/deltaY*i), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaX>0)
                showLine(round(x1+(thikness-2*floor(thikness/3))/2+floor(thikness/3)-(floor(thikness/3)-i+1))+1, round(y1-deltaX/deltaY*i),
                        round(x2+(thikness-2*floor(thikness/3))/2+floor(thikness/3)-(floor(thikness/3)-i+1)), round(y2-deltaX/deltaY*i)-deltaY/abs(deltaY), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaX<0)
                showLine(round(x1+(thikness-2*floor(thikness/3))/2+floor(thikness/3)-(floor(thikness/3)-i+1)), round(y1-deltaX/deltaY*i)+deltaY/abs(deltaY),
                        round(x2+(thikness-2*floor(thikness/3))/2+floor(thikness/3)-(floor(thikness/3)-i+1))+1, round(y2-deltaX/deltaY*i), color, "solid", 1, chP);
            }
        }
    //for (let i=1; i<=thikness-2*floor(thikness/3); i++) {//цикл для міжлініями}
    for (let i=1; i<=floor(thikness/3); i++) {//"нижня" лінія
        if (abs(deltaX)>=abs(deltaY)) {//якщо лінія ширша
            showLine(round(x1-deltaY/deltaX*i), round(y1+(thikness-2*floor(thikness/3))/2+i-1),
                     round(x2-deltaY/deltaX*i), round(y2+(thikness-2*floor(thikness/3))/2+i-1), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaY>0)
                showLine(round(x1-deltaY/deltaX*i), round(y1+(thikness-2*floor(thikness/3))/2+i-1+1),
                         round(x2-deltaY/deltaX*i)-deltaX/abs(deltaX), round(y2+(thikness-2*floor(thikness/3))/2+i-1), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaY<0)
                showLine(round(x1-deltaY/deltaX*i)+deltaX/abs(deltaX), round(y1+(thikness-2*floor(thikness/3))/2+i-1),
                         round(x2-deltaY/deltaX*i), round(y2+(thikness-2*floor(thikness/3))/2+i-1+1), color, "solid", 1, chP);
            }
        if (abs(deltaX)<abs(deltaY)) {//якщо лінія вища
            showLine(round(x1-(thikness-2*floor(thikness/3))/2-i), round(y1+deltaX/deltaY*i),
                     round(x2-(thikness-2*floor(thikness/3))/2-i), round(y2+deltaX/deltaY*i), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaX>0)
                showLine(round(x1-(thikness-2*floor(thikness/3))/2-i), round(y1+deltaX/deltaY*i)+deltaY/abs(deltaY),
                        round(x2-(thikness-2*floor(thikness/3))/2-i)-1, round(y2+deltaX/deltaY*i), color, "solid", 1, chP);
            if (floor(thikness/3)>=2 && i<floor(thikness/3) && deltaX<0)
                showLine(round(x1-(thikness-2*floor(thikness/3))/2-i)-1, round(y1+deltaX/deltaY*i),
                        round(x2-(thikness-2*floor(thikness/3))/2-i), round(y2+deltaX/deltaY*i)-deltaY/abs(deltaY), color, "solid", 1, chP);
            }
        }
    return;
    }//if (lineStyle=="double")
showLine(x1, y1, x2, y2, color, lineStyle, thikness, chP);
}//procedure line

//створювач обєктів
function makeDiv(divName, borderIs, eventMouseClickIs, eventMouseMoveIs, textIs, divTop, divLeft, divWidth, divHeight, divBackgroundColor, divBorderColor, divTextColor, picturePath, divText) {
    let HTMLText;
    if (picturePath=="") HTMLText = '<div class="CubeClass'; else HTMLText = `<img src="${picturePath}" class="CubeClass`;
    if (borderIs) HTMLText = HTMLText + 'WithBorder';
    HTMLText = HTMLText + `" id="${divName}"`;
    if (eventMouseClickIs) HTMLText = HTMLText + ` onmousedown="mouseClickIsOn()" onmouseup="mouseClickIsOff()"`;
    if (eventMouseMoveIs) HTMLText = HTMLText + ` onmousemove="mouseMove()" ondragstart="return false"`;
    HTMLText = HTMLText + `>`;
    if (textIs) HTMLText = HTMLText + divText;
    if (picturePath=="") HTMLText = HTMLText + `</div>`; else HTMLText = HTMLText + `</img>`;
    BASIC_ELEMENT.insertAdjacentHTML("beforeend", HTMLText);
    const myDiv = document.getElementById(divName);
    myDiv.style.top = divTop+"px";
    myDiv.style.left = divLeft+"px";
    myDiv.style.width = divWidth+"px";
    myDiv.style.height = divHeight+"px";
    myDiv.style.backgroundColor = divBackgroundColor;
    myDiv.style.borderColor = divBorderColor;
    myDiv.style.color = divTextColor;
    myDiv.style.textContent = divText;
    return myDiv;
}
function makeInput(inputName, inputTop, inputLeft, inputWidth, inputHeight, inputBackgroundColor, inputTextColor, inputText, inputMaxSymbols) {
    let HTMLText;
    HTMLText = `<input type="text" class="CubeClass" id="${inputName}"`;
    HTMLText = HTMLText + ` name="${inputName}"`;
    HTMLText = HTMLText + ` value="${inputText}"`;
    HTMLText = HTMLText + ` maxlength="${inputMaxSymbols}">`;
    BASIC_ELEMENT.insertAdjacentHTML("beforeend", HTMLText);
    const myInput = document.getElementById(inputName);
    myInput.style.top = inputTop+"px";
    myInput.style.left = inputLeft+"px";
    myInput.style.width = inputWidth+"px";
    myInput.style.height = inputHeight+"px";
    myInput.style.backgroundColor = inputBackgroundColor;
    myInput.style.color = inputTextColor;
}

function showInfo() {//відображення info
    s = event.currentTarget.getAttribute('id');
    const moveOn_XNumber = getXFromName(s);
    const moveOn_YNumber = getYFromName(s);
    document.getElementById("CoordX").textContent = "X:" + moveOn_XNumber;
    document.getElementById("CoordY").textContent = "Y:" + moveOn_YNumber;
    k = 1;
    for (j = moveOn_YNumber-floor(LUPA_ROW_COLUMN_COUNT/2); j <= (moveOn_YNumber+floor(LUPA_ROW_COLUMN_COUNT/2))/* && j<POINTS_COUNT_Y*/; j++) {
        for (i = moveOn_XNumber-floor(LUPA_ROW_COLUMN_COUNT/2); i <= (moveOn_XNumber+floor(LUPA_ROW_COLUMN_COUNT/2))/* && i<POINTS_COUNT_X*/; i++) {
            if (j<0 || j>=POINTS_COUNT_Y || i<0 || i>=POINTS_COUNT_X) document.getElementById("Lupa" + k + "Cube").style.backgroundColor = '#a5a5a5'; 
                else document.getElementById("Lupa" + k + "Cube").style.backgroundColor = points[j*POINTS_COUNT_X+i].style.backgroundColor;
            k++;}}
}

function showHelpLines(x, y, color) {//зображення допоміжних навігаційних ліній
    line(x-20, y, 0, y, color, "helpStyle", 1); line(x+20, y, POINTS_COUNT_X-1, y, color, "helpStyle", 1);
    line(x, y-20, x, 0, color, "helpStyle", 1); line(x, y+20, x, POINTS_COUNT_Y-1, color, "helpStyle", 1);
}

function getColor(numberFront, numberBack, startThikness, currentThikness, endThikness) {//для градієнта інструменту ТОЧКА
    let w = document.getElementById("GradientCube"+numberFront).style.backgroundColor;
    const rF=w.slice(4, w.indexOf(","));
    const gF=w.slice(w.indexOf(",")+2, w.lastIndexOf(","));
    const bF=w.slice(w.lastIndexOf(",")+2, -1);
    w = document.getElementById("GradientCube"+numberBack).style.backgroundColor;    
    const rB=w.slice(4, w.indexOf(","));
    const gB=w.slice(w.indexOf(",")+2, w.lastIndexOf(","));
    const bB=w.slice(w.lastIndexOf(",")+2, -1);
    const rC = round(+rF+(rB-rF)/(endThikness-startThikness)*(currentThikness-startThikness));
    const gC = round(+gF+(gB-gF)/(endThikness-startThikness)*(currentThikness-startThikness));
    const bC = round(+bF+(bB-bF)/(endThikness-startThikness)*(currentThikness-startThikness));
    return `rgb(${rC}, ${gC}, ${bC})`;
}

function isColorInSensitiveArea(etalonColor, tableColor) {//чи заливає згідно чутливості
    function getRedColor(color) {return color.slice(4, color.indexOf(","));}
    function getGreenColor(color) {return color.slice(color.indexOf(",")+2, color.lastIndexOf(","));}
    function getBlueColor(color) {return color.slice(color.lastIndexOf(",")+2, -1);}
    const redEtalonColor=getRedColor(etalonColor);
    const greenEtalonColor=getGreenColor(etalonColor);
    const blueEtalonColor=getBlueColor(etalonColor);
    const redTableColor=getRedColor(tableColor);
    const greenTableColor=getGreenColor(tableColor);
    const blueTableColor=getBlueColor(tableColor);
    if (redTableColor>=(1.0*redEtalonColor-fillInstrument.sensitive) && redTableColor<=(1.0*redEtalonColor+fillInstrument.sensitive) &&
        greenTableColor>=(1.0*greenEtalonColor-fillInstrument.sensitive) && greenTableColor<=(1.0*greenEtalonColor+fillInstrument.sensitive) &&
        blueTableColor>=(1.0*blueEtalonColor-fillInstrument.sensitive) && blueTableColor<=(1.0*blueEtalonColor+fillInstrument.sensitive)) return true; else return false;
}

function fill(x, y, oldColor, newColor) {
    if (points[y*POINTS_COUNT_X + x].style.backgroundColor==newColor) return;
    if (isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x].style.backgroundColor)) {
        addUndoPoint(`Cube${y*POINTS_COUNT_X + x}`, undoNumber);
        points[y*POINTS_COUNT_X + x].style.backgroundColor = newColor;
        if (y+1<POINTS_COUNT_Y && points[(y+1)*POINTS_COUNT_X + x].style.backgroundColor!=newColor &&
            isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X + x].style.backgroundColor)) fill(x, y+1, oldColor, newColor);
        if (x+1<POINTS_COUNT_X && points[y*POINTS_COUNT_X + x + 1].style.backgroundColor!=newColor &&
            isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x + 1].style.backgroundColor)) fill(x+1, y, oldColor, newColor);
        if (x-1>=0 && points[y*POINTS_COUNT_X + x - 1].style.backgroundColor!=newColor &&
            isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x - 1].style.backgroundColor)) fill(x-1, y, oldColor, newColor);
        if (y-1>=0 && points[(y-1)*POINTS_COUNT_X + x].style.backgroundColor!=newColor &&
            isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X + x].style.backgroundColor)) fill(x, y-1, oldColor, newColor);}
}

/*function division(x, y, oldColor, newColor) {
    //debugger;
    if  (isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X + x + 1].style.backgroundColor) &&
        (isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X + x].style.backgroundColor) || 
        isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x + 1].style.backgroundColor))) fill(x+1, y-1, oldColor, newColor);
    if (isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X + x - 1].style.backgroundColor) &&
        (isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X + x].style.backgroundColor) ||
        isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x - 1].style.backgroundColor))) fill(x-1, y-1, oldColor, newColor);
    if (isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X + x + 1].style.backgroundColor) &&
        ( isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X + x].style.backgroundColor)||
        isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x + 1].style.backgroundColor))) fill(x+1, y+1, oldColor, newColor);
    if (isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X + x - 1].style.backgroundColor) &&
        (isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X + x].style.backgroundColor) ||
        isColorInSensitiveArea(oldColor, points[y*POINTS_COUNT_X + x - 1].style.backgroundColor))) fill(x-1, y+1, oldColor, newColor);
    addUndoPoint(`Cube${y*POINTS_COUNT_X + x}`, undoNumber);
    points[y*POINTS_COUNT_X + x].style.backgroundColor = newColor;
    //debugger;
    for (let dx=x+2; dx<POINTS_COUNT_X && points[y*POINTS_COUNT_X+dx].style.backgroundColor==newColor; dx++) {
        if (isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X+dx].style.backgroundColor)) fill(dx, y-1, oldColor, newColor);
        if (isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X+dx].style.backgroundColor)) fill(dx, y+1, oldColor, newColor);}
    for (let dx=x-2; dx>0 && points[y*POINTS_COUNT_X+dx].style.backgroundColor==newColor; dx--) {
        if (isColorInSensitiveArea(oldColor, points[(y-1)*POINTS_COUNT_X+dx].style.backgroundColor)) fill(dx, y-1, oldColor, newColor);
        if (isColorInSensitiveArea(oldColor, points[(y+1)*POINTS_COUNT_X+dx].style.backgroundColor)) fill(dx, y+1, oldColor, newColor);}
    for (let dy=y+2; dy<POINTS_COUNT_Y && points[dy*POINTS_COUNT_X+x].style.backgroundColor==newColor; dy++) {
        if (isColorInSensitiveArea(oldColor, points[dy*POINTS_COUNT_X+x-1].style.backgroundColor)) fill(x-1, dy, oldColor, newColor);
        if (isColorInSensitiveArea(oldColor, points[dy*POINTS_COUNT_X+x+1].style.backgroundColor)) fill(x+1, dy, oldColor, newColor);}
    for (let dy=y-2; dy>0 && points[dy*POINTS_COUNT_X+x].style.backgroundColor==newColor; dy--) {
        if (isColorInSensitiveArea(oldColor, points[dy*POINTS_COUNT_X+x-1].style.backgroundColor)) fill(x-1, dy, oldColor, newColor);
        if (isColorInSensitiveArea(oldColor, points[dy*POINTS_COUNT_X+x+1].style.backgroundColor)) fill(x+1, dy, oldColor, newColor);}
}*/

function showPoint(x1, y1, x2, y2) {
    switch(pointIstrument.style) {//вибір форми пера
        case "point": {
            for (let pointY=0; pointY<pointIstrument.thikness; pointY++)
                for (let pointX=0; pointX<pointIstrument.thikness; pointX++) 
                    if (pointX==floor(pointIstrument.thikness/2) && pointY==floor(pointIstrument.thikness/2)) line(x1-floor(pointIstrument.thikness/2)+pointX, y1-floor(pointIstrument.thikness/2)+pointY, x2-floor(pointIstrument.thikness/2)+pointX, y2-floor(pointIstrument.thikness/2)+pointY, frontColor, "solid", 1, true);
                        else line(x1-floor(pointIstrument.thikness/2)+pointX, y1-floor(pointIstrument.thikness/2)+pointY, x2-floor(pointIstrument.thikness/2)+pointX, y2-floor(pointIstrument.thikness/2)+pointY, frontColor, "solid", 1, false);
            break;}
        case "hLine": {
            for (let pointX=0; pointX<pointIstrument.thikness; pointX++)
                if (pointX==floor(pointIstrument.thikness/2)) line(x1-floor(pointIstrument.thikness/2)+pointX, y1, x2-floor(pointIstrument.thikness/2)+pointX, y2, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointX, pointIstrument.thikness-1), "solid", 1, true);
                    else line(x1-floor(pointIstrument.thikness/2)+pointX, y1, x2-floor(pointIstrument.thikness/2)+pointX,  y2, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointX, pointIstrument.thikness-1), "solid", 1, false);
            break;}
        case "vLine": {
            for (let pointY=0; pointY<pointIstrument.thikness; pointY++) 
                if (pointY-floor(pointIstrument.thikness/2)==0) line(x1, y1-floor(pointIstrument.thikness/2)+pointY, x2, y2-floor(pointIstrument.thikness/2)+pointY, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointY, pointIstrument.thikness-1), "solid", 1, true);
                    else line(x1, y1-floor(pointIstrument.thikness/2)+pointY, x2, y2-floor(pointIstrument.thikness/2)+pointY, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointY, pointIstrument.thikness-1), "solid", 1, false);
            break;}
        case "dLine1337": {
            for (let pointXY=0; pointXY<pointIstrument.thikness; pointXY++) 
                if (floor(pointIstrument.thikness/2)-pointXY==0) line(x1+floor(pointIstrument.thikness/2)-pointXY, y1-floor(pointIstrument.thikness/2)+pointXY, x2+floor(pointIstrument.thikness/2)-pointXY, y2-floor(pointIstrument.thikness/2)+pointXY, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointXY, pointIstrument.thikness-1), "solid", 1, true);
                    else line(x1+floor(pointIstrument.thikness/2)-pointXY, y1-floor(pointIstrument.thikness/2)+pointXY, x2+floor(pointIstrument.thikness/2)-pointXY, y2-floor(pointIstrument.thikness/2)+pointXY, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointXY, pointIstrument.thikness-1), "solid", 1, false);
            break;}
        case "dLine1023": {
            for (let pointXY=0; pointXY<pointIstrument.thikness; pointXY++) 
                if (pointXY-floor(pointIstrument.thikness/2)==0) line(x1-floor(pointIstrument.thikness/2)+pointXY, y1-floor(pointIstrument.thikness/2)+pointXY, x2-floor(pointIstrument.thikness/2)+pointXY, y2-floor(pointIstrument.thikness/2)+pointXY, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointXY, pointIstrument.thikness-1), "solid", 1, true);
                    else line(x1-floor(pointIstrument.thikness/2)+pointXY, y1-floor(pointIstrument.thikness/2)+pointXY, x2-floor(pointIstrument.thikness/2)+pointXY, y2-floor(pointIstrument.thikness/2)+pointXY, getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointXY, pointIstrument.thikness-1), "solid", 1, false);
            break;}
    }
}

function showRectangle(x1, y1, x2, y2) {
    const deltaX = x2-x1;
    const deltaY = y2-y1;
    if (deltaX==0 && deltaY==0) {//якщо прямокутник зведений в точку
        addUndoPoint(s, undoNumber);
                     points[y1*POINTS_COUNT_X+x1].style.backgroundColor = frontColor;}
    if (rectangleInstrument.fillStyle=="solid")
        for (let i=0; i<=abs(deltaX); i++)
                line(min(x1, x2)+i, y1, min(x1, x2)+i, y2, frontColor, "solid", 1);
    if ((abs(deltaX)<rectangleInstrument.thikness || abs(deltaY)<rectangleInstrument.thikness) && (deltaX!=0 || deltaY!=0) && rectangleInstrument.fillStyle=="border") {
        line(x1, y1, x2, y1, frontColor, "solid", 1);
        line(x1, y1, x1, y2, frontColor, "solid", 1);
        line(x2, y1, x2, y2, frontColor, "solid", 1);
        line(x1, y2, x2, y2, frontColor, "solid", 1);
    }
    if (rectangleInstrument.lineStyle=="double" && abs(deltaX)>=rectangleInstrument.thikness && abs(deltaY)>=rectangleInstrument.thikness && rectangleInstrument.fillStyle=="border") {
        if (deltaX>0) {
            line(x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y1, x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y2, frontColor, "double", rectangleInstrument.thikness);
            line(x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y1, x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y2, frontColor, "double", rectangleInstrument.thikness);
            } else {
                line(x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y1, x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y2, frontColor, "double", rectangleInstrument.thikness);
                line(x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y1, x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y2, frontColor, "double", rectangleInstrument.thikness);}
        if (deltaY>0) {
            line(x1, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), x2, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), frontColor, "double", rectangleInstrument.thikness);
            line(x1, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, x2, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, frontColor, "double", rectangleInstrument.thikness);
            } else {
                line(x1, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, x2, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, frontColor, "double", rectangleInstrument.thikness);
                line(x1, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), x2, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), frontColor, "double", rectangleInstrument.thikness);}}
    if (rectangleInstrument.lineStyle!="double" && abs(deltaX)>=rectangleInstrument.thikness && abs(deltaY)>=rectangleInstrument.thikness && rectangleInstrument.fillStyle=="border") {
        if (deltaY>0) {
            line(x1, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), x2, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);
            line(x2, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, x1, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);
            } else {
                line(x1, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, x2, y1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY)+1-rectangleInstrument.thikness%2, frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);
                line(x2, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), x1, y2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaY/abs(deltaY), frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);}
        if (deltaX>0) {
            line(x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y1, x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y2, frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);
            line(x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y2, x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y1, frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);
            } else {
                line(x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y1, x1+(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX)+1-rectangleInstrument.thikness%2, y2, frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);
                line(x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y2, x2-(rectangleInstrument.thikness-rectangleInstrument.thikness%2)/2*deltaX/abs(deltaX), y1, frontColor, rectangleInstrument.lineStyle, rectangleInstrument.thikness);}}
}

function showLine(x1, y1, x2, y2) {
    const deltaX = x2-x1;
    const deltaY = y2-y1;
    if (x1==x2 && y1==y2) {//якщо лінія зведена в точку
        addUndoPoint(points[y1*POINTS_COUNT_X+x1].getAttribute('id'), undoNumber);
        points[y1*POINTS_COUNT_X+x1].style.backgroundColor = frontColor;}
    if (x1!=x2 || y1!=y2) //якщо лінія розтягнута (не точка)
        line(x1, y1, x2, y2, frontColor, lineInstrument.lineStyle, lineInstrument.thikness);
}

function showCircle(x1, y1, x2, y2) {
    /*формула овал
    (x-h)^2/a^2 + (y-k)^2/b^2 = 1
    (y-k)^2/b^2 = 1 - (x-h)^2/a^2
    (y-k)^2 = b^2*(1 - (x-h)^2/a^2)
    y-k = sqr(abs(b^2 - b^2(x-h)^2/a^2))
    y = sqr(abs(b^2 - b^2(x-h)^2/a^2)) + k*/
    /*
    (x-h)^2/a^2 + (y-k)^2/b^2 = 1
    (x-h)^2 = (1 - (y-k)^2/b^2)a^2
    x = sqr(abs((1 - (y-k)^2/b^2)a^2))+h
    //--------------------------------\\
    x^2/a^2 + y^2/b^2 = 1
    x^2/a^2 = 1 - y^2/b^2
    x^2 = a^2*(1-y^2/b^2)
    x = sqr(abs(a^2*(1-y^2/b^2)))
    */
    const deltaX = x2-x1;
    const deltaY = y2-y1;
    //якщо овал зведений в точку
    if (deltaX==0 && deltaY==0) {
        addUndoPoint(s, undoNumber);
        points[y1*POINTS_COUNT_X+x1].style.backgroundColor = frontColor;}
    //якщо овал заедений в лінію
    if ((deltaX==0 && deltaY!=0) || (deltaY==0 && deltaX!=0)) line(x1, y1, x2, y2, frontColor, "solid", 1);
    //якщо овал розтягнутий як овал
    if (deltaX!=0 && deltaY!=0) {
        const centrOfEllipsX = round((x1+x2)/2);
        const centrOfEllipsY = round((y1+y2)/2);
        const halfHeightOfEllipse = abs(deltaY)/2;
        const halfWidthOfEllipse = abs(deltaX)/2;

        let pointsOnMinCircle=0;
        const l=min(circleInstrument.thikness, min(halfHeightOfEllipse, halfWidthOfEllipse))-1;
        let y = -halfHeightOfEllipse+l;
        for (x=0; x<halfWidthOfEllipse; x++) {
            if (abs(y+Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-l)**2))*(halfHeightOfEllipse-l)**2 )))>1) break;
            y = -Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-l)**2))*(halfHeightOfEllipse-l)**2 ));
            pointsOnMinCircle++;
        }
        for (y=Math.ceil(y); y<halfHeightOfEllipse; y++) {
            if (abs(x-Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-l)**2))*(halfWidthOfEllipse-l)**2 )))>1) break;
            x =   Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-l)**2))*(halfWidthOfEllipse-l)**2 ));
            pointsOnMinCircle++;
        }
        for (x=floor(x); x>-halfWidthOfEllipse; x--) {
            if (abs(y-Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-l)**2))*(halfHeightOfEllipse-l)**2 )))>1) break;
            y =   Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-l)**2))*(halfHeightOfEllipse-l)**2 ));
            pointsOnMinCircle++;
        }
        for (y=floor(y); y>-halfHeightOfEllipse; y--) {
            if (abs(x+Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-l)**2))*(halfWidthOfEllipse-l)**2 )))>1) break;
            x = -Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-l)**2))*(halfWidthOfEllipse-l)**2 ));
            pointsOnMinCircle++;
        }
        for (x=Math.ceil(x); x<0; x++) pointsOnMinCircle++;

        for (let j=0; j<min(circleInstrument.thikness, min(halfHeightOfEllipse, halfWidthOfEllipse)); j++) {
            let pointsOnCurCircle = 0;
            y = -halfHeightOfEllipse+j;
            let x;
            for (x=0; x<halfWidthOfEllipse; x++) {
                if (abs(y+Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 )))>1) break;
                y = -Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                pointsOnCurCircle++;
            }
            for (y=Math.ceil(y); y<halfHeightOfEllipse; y++) {
                if (abs(x-Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 )))>1) break;
                x =   Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                pointsOnCurCircle++;
            }
            for (x=floor(x); x>-halfWidthOfEllipse; x--) {
                if (abs(y-Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 )))>1) break;
                y =   Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                pointsOnCurCircle++;
            }
            for (y=floor(y); y>-halfHeightOfEllipse; y--) {
                if (abs(x+Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 )))>1) break;
                x = -Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                pointsOnCurCircle++;
            }
            for (x=Math.ceil(x); x<0; x++) pointsOnCurCircle++;
            y = -halfHeightOfEllipse+j;
            let opm;
            let k = 0;
            for (x=0; x<halfWidthOfEllipse-j; x++) {
                if (abs(y+Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 )))>1) break;
                y =      -Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                //alfa = Math.atan(y/x)*180/Math.PI+90;
                opm = round(k/pointsOnCurCircle*pointsOnMinCircle/circleInstrument.thikness);
                if (circleInstrument.fillStyle=="border") {
                    if (circleInstrument.lineStyle=="solid" || 
                        (circleInstrument.lineStyle=="doted" && opm%2==0) ||
                        (circleInstrument.lineStyle=="dashed" && opm%3!=0) ||
                        (circleInstrument.lineStyle=="dashdot" && (opm%5==0 || opm%5==1 || opm%5==3)) ||
                        (circleInstrument.lineStyle=="double" && (j<circleInstrument.thikness/3 || j>=2*circleInstrument.thikness/3))) {
                        addUndoPoint(points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].style.backgroundColor = frontColor;
                    }
                } else {line(centrOfEllipsX+x, centrOfEllipsY+round(y), centrOfEllipsX+x, centrOfEllipsY-round(y), frontColor, "solid", 1);
                    line(centrOfEllipsX-x, centrOfEllipsY+round(y), centrOfEllipsX-x, centrOfEllipsY-round(y), frontColor, "solid", 1);}
                k++;
            }
            for (y=Math.ceil(y); y<halfHeightOfEllipse-j; y++) {
                if (circleInstrument.fillStyle=="solid" && y==1) break;
                if (abs(x-Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 )))>1) break;
                x =       Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                //alfa = Math.atan(y/x)*180/Math.PI+90;
                opm = round(k/pointsOnCurCircle*pointsOnMinCircle/circleInstrument.thikness);
                if (y==0 && x-floor(x)==0.5) x = x - 0.5;
                if (circleInstrument.fillStyle=="border") {
                    if (circleInstrument.lineStyle=="solid" ||
                        (circleInstrument.lineStyle=="doted" && opm%2==0) ||
                        (circleInstrument.lineStyle=="dashed" && opm%3!=0) ||
                        (circleInstrument.lineStyle=="dashdot" && (opm%5==0 || opm%5==1 || opm%5==3)) ||
                        (circleInstrument.lineStyle=="double" && (j<circleInstrument.thikness/3 || j>=2*circleInstrument.thikness/3)) ) {
                        addUndoPoint(points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].style.backgroundColor = frontColor;
                    }
                } else {line(centrOfEllipsX+round(x), centrOfEllipsY+y, centrOfEllipsX+round(x), centrOfEllipsY-y, frontColor, "solid", 1);
                    line(centrOfEllipsX-round(x), centrOfEllipsY+y, centrOfEllipsX-round(x), centrOfEllipsY-y, frontColor, "solid", 1);}
                k++;
            }
            if (circleInstrument.fillStyle=="solid") return;
            for (x=floor(x); x>-halfWidthOfEllipse+j; x--) {
                if (abs(y-Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 )))>1) break;
                y =   Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                //alfa = Math.atan(y/x)*180/Math.PI+90+ (x<0? 180: 0);
                opm = round(k/pointsOnCurCircle*pointsOnMinCircle/circleInstrument.thikness);
                if (x==0 && y-floor(y)==0.5) y = y - 0.5;
                if (circleInstrument.fillStyle=="border")
                    if (circleInstrument.lineStyle=="solid" ||
                        (circleInstrument.lineStyle=="doted" && opm%2==0) ||
                        (circleInstrument.lineStyle=="dashed" && opm%3!=0) ||
                        (circleInstrument.lineStyle=="dashdot" && (opm%5==0 || opm%5==1 || opm%5==3)) ||
                        (circleInstrument.lineStyle=="double" && (j<circleInstrument.thikness/3 || j>=2*circleInstrument.thikness/3)) ) {
                        addUndoPoint(points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].style.backgroundColor = frontColor;
                    }
                k++;
            }
            for (y=floor(y); y>-halfHeightOfEllipse+j; y--) {
                if (abs(x+Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 )))>1) break;
                x = -Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                //alfa = Math.atan(y/x)*180/Math.PI+90+180;
                opm = round(k/pointsOnCurCircle*pointsOnMinCircle/circleInstrument.thikness);
                if (y==0 && x-floor(x)==0.5) x = x + 0.5;
                if (circleInstrument.fillStyle=="border")
                    if (circleInstrument.lineStyle=="solid" ||
                        (circleInstrument.lineStyle=="doted" && opm%2==0) ||
                        (circleInstrument.lineStyle=="dashed" && opm%3!=0) ||
                        (circleInstrument.lineStyle=="dashdot" && (opm%5==0 || opm%5==1 || opm%5==3)) ||
                        (circleInstrument.lineStyle=="double" && (j<circleInstrument.thikness/3 || j>=2*circleInstrument.thikness/3)) ) {
                        addUndoPoint(points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].style.backgroundColor = frontColor;
                    }
                k++;
            }
            for (x=Math.ceil(x); x<0; x++) {
                y = -Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                //alfa = Math.atan(y/x)*180/Math.PI+90+180;
                opm = round(k/pointsOnCurCircle*pointsOnMinCircle/circleInstrument.thikness);
                if (circleInstrument.fillStyle=="border")
                    if (circleInstrument.lineStyle=="solid" ||
                        (circleInstrument.lineStyle=="doted" && opm%2==0) ||
                        (circleInstrument.lineStyle=="dashed" && opm%3!=0) ||
                        (circleInstrument.lineStyle=="dashdot" && (opm%5==0 || opm%5==1 || opm%5==3)) ||
                        (circleInstrument.lineStyle=="double" && (j<circleInstrument.thikness/3 || j>=2*circleInstrument.thikness/3)) ) {
                        addUndoPoint(points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].style.backgroundColor = frontColor;
                    }
                k++;
            }
        }
    }//if (deltaX!=0 && deltaY!=0)
}

function showSection(x1, y1, x2, y2) {
    const deltaX = x2-x1;
    const deltaY = y2-y1;
    /*формула овал
    (x-h)^2/a^2 + (y-k)^2/b^2 = 1
    (y-k)^2/b^2 = 1 - (x-h)^2/a^2
    (y-k)^2 = b^2*(1 - (x-h)^2/a^2)
    y-k = sqr(abs(b^2 - b^2(x-h)^2/a^2))
    y = sqr(abs(b^2 - b^2(x-h)^2/a^2)) + k*/
    /*
    (x-h)^2/a^2 + (y-k)^2/b^2 = 1
    (x-h)^2 = (1 - (y-k)^2/b^2)a^2
    x = sqr(abs((1 - (y-k)^2/b^2)a^2))+h
    //--------------------------------\\
    x^2/a^2 + y^2/b^2 = 1
    x^2/a^2 = 1 - y^2/b^2
    x^2 = a^2*(1-y^2/b^2)
    x = sqr(abs(a^2*(1-y^2/b^2)))
    */
    const centrOfEllipsX = round((x1+x2)/2);
    const centrOfEllipsY = round((y1+y2)/2);
    //якщо овал зведений в точку
    if (deltaX==0 && deltaY==0) {
        addUndoPoint(s, undoNumber);
        points[y1*POINTS_COUNT_X+x1].style.backgroundColor = frontColor;}
    //якщо овал заедений в лінію
    if ((deltaX==0 && deltaY!=0) || (deltaY==0 && deltaX!=0)) line(x1, y1, x2, y2, frontColor, "solid", 1);
    //якщо овал розтягнутий як овал
    if (deltaX!=0 && deltaY!=0) {
        //const lambda = 0.9;
        const halfHeightOfEllipse = abs(deltaY)/2;
        const halfWidthOfEllipse = abs(deltaX)/2;
        for (let j=0; j<min(sectionInstrument.thikness, min(halfHeightOfEllipse, halfWidthOfEllipse)); j++) {
            let y = -halfHeightOfEllipse+j;
            let alfa = 0;
            let x, k = 0;
            for (x=0; x<halfWidthOfEllipse; x++) {
                if (abs(y+Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 )))>1) break;
                y = -Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                if (Math.atan(y/x)*180/Math.PI+90>=sectionInstrument.startAngle && Math.atan(y/x)*180/Math.PI+90<=sectionInstrument.stopAngle) {
                    if (abs(alfa-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)<abs(Math.atan(y/x)*180/Math.PI+90-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)) {
                        k++;
                        let tmpY = Math.sqrt(abs( (1-(x-1)**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                        if (x-1==0 && tmpY-floor(tmpY)==0.5) tmpY = tmpY + 0.5;
                        if (sectionInstrument.radiusStyle && j==0) line(centrOfEllipsX, centrOfEllipsY, centrOfEllipsX+x-1, centrOfEllipsY-round(tmpY), sectionInstrument.pointStyle? frontColor: backColor, 'solid', 1);
                        if (sectionInstrument.pointStyle) {
                            addUndoPoint(points[(centrOfEllipsY-round(tmpY))*POINTS_COUNT_X+centrOfEllipsX+x-1].getAttribute('id'), undoNumber);
                            points[(centrOfEllipsY-round(tmpY))*POINTS_COUNT_X+centrOfEllipsX+x-1].style.backgroundColor = backColor;
                        }
                    }
                    alfa = Math.atan(y/x)*180/Math.PI+90;
                    if (sectionInstrument.lineStyle) {
                        addUndoPoint(points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].style.backgroundColor = frontColor;
                    }
                }
            }
            for (y=Math.ceil(y); y<halfHeightOfEllipse; y++) {
                if (abs(x-Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 )))>1) break;
                x =   Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                if (Math.atan(y/x)*180/Math.PI+90>=sectionInstrument.startAngle && Math.atan(y/x)*180/Math.PI+90<=sectionInstrument.stopAngle) {
                    if (abs(alfa-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)<abs(Math.atan(y/x)*180/Math.PI+90-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)) {
                        k++;
                        let tmpX = Math.sqrt(abs( (1-(y-1)**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                        if (y-1==0 && tmpX-floor(tmpX)==0.5) tmpX = tmpX - 0.5;
                        if (sectionInstrument.radiusStyle && j==0) line(centrOfEllipsX, centrOfEllipsY, centrOfEllipsX+round(tmpX), centrOfEllipsY+y-1, sectionInstrument.pointStyle? frontColor: backColor, 'solid', 1);
                        if (sectionInstrument.pointStyle) {
                            addUndoPoint(points[(centrOfEllipsY+y-1)*POINTS_COUNT_X+centrOfEllipsX+round(tmpX)].getAttribute('id'), undoNumber);
                            points[(centrOfEllipsY+y-1)*POINTS_COUNT_X+centrOfEllipsX+round(tmpX)].style.backgroundColor = backColor;
                        }
                    }
                    alfa = Math.atan(y/x)*180/Math.PI+90;
                    if (y==0 && x-floor(x)==0.5) x = x - 0.5;
                    if (sectionInstrument.lineStyle) {
                        addUndoPoint(points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].style.backgroundColor = frontColor;
                    }
                }
            }
            for (x=floor(x); x>-halfWidthOfEllipse; x--) {
                if (abs(y-Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 )))>1) break;
                y =   Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                if (Math.atan(y/x)*180/Math.PI+90+ (x<0? 180: 0) >=sectionInstrument.startAngle && Math.atan(y/x)*180/Math.PI+90+ (x<0? 180: 0) <=sectionInstrument.stopAngle) {
                    if (abs(alfa-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)<abs(Math.atan(y/x)*180/Math.PI+90+ (x<0? 180: 0) -k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)) {
                        k++;
                        let tmpY = Math.sqrt(abs( (1-(x+1)**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                        if (x+1==0 && tmpY-floor(tmpY)==0.5) tmpY = tmpY - 0.5;
                        if (sectionInstrument.radiusStyle && j==0) line(centrOfEllipsX, centrOfEllipsY, centrOfEllipsX+x+1, centrOfEllipsY+round(tmpY), sectionInstrument.pointStyle? frontColor: backColor, 'solid', 1);
                        if (sectionInstrument.pointStyle) {
                            addUndoPoint(points[(centrOfEllipsY+round(tmpY))*POINTS_COUNT_X+centrOfEllipsX+x+1].getAttribute('id'), undoNumber);
                            points[(centrOfEllipsY+round(tmpY))*POINTS_COUNT_X+centrOfEllipsX+x+1].style.backgroundColor = backColor;
                        }
                    }
                    alfa = Math.atan(y/x)*180/Math.PI+90+ (x<0? 180: 0);
                    if (x==0 && y-floor(y)==0.5) y = y - 0.5;
                    if (sectionInstrument.lineStyle) {
                        addUndoPoint(points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].style.backgroundColor = frontColor;
                    }
                }
            }
            for (y=floor(y); y>-halfHeightOfEllipse; y--) {
                if (abs(x+Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 )))>1) break;
                x = -Math.sqrt(abs( (1-y**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                if (Math.atan(y/x)*180/Math.PI+90+180 >= sectionInstrument.startAngle && Math.atan(y/x)*180/Math.PI+90+180 <= sectionInstrument.stopAngle) {
                    if (abs(alfa-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)<abs(Math.atan(y/x)*180/Math.PI+90+180-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)) {
                        k++;
                        let tmpX = -Math.sqrt(abs( (1-(y+1)**2/((halfHeightOfEllipse-j)**2))*(halfWidthOfEllipse-j)**2 ));
                        if (y+1==0 && tmpX-floor(tmpX)==0.5) tmpX = tmpX + 0.5;
                        if (sectionInstrument.radiusStyle && j==0) line(centrOfEllipsX, centrOfEllipsY, centrOfEllipsX+round(tmpX), centrOfEllipsY+y+1, sectionInstrument.pointStyle? frontColor: backColor, 'solid', 1);
                        if (sectionInstrument.pointStyle) {
                            addUndoPoint(points[(centrOfEllipsY+y+1)*POINTS_COUNT_X+centrOfEllipsX+round(tmpX)].getAttribute('id'), undoNumber);
                            points[(centrOfEllipsY+y+1)*POINTS_COUNT_X+centrOfEllipsX+round(tmpX)].style.backgroundColor = backColor;
                        }
                    }
                    alfa = Math.atan(y/x)*180/Math.PI+90+180;
                    if (y==0 && x-floor(x)==0.5) x = x + 0.5;
                    if (sectionInstrument.lineStyle) {
                        addUndoPoint(points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+y)*POINTS_COUNT_X+centrOfEllipsX+round(x)].style.backgroundColor = frontColor;
                    }
                }
            }
            for (x=Math.ceil(x); x<0; x++) {
                y = -Math.sqrt(abs( (1-x**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                if (Math.atan(y/x)*180/Math.PI+90+180 >= sectionInstrument.startAngle && Math.atan(y/x)*180/Math.PI+90+180 <= sectionInstrument.stopAngle) {
                    if (abs(alfa-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)<abs(Math.atan(y/x)*180/Math.PI+90+180-k*sectionInstrument.sectionAngle-sectionInstrument.startAngle)) {
                        k++;
                        let tmpY = -Math.sqrt(abs( (1-(x-1)**2/((halfWidthOfEllipse-j)**2))*(halfHeightOfEllipse-j)**2 ));
                        //if (x-1==0 && tmpY-floor(tmpY)==0.5) tmpY = tmpY - 0.5;
                        if (sectionInstrument.radiusStyle && j==0) line(centrOfEllipsX, centrOfEllipsY, centrOfEllipsX+x-1, centrOfEllipsY+round(tmpY), sectionInstrument.pointStyle? frontColor: backColor, 'solid', 1);
                        if (sectionInstrument.pointStyle) {
                            addUndoPoint(points[(centrOfEllipsY+round(tmpY))*POINTS_COUNT_X+centrOfEllipsX+x-1].getAttribute('id'), undoNumber);
                            points[(centrOfEllipsY+round(tmpY))*POINTS_COUNT_X+centrOfEllipsX+x-1].style.backgroundColor = backColor;
                        }
                    }
                    alfa = Math.atan(y/x)*180/Math.PI+90+180;
                    if (sectionInstrument.lineStyle) {
                        addUndoPoint(points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].getAttribute('id'), undoNumber);
                        points[(centrOfEllipsY+round(y))*POINTS_COUNT_X+centrOfEllipsX+x].style.backgroundColor = frontColor;
                    }
                }
            }
        }
    }//if (deltaX!=0 && deltaY!=0)
    /*document.getElementById("SquareOfsection").textContent = "s:?";
    document.getElementById("WidthOfsection").textContent = "w:" + (abs(deltaX)+1);
    document.getElementById("HeightOfsection").textContent = "h:" + (abs(deltaY)+1);*/
}

function refreshPoint() {
    //debugger;
    const startIndexHL = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoPointsHL = undoPoints.splice(startIndexHL, undoPoints.length-startIndexHL);
    tmpUndoPointsHL.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
    const startIndexOldPoints = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoOldPoints = undoPoints.splice(startIndexOldPoints, undoPoints.length-startIndexOldPoints);
    for (let i=tmpUndoOldPoints.length-1; i>=0; i--) points[tmpUndoOldPoints[i].y*POINTS_COUNT_X+tmpUndoOldPoints[i].x].style.backgroundColor = tmpUndoOldPoints[i].color;
    //for (let i=0; i<tmpUndoOldPoints.length; i++) console.log(`${i}: x=${tmpUndoOldPoints[i].x}   y=${tmpUndoOldPoints[i].y}   chP=${tmpUndoOldPoints[i].checkPoint}   color=${tmpUndoOldPoints[i].color}`);
    let j = 0; //видалимо не контрольні точки
    while (tmpUndoOldPoints.length>0 && j<tmpUndoOldPoints.length) if (tmpUndoOldPoints[j].checkPoint==true) j++; else tmpUndoOldPoints.splice(j, 1);
    j = 0; //видалимо повторення
    while (tmpUndoOldPoints.length>0 && j<tmpUndoOldPoints.length-1) if (tmpUndoOldPoints[j].x==tmpUndoOldPoints[j+1].x && tmpUndoOldPoints[j].y==tmpUndoOldPoints[j+1].y/* && tmpUndoOldPoints[j].color==tmpUndoOldPoints[j+1].color*/) tmpUndoOldPoints.splice(j+1, 1); else j++;
    //for (let i=0; i<tmpUndoOldPoints.length; i++) console.log(`${i}: x=${tmpUndoOldPoints[i].x}   y=${tmpUndoOldPoints[i].y}   chP=${tmpUndoOldPoints[i].checkPoint}   color=${tmpUndoOldPoints[i].color}`);
    undoNumber--;
    for (let i=0; i<tmpUndoOldPoints.length-1; i++) showPoint(tmpUndoOldPoints[i].x, tmpUndoOldPoints[i].y, tmpUndoOldPoints[i+1].x, tmpUndoOldPoints[i+1].y);
    undoNumber++;
    tmpUndoOldPoints.splice(0, tmpUndoOldPoints.length);
    tmpUndoPointsHL.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
        points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
    while (tmpUndoPointsHL.length>0) undoPoints.push(tmpUndoPointsHL.pop());
}

function refreshRectangle(x1, y1, x2, y2) {
    const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoPoints = undoPoints.splice(startIndex, undoPoints.length-startIndex);
    tmpUndoPoints.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
    removeUndoPoints();
    undoNumber--;
    showRectangle(x1, y1, x2, y2);
    undoNumber++;
    tmpUndoPoints.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
                                          points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
    while (tmpUndoPoints.length>0) undoPoints.push(tmpUndoPoints.pop());
}

function refreshLine(x1, y1, x2, y2) {
    const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoPoints = undoPoints.splice(startIndex, undoPoints.length-startIndex);
    tmpUndoPoints.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
    removeUndoPoints();
    undoNumber--;
    showLine(x1, y1, x2, y2);
    undoNumber++;
    tmpUndoPoints.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
                                          points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
    while (tmpUndoPoints.length>0) undoPoints.push(tmpUndoPoints.pop());
}

function refreshCircle(x1, y1, x2, y2) {
    const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoPoints = undoPoints.splice(startIndex, undoPoints.length-startIndex);
    tmpUndoPoints.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
    removeUndoPoints();
    undoNumber--;
    showCircle(x1, y1, x2, y2);
    undoNumber++;
    tmpUndoPoints.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
                                          points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
    while (tmpUndoPoints.length>0) undoPoints.push(tmpUndoPoints.pop());
}

function refreshSection(x1, y1, x2, y2) {
    const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoPoints = undoPoints.splice(startIndex, undoPoints.length-startIndex);
    tmpUndoPoints.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
    removeUndoPoints();
    undoNumber--;
    showSection(x1, y1, x2, y2);
    undoNumber++;
    tmpUndoPoints.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
                                                       points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
    while (tmpUndoPoints.length>0) undoPoints.push(tmpUndoPoints.pop());
}

function refreshFill(x, y, oldColor, newColor) {
    const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
    const tmpUndoPoints = undoPoints.splice(startIndex, undoPoints.length-startIndex);
    tmpUndoPoints.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
    removeUndoPoints();
    undoNumber--;
    fill(x, y, oldColor, newColor);
    undoNumber++;
    tmpUndoPoints.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
                                                       points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
    while (tmpUndoPoints.length>0) undoPoints.push(tmpUndoPoints.pop());
}

function makeEventMousePres(numberOfMouseButtonClick) {//обробка події натискання кнопки миші
    //якщо не натиснута жодна кнопка чи натиснутий скрол
    if (numberOfMouseButtonClick==0 || numberOfMouseButtonClick==2) {return;}
    const s = event.currentTarget.getAttribute('id');
    console.log(`Press on ${s}.     Instrument: ${currentInstrument}   x=${event.clientX}   y=${event.clientY}`);
    //якщо натиснуто на лупу або на фонові обєкти
    if (s.substr(0, 4)=="Lupa" || s=="BackgroundColorPalitreCube" || s=="BackgroundCube" || s=="BackgroundInstrumentPalitreCube") {lastEvent="Press_On_Background_Objekts"; return};
    if ( numberOfMouseButtonClick==3 && (s=="InstrumentPointCube" || s=="InstrumentRectangleCube" || s=="InstrumentLineCube" || s=="InstrumentCircleCube" || s=="InstrumentSectionCube" || s=="InstrumentFillCube")) {lastEvent="RightPress_On_Instruments"; return};
    //якщо натиснуто на Clear
    if (s=="ClearCube") {
        for (let i=0; i<POINTS_COUNT_X; i++)
            for (let j=0; j<POINTS_COUNT_Y; j++) points[j*POINTS_COUNT_X+i].style.backgroundColor = DEFAULT_COLOR;
        undoPoints.length = 0;
        redoPoints.length = 0;
        document.getElementById("UndoCube").src = "img/undoNotActive.jpg";
        document.getElementById("RedoCube").src = "img/redoNotActive.jpg";
        document.getElementById("ClearCube").src = "img/clearNotActive.jpg";
        lastEvent="Press_On_Clear_Cube";
        document.getElementById("MoveCube").style.visibility = 'hidden';
        return;}
    //якщо натиснуто на Ready
    if (s=="ReadyCube") {lastEvent = ""; document.getElementById("ReadyCube").src = "img/readyNotActive.jpg"; document.getElementById("MoveCube").style.visibility = 'hidden'; return;}
    //якщо натиснуто на кольора
    if (s=="WhiteCube" || s=="SilverCube" || s=="GrayCube" || s=="BlackCube" || s=="RedCube" || s=="MaroonCube" || s=="YellowCube" || s=="OrangeCube" || 
        s=="LimeCube" || s=="OliveCube" || s=="GreenCube" || s=="AquaCube" || s=="BlueCube" || s=="NavyCube" || s=="FuchsiaCube" || s=="PurpleCube") {
        if (numberOfMouseButtonClick==1) {
            numberFrontColorGradient = 1;
            currentFrontColor = event.currentTarget.style.backgroundColor;
            frontColor = currentFrontColor;
            document.getElementById("GradientCube1").style.backgroundColor = currentFrontColor;
            if (numberBackColorGradient!=20) {numberBackColorGradient = 20; currentBackColor = document.getElementById("GradientCube20").style.backgroundColor;}}
        if (numberOfMouseButtonClick==3) {
            numberBackColorGradient = 20;
            currentBackColor = event.currentTarget.style.backgroundColor;
            backColor = currentBackColor;
            document.getElementById("GradientCube20").style.backgroundColor = currentBackColor;
            if (numberFrontColorGradient!=1) {numberFrontColorGradient = 1; currentFrontColor=document.getElementById("GradientCube1").style.backgroundColor;}}
        showCurrentColors(numberFrontColorGradient, numberBackColorGradient);
        //lastEvent="Press_On_Colors";
        if (lastEvent=="Drag_Point") refreshPoint();
        if (lastEvent=="Drag_Rectangle") refreshRectangle(rectangleFirst_X, rectangleFirst_Y, rectangleLast_X, rectangleLast_Y);
        if (lastEvent=="Drag_Line") refreshLine(lineFirst_X, lineFirst_Y, lineLast_X, lineLast_Y);
        if (lastEvent=="Drag_Circle") refreshCircle(circleFirst_X, circleFirst_Y, circleLast_X, circleLast_Y);
        if (lastEvent=="Drag_Section") refreshSection(sectionFirst_X, sectionFirst_Y, sectionLast_X, sectionLast_Y);
        if (lastEvent=="Draw_Fill") refreshFill(fill_X, fill_Y, fill_OldColor, frontColor);
        return;}
    //якщо натиснуто на градієнт
    if (s.substr(0, 12)=="GradientCube") {
        let k = s.slice(12, s.length);
        if (k==numberFrontColorGradient && numberOfMouseButtonClick==1) return;
        if (k==numberBackColorGradient && numberOfMouseButtonClick==3) return;
        if (numberOfMouseButtonClick==1)
            if (k==numberBackColorGradient) {
                let w=currentFrontColor; currentFrontColor=currentBackColor; currentBackColor=w;
                frontColor = currentFrontColor;
                backColor = currentBackColor;
                showCurrentColors(numberBackColorGradient, numberFrontColorGradient);
                w = numberFrontColorGradient;
                numberFrontColorGradient=21-numberBackColorGradient;
                numberBackColorGradient=21-w;}
                else {
                    numberFrontColorGradient = k; 
                    currentFrontColor = event.currentTarget.style.backgroundColor; 
                    frontColor = currentFrontColor;
                    showCurrentColors(numberFrontColorGradient, numberBackColorGradient);
                    if (+numberFrontColorGradient>+numberBackColorGradient) {numberFrontColorGradient=21-numberFrontColorGradient; numberBackColorGradient=21-numberBackColorGradient;}
                }
        if (numberOfMouseButtonClick==3)
            if (k==numberFrontColorGradient) {
                let w=currentFrontColor; currentFrontColor=currentBackColor; currentBackColor=w;
                frontColor = currentFrontColor;
                backColor = currentBackColor;
                showCurrentColors(numberBackColorGradient, numberFrontColorGradient);
                w = numberFrontColorGradient;
                numberFrontColorGradient=21-numberBackColorGradient;
                numberBackColorGradient=21-w;}
                else {
                    numberBackColorGradient = k; 
                    currentBackColor = event.currentTarget.style.backgroundColor; 
                    backColor = currentBackColor;
                    showCurrentColors(numberFrontColorGradient, numberBackColorGradient);
                    if (+numberFrontColorGradient>+numberBackColorGradient) {numberFrontColorGradient=21-numberFrontColorGradient; numberBackColorGradient=21-numberBackColorGradient;}
                }
        //lastEvent="Press_On_Gradient";
        if (lastEvent=="Drag_Point") refreshPoint();
        if (lastEvent=="Drag_Rectangle") refreshRectangle(rectangleFirst_X, rectangleFirst_Y, rectangleLast_X, rectangleLast_Y);
        if (lastEvent=="Drag_Line") refreshLine(lineFirst_X, lineFirst_Y, lineLast_X, lineLast_Y);
        if (lastEvent=="Drag_Circle") refreshCircle(circleFirst_X, circleFirst_Y, circleLast_X, circleLast_Y);
        if (lastEvent=="Drag_Section") refreshSection(sectionFirst_X, sectionFirst_Y, sectionLast_X, sectionLast_Y);
        if (lastEvent=="Draw_Fill") refreshFill(fill_X, fill_Y, fill_OldColor, frontColor);
        return;}
    //якщо натиснуто на UNDO
    if (s=="UndoCube" && undoPoints.length!=0) {
        const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
        const tmpUndoPoints = undoPoints.splice(   startIndex   , undoPoints.length-startIndex);
        tmpUndoPoints.forEach((item) => {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color});
        if (undoPoints.length==0) document.getElementById("UndoCube").src = "img/undoNotActive.jpg";
        removeUndoPoints(s);
        if (undoPoints.length==0) document.getElementById("UndoCube").src = "img/undoNotActive.jpg";
        tmpUndoPoints.forEach(function(item) {item.color = points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor;
                                              points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = currentBackColor});
        /*undoPoints.splice(-1, 1, undoPoints.at(-1), tmpUndoPoints);
        tmpUndoPoints.splice(0, tmpUndoPoints.length);*/
        if (undoPoints.length==0) document.getElementById("ClearCube").src = "img/clearNotActive.jpg";
        document.getElementById("ReadyCube").src = "img/readyNotActive.jpg";
        while (tmpUndoPoints.length>0) undoPoints.push(tmpUndoPoints.pop());
        lastEvent="Press_On_Undo";
        document.getElementById("MoveCube").style.visibility = 'hidden';
        return;}
    //якщо натиснуто на REDO
    if (s=="RedoCube" && redoPoints.length!=0) {
        const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
        const tmpUndoPoints = undoPoints.splice(startIndex, undoPoints.length-startIndex);
        tmpUndoPoints.forEach(function(item) {points[item.y*POINTS_COUNT_X+item.x].style.backgroundColor = item.color;});
        document.getElementById("UndoCube").src = "img/undo.jpg";
        const lastRedoNumber = redoPoints.at(-1).undoNumbers;
        while (lastRedoNumber==redoPoints.at(-1).undoNumbers) {
            addUndoPoint(`Cube${redoPoints.at(-1).y*POINTS_COUNT_X+redoPoints.at(-1).x}`, redoPoints.at(-1).undoNumbers);
            points[redoPoints.at(-1).y*POINTS_COUNT_X+redoPoints.at(-1).x].style.backgroundColor = redoPoints.at(-1).color;
            redoPoints.pop();
            if (redoPoints.length==0) {document.getElementById("RedoCube").src = "img/redoNotActive.jpg"; break;}
        }
        while (tmpUndoPoints.length>0) {
            undoPoints.push(tmpUndoPoints.pop());
            undoPoints.at(-1).color = points[undoPoints.at(-1).y*POINTS_COUNT_X+undoPoints.at(-1).x].style.backgroundColor;
            points[undoPoints.at(-1).y*POINTS_COUNT_X+undoPoints.at(-1).x].style.backgroundColor = currentBackColor;}
        document.getElementById("ClearCube").src = "img/clear.jpg";
        document.getElementById("ReadyCube").src = "img/readyNotActive.jpg";
        document.getElementById("MoveCube").style.visibility = 'hidden';
        lastEvent="Press_On_Redo";
        return;}
    //якщо натиснуто на робоче поле (змінити REDO/UNDO)
    if (s.substr(0, 4)=="Cube") {
        if (redoPoints.length!=0) {redoPoints.length = 0; document.getElementById("RedoCube").src = "img/redoNotActive.jpg";}
        document.getElementById("UndoCube").src = "img/undo.jpg";
        document.getElementById("ClearCube").src = "img/clear.jpg";
        document.getElementById("ReadyCube").src = "img/ready.jpg";
        document.getElementById("MoveCube").style.visibility = 'hidden';
    }
    //якщо натиснуто на інструмент
    if (s=="InstrumentPointCube" || s=="InstrumentRectangleCube" || s=="InstrumentLineCube" || s=="InstrumentCircleCube" || s=="InstrumentSectionCube" || s=="InstrumentFillCube") {
        currentInstrument = showCurrentInstrument(currentInstrument, s);
        document.getElementById("ReadyCube").src = "img/readyNotActive.jpg";
        lastEvent="Press_On_Instrumets";
        document.getElementById("MoveCube").style.visibility = 'hidden';
        return;}
    //якщо натиснуто на MOVE
    if (s=="MoveCube") {
        moveFirst_X = event.clientX;
        moveFirst_Y = event.clientY;
        offsetMouseToHook_X = moveFirst_X - document.getElementById('MoveCube').style.left.slice(0, -2);
        offsetMouseToHook_Y = moveFirst_Y - document.getElementById('MoveCube').style.top.slice(0, -2);
        //console.log(`offset_X=${offsetMouseToHook_X}   offset_Y=${offsetMouseToHook_Y}`);
    }
    //якщо натиснуто на властивість інструмента
    if (s.substr(0,4)=="Prop") {
        switch(currentInstrument) {
            case "point": {
                switch(s) {
                    case "PropMinusThiknessCube":          {if ((pointIstrument.thikness>1 && pointIstrument.style=="point")||(pointIstrument.thikness>2 && pointIstrument.style!="point")) pointIstrument.thikness--; break;}
                    case "PropPlusThiknessCube":           {if (pointIstrument.thikness<200) pointIstrument.thikness++; break;}
                    case "PropOfPointStylePointCube":      {pointIstrument.style = "point"; break;}
                    case "PropOfPointStyleHLineCube":      {pointIstrument.style = "hLine"; if (pointIstrument.thikness==1) pointIstrument.thikness = 2; break;}
                    case "PropOfPointStyleVLineCube":      {pointIstrument.style = "vLine"; if (pointIstrument.thikness==1) pointIstrument.thikness = 2; break;}
                    case "PropOfPointStyleDLine13:37Cube": {pointIstrument.style = "dLine1337"; if (pointIstrument.thikness==1) pointIstrument.thikness = 2; break;}
                    case "PropOfPointStyleDLine10:23Cube": {pointIstrument.style = "dLine1023"; if (pointIstrument.thikness==1) pointIstrument.thikness = 2; break;}}
                if (lastEvent=="Drag_Point") refreshPoint();
                break;}
            case "rectangle": {
                switch(s) {
                    case "PropMinusThiknessCube": {
                        if (rectangleInstrument.lineStyle=="double" && rectangleInstrument.thikness>3) rectangleInstrument.thikness--;
                        if (rectangleInstrument.lineStyle!="double" && rectangleInstrument.thikness>1) rectangleInstrument.thikness--;
                        break;}
                    case "PropPlusThiknessCube":                {if (rectangleInstrument.thikness<200) rectangleInstrument.thikness++; break;}
                    case "PropOfRectangleLineStyleSolidCube":   {rectangleInstrument.lineStyle = "solid"; break;}
                    case "PropOfRectangleLineStyleDashedCube":  {rectangleInstrument.lineStyle = "dashed"; break;}
                    case "PropOfRectangleLineStyleDotedCube":   {rectangleInstrument.lineStyle = "doted"; break;}
                    case "PropOfRectangleLineStyleDashDotCube": {rectangleInstrument.lineStyle = "dashdot"; break;}
                    case "PropOfRectangleLineStyleDoubleCube":  {rectangleInstrument.lineStyle = "double"; if (rectangleInstrument.thikness<3) rectangleInstrument.thikness = 3; break;}
                    case "PropOfRectangleBorderCube":           {rectangleInstrument.fillStyle = "border"; break;}
                    case "PropOfRectangleSolidCube":            {rectangleInstrument.fillStyle = "solid"; break;}}
                if (lastEvent=="Drag_Rectangle") refreshRectangle(rectangleFirst_X, rectangleFirst_Y, rectangleLast_X, rectangleLast_Y);
                break;}
            case "line": {
                switch(s) {
                    case "PropMinusThiknessCube":           {
                        if (lineInstrument.lineStyle=="double" && lineInstrument.thikness>3) lineInstrument.thikness--;
                        if (lineInstrument.lineStyle!="double" && lineInstrument.thikness>1) lineInstrument.thikness--;
                        break;}
                    case "PropPlusThiknessCube":            {if (lineInstrument.thikness<200) lineInstrument.thikness++; break;}
                    case "PropOfLineLineStyleSolidCube":    {lineInstrument.lineStyle = "solid"; break;}
                    case "PropOfLineLineStyleDashedCube":   {lineInstrument.lineStyle = "dashed"; break;}
                    case "PropOfLineLineStyleDotedCube":    {lineInstrument.lineStyle = "doted"; break;}
                    case "PropOfLineLineStyleDashDotCube":  {lineInstrument.lineStyle = "dashdot"; break;}
                    case "PropOfLineLineStyleDoubleCube":   {lineInstrument.lineStyle = "double"; if (lineInstrument.thikness<3) lineInstrument.thikness = 3; break;}}
                if (lastEvent=="Drag_Line") refreshLine(lineFirst_X, lineFirst_Y, lineLast_X, lineLast_Y);
                break;}
            case "circle": {
                switch(s) {
                    case "PropMinusThiknessCube":           {
                        if (circleInstrument.lineStyle=="double" && circleInstrument.thikness>3) circleInstrument.thikness--;
                        if (circleInstrument.lineStyle!="double" && circleInstrument.thikness>1) circleInstrument.thikness--;
                        break;}
                    case "PropPlusThiknessCube":            {if (circleInstrument.thikness<200) circleInstrument.thikness++; break;}
                    case "PropOfCircleLineStyleSolidCube":  {circleInstrument.lineStyle = "solid"; break;}
                    case "PropOfCircleLineStyleDashedCube": {circleInstrument.lineStyle = "dashed"; break;}
                    case "PropOfCircleLineStyleDotedCube":  {circleInstrument.lineStyle = "doted"; break;}
                    case "PropOfCircleLineStyleDashDotCube":{circleInstrument.lineStyle = "dashdot"; break;}
                    case "PropOfCircleLineStyleDoubleCube": {circleInstrument.lineStyle = "double"; if (circleInstrument.thikness<3) circleInstrument.thikness = 3; break;}
                    case "PropOfCircleBorderCube":          {circleInstrument.fillStyle = "border"; break;}
                    case "PropOfCircleSolidCube":           {circleInstrument.fillStyle = "solid"; break;}}
                if (lastEvent=="Drag_Circle") refreshCircle(circleFirst_X, circleFirst_Y, circleLast_X, circleLast_Y);
                break;}
            case "section": {
                switch(s) {
                    case "PropMinusThiknessCube": {if (sectionInstrument.thikness>1) sectionInstrument.thikness--; break;}
                    case "PropPlusThiknessCube": {if (sectionInstrument.thikness<200) sectionInstrument.thikness++; break;}
                    case "PropMinusStartAngleCube": {
                        if (sectionInstrument.startAngle>-180) sectionInstrument.startAngle--; 
                        if (sectionInstrument.stopAngle-sectionInstrument.startAngle>360) sectionInstrument.stopAngle = sectionInstrument.startAngle+360; 
                        if (floor((sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionAngle)!=sectionInstrument.sectionCount) sectionInstrument.sectionCount = floor((sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionAngle); 
                        break;}
                    case "PropPlusStartAngleCube": {
                        if (sectionInstrument.startAngle<359 && sectionInstrument.startAngle<sectionInstrument.stopAngle-1) sectionInstrument.startAngle++; 
                        if (floor((sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionAngle)!=sectionInstrument.sectionCount) sectionInstrument.sectionCount = floor((sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionAngle); 
                        break;}
                    case "PropMinusSectionAngleCube": {
                        sectionInstrument.sectionAngle = floor(sectionInstrument.sectionAngle);
                        if (sectionInstrument.sectionAngle>1) sectionInstrument.sectionAngle--; 
                        sectionInstrument.sectionCount = floor((sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionAngle); 
                        break;}
                    case "PropPlusSectionAngleCube": {
                        sectionInstrument.sectionAngle = floor(sectionInstrument.sectionAngle);
                        if (sectionInstrument.sectionAngle<sectionInstrument.stopAngle-sectionInstrument.startAngle) sectionInstrument.sectionAngle++; 
                        sectionInstrument.sectionCount = floor((sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionAngle); 
                        break;}
                    case "PropMinusSectionCountCube": {
                        if (sectionInstrument.sectionCount>1) sectionInstrument.sectionCount--; 
                        sectionInstrument.sectionAngle = (sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionCount; 
                        break;}
                    case "PropPlusSectionCountCube": {
                        if (sectionInstrument.sectionCount<sectionInstrument.stopAngle-sectionInstrument.startAngle) sectionInstrument.sectionCount++; 
                        sectionInstrument.sectionAngle = (sectionInstrument.stopAngle-sectionInstrument.startAngle)/sectionInstrument.sectionCount; 
                        break;}
                    case "PropMinusStopAnglCube": {if (sectionInstrument.stopAngle>sectionInstrument.startAngle+1) sectionInstrument.stopAngle--; break;}
                    case "PropPlusStopAngleCube": {if (sectionInstrument.stopAngle<360 && sectionInstrument.stopAngle<sectionInstrument.startAngle+360) sectionInstrument.stopAngle++; break;}
                    case "PropOfSectionCircleYesCube": {sectionInstrument.lineStyle = true; break;}
                    case "PropOfSectionCircleNotCube": {if (sectionInstrument.pointStyle || sectionInstrument.radiusStyle) sectionInstrument.lineStyle = false; break;}
                    case "PropOfSectionPointYesCube": {sectionInstrument.pointStyle = true; break;}
                    case "PropOfSectionPointNotCube": {if (sectionInstrument.lineStyle || sectionInstrument.radiusStyle) sectionInstrument.pointStyle = false; break;}
                    case "PropOfSectionRadiusYesCube": {sectionInstrument.radiusStyle = true; break;}
                    case "PropOfSectionRadiusNotCube": {if (sectionInstrument.lineStyle || sectionInstrument.pointStyle) sectionInstrument.radiusStyle = false; break;}}
                if (lastEvent=="Drag_Section") refreshSection(sectionFirst_X, sectionFirst_Y, sectionLast_X, sectionLast_Y);
                break;}
            case "fill": {
                switch(s) {
                    case "PropMinusThiknessCube": {if (fillInstrument.sensitive>0) fillInstrument.sensitive--; break;}
                    case "PropPlusThiknessCube":  {if (fillInstrument.sensitive<200) fillInstrument.sensitive++; break;}
                }
                if (lastEvent=="Draw_Fill") refreshFill(fill_X, fill_Y, fill_OldColor, frontColor);
                break;}
        }
        showCurrentProperties("", currentInstrument);
        return;}
    //якщо натиснуто на робоче поле інструментом ТОЧКА
    if (currentInstrument=="point" && s.substr(0, 4)=="Cube") {
        document.getElementById("MoveCube").style.visibility = 'hidden';
        pointIstrument.thikness = +document.getElementById("PropOfPointThiknessCube").value;
        removeUndoPoints();
        if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
        if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
        pointFirst_X = getXFromName(s);
        pointFirst_Y = getYFromName(s);
        let chP;
        switch(pointIstrument.style) {//вибір пера
            case "point": {
                for (let pointY=0; pointY<pointIstrument.thikness; pointY++)
                    for (let pointX=0; pointX<pointIstrument.thikness; pointX++) {
                        if (pointY-floor(pointIstrument.thikness/2)==0 && pointX-floor(pointIstrument.thikness/2)==0) chP = true; else chP = false;
                        addUndoPoint(points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointY)*POINTS_COUNT_X + (pointFirst_X-floor(pointIstrument.thikness/2)+pointX)].getAttribute('id'), undoNumber, chP);
                        points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointY)*POINTS_COUNT_X + (pointFirst_X-floor(pointIstrument.thikness/2)+pointX)].style.backgroundColor = frontColor;}
                break;}
            case "hLine": {
                for (let pointX=0; pointX<pointIstrument.thikness; pointX++) {
                    if (pointFirst_X-floor(pointIstrument.thikness/2)+pointX<0 || pointFirst_X-floor(pointIstrument.thikness/2)+pointX>=POINTS_COUNT_X) continue;
                    if (pointX-floor(pointIstrument.thikness/2)==0) chP = true; else chP = false;
                    addUndoPoint(points[pointFirst_Y*POINTS_COUNT_X+(pointFirst_X-floor(pointIstrument.thikness/2)+pointX)].getAttribute('id'), undoNumber, chP);
                    points[pointFirst_Y*POINTS_COUNT_X+(pointFirst_X-floor(pointIstrument.thikness/2)+pointX)].style.backgroundColor = getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointX, pointIstrument.thikness-1);}
                break;}
            case "vLine": {
                for (let pointY=0; pointY<pointIstrument.thikness; pointY++) {
                    if (pointFirst_Y-floor(pointIstrument.thikness/2)+pointY<0 || pointFirst_Y-floor(pointIstrument.thikness/2)+pointY>=POINTS_COUNT_Y) continue;
                    if (pointY-floor(pointIstrument.thikness/2)==0) chP = true; else chP = false;
                    addUndoPoint(points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointY)*POINTS_COUNT_X + pointFirst_X].getAttribute('id'), undoNumber, chP);
                    points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointY)*POINTS_COUNT_X + pointFirst_X].style.backgroundColor = getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointY, pointIstrument.thikness-1);}
                break;}
            case "dLine1337": {
                for (let pointXY=0; pointXY<pointIstrument.thikness; pointXY++) {
                    if (pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY<0 || pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY>=POINTS_COUNT_Y || pointFirst_X+(floor(pointIstrument.thikness/2)-pointXY)<0 || pointFirst_X+(floor(pointIstrument.thikness/2)-pointXY)>=POINTS_COUNT_X) continue;
                    if (pointXY-floor(pointIstrument.thikness/2)==0) chP = true; else chP = false;
                    addUndoPoint(points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY)*POINTS_COUNT_X+(pointFirst_X+(floor(pointIstrument.thikness/2)-pointXY))].getAttribute('id'), undoNumber, chP);
                    points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY)*POINTS_COUNT_X + (pointFirst_X+(floor(pointIstrument.thikness/2)-pointXY))].style.backgroundColor = getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointXY, pointIstrument.thikness-1);}
                break;}
            case "dLine1023": {
                for (let pointXY=0; pointXY<pointIstrument.thikness; pointXY++) {
                    if (pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY<0 || pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY>=POINTS_COUNT_Y || pointFirst_X-floor(pointIstrument.thikness/2)+pointXY<0 || pointFirst_X-floor(pointIstrument.thikness/2)+pointXY>=POINTS_COUNT_X) continue;
                    if (pointXY-floor(pointIstrument.thikness/2)==0) chP = true; else chP = false;
                    addUndoPoint(points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY)*POINTS_COUNT_X + (pointFirst_X-floor(pointIstrument.thikness/2)+pointXY)].getAttribute('id'), undoNumber, chP);
                    points[(pointFirst_Y-floor(pointIstrument.thikness/2)+pointXY)*POINTS_COUNT_X + (pointFirst_X-floor(pointIstrument.thikness/2)+pointXY)].style.backgroundColor = getColor(numberFrontColorGradient, numberBackColorGradient, 0, pointXY, pointIstrument.thikness-1);}
                break;}
        }
        showInfo();
        undoNumber++;
        showHelpLines(pointFirst_X, pointFirst_Y, currentBackColor);
        lastEvent="Draw_Point";
        return;}
    //якщо натиснуто на робоче поле інструментом ПРЯМОКУТНИК
    if (currentInstrument=="rectangle" && s.substr(0, 4)=="Cube") {
        document.getElementById("MoveCube").style.visibility = 'hidden';
        rectangleInstrument.thikness = +document.getElementById("PropOfRectangleThiknessCube").value;
        removeUndoPoints("makeEventMousePress " + s); addUndoPoint(s, undoNumber);
        if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
        if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
        rectangleFirst_X = getXFromName(s);
        rectangleFirst_Y = getYFromName(s);
        points[rectangleFirst_Y*POINTS_COUNT_X+rectangleFirst_X].style.backgroundColor = frontColor;
        document.getElementById("CoordX1").textContent = "x1:" + rectangleFirst_X;
        document.getElementById("CoordY1").textContent = "y1:" + rectangleFirst_Y;
        document.getElementById("CoordX1").style.visibility = 'visible';
        document.getElementById("CoordY1").style.visibility = 'visible';
        document.getElementById("PerimetrOfRectangle").style.visibility = 'visible';
        document.getElementById("SquareOfRectangle").style.visibility = 'visible';
        document.getElementById("WidthOfRectangle").style.visibility = 'visible';
        document.getElementById("HeightOfRectangle").style.visibility = 'visible';
        showInfo();
        undoNumber++;
        showHelpLines(rectangleFirst_X, rectangleFirst_Y, currentBackColor);
        lastEvent="Draw_Rectangle";
        return;}
    //якщо натиснуто на робоче поле інструментом ЛІНІЯ
    if (currentInstrument=="line" && s.substr(0, 4)=="Cube") {
        document.getElementById("MoveCube").style.visibility = 'hidden';
        lineInstrument.thikness = +document.getElementById("PropOfLineThiknessCube").value;
        removeUndoPoints("makeEventMousePress " + s); addUndoPoint(s, undoNumber);
        if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
        if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
        event.currentTarget.style.backgroundColor = frontColor;
        lineFirst_X = getXFromName(s);
        lineFirst_Y = getYFromName(s);
        document.getElementById("CoordX1").textContent = "x1:" + lineFirst_X;
        document.getElementById("CoordY1").textContent = "y1:" + lineFirst_Y;
        document.getElementById("CoordX1").style.visibility = 'visible';
        document.getElementById("CoordY1").style.visibility = 'visible';
        document.getElementById("LengthOfLine").style.visibility = 'visible';
        showInfo();
        undoNumber++;
        showHelpLines(lineFirst_X, lineFirst_Y, currentBackColor);
        lastEvent="Draw_Line";
        return;}
    //якщо натиснуто на робоче поле інструментом ОВАЛ
    if (currentInstrument=="circle" && s.substr(0, 4)=="Cube") {
        document.getElementById("MoveCube").style.visibility = 'hidden';
        circleInstrument.thikness = +document.getElementById("PropOfCircleThiknessCube").value;
        removeUndoPoints("makeEventMousePress " + s); addUndoPoint(s, undoNumber);
        if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
        if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
        event.currentTarget.style.backgroundColor = frontColor;
        circleFirst_X = getXFromName(s);
        circleFirst_Y = getYFromName(s);
        document.getElementById("CoordX1").textContent = "x1:" + circleFirst_X;
        document.getElementById("CoordY1").textContent = "y1:" + circleFirst_Y;
        document.getElementById("CoordX1").style.visibility = 'visible';
        document.getElementById("CoordY1").style.visibility = 'visible';
        document.getElementById("SquareOfCircle").style.visibility = 'visible';
        document.getElementById("WidthOfCircle").style.visibility = 'visible';
        document.getElementById("HeightOfCircle").style.visibility = 'visible';
        showInfo();
        undoNumber++;
        showHelpLines(circleFirst_X, circleFirst_Y, currentBackColor);
        lastEvent="Draw_Circle";
        return;}
    //якщо натиснуто на робоче поле інструментом SECTION
    if (currentInstrument=="section" && s.substr(0, 4)=="Cube") {
        document.getElementById("MoveCube").style.visibility = 'hidden';
        sectionInstrument.thikness = +document.getElementById("PropOfSectionThiknessCube").value;
        sectionInstrument.startAngle = +document.getElementById("PropOfSectionStartAngleCube").value;
        sectionInstrument.sectionAngle = +document.getElementById("PropOfSectionSectionAngleCube").value;
        sectionInstrument.sectionCount = +document.getElementById("PropOfSectionSectionCountCube").value;
        sectionInstrument.stopAngle = +document.getElementById("PropOfSectionStopAngleCube").value;
        removeUndoPoints("makeEventMousePress " + s); addUndoPoint(s, undoNumber);
        if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
        if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
        event.currentTarget.style.backgroundColor = frontColor;
        sectionFirst_X = getXFromName(s);
        sectionFirst_Y = getYFromName(s);
        document.getElementById("CoordX1").textContent = "x1:" + sectionFirst_X;
        document.getElementById("CoordY1").textContent = "y1:" + sectionFirst_Y;
        document.getElementById("CoordX1").style.visibility = 'visible';
        document.getElementById("CoordY1").style.visibility = 'visible';
        /*document.getElementById("SquareOfCircle").style.visibility = 'visible';
        document.getElementById("WidthOfCircle").style.visibility = 'visible';
        document.getElementById("HeightOfCircle").style.visibility = 'visible';*/
        showInfo();
        undoNumber++;
        showHelpLines(sectionFirst_X, sectionFirst_Y, currentBackColor);
        lastEvent="Draw_Section";
        return;}
    //якщо натиснуто на робоче поле інструментом FILL
    if (currentInstrument=="fill" && s.substr(0, 4)=="Cube") {
        document.getElementById("MoveCube").style.visibility = 'hidden';
        fillInstrument.sensitive = +document.getElementById("PropOfFillSensitiveCube").value;
        fill_OldColor = event.currentTarget.style.backgroundColor;
        if (numberOfMouseButtonClick==1) frontColor = currentFrontColor;
        if (numberOfMouseButtonClick==3) frontColor = currentBackColor;
        if (fill_OldColor==frontColor) return;
        removeUndoPoints();
        fill_X = getXFromName(s);
        fill_Y = getYFromName(s);
        //division(x, y, oldColor, newColor);
        fill(fill_X, fill_Y, fill_OldColor, frontColor);
        showInfo();
        undoNumber++;
        showHelpLines(fill_X, fill_Y, currentBackColor);
        lastEvent="Draw_Fill";
        return;}
    //якщо натиснута ліва кнопка (для всіх інших випадків крім вище оброблених)
    if (numberOfMouseButtonClick==1) {return;}
    //якщо натиснуто на скрол
    if (numberOfMouseButtonClick==2) {/*тут буде реакція на нажим скрола (для цього ще потрібно видалити провірку вище)*/}
    //якщо натиснута права кнопка (для всіх інших випадків крім вище оброблених)
    if (numberOfMouseButtonClick==3) {return;}
}

function mouseMove() {//обробка руху мишки та одночасного натискання кнопок мишки (та Shift, Ctrl, Alt)
    const s = event.currentTarget.getAttribute('id');
    //MOVE
    if (moveInUse || (s=="MoveCube" && numberOfMouseButtonClick==1)) {
        if (!moveInUse) {moveInUse = true; removeUndoPoints(); undoNumber--;}
        //console.log(event.clientX - offsetMouseToHook_X + 'px');
        const delta_X = event.clientX - moveFirst_X;
        const delta_Y = event.clientY - moveFirst_Y;
        const linkMoveCube = document.getElementById('MoveCube');
        if (floor(linkMoveCube.style.left.slice(0, -2)/POINT_SIZE)==floor((event.clientX - offsetMouseToHook_X)/POINT_SIZE) && floor(linkMoveCube.style.top.slice(0, -2)/POINT_SIZE) == floor((event.clientY - offsetMouseToHook_Y)/POINT_SIZE)) return;
        linkMoveCube.style.left = event.clientX - offsetMouseToHook_X + 'px';
        linkMoveCube.style.top = event.clientY - offsetMouseToHook_Y + 'px';
        switch(lastEvent) {
            case "Drag_Point": {
                const startIndex = undoPoints.findIndex(item => item.undoNumbers==undoPoints.at(-1).undoNumbers);
                const tmpUndoPoints =undoPoints.splice(startIndex, undoPoints.length-startIndex);
                for (let i = tmpUndoPoints.length-1; i>=0; i--) 
                    points[tmpUndoPoints[i].y*POINTS_COUNT_X+tmpUndoPoints[i].x].style.backgroundColor = tmpUndoPoints[i].color;
                let i = 0;
                while (tmpUndoPoints.length>0 && i<tmpUndoPoints.length) if (tmpUndoPoints[i].checkPoint) i++; else tmpUndoPoints.splice(i, 1);
                i = 0;
                while (tmpUndoPoints.length>0 && i<tmpUndoPoints.length-1) if (tmpUndoPoints[i].x==tmpUndoPoints[i+1].x && tmpUndoPoints[i].y==tmpUndoPoints[i+1].y) tmpUndoPoints.splice(i, 1); else i++;
                for (let i=0; i<tmpUndoPoints.length-1; i++)
                        showPoint(offsetFigureToHook_X+round(delta_X/POINT_SIZE)+tmpUndoPoints[i].x-tmpUndoPoints[0].x, offsetFigureToHook_Y+round(delta_Y/POINT_SIZE)+tmpUndoPoints[i].y-tmpUndoPoints[0].y, offsetFigureToHook_X+round(delta_X/POINT_SIZE)+tmpUndoPoints[i+1].x-tmpUndoPoints[0].x, offsetFigureToHook_Y+round(delta_Y/POINT_SIZE)+tmpUndoPoints[i+1].y-tmpUndoPoints[0].y);
                tmpUndoPoints.splice(0, tmpUndoPoints.length);
                //removeUndoPoints();
                //showPoint
                break;
            }
            case "Drag_Rectangle": {
                removeUndoPoints();
                showRectangle(rectangleFirst_X+round(delta_X/POINT_SIZE), rectangleFirst_Y+round(delta_Y/POINT_SIZE), rectangleLast_X+round(delta_X/POINT_SIZE), rectangleLast_Y+round(delta_Y/POINT_SIZE));
                break;
            }
            case "Drag_Line": {
                removeUndoPoints();
                showLine(lineFirst_X+round(delta_X/POINT_SIZE), lineFirst_Y+round(delta_Y/POINT_SIZE), lineLast_X+round(delta_X/POINT_SIZE), lineLast_Y+round(delta_Y/POINT_SIZE));
                break;
            }
            case "Drag_Circle": {
                removeUndoPoints();
                showCircle(circleFirst_X+round(delta_X/POINT_SIZE), circleFirst_Y+round(delta_Y/POINT_SIZE), circleLast_X+round(delta_X/POINT_SIZE), circleLast_Y+round(delta_Y/POINT_SIZE));
                break;
            }
            case "Drag_Section": {
                removeUndoPoints();
                showSection(sectionFirst_X+round(delta_X/POINT_SIZE), sectionFirst_Y+round(delta_Y/POINT_SIZE), sectionLast_X+round(delta_X/POINT_SIZE), sectionLast_Y+round(delta_Y/POINT_SIZE));
                break;
            }
        }
        return;
    }
    //якщо рух відбувся в межах одної робочої клітини - вийти
    if (s==lastNameOfMouseMove) return;
    lastNameOfMouseMove = s;
    //якщо не натиснута кнопка або натиснуто скрол
    if (s.slice(0, 4)=="Cube" &&(numberOfMouseButtonClick==0 || numberOfMouseButtonClick==2)) {
        if (lastNameOfMouseMove=="") undoNumber++; else removeUndoPoints("mouseMove " + s + " else");
        showInfo();
        showHelpLines(getXFromName(s), getYFromName(s), currentBackColor);
        lastNameOfMouseMove = s; return;}
    //GRADIENT
    if (s.substr(0, 12)=="GradientCube") {
        if (numberOfMouseButtonClick==0 || numberOfMouseButtonClick==2) return;
        let k = s.slice(12, s.length);
        if (k==numberFrontColorGradient && numberOfMouseButtonClick==1) return;
        if (k==numberBackColorGradient && numberOfMouseButtonClick==3) return;
        if (numberOfMouseButtonClick==1)
            if (+k>=numberBackColorGradient) return;
                else {
                    numberFrontColorGradient = k; 
                    currentFrontColor = event.currentTarget.style.backgroundColor; 
                    frontColor = currentFrontColor;
                    showCurrentColors(numberFrontColorGradient, numberBackColorGradient);
                    if (+numberFrontColorGradient>+numberBackColorGradient) {numberFrontColorGradient=21-numberFrontColorGradient; numberBackColorGradient=21-numberBackColorGradient;}
                }
        if (numberOfMouseButtonClick==3)
            if (+k<=numberFrontColorGradient) return;
                else {
                    numberBackColorGradient = k; 
                    currentBackColor = event.currentTarget.style.backgroundColor;
                    backColor = currentBackColor; 
                    showCurrentColors(numberFrontColorGradient, numberBackColorGradient);
                    if (+numberFrontColorGradient>+numberBackColorGradient) {numberFrontColorGradient=21-numberFrontColorGradient; numberBackColorGradient=21-numberBackColorGradient;}
                }
        //lastEvent="Drag_Gradient";
        if (lastEvent=="Drag_Point") refreshPoint();
        if (lastEvent=="Drag_Rectangle") refreshRectangle(rectangleFirst_X, rectangleFirst_Y, rectangleLast_X, rectangleLast_Y);
        if (lastEvent=="Drag_Line") refreshLine(lineFirst_X, lineFirst_Y, lineLast_X, lineLast_Y);
        if (lastEvent=="Drag_Circle") refreshCircle(circleFirst_X, circleFirst_Y, circleLast_X, circleLast_Y);
        if (lastEvent=="Drag_Section") refreshSection(sectionFirst_X, sectionFirst_Y, sectionLast_X, sectionLast_Y);
        return;}
    //обробка вибраного інструменту
    if (s.slice(0, 4)=="Cube") switch(currentInstrument) {
        //рух мишки та натиснута кнопка інструментом ТОЧКА
        case "point": {
            removeUndoPoints();
            undoNumber--;
            if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
            if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
            if (!pointInUse) pointInUse = true;
            showPoint(pointFirst_X, pointFirst_Y, getXFromName(s), getYFromName(s));
            pointFirst_X = getXFromName(s);
            pointFirst_Y = getYFromName(s);
            showInfo();
            undoNumber++;
            showHelpLines(pointFirst_X, pointFirst_Y, currentBackColor);
            lastEvent="Drag_Point";
            break;}
        //рух мишки та натиснута кнопка інструментом ПРЯМОКУТНИК
        case "rectangle": {
            rectangleLast_X = getXFromName(s);
            rectangleLast_Y = getYFromName(s);
            if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
            if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
            if (rectangleInUse) undoNumber--; else rectangleInUse = true;
            removeUndoPoints("mouseMove " + s + " x1"); removeUndoPoints("mouseMove " + s + " x2");
            //якщо натиснуто shift
            if (event.shiftKey && rectangleFirst_X!=rectangleLast_X && rectangleFirst_Y!=rectangleLast_Y) {
                if (abs(rectangleLast_X-rectangleFirst_X)<abs(rectangleLast_Y-rectangleFirst_Y))
                    rectangleLast_X = rectangleFirst_X + abs(rectangleLast_Y-rectangleFirst_Y)*(rectangleLast_X-rectangleFirst_X)/abs(rectangleLast_X-rectangleFirst_X);
                    else rectangleLast_Y = rectangleFirst_Y + abs(rectangleLast_X-rectangleFirst_X)*(rectangleLast_Y-rectangleFirst_Y)/abs(rectangleLast_Y-rectangleFirst_Y);
                if (rectangleLast_X<0 || rectangleLast_X>=POINTS_COUNT_X) {
                    if (rectangleLast_X<0) rectangleLast_X = 0;
                    if (rectangleLast_X>=POINTS_COUNT_X) rectangleLast_X = POINTS_COUNT_X-1;
                    rectangleLast_Y = rectangleFirst_Y + abs(rectangleLast_X-rectangleFirst_X)*(rectangleLast_Y-rectangleFirst_Y)/abs(rectangleLast_Y-rectangleFirst_Y);}
                if (rectangleLast_Y<0 || rectangleLast_Y>=POINTS_COUNT_Y) {
                    if (rectangleLast_Y<0) rectangleLast_Y = 0;
                    if (rectangleLast_Y>=POINTS_COUNT_Y) rectangleLast_Y = POINTS_COUNT_Y-1;
                    rectangleLast_X = rectangleFirst_X + abs(rectangleLast_Y-rectangleFirst_Y)*(rectangleLast_X-rectangleFirst_X)/abs(rectangleLast_X-rectangleFirst_X);}}
            showRectangle(rectangleFirst_X, rectangleFirst_Y, rectangleLast_X, rectangleLast_Y);
            document.getElementById("PerimetrOfRectangle").textContent = "p:" + (2*abs(rectangleLast_X-rectangleFirst_X) + 2*abs(rectangleLast_Y-rectangleFirst_Y)+4);
            document.getElementById("SquareOfRectangle").textContent = "s:" + (abs(rectangleLast_X-rectangleFirst_X)+1)*(abs(rectangleLast_Y-rectangleFirst_Y)+1);
            document.getElementById("WidthOfRectangle").textContent = "w:" + (abs(rectangleLast_X-rectangleFirst_X)+1);
            document.getElementById("HeightOfRectangle").textContent = "h:" + (abs(rectangleLast_Y-rectangleFirst_Y)+1);
            showInfo();
            //допоміжні лінії
            undoNumber++;
            if (abs(rectangleLast_X-rectangleFirst_X)<=20 && abs(rectangleLast_Y-rectangleFirst_Y)<=20) {
                addUndoPoint(points[round((rectangleFirst_Y+rectangleLast_Y)/2)*POINTS_COUNT_X+round((rectangleFirst_X+rectangleLast_X)/2)].getAttribute('id'), undoNumber);
                             points[round((rectangleFirst_Y+rectangleLast_Y)/2)*POINTS_COUNT_X+round((rectangleFirst_X+rectangleLast_X)/2)].style.backgroundColor = backColor;}
            if (abs(rectangleLast_X-rectangleFirst_X)>20) {
                line(round((rectangleFirst_X+rectangleLast_X)/2), round((rectangleFirst_Y+rectangleLast_Y)/2), round((rectangleFirst_X+rectangleLast_X)/2), 0, backColor, "orientStyle");
                line(round((rectangleFirst_X+rectangleLast_X)/2), round((rectangleFirst_Y+rectangleLast_Y)/2), round((rectangleFirst_X+rectangleLast_X)/2), POINTS_COUNT_Y-1, backColor, "orientStyle");}
            if (abs(rectangleLast_Y-rectangleFirst_Y)>20) {
                line(round((rectangleFirst_X+rectangleLast_X)/2), round((rectangleFirst_Y+rectangleLast_Y)/2), 0, round((rectangleFirst_Y+rectangleLast_Y)/2), backColor, "orientStyle");
                line(round((rectangleFirst_X+rectangleLast_X)/2), round((rectangleFirst_Y+rectangleLast_Y)/2), POINTS_COUNT_X-1, round((rectangleFirst_Y+rectangleLast_Y)/2), backColor, "orientStyle");}
            if (abs(rectangleLast_X-rectangleFirst_X)>4) {
                line(min(rectangleFirst_X, rectangleLast_X)-1, min(rectangleFirst_Y, rectangleLast_Y)-1, min(rectangleFirst_X, rectangleLast_X)-1, 0, backColor, "orientStyle");
                line(min(rectangleFirst_X, rectangleLast_X)-1, max(rectangleFirst_Y, rectangleLast_Y)+1, min(rectangleFirst_X, rectangleLast_X)-1, POINTS_COUNT_Y-1, backColor, "orientStyle");
                line(max(rectangleFirst_X, rectangleLast_X)+1, min(rectangleFirst_Y, rectangleLast_Y)-1, max(rectangleFirst_X, rectangleLast_X)+1, 0, backColor, "orientStyle");
                line(max(rectangleFirst_X, rectangleLast_X)+1, max(rectangleFirst_Y, rectangleLast_Y)+1, max(rectangleFirst_X, rectangleLast_X)+1, POINTS_COUNT_Y-1, backColor, "orientStyle");}
            if (abs(rectangleLast_Y-rectangleFirst_Y)>4) {
                line(min(rectangleFirst_X, rectangleLast_X)-1, min(rectangleFirst_Y, rectangleLast_Y)-1, 0, min(rectangleFirst_Y, rectangleLast_Y)-1, backColor, "orientStyle");
                line(max(rectangleFirst_X, rectangleLast_X)+1, min(rectangleFirst_Y, rectangleLast_Y)-1, POINTS_COUNT_X-1, min(rectangleFirst_Y, rectangleLast_Y)-1, backColor, "orientStyle");
                line(min(rectangleFirst_X, rectangleLast_X)-1, max(rectangleFirst_Y, rectangleLast_Y)+1, 0, max(rectangleFirst_Y, rectangleLast_Y)+1, backColor, "orientStyle");
                line(max(rectangleFirst_X, rectangleLast_X)+1, max(rectangleFirst_Y, rectangleLast_Y)+1, POINTS_COUNT_X-1, max(rectangleFirst_Y, rectangleLast_Y)+1, backColor, "orientStyle");}
            lastEvent="Drag_Rectangle";
            break;}
        //рух мишки та натиснута кнопка інструментом ЛІНІЯ
        case "line": {
            lineLast_X = getXFromName(s);
            lineLast_Y = getYFromName(s);
            if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
            if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
            if (lineInUse) undoNumber--; else lineInUse = true;
            removeUndoPoints("mouseMove " + s); removeUndoPoints("mouseMove " + s);
            if (event.shiftKey && lineFirst_X!=lineLast_X && lineFirst_Y!=lineLast_Y) {//якщо натиснутий shift
                if (abs(lineLast_X-lineFirst_X)/abs(lineLast_Y-lineFirst_Y)<0.5) lineLast_X = lineFirst_X;
                else if (abs(lineLast_X-lineFirst_X)/abs(lineLast_Y-lineFirst_Y)>2.5) lineLast_Y = lineFirst_Y;
                else {
                    if (abs(lineLast_X-lineFirst_X)<abs(lineLast_Y-lineFirst_Y)) lineLast_X = lineFirst_X + abs(lineLast_Y-lineFirst_Y)*(lineLast_X-lineFirst_X)/abs(lineLast_X-lineFirst_X);
                    else lineLast_Y = lineFirst_Y + abs(lineLast_X-lineFirst_X)*(lineLast_Y-lineFirst_Y)/abs(lineLast_Y-lineFirst_Y);
                    if (lineLast_X<0 || lineLast_X>=POINTS_COUNT_X) {
                        if (lineLast_X<0) lineLast_X = 0;
                        if (lineLast_X>=POINTS_COUNT_X) lineLast_X = POINTS_COUNT_X-1;
                        lineLast_Y = lineFirst_Y + abs(lineLast_X-lineFirst_X)*(lineLast_Y-lineFirst_Y)/abs(lineLast_Y-lineFirst_Y);}
                    if (lineLast_Y<0 || lineLast_Y>=POINTS_COUNT_Y) {
                        if (lineLast_Y<0) lineLast_Y = 0;
                        if (lineLast_Y>=POINTS_COUNT_Y) lineLast_Y = POINTS_COUNT_Y-1;
                        lineLast_X = lineFirst_X + abs(lineLast_Y-lineFirst_Y)*(lineLast_X-lineFirst_X)/abs(lineLast_X-lineFirst_X);}}}
            showLine(lineFirst_X, lineFirst_Y, lineLast_X, lineLast_Y);
            document.getElementById("LengthOfLine").textContent = "len:" + (1+round(Math.sqrt(abs(lineLast_X-lineFirst_X)*abs(lineLast_X-lineFirst_X)+abs(lineLast_Y-lineFirst_Y)*abs(lineLast_Y-lineFirst_Y))));
            showInfo();
            //допоміжні лінії
            undoNumber++;
            if (lineFirst_X==lineLast_X) {
                line(lineFirst_X, 0, lineFirst_X, min(lineFirst_Y, lineLast_Y)-5, backColor, "doted", 1);
                line(lineFirst_X, max(lineFirst_Y, lineLast_Y)+5, lineFirst_X, POINTS_COUNT_Y-1, backColor, "doted", 1);}
            if (lineFirst_Y==lineLast_Y) {
                line(0, lineFirst_Y, min(lineFirst_X, lineLast_X)-5, lineFirst_Y, backColor, "doted", 1);
                line(max(lineFirst_X, lineLast_X)+5, lineFirst_Y, POINTS_COUNT_X-1, lineFirst_Y, backColor, "doted", 1);}
            if (lineFirst_X!=lineLast_X && lineFirst_Y!=lineLast_Y) {
                if (round((lineLast_Y-lineFirst_Y)*(0-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y)<0) {
                    line( round((lineLast_X-lineFirst_X)*(0-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X),                                  0,
                              round((lineLast_X-lineFirst_X)*((min(lineFirst_Y, lineLast_Y)-5)-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X), min(lineFirst_Y, lineLast_Y)-5, backColor, "doted", 1);
                } else if (round((lineLast_Y-lineFirst_Y)*(0-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y)>POINTS_COUNT_Y-1) {
                    line( round((lineLast_X-lineFirst_X)*((POINTS_COUNT_Y-1)-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X),                   POINTS_COUNT_Y-1,
                              round((lineLast_X-lineFirst_X)*((max(lineFirst_Y, lineLast_Y)+5)-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X), max(lineFirst_Y, lineLast_Y)+5, backColor, "doted", 1);
                } else line(0,                                      round((lineLast_Y-lineFirst_Y)*(0-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y),
                                min(lineFirst_X, lineLast_X)-5, round((lineLast_Y-lineFirst_Y)*((min(lineFirst_X, lineLast_X)-5)-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y), backColor, "doted", 1);
                if (round((lineLast_Y-lineFirst_Y)*((POINTS_COUNT_X-1)-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y)<0) {
                    line( round((lineLast_X-lineFirst_X)*((min(lineFirst_Y, lineLast_Y)-5)-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X), min(lineFirst_Y, lineLast_Y)-5,
                              round((lineLast_X-lineFirst_X)*(0-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X),                                  0, backColor, "doted", 1);
                } else if (round((lineLast_Y-lineFirst_Y)*((POINTS_COUNT_X-1)-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y)>POINTS_COUNT_Y-1) {
                    line( round((lineLast_X-lineFirst_X)*((max(lineFirst_Y, lineLast_Y)+5)-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X), max(lineFirst_Y, lineLast_Y)+5,
                              round((lineLast_X-lineFirst_X)*((POINTS_COUNT_Y-1)-lineFirst_Y)/(lineLast_Y-lineFirst_Y)+lineFirst_X),                   POINTS_COUNT_Y-1, backColor, "doted", 1);
                } else line( max(lineFirst_X, lineLast_X)+5, round((lineLast_Y-lineFirst_Y)*((max(lineFirst_X, lineLast_X)+5)-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y),
                                 POINTS_COUNT_X-1,                         round((lineLast_Y-lineFirst_Y)*((POINTS_COUNT_X-1)-lineFirst_X)/(lineLast_X-lineFirst_X)+lineFirst_Y), backColor, "doted", 1);}
            lastEvent="Drag_Line";
            break;}
        //рух мишки та натиснута кнопка інструментом ОВАЛ
        case "circle": {
            circleLast_X = getXFromName(s);
            circleLast_Y = getYFromName(s);
            if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
            if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
            if (circleInUse) undoNumber--; else circleInUse = true;
            removeUndoPoints("mouseMove " + s); removeUndoPoints("mouseMove " + s);
            //+Shift
            if (event.shiftKey && circleFirst_X!=circleLast_X && circleFirst_Y!=circleLast_Y) {
                if (abs(circleLast_X-circleFirst_X)<abs(circleLast_Y-circleFirst_Y))
                    circleLast_X = circleFirst_X + abs(circleLast_Y-circleFirst_Y)*(circleLast_X-circleFirst_X)/abs(circleLast_X-circleFirst_X);
                    else circleLast_Y = circleFirst_Y + abs(circleLast_X-circleFirst_X)*(circleLast_Y-circleFirst_Y)/abs(circleLast_Y-circleFirst_Y);
                if (circleLast_X<0 || circleLast_X>=POINTS_COUNT_X) {
                    if (circleLast_X<0) circleLast_X = 0;
                    if (circleLast_X>=POINTS_COUNT_X) circleLast_X = POINTS_COUNT_X-1;
                    circleLast_Y = circleFirst_Y + abs(circleLast_X-circleFirst_X)*(circleLast_Y-circleFirst_Y)/abs(circleLast_Y-circleFirst_Y);}
                if (circleLast_Y<0 || circleLast_Y>=POINTS_COUNT_Y) {
                    if (circleLast_Y<0) circleLast_Y = 0;
                    if (circleLast_Y>=POINTS_COUNT_Y) circleLast_Y = POINTS_COUNT_Y-1;
                    circleLast_X = circleFirst_X + abs(circleLast_Y-circleFirst_Y)*(circleLast_X-circleFirst_X)/abs(circleLast_X-circleFirst_X);}}
            /*формула овал
            (x-h)^2/a^2 + (y-k)^2/b^2 = 1
            (y-k)^2/b^2 = 1 - (x-h)^2/a^2
            (y-k)^2 = b^2*(1 - (x-h)^2/a^2)
            y-k = sqr(abs(b^2 - b^2(x-h)^2/a^2))
            y = sqr(abs(b^2 - b^2(x-h)^2/a^2)) + k*/
            /*
            (x-h)^2/a^2 + (y-k)^2/b^2 = 1
            (x-h)^2 = (1 - (y-k)^2/b^2)a^2
            x = sqr(abs((1 - (y-k)^2/b^2)a^2))+h

            x^2/a^2 + y^2/b^2 = 1
            x^2/a^2 = 1 - y^2/b^2
            x^2 = a^2*(1-y^2/b^2)
            x = sqr(abs(a^2*(1-y^2/b^2)))
            */
            showCircle(circleFirst_X, circleFirst_Y, circleLast_X, circleLast_Y);
            document.getElementById("SquareOfCircle").textContent = "s:?";
            document.getElementById("WidthOfCircle").textContent = "w:" + (abs(circleFirst_X-circleLast_X)+1);
            document.getElementById("HeightOfCircle").textContent = "h:" + (abs(circleFirst_Y-circleLast_Y)+1);
            //допоміжні лінії
            undoNumber++;
            if (abs(circleFirst_X-circleLast_X)<=20 && abs(circleFirst_Y-circleLast_Y)<=20) {
                addUndoPoint(points[round((circleFirst_Y+circleLast_Y)/2)*POINTS_COUNT_X+round((circleFirst_X+circleLast_X)/2)].getAttribute("id"), undoNumber);
                points[round((circleFirst_Y+circleLast_Y)/2)*POINTS_COUNT_X+round((circleFirst_X+circleLast_X)/2)].style.backgroundColor = backColor;}
            if (abs(circleFirst_X-circleLast_X)>20) {
                line(round((circleFirst_X+circleLast_X)/2), round((circleFirst_Y+circleLast_Y)/2), round((circleFirst_X+circleLast_X)/2), 0, backColor, "orientStyle");
                line(round((circleFirst_X+circleLast_X)/2), round((circleFirst_Y+circleLast_Y)/2), round((circleFirst_X+circleLast_X)/2), POINTS_COUNT_Y-1, backColor, "orientStyle");}
            if (abs(circleFirst_Y-circleLast_Y)>20) {
                line(round((circleFirst_X+circleLast_X)/2), round((circleFirst_Y+circleLast_Y)/2), 0, round((circleFirst_Y+circleLast_Y)/2), backColor, "orientStyle");
                line(round((circleFirst_X+circleLast_X)/2), round((circleFirst_Y+circleLast_Y)/2), POINTS_COUNT_X-1, round((circleFirst_Y+circleLast_Y)/2), backColor, "orientStyle");}
            if (abs(circleFirst_X-circleLast_X)>5) {
                line(min(circleFirst_X, circleLast_X), round((circleFirst_Y+circleLast_Y)/2), min(circleFirst_X, circleLast_X), 0, backColor, "orientStyle");
                line(min(circleFirst_X, circleLast_X), round((circleFirst_Y+circleLast_Y)/2), min(circleFirst_X, circleLast_X),   POINTS_COUNT_Y-1, backColor, "orientStyle");
                line(max(circleFirst_X, circleLast_X)+1, round((circleFirst_Y+circleLast_Y)/2), max(circleFirst_X, circleLast_X)+1, 0, backColor, "orientStyle");
                line(max(circleFirst_X, circleLast_X)+1, round((circleFirst_Y+circleLast_Y)/2), max(circleFirst_X, circleLast_X)+1, POINTS_COUNT_Y-1, backColor, "orientStyle");}
            if (abs(circleFirst_Y-circleLast_Y)>5) {
                line(round((circleFirst_X+circleLast_X)/2), min(circleFirst_Y, circleLast_Y)-1, 0, min(circleFirst_Y, circleLast_Y)-1, backColor, "orientStyle");
                line(round((circleFirst_X+circleLast_X)/2), min(circleFirst_Y, circleLast_Y)-1, POINTS_COUNT_X-1, min(circleFirst_Y, circleLast_Y)-1, backColor, "orientStyle");
                line(round((circleFirst_X+circleLast_X)/2), max(circleFirst_Y, circleLast_Y)+1, 0, max(circleFirst_Y, circleLast_Y)+1, backColor, "orientStyle");
                line(round((circleFirst_X+circleLast_X)/2), max(circleFirst_Y, circleLast_Y)+1, POINTS_COUNT_X-1, max(circleFirst_Y, circleLast_Y)+1, backColor, "orientStyle");}
            showInfo();
            lastEvent="Drag_Circle";
            break;}
        //рух мишки та натиснута кнопка інструментом СЕКЦІЯ
        case "section": {
            sectionLast_X = getXFromName(s);
            sectionLast_Y = getYFromName(s);
            if (numberOfMouseButtonClick==1) {frontColor = currentFrontColor; backColor=currentBackColor;} 
            if (numberOfMouseButtonClick==3) {frontColor = currentBackColor; backColor=currentFrontColor;}
            if (sectionInUse) undoNumber--; else sectionInUse = true;
            removeUndoPoints(); removeUndoPoints();
            //+Shift
            if (event.shiftKey && sectionFirst_X!=sectionLast_X && sectionFirst_Y!=sectionLast_Y) {
                if (abs(sectionLast_X-sectionFirst_X)<abs(sectionLast_Y-sectionFirst_Y))
                    sectionLast_X = sectionFirst_X + abs(sectionLast_Y-sectionFirst_Y)*(sectionLast_X-sectionFirst_X)/abs(sectionLast_X-sectionFirst_X);
                    else sectionLast_Y = sectionFirst_Y + abs(sectionLast_X-sectionFirst_X)*(sectionLast_Y-sectionFirst_Y)/abs(sectionLast_Y-sectionFirst_Y);
                if (sectionLast_X<0 || sectionLast_X>=POINTS_COUNT_X) {
                    if (sectionLast_X<0) sectionLast_X = 0;
                    if (sectionLast_X>=POINTS_COUNT_X) sectionLast_X = POINTS_COUNT_X-1;
                    sectionLast_Y = sectionFirst_Y + abs(sectionLast_X-sectionFirst_X)*(sectionLast_Y-sectionFirst_Y)/abs(sectionLast_Y-sectionFirst_Y);}
                if (sectionLast_Y<0 || sectionLast_Y>=POINTS_COUNT_Y) {
                    if (sectionLast_Y<0) sectionLast_Y = 0;
                    if (sectionLast_Y>=POINTS_COUNT_Y) sectionLast_Y = POINTS_COUNT_Y-1;
                    sectionLast_X = sectionFirst_X + abs(sectionLast_Y-sectionFirst_Y)*(sectionLast_X-sectionFirst_X)/abs(sectionLast_X-sectionFirst_X);}}
            showSection(sectionFirst_X, sectionFirst_Y, sectionLast_X, sectionLast_Y);
            //допоміжні лінії
            showInfo();
            undoNumber++;
            line(round(sectionFirst_X/2+sectionLast_X/2), round(sectionFirst_Y/2+sectionLast_Y/2), round(sectionFirst_X/2+sectionLast_X/2), 0, backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), round(sectionFirst_Y/2+sectionLast_Y/2), round(sectionFirst_X/2+sectionLast_X/2), POINTS_COUNT_Y-1, backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), round(sectionFirst_Y/2+sectionLast_Y/2), 0, round(sectionFirst_Y/2+sectionLast_Y/2), backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), round(sectionFirst_Y/2+sectionLast_Y/2), POINTS_COUNT_X-1, round(sectionFirst_Y/2+sectionLast_Y/2), backColor, "orientStyle");
            line(min(sectionFirst_X, sectionLast_X), round(sectionFirst_Y/2+sectionLast_Y/2), min(sectionFirst_X, sectionLast_X), 0, backColor, "orientStyle");
            line(min(sectionFirst_X, sectionLast_X), round(sectionFirst_Y/2+sectionLast_Y/2), min(sectionFirst_X, sectionLast_X), POINTS_COUNT_Y-1, backColor, "orientStyle");
            line(max(sectionFirst_X, sectionLast_X)+1, round(sectionFirst_Y/2+sectionLast_Y/2), max(sectionFirst_X, sectionLast_X)+1, 0, backColor, "orientStyle");
            line(max(sectionFirst_X, sectionLast_X)+1, round(sectionFirst_Y/2+sectionLast_Y/2), max(sectionFirst_X, sectionLast_X)+1, POINTS_COUNT_Y-1, backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), min(sectionFirst_Y, sectionLast_Y)-1, 0, min(sectionFirst_Y, sectionLast_Y)-1, backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), min(sectionFirst_Y, sectionLast_Y)-1, POINTS_COUNT_X-1, min(sectionFirst_Y, sectionLast_Y)-1, backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), max(sectionFirst_Y, sectionLast_Y)+1, 0, max(sectionFirst_Y, sectionLast_Y)+1, backColor, "orientStyle");
            line(round(sectionFirst_X/2+sectionLast_X/2), max(sectionFirst_Y, sectionLast_Y)+1, POINTS_COUNT_X-1, max(sectionFirst_Y, sectionLast_Y)+1, backColor, "orientStyle");
            lastEvent="Drag_Section";
            break;}
    }
    if (numberOfMouseButtonClick==1) {}
    if (numberOfMouseButtonClick==2) {/*тут буде код на реакцію скрола (але для цього ще треба видалити перевірку вище)*/}
    if (numberOfMouseButtonClick==3) {}
}

function showCurrentProperties(oldInstrument, newInstrument) {//рефреш властивостей інструменту
if (oldInstrument=="" || oldInstrument=="point") {
    document.getElementById("PropOfPointThiknessCube").style.visibility = 'hidden';
    document.getElementById("PropOfPointStylePointCube").style.visibility = 'hidden';
    document.getElementById("PropOfPointStyleHLineCube").style.visibility = 'hidden';
    document.getElementById("PropOfPointStyleVLineCube").style.visibility = 'hidden';
    document.getElementById("PropOfPointStyleDLine13:37Cube").style.visibility = 'hidden';
    document.getElementById("PropOfPointStyleDLine10:23Cube").style.visibility = 'hidden';}
if (oldInstrument=="" || oldInstrument=="rectangle") {
    document.getElementById("PropOfRectangleThiknessCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleLineStyleSolidCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleLineStyleDashedCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleLineStyleDotedCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleLineStyleDashDotCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleLineStyleDoubleCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleBorderCube").style.visibility = 'hidden';
    document.getElementById("PropOfRectangleSolidCube").style.visibility = 'hidden';}
if (oldInstrument=="" || oldInstrument=="line") {
    document.getElementById("PropOfLineThiknessCube").style.visibility = 'hidden';
    document.getElementById("PropOfLineLineStyleSolidCube").style.visibility = 'hidden';
    document.getElementById("PropOfLineLineStyleDashedCube").style.visibility = 'hidden';
    document.getElementById("PropOfLineLineStyleDotedCube").style.visibility = 'hidden';
    document.getElementById("PropOfLineLineStyleDashDotCube").style.visibility = 'hidden';
    document.getElementById("PropOfLineLineStyleDoubleCube").style.visibility = 'hidden';}
if (oldInstrument=="" || oldInstrument=="circle") {
    document.getElementById("PropOfCircleThiknessCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleLineStyleSolidCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleLineStyleDashedCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleLineStyleDotedCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleLineStyleDashDotCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleLineStyleDoubleCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleBorderCube").style.visibility = 'hidden';
    document.getElementById("PropOfCircleSolidCube").style.visibility = 'hidden';}
if (oldInstrument=="" || oldInstrument=="section") {
    document.getElementById("PropOfSectionThiknessCube").style.visibility = 'hidden';
    document.getElementById("PropMinusStartAngleCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionStartAngleCube").style.visibility = 'hidden';
    document.getElementById("PropPlusStartAngleCube").style.visibility = 'hidden';
    document.getElementById("PropMinusSectionAngleCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionSectionAngleCube").style.visibility = 'hidden';
    document.getElementById("PropPlusSectionAngleCube").style.visibility = 'hidden';
    document.getElementById("PropMinusSectionCountCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionSectionCountCube").style.visibility = 'hidden';
    document.getElementById("PropPlusSectionCountCube").style.visibility = 'hidden';
    document.getElementById("PropMinusStopAnglCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionStopAngleCube").style.visibility = 'hidden';
    document.getElementById("PropPlusStopAngleCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionCircleYesCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionCircleNotCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionPointYesCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionPointNotCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionRadiusYesCube").style.visibility = 'hidden';
    document.getElementById("PropOfSectionRadiusNotCube").style.visibility = 'hidden';}
if (oldInstrument=="" || oldInstrument=="fill") {
    document.getElementById("PropOfFillSensitiveCube").style.visibility = 'hidden';}
switch(newInstrument) {
    case "InstrumentPointCube": case "point": {
        document.getElementById("PropOfPointThiknessCube").style.visibility = 'visible';
        document.getElementById("PropOfPointStylePointCube").style.visibility = 'visible';
        document.getElementById("PropOfPointStyleHLineCube").style.visibility = 'visible';
        document.getElementById("PropOfPointStyleVLineCube").style.visibility = 'visible';
        document.getElementById("PropOfPointStyleDLine13:37Cube").style.visibility = 'visible';
        document.getElementById("PropOfPointStyleDLine10:23Cube").style.visibility = 'visible';
        document.getElementById("PropOfPointThiknessCube").value = pointIstrument.thikness;
        document.getElementById("PropOfPointStylePointCube").src = "img/pointStylePoint.jpg";
        document.getElementById("PropOfPointStyleHLineCube").src = "img/pointStyleHLine.jpg";
        document.getElementById("PropOfPointStyleVLineCube").src = "img/pointStyleVLine.jpg";
        document.getElementById("PropOfPointStyleDLine13:37Cube").src = "img/pointStyleDLine1337.jpg";
        document.getElementById("PropOfPointStyleDLine10:23Cube").src = "img/pointStyleDLine1023.jpg";
        switch(pointIstrument.style) {
            case "point":     {document.getElementById("PropOfPointStylePointCube").src =      "img/pointStylePointInUse.jpg"; break;}
            case "hLine":     {document.getElementById("PropOfPointStyleHLineCube").src =      "img/pointStyleHLineInUse.jpg"; break;}
            case "vLine":     {document.getElementById("PropOfPointStyleVLineCube").src =      "img/pointStyleVLineInUse.jpg"; break;}
            case "dLine1337": {document.getElementById("PropOfPointStyleDLine13:37Cube").src = "img/pointStyleDLine1337InUse.jpg"; break;}
            case "dLine1023": {document.getElementById("PropOfPointStyleDLine10:23Cube").src = "img/pointStyleDLine1023InUse.jpg"; break;}}
        let wTop = document.getElementById("PropOfPointStylePointCube").style.top;
        wTop = parseInt(wTop)/*wTop.slice(0, wTop.length-2)*/;
        let wHgt = document.getElementById("BackgroundPropPalitreCube").style.top;
        wHgt = parseInt(wHgt)/*wHgt.slice(0, wHgt.length-2)*/;
        document.getElementById("BackgroundPropPalitreCube").style.height = +wTop + +document.getElementById("PropOfPointStylePointCube").clientHeight + 3 - wHgt + 'px';
        break;}
    case "InstrumentRectangleCube": case "rectangle": {
        document.getElementById("PropOfRectangleThiknessCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleLineStyleSolidCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleLineStyleDashedCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleLineStyleDotedCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleLineStyleDashDotCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleLineStyleDoubleCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleBorderCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleSolidCube").style.visibility = 'visible';
        document.getElementById("PropOfRectangleThiknessCube").value = rectangleInstrument.thikness;
        document.getElementById("PropOfRectangleLineStyleSolidCube").src = "img/rectangleLineStyleSolid.jpg";
        document.getElementById("PropOfRectangleLineStyleDashedCube").src = "img/rectangleLineStyleDashed.jpg";
        document.getElementById("PropOfRectangleLineStyleDotedCube").src = "img/rectangleLineStyleDoted.jpg";
        document.getElementById("PropOfRectangleLineStyleDashDotCube").src = "img/rectangleLineStyleDashdot.jpg";
        document.getElementById("PropOfRectangleLineStyleDoubleCube").src = "img/rectangleLineStyleDouble.jpg";
        switch(rectangleInstrument.lineStyle) {
            case "solid": {document.getElementById("PropOfRectangleLineStyleSolidCube").src = "img/rectangleLineStyleSolidInUse.jpg"; break;}
            case "dashed": {document.getElementById("PropOfRectangleLineStyleDashedCube").src = "img/rectangleLineStyleDashedInUse.jpg"; break;}
            case "doted": {document.getElementById("PropOfRectangleLineStyleDotedCube").src = "img/rectangleLineStyleDotedInUse.jpg"; break;}
            case "dashdot": {document.getElementById("PropOfRectangleLineStyleDashDotCube").src = "img/rectangleLineStyleDashdotInUse.jpg"; break;}
            case "double": {document.getElementById("PropOfRectangleLineStyleDoubleCube").src = "img/rectangleLineStyleDoubleInUse.jpg"; break;}}
        switch(rectangleInstrument.fillStyle) {
            case "border": {document.getElementById("PropOfRectangleBorderCube").src = "img/rectangleBorderInUse.jpg"; document.getElementById("PropOfRectangleSolidCube").src = "img/rectangleSolid.jpg"; break;}
            case "solid": {document.getElementById("PropOfRectangleBorderCube").src = "img/rectangleBorder.jpg"; document.getElementById("PropOfRectangleSolidCube").src = "img/rectangleSolidInUse.jpg"; break;}}
        let wTop = document.getElementById("PropOfRectangleSolidCube").style.top;
        wTop = parseInt(wTop)/*wTop.slice(0, wTop.length-2)*/;
        let wHgt = document.getElementById("BackgroundPropPalitreCube").style.top;
        wHgt = parseInt(wHgt)/*wHgt.slice(0, wHgt.length-2)*/;
        document.getElementById("BackgroundPropPalitreCube").style.height = +wTop + +document.getElementById("PropOfRectangleSolidCube").clientHeight + 3 - wHgt + 'px';
        break;}
    case "InstrumentLineCube": case "line": {
        document.getElementById("PropOfLineThiknessCube").style.visibility = 'visible';
        document.getElementById("PropOfLineLineStyleSolidCube").style.visibility = 'visible';
        document.getElementById("PropOfLineLineStyleDashedCube").style.visibility = 'visible';
        document.getElementById("PropOfLineLineStyleDotedCube").style.visibility = 'visible';
        document.getElementById("PropOfLineLineStyleDashDotCube").style.visibility = 'visible';
        document.getElementById("PropOfLineLineStyleDoubleCube").style.visibility = 'visible';
        document.getElementById("PropOfLineThiknessCube").value = lineInstrument.thikness;
        document.getElementById("PropOfLineLineStyleSolidCube").src = "img/lineLineStyleSolid.jpg";
        document.getElementById("PropOfLineLineStyleDashedCube").src = "img/lineLineStyleDashed.jpg";
        document.getElementById("PropOfLineLineStyleDotedCube").src = "img/lineLineStyleDoted.jpg";
        document.getElementById("PropOfLineLineStyleDashDotCube").src = "img/lineLineStyleDashdot.jpg";
        document.getElementById("PropOfLineLineStyleDoubleCube").src = "img/lineLineStyleDouble.jpg";
        switch(lineInstrument.lineStyle) {
            case "solid": {document.getElementById("PropOfLineLineStyleSolidCube").src = "img/lineLineStyleSolidInUse.jpg"; break;}
            case "dashed": {document.getElementById("PropOfLineLineStyleDashedCube").src = "img/lineLineStyleDashedInUse.jpg"; break;}
            case "doted": {document.getElementById("PropOfLineLineStyleDotedCube").src = "img/lineLineStyleDotedInUse.jpg"; break;}
            case "dashdot": {document.getElementById("PropOfLineLineStyleDashDotCube").src = "img/lineLineStyleDashdotInUse.jpg"; break;}
            case "double": {document.getElementById("PropOfLineLineStyleDoubleCube").src = "img/lineLineStyleDoubleInUse.jpg"; break;}}
        let wTop = document.getElementById("PropOfLineLineStyleDoubleCube").style.top;
        wTop = parseInt(wTop)/*wTop.slice(0, wTop.length-2)*/;
        let wHgt = document.getElementById("BackgroundPropPalitreCube").style.top;
        wHgt = parseInt(wHgt)/*wHgt.slice(0, wHgt.length-2)*/;
        document.getElementById("BackgroundPropPalitreCube").style.height = +wTop + +document.getElementById("PropOfLineLineStyleDoubleCube").clientHeight + 3 - wHgt + 'px';
        break;}
    case "InstrumentCircleCube": case "circle": {
        document.getElementById("PropOfCircleThiknessCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleLineStyleSolidCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleLineStyleDashedCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleLineStyleDotedCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleLineStyleDashDotCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleLineStyleDoubleCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleBorderCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleSolidCube").style.visibility = 'visible';
        document.getElementById("PropOfCircleThiknessCube").value = circleInstrument.thikness;
        document.getElementById("PropOfCircleLineStyleSolidCube").src = "img/circleLineStyleSolid.jpg";
        document.getElementById("PropOfCircleLineStyleDashedCube").src = "img/circleLineStyleDashed.jpg";
        document.getElementById("PropOfCircleLineStyleDotedCube").src = "img/circleLineStyleDoted.jpg";
        document.getElementById("PropOfCircleLineStyleDashDotCube").src = "img/circleLineStyleDashdot.jpg";
        document.getElementById("PropOfCircleLineStyleDoubleCube").src = "img/circleLineStyleDouble.jpg";
        document.getElementById("PropOfCircleBorderCube").src = "img/circleBorder.jpg";
        document.getElementById("PropOfCircleSolidCube").src = "img/circleSolid.jpg";
        switch(circleInstrument.lineStyle) {
            case "solid": {document.getElementById("PropOfCircleLineStyleSolidCube").src = "img/circleLineStyleSolidInUse.jpg"; break;}
            case "dashed": {document.getElementById("PropOfCircleLineStyleDashedCube").src = "img/circleLineStyleDashedInUse.jpg"; break;}
            case "doted": {document.getElementById("PropOfCircleLineStyleDotedCube").src = "img/circleLineStyleDotedInUse.jpg"; break;}
            case "dashdot": {document.getElementById("PropOfCircleLineStyleDashDotCube").src = "img/circleLineStyleDashdotInUse.jpg"; break;}
            case "double": {document.getElementById("PropOfCircleLineStyleDoubleCube").src = "img/circleLineStyleDoubleInUse.jpg"; break;}}
        switch(circleInstrument.fillStyle) {
            case "border": {document.getElementById("PropOfCircleBorderCube").src = "img/circleBorderInUse.jpg"; document.getElementById("PropOfCircleSolidCube").src = "img/circleSolid.jpg"; break;}
            case "solid": {document.getElementById("PropOfCircleBorderCube").src = "img/circleBorder.jpg"; document.getElementById("PropOfCircleSolidCube").src = "img/circleSolidInUse.jpg"; break;}}
        let wTop = document.getElementById("PropOfCircleSolidCube").style.top;
        wTop = parseInt(wTop)/*wTop.slice(0, wTop.length-2)*/;
        let wHgt = document.getElementById("BackgroundPropPalitreCube").style.top;
        wHgt = parseInt(wHgt)/*wHgt.slice(0, wHgt.length-2)*/;
        document.getElementById("BackgroundPropPalitreCube").style.height = +wTop + +document.getElementById("PropOfCircleSolidCube").clientHeight + 3 - wHgt + 'px';
        break;}
    case "InstrumentSectionCube": case "section": {
        document.getElementById("PropOfSectionThiknessCube").style.visibility = 'visible';
        document.getElementById("PropMinusStartAngleCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionStartAngleCube").style.visibility = 'visible';
        document.getElementById("PropPlusStartAngleCube").style.visibility = 'visible';
        document.getElementById("PropMinusSectionAngleCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionSectionAngleCube").style.visibility = 'visible';
        document.getElementById("PropPlusSectionAngleCube").style.visibility = 'visible';
        document.getElementById("PropMinusSectionCountCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionSectionCountCube").style.visibility = 'visible';
        document.getElementById("PropPlusSectionCountCube").style.visibility = 'visible';
        document.getElementById("PropMinusStopAnglCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionStopAngleCube").style.visibility = 'visible';
        document.getElementById("PropPlusStopAngleCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionCircleYesCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionCircleNotCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionPointYesCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionPointNotCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionRadiusYesCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionRadiusNotCube").style.visibility = 'visible';
        document.getElementById("PropOfSectionThiknessCube").value = sectionInstrument.thikness;
        document.getElementById("PropOfSectionStartAngleCube").value = sectionInstrument.startAngle;
        document.getElementById("PropOfSectionSectionAngleCube").value = floor(sectionInstrument.sectionAngle);
        document.getElementById("PropOfSectionSectionCountCube").value = floor(sectionInstrument.sectionCount);
        document.getElementById("PropOfSectionStopAngleCube").value = sectionInstrument.stopAngle;
        document.getElementById("PropOfSectionCircleYesCube").src = "img/circleYes.jpg";
        document.getElementById("PropOfSectionCircleNotCube").src = "img/circleNot.jpg";
        document.getElementById("PropOfSectionPointYesCube").src = "img/pointYes.jpg";
        document.getElementById("PropOfSectionPointNotCube").src = "img/pointNot.jpg";
        document.getElementById("PropOfSectionRadiusYesCube").src = "img/radiusYes.jpg";
        document.getElementById("PropOfSectionRadiusNotCube").src = "img/radiusNot.jpg";
        if (sectionInstrument.lineStyle) document.getElementById("PropOfSectionCircleYesCube").src = "img/circleYesInUse.jpg";
            else document.getElementById("PropOfSectionCircleNotCube").src = "img/circleNotInUse.jpg";
        if (sectionInstrument.pointStyle) document.getElementById("PropOfSectionPointYesCube").src = "img/pointYesInUse.jpg";
            else document.getElementById("PropOfSectionPointNotCube").src = "img/pointNotInUse.jpg";
        if (sectionInstrument.radiusStyle) document.getElementById("PropOfSectionRadiusYesCube").src = "img/radiusYesInUse.jpg";
            else document.getElementById("PropOfSectionRadiusNotCube").src = "img/radiusNotInUse.jpg";
        let wTop = document.getElementById("PropOfSectionRadiusNotCube").style.top;
        wTop = parseInt(wTop)/*wTop.slice(0, wTop.length-2)*/;
        let wHgt = document.getElementById("BackgroundPropPalitreCube").style.top;
        wHgt = parseInt(wHgt)/*wHgt.slice(0, wHgt.length-2)*/;
        document.getElementById("BackgroundPropPalitreCube").style.height = +wTop + +document.getElementById("PropOfSectionRadiusNotCube").clientHeight + 3 - wHgt + 'px';
        break;}
    case "InstrumentFillCube": case "fill": {
        document.getElementById("PropOfFillSensitiveCube").style.visibility = 'visible';
        document.getElementById("PropOfFillSensitiveCube").value = fillInstrument.sensitive;
        let wTop = document.getElementById("PropOfFillSensitiveCube").style.top;
        wTop = parseInt(wTop)/*wTop.slice(0, wTop.length-2)*/;
        let wHgt = document.getElementById("BackgroundPropPalitreCube").style.top;
        wHgt = parseInt(wHgt)/*wHgt.slice(0, wHgt.length-2)*/;
        document.getElementById("BackgroundPropPalitreCube").style.height = +wTop + +document.getElementById("PropOfFillSensitiveCube").clientHeight + 3 - wHgt + 'px';
        break;}
}
}

function showCurrentInstrument(oldInstrument, newInstrument) {//рефреш вибраних інструментів
showCurrentProperties(oldInstrument, newInstrument);
if (oldInstrument=="" || oldInstrument=="point")     {document.getElementById("InstrumentPointCube").src     = "img/point.jpg";}
if (oldInstrument=="" || oldInstrument=="rectangle") {document.getElementById("InstrumentRectangleCube").src = "img/rectangle.jpg";}
if (oldInstrument=="" || oldInstrument=="line")      {document.getElementById("InstrumentLineCube").src      = "img/line.jpg";}
if (oldInstrument=="" || oldInstrument=="circle")    {document.getElementById("InstrumentCircleCube").src    = "img/circle.jpg";}
if (oldInstrument=="" || oldInstrument=="section")   {document.getElementById("InstrumentSectionCube").src   = "img/circleSection.jpg";}
if (oldInstrument=="" || oldInstrument=="fill")      {document.getElementById("InstrumentFillCube").src      = "img/fill.jpg";}
switch(newInstrument) {
    case "InstrumentPointCube":     case "point":     {document.getElementById("InstrumentPointCube").src     = "img/pointInUse.jpg";         return "point";}
    case "InstrumentRectangleCube": case "rectangle": {document.getElementById("InstrumentRectangleCube").src = "img/rectangleInUse.jpg";     return "rectangle";}
    case "InstrumentLineCube":      case "line":      {document.getElementById("InstrumentLineCube").src      = "img/lineInUse.jpg";          return "line";}
    case "InstrumentCircleCube":    case "circle":    {document.getElementById("InstrumentCircleCube").src    = "img/circleInUse.jpg";        return "circle";}
    case "InstrumentSectionCube":   case "section":   {document.getElementById("InstrumentSectionCube").src   = "img/circleSectionInUse.jpg"; return "section";}
    case "InstrumentFillCube":      case "fill":      {document.getElementById("InstrumentFillCube").src      = "img/FillInUse.jpg";          return "fill";}}
}

/*-------------------------------------------------------------основний розділ -------------------------------------------------------------------------------------*/
//створюємо обєкти інструментів
//для point
const pointIstrument = {
    //name: 'point',
    thikness: 1,            //товщина ліній
    style: 'point'}         //стиль кисті point/hLine/vLine/dLine1337/dLine1023
//для rectangle
const rectangleInstrument = {
    //name: 'rectangle',
    thikness: 1,            //товщина ліній
    lineStyle: 'solid',     //стиль лінії solid/dash/dot/dashdot/double
    fillStyle: 'border'}    //заповнення border/solid
//для line
const lineInstrument = {
    //name: 'line',
    thikness: 1,            //товщина ліній
    lineStyle: 'solid'}     //стиль лінії solid/dash/dot/dashdot/double
//для circle
const circleInstrument = {
    //name: 'circle',
    thikness: 1,            //товщина ліній
    lineStyle: 'solid',     //стиль лінії solid/dash/dot/dashdot/double
    fillStyle: 'border'}    //заповнення border/solid
//для section
const sectionInstrument = {
    //name: 'section',
    thikness: 1,
    startAngle: 0,
    sectionAngle: 10,
    sectionCount: 36,
    stopAngle: 360,
    lineStyle: true,     //true/false
    pointStyle: true,      //true/false
    radiusStyle: true}   //true/false
//fill
const fillInstrument = {
    sensitive: 0}

//стартові значення
let numberFrontColorGradient = 1;                       //стартовий номер кольору в градієнті для лівої кнопки
let numberBackColorGradient = 20;                       //стартовий номер кольору в градієнті для правої кнопки
let sectionInUse = false;                               //стартове значення вказує що секція зараз не формується
let circleInUse = false;                                //стартове значення вказує що овал зараз не формується
let rectangleInUse = false;                             //стартове значення вказує що прямокутник зараз не формується
let lineInUse = false;                                  //стартове значення вказує що лінія зараз не формується
let pointInUse = false;                                 //стартове значення вказує що point зараз не формується
let moveInUse = false;                                  //стартове значення вказує що move зараз не формується
let numberOfMouseButtonClick = 0                        //номер натиснутої кнопки мишки
let currentInstrument = "point";                        //стартовий вибраний інструмент
let lastNameOfMouseMove = "";                           //останнє ім'я обєкта "над" яким пройшла мишка
const BASIC_ELEMENT = document.getElementById("box");   //для полегшення доступу
let frontColor, backColor;
let lastEvent = "";                                     //остання виконана подія
let lineFirst_X, lineFirst_Y, rectangleFirst_X, rectangleFirst_Y, circleFirst_X, circleFirst_Y, sectionFirst_X, sectionFirst_Y, fill_X, fill_Y;
let lineLast_X, lineLast_Y, rectangleLast_X, rectangleLast_Y, circleLast_X, circleLast_Y, sectionLast_X, sectionLast_Y, fill_OldColor;
let offsetFigureToHook_X, offsetFigureToHook_Y, offsetMouseToHook_X, offsetMouseToHook_Y, moveFirst_X, moveFirst_Y;

//створення кнопки Undo/Redo
makeDiv("UndoCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, 1, 2, 24, 20, "", "", "", "img/undoNotActive.jpg", "");
makeDiv("RedoCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, 1, 26, 24, 20, "", "", "", "img/redoNotActive.jpg", "");
//створення UNDO/REDO масива
const undoPoints = []; let undoNumber = 0; const redoPoints = [];
//створення кнопки Clear
makeDiv("ClearCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, 1, 55, 40, 20, "", "", "", "img/clearNotActive.jpg", "");
//створення кнопки Ready
makeDiv("ReadyCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, 1, 100, 40, 20, "", "", "", "img/readyNotActive.jpg", "");

{//формування палітри кольорів
makeDiv("BackgroundColorPalitreCube",  BORDER_YES, MOUSE_CLICK_NOT,  MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP-5,  0, 48, 315, '#a5a5a5',         "white",           "", "", "");
makeDiv("GradientCube1", BORDER_YES, MOUSE_CLICK_YES, MOUSE_MOVE_YES, TEXT_NOT, ABSOLUTE_TOP, 5, 38, 25, currentFrontColor, currentBackColor, "", "", "");
{//формування градієнту
const redFrontColor=currentFrontColor.substr(5, currentFrontColor.indexOf(",")-5);
const greenFrontColor=currentFrontColor.slice(currentFrontColor.indexOf(",")+2, currentFrontColor.lastIndexOf(","));
const blueFrontColor=currentFrontColor.slice(currentFrontColor.lastIndexOf(",")+2, currentFrontColor.length-1);
const redBackColor=currentBackColor.substr(5, currentBackColor.indexOf(",")-5);
const greenBackColor=currentBackColor.slice(currentBackColor.indexOf(",")+2, currentBackColor.lastIndexOf(","));
const blueBackColor=currentBackColor.slice(currentBackColor.lastIndexOf(",")+2, currentBackColor.length-1);
const redStepColor = (redBackColor-redFrontColor)/19;
const greenStepColor = (greenBackColor-greenFrontColor)/19;
const blueStepColor = (blueBackColor-blueFrontColor)/19;
for (let i=2; i<20; i++) {
    makeDiv("GradientCube"+i, BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_YES, TEXT_NOT, ABSOLUTE_TOP+27+(i-2)*5, round(5+min(i-numberFrontColorGradient, numberBackColorGradient-i)), round(max(i-numberFrontColorGradient, numberBackColorGradient-i)*38/18), 5,
    `rgb(${+redFrontColor+round(redStepColor*(i-1))}, 
         ${+greenFrontColor+round(greenStepColor*(i-1))}, 
         ${+blueFrontColor+round(blueStepColor*(i-1))})`, "", "", "", "");}
}
makeDiv("GradientCube20", BORDER_YES, MOUSE_CLICK_YES, MOUSE_MOVE_YES, TEXT_NOT, ABSOLUTE_TOP+117, 5, 38, 25, currentBackColor, currentFrontColor, "", "", "");
makeDiv("WhiteCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+147,  5, 20, 20, 'rgb(255, 255, 255)', "", "", "", "");
makeDiv("SilverCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+147, 25, 20, 20, 'rgb(192, 192, 192)', "", "", "", "");
makeDiv("GrayCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+167,  5, 20, 20, 'rgb(128, 128, 128)', "", "", "", "");
makeDiv("BlackCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+167, 25, 20, 20, 'rgb(0, 0, 0)',       "", "", "", "");
makeDiv("RedCube",     BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+187,  5, 20, 20, 'rgb(255, 0, 0)',     "", "", "", "");
makeDiv("MaroonCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+187, 25, 20, 20, 'rgb(128, 0, 0)',     "", "", "", "");
makeDiv("YellowCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+207,  5, 20, 20, 'rgb(255, 255, 0)',   "", "", "", "");
makeDiv("OrangeCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+207, 25, 20, 20, 'rgb(255, 165, 0)',   "", "", "", "");
makeDiv("LimeCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+227,  5, 20, 20, 'rgb(0, 255, 0)',     "", "", "", "");
makeDiv("OliveCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+227, 25, 20, 20, 'rgb(128, 128, 0)',   "", "", "", "");
makeDiv("GreenCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+247,  5, 20, 20, 'rgb(0, 128, 0)',     "", "", "", "");
makeDiv("AquaCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+247, 25, 20, 20, 'rgb(0, 255, 255)',   "", "", "", "");
makeDiv("BlueCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+267,  5, 20, 20, 'rgb(0, 0, 255)',     "", "", "", "");
makeDiv("NavyCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+267, 25, 20, 20, 'rgb(0, 0, 128)',     "", "", "", "");
makeDiv("FuchsiaCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+287,  5, 20, 20, 'rgb(255, 0, 255)',   "", "", "", "");
makeDiv("PurpleCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP+287, 25, 20, 20, 'rgb(128, 0, 128)',   "", "", "", "");
}

{//формування палітри інструментів
makeDiv("BackgroundInstrumentPalitreCube", BORDER_YES, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundColorPalitreCube").offsetTop+document.getElementById("BackgroundColorPalitreCube").clientHeight+7,  0, 48, 100, '#a5a5a5', "white", "", "",                      "");
makeDiv("InstrumentPointCube",             BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+5,                                                                5, 20,  20, "",        "",      "", "img/point.jpg",         "");
makeDiv("InstrumentRectangleCube",         BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+5,                                                               26, 20,  20, "",        "",      "", "img/rectangle.jpg",     "");
makeDiv("InstrumentLineCube",              BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+26,                                                               5, 20,  20, "",        "",      "", "img/line.jpg",          "");
makeDiv("InstrumentCircleCube",            BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+26,                                                              26, 20,  20, "",        "",      "", "img/circle.jpg",        "");
makeDiv("InstrumentSectionCube",           BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+47,                                                               5, 20,  20, "",        "",      "", "img/circleSection.jpg", "");
makeDiv("InstrumentFillCube",              BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+47,                                                              26, 20,  20, "",        "",      "", "img/fill.jpg",          "");
}

{//формування палітри властивостей
makeDiv("BackgroundPropPalitreCube",   BORDER_YES, MOUSE_CLICK_NOT,  MOUSE_MOVE_NOT,  TEXT_NOT,  document.getElementById("BackgroundInstrumentPalitreCube").offsetTop+document.getElementById("BackgroundInstrumentPalitreCube").clientHeight+7, 0, 48, 174, '#a5a5a5', "white", "", "", "");
//point
makeDiv("PropMinusThiknessCube",          BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+5,   5,  5, 20, "", "", "",       "img/minusThikness.jpg",       "");
makeInput("PropOfPointThiknessCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+5, 11, 26, 20, "", "silver", pointIstrument.thikness, 2);
//-----*/makeDiv(document.getElementById("BackgroundPropPalitreCube").offsetTop+5,  11, 29, 20, "", "", "silver", "",                            "1");
makeDiv("PropPlusThiknessCube",           BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+5,  41,  5, 20, "", "", "",       "img/plusThikness.jpg",        "");
makeDiv("PropOfPointStylePointCube",      BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+68,  5, 20, 20, "", "", "",       "img/pointStylePoint.jpg",     "");
makeDiv("PropOfPointStyleHLineCube",      BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+26, 26, 20, 20, "", "", "",       "img/pointStyleHLine.jpg",     "");
makeDiv("PropOfPointStyleVLineCube",      BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+26,  5, 20, 20, "", "", "",       "img/pointStyleVLine.jpg",     "");
makeDiv("PropOfPointStyleDLine13:37Cube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+47, 26, 20, 20, "", "", "",       "img/pointStyleDLine1337.jpg", "");
makeDiv("PropOfPointStyleDLine10:23Cube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT,  document.getElementById("BackgroundPropPalitreCube").offsetTop+47,  5, 20, 20, "", "", "",       "img/pointStyleDLine1023.jpg", "");
//rectangle
makeInput("PropOfRectangleThiknessCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+5, 11, 26, 20, "", "silver", rectangleInstrument.thikness, 2);
//-----*/makeDiv("PropOfRectangleThiknessCube",         BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+5,  11, 29, 20, "", "", "silver", "",                                  "1");
makeDiv("PropOfRectangleLineStyleSolidCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26,  5, 20, 20, "", "", "",       "img/rectangleLineStyleSolid.jpg",   "");
makeDiv("PropOfRectangleLineStyleDashedCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26, 26, 20, 20, "", "", "",       "img/rectangleLineStyleDashed.jpg",  "");
makeDiv("PropOfRectangleLineStyleDotedCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47,  5, 20, 20, "", "", "",       "img/rectangleLineStyleDoted.jpg",   "");
makeDiv("PropOfRectangleLineStyleDashDotCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47, 26, 20, 20, "", "", "",       "img/rectangleLineStyleDashDot.jpg", "");
makeDiv("PropOfRectangleLineStyleDoubleCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+68,  5, 20, 20, "", "", "",       "img/rectangleLineStyleDouble.jpg",  "");
makeDiv("PropOfRectangleBorderCube",           BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+89,  5, 20, 20, "", "", "",       "img/rectangleBorder.jpg",           "");
makeDiv("PropOfRectangleSolidCube",            BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+89, 26, 20, 20, "", "", "",       "img/rectangleSolid.jpg",            "");
//line
makeInput("PropOfLineThiknessCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+5, 11, 26, 20, "", "silver", lineInstrument.thikness, 2);
//-----*/makeDiv("PropOfLineThiknessCube",         BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+5,  11, 29, 20, "", "", "silver", "",                             "1");
makeDiv("PropOfLineLineStyleSolidCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26,  5, 20, 20, "", "", "",       "img/lineLineStyleSolid.jpg",   "");
makeDiv("PropOfLineLineStyleDashedCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26, 26, 20, 20, "", "", "",       "img/lineLineStyleDashed.jpg",  "");
makeDiv("PropOfLineLineStyleDotedCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47,  5, 20, 20, "", "", "",       "img/lineLineStyleDoted.jpg",   "");
makeDiv("PropOfLineLineStyleDashDotCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47, 26, 20, 20, "", "", "",       "img/lineLineStyleDashDot.jpg", "");
makeDiv("PropOfLineLineStyleDoubleCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+68,  5, 20, 20, "", "", "",       "img/lineLineStyleDouble.jpg",  "");
//circle
makeInput("PropOfCircleThiknessCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+5, 11, 26, 20, "", "silver", circleInstrument.thikness, 2);
//-----*/makeDiv("PropOfCircleThiknessCube",         BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+5,  11, 29, 20, "", "", "silver", "",                               "1");
makeDiv("PropOfCircleLineStyleSolidCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26,  5, 20, 20, "", "", "",       "img/circleLineStyleSolid.jpg",   "");
makeDiv("PropOfCircleLineStyleDashedCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26, 26, 20, 20, "", "", "",       "img/circleLineStyleDashed.jpg",  "");
makeDiv("PropOfCircleLineStyleDotedCube",   BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47,  5, 20, 20, "", "", "",       "img/circleLineStyleDoted.jpg",   "");
makeDiv("PropOfCircleLineStyleDashDotCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47, 26, 20, 20, "", "", "",       "img/circleLineStyleDashDot.jpg", "");
makeDiv("PropOfCircleLineStyleDoubleCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+68,  5, 20, 20, "", "", "",       "img/circleLineStyleDouble.jpg",  "");
makeDiv("PropOfCircleBorderCube",           BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+89,  5, 20, 20, "", "", "",       "img/circleBorder.jpg",           "");
makeDiv("PropOfCircleSolidCube",            BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+89, 26, 20, 20, "", "", "",       "img/circleSolid.jpg",            "");
//Section
makeInput("PropOfSectionThiknessCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+5, 11, 26, 20, "", "silver", sectionInstrument.thikness, 2);
//-----*/makeDiv("PropOfSectionThiknessCube",     BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+5,   11, 29, 20, "", "", "silver", "",                      "1");
makeDiv("PropMinusStartAngleCube",       BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26,   5,  5, 20, "", "", "",       "img/minusThikness.jpg", "");
makeInput("PropOfSectionStartAngleCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+26, 11, 26, 20, "", "silver", sectionInstrument.startAngle, 3);
//-----*/makeDiv("PropOfSectionStartAngleCube",   BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+26,  11, 29, 20, "", "", "silver", "",                      "0");
makeDiv("PropPlusStartAngleCube",        BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+26,  41,  5, 20, "", "", "",       "img/plusThikness.jpg",  "");
makeDiv("PropMinusSectionAngleCube",     BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47,   5,  5, 20, "", "", "",       "img/minusThikness.jpg", "");
makeInput("PropOfSectionSectionAngleCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+47, 11, 26, 20, "", "silver", sectionInstrument.sectionAngle, 3);
//-----*/makeDiv("PropOfSectionSectionAngleCube", BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+47,  11, 29, 20, "", "", "silver", "",                      "45");
makeDiv("PropPlusSectionAngleCube",      BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+47,  41,  5, 20, "", "", "",       "img/plusThikness.jpg",  "");
makeDiv("PropMinusSectionCountCube",     BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+68,   5,  5, 20, "", "", "",       "img/minusThikness.jpg", "");
makeInput("PropOfSectionSectionCountCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+68, 11, 26, 20, "", "silver", sectionInstrument.sectionCount, 3);
//-----*/makeDiv("PropOfSectionSectionCountCube", BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+68,  11, 29, 20, "", "", "silver", "",                      "8");
makeDiv("PropPlusSectionCountCube",      BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+68,  41,  5, 20, "", "", "",       "img/plusThikness.jpg",  "");
makeDiv("PropMinusStopAnglCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+89,   5,  5, 20, "", "", "",       "img/minusThikness.jpg", "");
makeInput("PropOfSectionStopAngleCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+89, 11, 26, 20, "", "silver", sectionInstrument.stopAngle, 3);
//-----*/makeDiv("PropOfSectionStopAngleCube",    BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+89,  11, 29, 20, "", "", "silver", "",                      "360");
makeDiv("PropPlusStopAngleCube",  BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+89,  41,  5, 20, "", "", "",       "img/plusThikness.jpg",  "");
makeDiv("PropOfSectionCircleYesCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+110,  5, 20, 20, "", "", "",       "img/circleYes.jpg",     "");
makeDiv("PropOfSectionCircleNotCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+110, 26, 20, 20, "", "", "",       "img/circleNot.jpg",     "");
makeDiv("PropOfSectionPointYesCube",     BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+131,  5, 20, 20, "", "", "",       "img/pointYes.jpg",      "");
makeDiv("PropOfSectionPointNotCube",     BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+131, 26, 20, 20, "", "", "",       "img/pointNot.jpg",      "");
makeDiv("PropOfSectionRadiusYesCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+152,  5, 20, 20, "", "", "",       "img/radiusYes.jpg",     "");
makeDiv("PropOfSectionRadiusNotCube",    BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_NOT, TEXT_NOT, document.getElementById("BackgroundPropPalitreCube").offsetTop+152, 26, 20, 20, "", "", "",       "img/radiusNot.jpg",     "");
//fill
makeInput("PropOfFillSensitiveCube", document.getElementById("BackgroundPropPalitreCube").offsetTop+5, 11, 26, 20, "", "silver", fillInstrument.sensitive, 3);
//--*/makeDiv("PropOfFillSensitiveCube",       BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, document.getElementById("BackgroundPropPalitreCube").offsetTop+5,   11, 29, 20, "", "", "silver", "",                      "0");
}

showCurrentInstrument("", currentInstrument);

//формування рамки робочого поля
makeDiv("BackgroundCube", BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_NOT, ABSOLUTE_TOP-5, ABSOLUTE_LEFT-5, 5+POINTS_COUNT_X*POINT_SIZE+5, 5+POINTS_COUNT_Y*POINT_SIZE+5, '#a5a5a5', "", "", "", "");
let s = document.getElementById("BackgroundCube").style.left;
const RIGHT_SIDE = document.getElementById("BackgroundCube").clientWidth + parseInt(s)/*+s.substr(0, s.length-2)*/;

{//формування інформаційних блоків (координати, розміри, площа і подібне)
makeDiv("CoordY",              BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-50,  50, 20, "black", "gray", "silver", "", "y:");
makeDiv("CoordX",              BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-100, 50, 20, "black", "gray", "silver", "", "x:");
makeDiv("CoordY1",             BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-200, 50, 20, "black", "gray", "silver", "", "y1:"); document.getElementById("CoordY1").style.visibility = 'hidden';
makeDiv("CoordX1",             BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-250, 50, 20, "black", "gray", "silver", "", "x1:"); document.getElementById("CoordX1").style.visibility = 'hidden';
makeDiv("LengthOfLine",        BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-350, 50, 20, "black", "gray", "silver", "", "len:1"); document.getElementById("LengthOfLine").style.visibility = 'hidden';
makeDiv("PerimetrOfRectangle", BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-350, 50, 20, "black", "gray", "silver", "", "p:4"); document.getElementById("PerimetrOfRectangle").style.visibility = 'hidden';
makeDiv("SquareOfRectangle",   BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-400, 50, 20, "black", "gray", "silver", "", "s:1"); document.getElementById("SquareOfRectangle").style.visibility = 'hidden';
makeDiv("WidthOfRectangle",    BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-450, 50, 20, "black", "gray", "silver", "", "w:1"); document.getElementById("WidthOfRectangle").style.visibility = 'hidden';
makeDiv("HeightOfRectangle",   BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-500, 50, 20, "black", "gray", "silver", "", "h:1"); document.getElementById("HeightOfRectangle").style.visibility = 'hidden';
makeDiv("SquareOfCircle",      BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-400, 50, 20, "black", "gray", "silver", "", "s:1"); document.getElementById("SquareOfCircle").style.visibility = 'hidden';
makeDiv("WidthOfCircle",       BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-450, 50, 20, "black", "gray", "silver", "", "w:1"); document.getElementById("WidthOfCircle").style.visibility = 'hidden';
makeDiv("HeightOfCircle",      BORDER_NOT, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_YES, 0, RIGHT_SIDE-500, 50, 20, "black", "gray", "silver", "", "h:1"); document.getElementById("HeightOfCircle").style.visibility = 'hidden';
}

{//формування точок робочого поля
let k = 0; points = [POINTS_COUNT_X*POINTS_COUNT_Y];
for (i=0; i<POINTS_COUNT_Y; i++)
    for (j=0; j<POINTS_COUNT_X; j++) {
        makeDiv("Cube" + k, BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_YES, TEXT_NOT, ABSOLUTE_TOP + i*POINT_SIZE, ABSOLUTE_LEFT + j*POINT_SIZE, POINT_SIZE, POINT_SIZE, DEFAULT_COLOR, "", "", "", "");
        points[k] = document.getElementById("Cube" + k);
        k++;}
}

//створення MOVE-гачка
makeDiv("MoveCube", BORDER_NOT, MOUSE_CLICK_YES, MOUSE_MOVE_YES, TEXT_NOT, 0, 150, 19, 19, "", "", "", "img/move.jpg", "").style.visibility = 'hidden';

{//формування лупи
let k = 1
for (let i=1; i<=LUPA_ROW_COLUMN_COUNT; i++) {
    for (let j=1; j<=LUPA_ROW_COLUMN_COUNT; j++) {
        if (k!=floor(LUPA_ROW_COLUMN_COUNT*LUPA_ROW_COLUMN_COUNT/2)+1) { 
            let objectName = "Lupa" + k + "Cube"
            if (i!=floor(LUPA_ROW_COLUMN_COUNT/2)+1 && j!=floor(LUPA_ROW_COLUMN_COUNT/2)+1) makeDiv(objectName, BORDER_YES, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_NOT, BASIC_ELEMENT.clientHeight-(LUPA_ROW_COLUMN_COUNT+1)*LUPA_POINT_SIZE + (i-1)*LUPA_POINT_SIZE, 0 + (j-1)*LUPA_POINT_SIZE, LUPA_POINT_SIZE-1, LUPA_POINT_SIZE-1, "black", "gray", "", "", "");
        }
        k++
    }
}
k = 1
for (let i=1; i<=LUPA_ROW_COLUMN_COUNT; i++) {
    for (let j=1; j<=LUPA_ROW_COLUMN_COUNT; j++) {
        if (k!=floor(LUPA_ROW_COLUMN_COUNT*LUPA_ROW_COLUMN_COUNT/2)+1) { 
            let objectName = "Lupa" + k + "Cube"
            if (i==floor(LUPA_ROW_COLUMN_COUNT/2)+1 || j==floor(LUPA_ROW_COLUMN_COUNT/2)+1) makeDiv(objectName, BORDER_YES, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_NOT, BASIC_ELEMENT.clientHeight-(LUPA_ROW_COLUMN_COUNT+1)*LUPA_POINT_SIZE + (i-1)*LUPA_POINT_SIZE, 0 + (j-1)*LUPA_POINT_SIZE, LUPA_POINT_SIZE-1, LUPA_POINT_SIZE-1, "black", "silver", "", "", "");
        }
        k++
    }
}
makeDiv("Lupa" + (floor(LUPA_ROW_COLUMN_COUNT*LUPA_ROW_COLUMN_COUNT/2)+1) + "Cube", BORDER_YES, MOUSE_CLICK_NOT, MOUSE_MOVE_NOT, TEXT_NOT, BASIC_ELEMENT.clientHeight - (floor(LUPA_ROW_COLUMN_COUNT/2)+2)*LUPA_POINT_SIZE, 0 + (floor(LUPA_ROW_COLUMN_COUNT/2))*LUPA_POINT_SIZE, LUPA_POINT_SIZE-1, LUPA_POINT_SIZE-1, "black", "red", "", "", "");
}