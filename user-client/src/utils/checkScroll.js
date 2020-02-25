//******* class-based function */
// class NavBar {
//   constructor(id = '', height = '0px') {
//     this.id = id;
//     this.height = height;
//     this.prevY = 0;
//   }
//   checkScroll() {
//     if (!document.getElementById(this.id)) return 0;
//     let currentY = window.pageYOffset;
//     console.log(this.id, currentY, this.prevY);
//     if (currentY > 100) {
//       if (this.prevY > currentY) {
//         document.getElementById(this.id).style.top = "0";
//       } else {
//         document.getElementById(this.id).style.top = `-${this.height}`;
//       }
//       this.prevY = currentY;
//     }
//   }
// }

const checkMultipleScroll = (id1, id2, height = '0px') => {
  if (!document.getElementById(id1)) return 0;
  if (typeof checkMultipleScroll.prevY == 'undefined') {
    checkMultipleScroll.prevY = 0;
  }
  let currentY = window.pageYOffset;
  // console.log(currentY, checkMultipleScroll.prevY);
  if (currentY > 150) {
    if (checkMultipleScroll.prevY - currentY > 120) {
      console.log("show");
      document.getElementById(id1).style.top = "0";
      document.getElementById(id2).style.top = "0";
      // document.body.style.backgroundColor = "rgb(45, 105, 246)";
      checkMultipleScroll.prevY = currentY;
    }
    else if (currentY - checkMultipleScroll.prevY > 120) {
      console.log("hide");
      document.getElementById(id1).style.top = `-${height}`;
      document.getElementById(id2).style.top = `-${height}`;
      // document.body.style.backgroundColor = "white";
      checkMultipleScroll.prevY = currentY;
    }
  }
  console.log(currentY, checkMultipleScroll.prevY);
}

export default checkMultipleScroll;