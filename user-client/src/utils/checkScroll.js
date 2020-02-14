const checkScroll = (id, height = '0px') => {
  if (!id) return 0;
  if (typeof checkScroll.prevY == 'undefined') {
    checkScroll.prevY = 0;
  }
  let currentY = window.pageYOffset;
  // console.log(currentY, checkScroll.prevY);
  if (currentY > 100) {
    if (checkScroll.prevY > currentY) {
      document.getElementById(id).style.top = "0";
    } else {
      document.getElementById(id).style.top = `-${height}`;
    }
    checkScroll.prevY = currentY;
  }

}

export default checkScroll;