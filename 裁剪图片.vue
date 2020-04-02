<template>
  <div>
    <input
      type="file"
      name="pic"
      ref="file"
      accept="image/*"
      @change="uploadFile"
    />

    <div v-show="panel" class="cropper-layer" ref="layer">
      <div class="cropper__header">
        <button class="cancel">取消</button>
        <button class="centerb" @click="handleRotate">旋转</button>
        <button class="confirm" @click="handleConfirm">确定</button>
      </div>
      <img ref="refImg" alt="" class="img-wrapper" />
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css"
import EXIF from "exif-js";
export default {
  data() {
    return {
      src: "",
      headerImg: "",
      showLoading: false,
      orientation: 2,
      // 裁剪
      cropper: "",
      croppable: false,
      panel: false,
      picDeg: 0 // 裁剪旋转角度
    };
  },
  mounted() {
    let _this = this;
    let img = this.$refs.refImg;
    console.log(img);
    this.cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      background: false,
      rotatable: true,
      zoomable: false,
      ready: function() {
        _this.croppable = true;
      }
    });
  },
  methods: {
    // 上传图片
    uploadFile(e) {
      let _this = this;
      let file = (e.currentTarget || e.target).files[0];
      if (file) {
        let pos = file.name.lastIndexOf(".");
        var type = file.name.substring(pos + 1).toLowerCase();
        let arrImg = ["png", "jpg", "jpeg"];
        if (!arrImg.includes(type)) {
          return;
        }
        EXIF.getData(file, function() {
          _this.orientation = EXIF.getTag(this, "Orientation");
        });
        this.showLoading = true;
        // let canvas = document.createElement("canvas");
        // let context = canvas.getContext("2d");
        if (file) {
          let url = window.URL.createObjectURL(file);
          let img = new Image();
          img.onload = function() {
            // canvas.width = img.width;
            // canvas.height = img.height;
            // context.clearRect(0, 0, canvas.width, canvas.height);
            // let quality = file.size / 1024 > 1025 ? 0.4 : 0.7; //图片是否大于1M,a=压缩上传
            // // if (_this.globalVO.device === "iphone") quality = 0.3;
            // context.drawImage(img, 0, 0, img.width, img.height);
            // _this.base64_img = canvas.toDataURL("image/jpeg", quality);
            // _this.showLoading = false;
            // if (_this.base64_img) {
            //   // _this.uploadImgs();
            // } else {
            //   console.log("您上传的照片处理失败，请重新上传");
            //   return;
            // }
            let rotateCanvasUrl = _this.rotateImg(img, _this.orientation);
            // _this.src = rotateCanvasUrl;
            _this.panel = true;
            if (_this.cropper) {
              _this.cropper.replace(rotateCanvasUrl);
            }
          };
          img.src = url;
        }
      }
    },
    // 获取图片信息 旋转图片
    rotateImg(img, direction) {
      if (!img) return;
      let canvas = document.createElement("canvas");
      let height = img.height;
      let width = img.width;
      let step = 2; // 正常方向
      if (direction) step = direction;

      // 旋转角度以弧度制为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");

      /*
        drawImage(image, dx, dy)在画布指定位置绘制原图
        drawImage(imgage,dx, dy, dw, dh)在画布指定位置按原图下绘制
        
      */
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
        default:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, width, height);
          break;
      }
      let quality = 0.4;
      return canvas.toDataURL("image/jpeg", quality);
    },
    handleConfirm() {
      let cropperBox = this.cropper.getCropBoxData();
      let cropCanvas  = this.cropper.getCroppedCanvas({
        width: cropperBox.width * 2,
        height: cropperBox.height * 2
      });
      let imgData = cropCanvas.toDataURL("image/jpeg", 0.4);
      console.log(imgData);
    },
    handleRotate() {
      this.picDeg += 90;
      this.cropper.rotateTo(this.picDeg);
    }
  }
};
</script>

<style lang="less">
.img-wrapper {
  display: block;
  width: 100%;
  height: auto;
}
.cropper-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background: #fff;
  z-index: 999;
}

.cropper__header {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  align-items: center;
  box-sizing: border-box;
  background-color: #ffb051;
  z-index: 99999;
  button {
    flex: 1;
    color: #fff;
    border: none;
    background-color: transparent;
  }
}
</style>
