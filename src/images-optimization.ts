import { ImageOptimizationOptions } from "./types";

export function optimizeImage(src: string, options: boolean | Partial<ImageOptimizationOptions>): { src: string, attrs: Record<string, any>} {
  if (!options) return {src, attrs: {}};

  const attrs: Record<string, unknown> = {};
  const filterParams = [];
  if(typeof options === 'object') {
      if(options.width) attrs.width = options.width;
      if(options.height) attrs.height = options.height;
      if(options.loading && ['lazy', 'eager'].includes(options.loading)) attrs.loading = options.loading;
      if(options.class) attrs.class = options.class;


    if(options.filters) {
      const { filters } = options || {};
      const { blur, brightness, fill, format, grayscale, quality, rotate } = filters || {};
  
      if (blur) filterParams.push(`blur(${blur})`);
      if(quality) filterParams.push(`quality(${quality})`)
      if (brightness) filterParams.push(`brightness(${brightness})`);
      if (fill) filterParams.push(`fill(${fill})`);
      if (grayscale) filterParams.push(`grayscale()`);
      if (rotate && [90, 180, 270].includes(options.filters.rotate)) filterParams.push(`rotate(${rotate})`);
      if (format && ['webp', 'png', 'jpeg'].includes(format)) filterParams.push(`format(${format})`);
    }
  }
  
  // server-side WebP support detection https://www.storyblok.com/docs/image-service/#optimize 
  // https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg/m/
  let resultSrc = `${src}/m/`;
  if(options.width > 0 && options.height > 0) {
    resultSrc.replace('/a.storyblok.com\/f\/(\d+)\/([^.]+)\.(gif|jpg|jpeg|png|tif|tiff|bmp)/g',
    `a.storyblok.com/f/$1/$2.$3/m/${options.width}x${options.height}/`);
  }
  if(filterParams.length > 0) {
    resultSrc = `${resultSrc}filters:${filterParams.join(':')}`;
  }
 
  return {
    src: resultSrc,
    attrs,
  };
}