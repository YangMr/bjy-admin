export const dragTable = (vm, dom) => {
  let tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
  let table = dom;
  for (let i = 0; i < table.length; i++) {
    //dowm
    table[i].onmousedown = () => {
      //记录down的位置坐标
      tTD = vm;
      //显示拖拽指针的范围0~5，可调整
      if (event.offsetX >= 0 && event.offsetX <= 5) {
        tTD.mouseDown = true;
        tTD.oldX = event.x;
      }
    };

    //up
    table[i].onmouseup = () => {
      //结束宽度调整
      if (tTD == undefined) {
        tTD = vm;
      }
      tTD.mouseDown = false;
      table[i].style.cursor = "default";
    };

    //move
    table[i].onmousemove = () => {
      //更改鼠标样式，i=0的单元格不做拖拽操作
      if (event.offsetX >= 0 && event.offsetX <= 5 && i != 0) {
        table[i].style.cursor = "col-resize";
      } else {
        table[i].style.cursor = "default";
      }
      //取出暂存的Table Cell
      if (tTD == undefined) {
        tTD = vm;
      }
      //调整宽度
      if (tTD.mouseDown != null && tTD.mouseDown == true) {
        table[i].style.cursor = "default";
        let moveDistance = event.x - tTD.oldX;
        //要处理i=0时的情况
        if (moveDistance >= 0 && i >= 1) {
          tTD.columns[i - 1].width =
            parseInt(tTD.columns[i - 1].width) + moveDistance;
          tTD.oldX = event.x;
          table[i].style.cursor = "col-resize";
        } else {
          tTD.columns[i].width =
            parseInt(tTD.columns[i].width) - Math.abs(moveDistance);
          tTD.oldX = event.x;
          table[i].style.cursor = "col-resize";
        }
        //调整该列中的每个Cell,如果存在小于70的，改成70
        for (let j = 0; j < tTD.columns.length; j++) {
          if (tTD.columns[j].width < 30) {
            tTD.columns[j].width = 30;
          }
        }
      }
    };
  }
};
