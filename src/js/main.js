'use strict';

import './slider';
import { Fancybox } from "@fancyapps/ui";
import modals from './modules/modals';
import formSend from './modules/formSend';

window.addEventListener('DOMContentLoaded', () =>{
  modals();
  formSend();
});