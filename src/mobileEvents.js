import './style.css';

  let deltaY;
  let startX;
  let startY;
  let x;
  let y;
  let deltaX;
  let startTime;
  let endTime;
  let deltaTime;
  let speed;
  let angle;

  let data = new Object();

  //On appel chaque évènement liés au touché de l'écran
  window.addEventListener("touchstart", handleStart, false);
  window.addEventListener("touchend", handleEnd, false);
  window.addEventListener("touchmove", handleMove, false);

  window.addEventListener("devicemotion", motion, false);
  window.addEventListener("deviceorientation", orientation, false);

  //Fonction appelé lors du touché de l'écran
  function handleStart(event) {
    startY = event.touches[0].pageY;
    startX = event.touches[0].pageX;
    startTime = new Date().getTime();
  }

  //Fonction appelé lors de la fin du touché de l'écran
  function handleEnd(event) {
    endTime = new Date().getTime();
    deltaTime = endTime - startTime;
    speed = deltaY / deltaTime;
    speed = Math.floor(speed * 10);
    data.touchSpeed = speed;
    document.getElementById("touchSpeed").innerHTML = "Speed : " + data.touchSpeed;
  }

  //Fonction appelé lors d'un mouvement sur l'écran
  function handleMove(event) {
    x = event.touches[0].pageX;
    y = event.touches[0].pageY;
    deltaX = startX - x;
    deltaY = startY - y;
    if(deltaY < 0) { deltaY = -deltaY; }
    angle = Math.sin(deltaX / deltaY) * 180 / Math.PI;
    angle = angle.toFixed(2);
    data.touchAngle = angle;
    document.getElementById("touchAngle").innerHTML = "Angle : " + data.touchAngle;
  }

  /*function motion(event) {
    let x = Math.floor(event.accelerationIncludingGravity.x);
    let y = Math.floor(event.accelerationIncludingGravity.y);
    let z = Math.floor(event.accelerationIncludingGravity.z);
    //document.getElementById("acceleration-x").innerHTML = "Axe x : " + x;
    //document.getElementById("acceleration-y").innerHTML = "Axe y : " + y;
    data.moveSpeed = z * 10;
    document.getElementById("acceleration-z").innerHTML = "Axe z : " + data.moveSpeed;
  }

  function orientation(event) {
    let alpha = Math.floor(event.alpha);
    alpha = alpha.toFixed(2);
    let beta = Math.floor(event.beta);
    let gamma = Math.floor(event.gamma);
    //document.getElementById("orientation-x").innerHTML = "Axe x : " + beta;
    //document.getElementById("orientation-y").innerHTML = "Axe y : " + gamma;
    data.moveAngle = alpha;
    document.getElementById("orientation-z").innerHTML = "Axe z : " + data.moveAngle;
  }*/
