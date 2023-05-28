import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appImageResize]"
})
export class ImageResizeDirective {

  private el: ElementRef;
  private renderer: Renderer2;

  constructor(el: ElementRef, renderer: Renderer2) {
    this.el = el;
    this.renderer = renderer;
  }

  @Input("appImageResize") set appImageResize({}) {
  }

  @HostListener("load")
  resize(): void {
    const width = this.el.nativeElement.naturalWidth;
    const height = this.el.nativeElement.naturalHeight;

    // console.log("original width", width);
    // console.log("original height", height);

    const magic = 506;
    const crop = 550; // part that will be cropped when inline

    let newWidth = width;
    let newHeight = height;

    if (width <= magic && height <= magic) {
      // no scaling
    } else if (width > height && width > magic) { // landscape
      const oldMinusNewWidth = width - magic;
      const ratioWidthDecrease = oldMinusNewWidth / width;
      const newHeightLandscape = height * (1 - ratioWidthDecrease);

      newWidth = magic;
      newHeight = newHeightLandscape;
    } else if (height > width && height > magic) { // portrait
      const oldMinusNewHeight = height - crop;
      const ratioHeightDecrease = oldMinusNewHeight / height;
      const newWidthPortrait = width * (1 - ratioHeightDecrease);

      newHeight = crop;
      newWidth = newWidthPortrait;
    } else { // perfect resize, e.g. 1080 x 1080
      newHeight = magic;
      newWidth = magic;
    }

    // console.log("newWidth", newWidth);
    // console.log("newHeight", newHeight);

    this.renderer.setAttribute(this.el.nativeElement, "width", "" + newWidth);
    this.renderer.setAttribute(this.el.nativeElement, "height", "" + newHeight);
  }
}
