export function compressImg(file) {
    // 创建Canvas对象(画布)
    let canvas =  document.createElement('canvas')  
    // 获取对应的CanvasRenderingContext2D对象(画笔)
    let context = canvas.getContext('2d') 
    // 创建新的图片对象 
    let img = new Image()
    // 指定图片的DataURL(图片的base64编码数据)
    img.src = file.content
    //画布宽度
    let width = 512   
    // 监听浏览器加载图片完成，然后进行绘制
    img.onload = () => {
        //画布大小按照图片的比例生成
        let height = width / (img.naturalWidth / img.naturalHeight)
        // 指定canvas画布大小，该大小为最后生成图片的大小
        canvas.width = width
        canvas.height = height
        /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点， canvas.width, canvas.height 是将图片按给定的像素进行缩小。*/
        /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/ 
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
        //返回压缩后的文件
        return canvas.toDataURL(file.type, 0.82)
    }  
}