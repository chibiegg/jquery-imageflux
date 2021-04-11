# jQuery ImageFlux

jQuery Plugin for [ImageFlux](https://www.sakura.ad.jp/services/imageflux/)


## Quick Start

Include the required javascript, before the body closing tag :

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="jquery.imageflux.min.js"></script>
```

Setup your html (minimal example) :

```html
<img data-imgflx-src="/some-original-image.jpg" />
```

Call the plugin:

```javascript
$(function(){
    $('img[data-imgflx-src]').imageflux({
        host: 'pX-XXXXXXXXXX.imageflux.jp',
        format: 'webp:auto',
        allowUpscale: false
    });
});
```

## Documentation

### Install via npm

You can get the project via npm too :

```bash
npm install jquery-imageflux
```

### Plugin settings

You can change plugin settings by passing an option object, example :

```js
$('img').imageflux({
    host: 'pX-XXXXXXXXXX.imageflux.jp',

    width: 400,
    height: 300,
    aspect: 'force-scale',
    backgroundColor: 'ffffff',
    origin: 'center',
    allowUpscale: true,

    format: 'webp:auto',
    quality: 60,
    optimizeHuhmanTable: false,
    lossless: false,
    removeExif: 'without-orientation',
});
```

List of available options :

| key                 | ImageFlux Parameter | Description                                                                                | Default value    |
| -------------       | --------------      | -------------                                                                              | ------------- |
| host                | -                   | **[REQUIRED]** Hostname of your imageflux (Ex: demo.imageflux.jp)                          | null |
| width               | w                   | Output width in px                                                                         | null |
| height              | h                   | Output height in px                                                                        | true |
| aspect              | a                   | Aspect mode ("scale", "force-scale", "crop", "pad")                                        | "force-scale" |
| backgroundColor     | b                   | Background color in HEX (RRBBGG or RRBBGGAA)                                               | "ffffff" |
| origin              | g                   | Origin of coordinates (Ex: "top-left", "bottom-center", "center" "center-right")           | "center" |
| allowUpscale        | u                   | Allow Upscale. *boolean*                                                                   | true |
| format              | f                   | Output format (Ex: "auto", "webp:auto", "png") See [Document of ImageFlux](https://console.imageflux.jp/docs/image/conversion-parameters#output) | "auto" |
| quality             | q                   | 0 to 100. Effective for JPG/WebP                                                           | 75 |
| optimizeHuhmanTable | o                   | Optimize the Huffman coding table for the output image. JPG Only. *boolean*                | false |
| lossless            | lossless            | Using lossless format. WebP Only. *boolean*                                                | false |
| removeExif          | s                   | Exif removal mode ("all" or "without-orientation" )                                        | "all" |
| through             | through             | Passthru input formats ("jpg", "png", "gif"). Joined by ":".                               | null |

Please see [Document of ImageFlux](https://console.imageflux.jp/docs/image/conversion-parameters#output).

## Parameter override by data

The parameter can also be overridden by data of an element.

Specify the parameter name with the prefix `data-imgflx-`.

Example :

```html
<img data-imgflx-src="/some-original-image.jpg" data-imgflx-lossless="true" data-imgflx-quality="60" />
```

