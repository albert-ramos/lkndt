import '../styles/index.scss';
import jQuery from 'jquery';
import rellax from 'rellax';
const ProgressBar = require('progressbar.js');
import ViewHandler from './viewhandler';

window.$ = jQuery;
window.Rellax = rellax;
window.ProgressBar = ProgressBar;
ViewHandler.init();
