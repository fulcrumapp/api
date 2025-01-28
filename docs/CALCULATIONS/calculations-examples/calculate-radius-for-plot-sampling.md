---
title: Calculate Radius for Plot Sampling
excerpt: >-
  One way to conduct unbiased systematic sampling is through fixed radius plots.
  A fixed radius plot is great for sampling trees that are less than the
  specified breakpoint diameter.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4f9ea9d-41fef04-plot-center.png",
        "41fef04-plot-center.png",
        544,
        414,
        "#000000"
      ],
      "caption": "plot center"
    }
  ]
}
[/block]
This calculation field reveals the radius that you should be working with. It pulls in the acre size you would like to survey and the slope value at the site to calculate the length of the radius.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e1ebea1-3b65d01-radius.png",
        "3b65d01-radius.png",
        668,
        432,
        "#000000"
      ],
      "caption": "radius"
    }
  ]
}
[/block]
You can read more about the methods on the [US Forest Service](http://www.fs.fed.us/nrm/fsveg/) site.

```js
var threeHundredth = [
  {"slope": [0,17],"radius":6.8},
  {"slope": [18,30],"radius":6.9},
  {"slope": [31,39],"radius":7.0},
  {"slope": [40,47],"radius":7.1},
  {"slope": [48,53],"radius":7.2},
  {"slope": [54,59],"radius":7.3},
  {"slope": [60,67],"radius":7.4},
  {"slope": [68,72],"radius":7.5},
  {"slope": [73,77],"radius":7.6},
  {"slope": [78,82],"radius":7.7},
  {"slope": [83,88],"radius":7.8},
  {"slope": [89,92],"radius":7.9},
  {"slope": [93,98],"radius":8.0},
  {"slope": [99,102],"radius":8.1},
  {"slope": [103,108],"radius":8.2},
  {"slope": [109,112],"radius":8.3},
  {"slope": [113,117],"radius":8.4},
  {"slope": [118,122],"radius":8.5},
  {"slope": [123,125],"radius":8.6},
  {"slope": [130,130],"radius":8.7},
  {"slope": [135,135],"radius":8.8},
  {"slope": [140,140],"radius":8.9},
  {"slope": [145,145],"radius":9.0},
  {"slope": [150,150],"radius":9.1}
],
oneHundredth = [
  {"slope": [0,17],"radius": 11.8},
  {"slope": [18,22],"radius": 11.9},
  {"slope": [23,30],"radius": 12.0},
  {"slope": [31,36],"radius": 12.1},
  {"slope": [37,42],"radius": 12.2},
  {"slope": [43,47],"radius": 12.3},
  {"slope": [48,49],"radius": 12.4},
  {"slope": [50,53],"radius": 12.5},
  {"slope": [54,57],"radius": 12.6},
  {"slope": [58,61],"radius": 12.7},
  {"slope": [62,65],"radius": 12.8},
  {"slope": [66,67],"radius": 12.9},
  {"slope": [68,70],"radius": 13.0},
  {"slope": [71,74],"radius": 13.1},
  {"slope": [75,77],"radius": 13.2},
  {"slope": [78,80],"radius": 13.3},
  {"slope": [81,83],"radius": 13.4},
  {"slope": [84,86],"radius": 13.5},
  {"slope": [87,89],"radius": 13.6},
  {"slope": [90,92],"radius": 13.7},
  {"slope": [93,95],"radius": 13.8},
  {"slope": [96,98],"radius": 13.9},
  {"slope": [99,101],"radius": 14.0},
  {"slope": [102,104],"radius": 14.1},
  {"slope": [105,107],"radius": 14.2},
  {"slope": [108,109],"radius": 14.3},
  {"slope": [110,112],"radius": 14.4},
  {"slope": [113,115],"radius": 14.5},
  {"slope": [116,117],"radius": 14.6},
  {"slope": [118,120],"radius": 14.7},
  {"slope": [121,124],"radius": 14.8},
  {"slope": [125,125],"radius": 14.9},
  {"slope": [130,130],"radius": 15.1},
  {"slope": [135,135],"radius": 15.3},
  {"slope": [140,140],"radius": 15.4},
  {"slope": [145,145],"radius": 15.6},
  {"slope": [150,150],"radius": 15.8}
];

if (CHOICEVALUE($acre_size) == '1/300'){
  for (var i = 0; i < threeHundredth.length; i++) {
    if ($slope >= threeHundredth[i].slope[0] && $slope <= threeHundredth[i].slope[1]){
      SETRESULT(threeHundredth[i].radius);
    }
  }
} else if (CHOICEVALUE($acre_size) == '1/100') {
  for (var i = 0; i < 37; i++) {
    if ($slope >= oneHundredth[i].slope[0] && $slope <= oneHundredth[i].slope[1]){
      SETRESULT(oneHundredth[i].radius);
    }
  }
}
```