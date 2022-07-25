'use strict';

import { tns } from 'tiny-slider';

tns({
    container: '.slider_content',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    speed:500,
    navPosition:'bottom',
    controlsContainer:'#customize-controls',
    autoplayButton:'#autoplay',
    navContainer:'#nav_slider'
  });

console.log("Fasad");