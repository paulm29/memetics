export class CloudData {
  text: string;
  weight?: number;
  link?: string;
  routerLink?: string;
  external?: boolean;
  color?: string;
}

export class CloudOptions {
  step?: number;
  aspectRatio?: number;
  width?: number;
  height?: number;
  center?: {
    x: number;
    y: number;
  };
  overflow?: boolean;
}
