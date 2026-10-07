/* Ikigai Rituals · PWA-Prototyp
   Daten liegen lokal im Browser (localStorage). Kein Server nötig. */
(function () {
  'use strict';
  var KEY = 'ikigai-rituals-v1';
  var CFG = window.IKIGAI_CONFIG || {};

  // ---------- icons ----------
  function svg(p, sw) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  // Phosphor Icons (MIT, phosphoricons.com)
  var PH = {"check": "<path d=\"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z\"/>", "back": "<path d=\"M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z\"/>", "next": "<path d=\"M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z\"/>", "sun": "<path d=\"M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z\"/>", "moon": "<path d=\"M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z\"/>", "cal": "<path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z\"/>", "lib": "<path d=\"M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z\"/>", "user": "<path d=\"M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z\"/>", "share": "<path d=\"M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z\"/>", "plus": "<path d=\"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z\"/>", "x": "<path d=\"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z\"/>", "flame": "<path d=\"M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Zm77.27,15.93A47.8,47.8,0,0,0,176,184c0-44-42.09-69.79-43.88-70.86a8,8,0,0,0-8.24,0C122.09,114.21,80,140,80,184a47.8,47.8,0,0,0,2.73,15.93A71.88,71.88,0,0,1,56,144c0-34.41,20.4-63.15,37.52-81.19A216.21,216.21,0,0,1,128,33.54a215.77,215.77,0,0,1,34.48,29.27C193.49,95.5,200,125,200,144A71.88,71.88,0,0,1,173.27,199.93Z\"/>", "flameFill": "<path d=\"M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Z\"/>", "shield": "<path d=\"M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z\"/>", "trophy": "<path d=\"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z\"/>", "gear": "<path d=\"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z\"/>", "search": "<path d=\"M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z\"/>", "bell": "<path d=\"M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z\"/>", "leaf": "<path d=\"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z\"/>", "calPlus": "<path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-48-56a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z\"/>", "phone": "<path d=\"M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8v-8H184v8A8,8,0,0,1,176,224Z\"/>", "plusSq": "<path d=\"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z\"/>", "sunFill": "<path d=\"M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z\"/>", "calFill": "<path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z\"/>", "libFill": "<path d=\"M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z\"/>", "userFill": "<path d=\"M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z\"/>"};
  function ph(n) { return '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">' + PH[n] + '</svg>'; }
  var ICON = {};
  Object.keys(PH).forEach(function (k) { ICON[k] = ph(k); });
  var SIGNET = '<svg viewBox="0 0 73.14 73.14" aria-hidden="true"><g fill="none" stroke="var(--p)" stroke-width="2" stroke-miterlimit="10"><circle cx="36.57" cy="36.57" r="35.87"/><path d="M1.28,42.64c3.36-.25,13.91-.61,24.35,6.28,12.17,8.03,15.56,20.24,16.28,23.13"/><path d="M4.46,52.58c2.5,0,9.73.33,16.82,5.4,7.03,5.03,9.68,11.69,10.49,14.06"/><path d="M36.56,60.06c1.89-2.91,6.64-9.36,15.39-13.66,8.45-4.15,16.16-4.1,19.63-3.87"/><path d="M41.91,72.05c.78-2.33,3.75-10.29,12.16-15.4,6.05-3.68,11.92-4.08,14.63-4.09"/><path d="M36.57,32.81v27.25"/><path stroke-linejoin="round" d="M52.37,19.25c-1.72.29-6.07,1.27-10.04,4.95-4.06,3.75-5.35,8.13-5.76,9.82,1.56-.19,6.49-.99,10.71-5.17,3.75-3.72,4.79-7.98,5.09-9.6Z"/><path stroke-linejoin="round" d="M20.75,19.22c1.72.29,6.07,1.27,10.04,4.95,4.06,3.75,5.35,8.13,5.76,9.82-1.56-.19-6.49-.99-10.71-5.17-3.75-3.72-4.79-7.98-5.09-9.6Z"/></g><circle cx="36.56" cy="14.67" r="3.86" fill="var(--r)"/></svg>';

  var COLORS = [['orange', 'Orange'], ['red', 'Rot'], ['green', 'Grün'], ['blue', 'Blau'], ['violet', 'Violett'], ['grey', 'Grau']];
  var TYPES = { jn: 'Ja/Nein', zahl: 'Zahl pro Tag', summe: 'Summe im Zeitraum', woche: 'x-mal pro Woche', liste: 'Tages-Checkliste' };
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var WD = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  var WD_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  var TEMPLATES = [
    { id: 'winterarc', name: 'Winter Arc', days: 90, cat: 'Fitness', type: 'liste', color: 'blue', season: [10, 11, 12], rules: ['Kein Junkfood', '2-3 L Wasser', '7-8 h Schlaf', 'Früh aufstehen', 'Training oder Laufen', '20 Min. lesen'] },
    { id: 'spartober', name: 'Spartober', days: 30, cat: 'Finanzen', type: 'jn', color: 'red', season: [10], rules: ['Nichts online bestellen', 'Keine Kleidung', 'Nichts Unnötiges kaufen'] },
    { id: 'inktober', name: 'Inktober', days: 31, cat: 'Kreativität', type: 'jn', color: 'violet', season: [10], rules: ['Jeden Tag eine Zeichnung'] },
    { id: 'writing', name: 'Writing Challenge', days: 30, cat: 'Kreativität', type: 'jn', color: 'orange', season: [], rules: ['Jeden Tag schreiben'] },
    { id: 'zeichnen', name: 'Zeichnen', days: 30, cat: 'Kreativität', type: 'woche', target: 3, color: 'violet', season: [], rules: ['Mehrmals pro Woche zeichnen'] },
    { id: 'noshave', name: 'No-Shave-November', days: 30, cat: 'Fun', type: 'jn', color: 'grey', season: [11], rules: ['Nicht rasieren'] },
    { id: 'selfcare', name: 'SelfCare November', days: 30, cat: 'Selfcare', type: 'jn', color: 'green', season: [11], rules: ['Jeden Tag etwas für dich tun'] },
    { id: 'veganuary', name: 'Veganuary', days: 31, cat: 'Ernährung', type: 'jn', color: 'green', season: [1], rules: ['Vegan essen'] },
    { id: 'plank', name: 'Plank-Challenge', days: 30, cat: 'Fitness', type: 'zahl', target: 60, unit: 'Sek.', color: 'orange', season: [], rules: ['Jeden Tag planken, Zeit eintragen'] },
    { id: 'wandsitzen', name: 'Wandsitzen', days: 30, cat: 'Fitness', type: 'zahl', target: 60, unit: 'Sek.', color: 'orange', season: [], rules: ['Jeden Tag Wandsitzen, Zeit eintragen'] },
    { id: 'km60', name: '60 km im Monat', days: 30, cat: 'Fitness', type: 'summe', target: 60, unit: 'km', color: 'blue', season: [], rules: ['Laufen oder Gehen, Kilometer eintragen'] },
    { id: 'steps', name: '10.000 Schritte', days: 30, cat: 'Fitness', type: 'zahl', target: 10000, unit: 'Schritte', color: 'blue', season: [], rules: ['Schritte am Abend eintragen'] },
    { id: 'junk', name: 'Kein Junkfood', days: 30, cat: 'Ernährung', type: 'jn', color: 'green', season: [], rules: ['Kein Fast Food, keine Süßigkeiten'] },
    { id: 'lesen', name: '20 Min. Lesen', days: 30, cat: 'Lernen', type: 'zahl', target: 20, unit: 'Min.', color: 'blue', season: [], rules: ['Jeden Tag lesen'] },
    { id: 'declutter', name: 'Minimalismus', days: 30, cat: 'Lifestyle', type: 'jn', color: 'grey', season: [], rules: ['Jeden Tag einen Gegenstand aussortieren'] },
    { id: 'frueh', name: 'Früh aufstehen', days: 30, cat: 'Routine', type: 'jn', color: 'orange', season: [], rules: ['Vor 6 Uhr aufstehen'] },
    { id: 'dank', name: 'Dankbarkeit', days: 30, cat: 'Mindset', type: 'zahl', target: 3, unit: 'Einträge', color: 'green', season: [], rules: ['Drei Dinge aufschreiben'] }
  ];
  var CATS = ['Fitness', 'Kreativität', 'Ernährung', 'Finanzen', 'Lernen', 'Mindset', 'Selfcare', 'Routine', 'Lifestyle', 'Fun'];

  // ---------- dates ----------
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return ymd(d); }
  function diff(a, b) { var A = parse(a), B = parse(b); return Math.round((Date.UTC(B.getFullYear(), B.getMonth(), B.getDate()) - Date.UTC(A.getFullYear(), A.getMonth(), A.getDate())) / 864e5); }
  function today() { return ymd(new Date()); }
  function fmt(s) { var d = parse(s); return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.'; }
  function fmtY(s) { var d = parse(s); return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear(); }
  function monthKey(s) { return s.slice(0, 7); }
  function monthShift(k, n) { var p = k.split('-'); var d = new Date(+p[0], +p[1] - 1 + n, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); }
  function monthLen(k) { var p = k.split('-'); return new Date(+p[0], +p[1], 0).getDate(); }
  function weekday(s) { return (parse(s).getDay() + 6) % 7; }
  function weekStart(s) { return addDays(s, -weekday(s)); }
  function nextMonthStart(s) { return monthShift(monthKey(s), 1) + '-01'; }

  // ---------- state ----------
  function blank() { return { v: 1, onboarded: false, challenges: [], checkins: {}, months: {}, periods: [], settings: { tags: '#1000tagechallenge', theme: 'system', reminder: false, reminderTime: '20:00' } }; }
  var state = blank();
  var ui = { view: 'heute', month: monthKey(today()), detailId: null, lib: 'jetzt', q: '', form: null, share: null, openNote: {}, confirm: null, editDate: null, importOpen: false, periodForm: false, popId: null };

  function uid() { return Math.random().toString(36).slice(2, 10); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function normalize(s) {
    var b = blank(); if (!s || typeof s !== 'object') return b;
    Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
    Object.keys(b.settings).forEach(function (k) { if (s.settings[k] === undefined) s.settings[k] = b.settings[k]; });
    return s;
  }
  function load() { try { var s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { toast('Speichern nicht möglich', 'Speicher des Browsers ist voll oder gesperrt.'); } }
  function commit() { save(); render(); }

  // ---------- domain ----------
  function chEnd(ch) { return addDays(ch.start, ch.days - 1); }
  function ci(ch, d) { var m = state.checkins[ch.id]; return m ? m[d] : null; }
  function setCi(ch, d, patch) {
    var m = state.checkins[ch.id] || (state.checkins[ch.id] = {});
    var cur = m[d] || {};
    Object.keys(patch).forEach(function (k) { cur[k] = patch[k]; });
    m[d] = cur;
  }
  function isDone(ch, d) {
    var c = ci(ch, d); if (!c) return false;
    if (ch.type === 'jn' || ch.type === 'woche') return !!c.done;
    if (ch.type === 'zahl') return ch.target ? (+c.value || 0) >= ch.target : (+c.value || 0) > 0;
    if (ch.type === 'summe') return (+c.value || 0) > 0;
    if (ch.type === 'liste') { var it = c.items || {}; return ch.rules.length > 0 && ch.rules.every(function (_, i) { return it[i]; }); }
    return false;
  }
  function touched(ch, d) {
    var c = ci(ch, d); if (!c) return false;
    if (isDone(ch, d)) return true;
    if (ch.type === 'liste') { var it = c.items || {}; return Object.keys(it).some(function (k) { return it[k]; }); }
    if (ch.type === 'zahl') return (+c.value || 0) > 0;
    return false;
  }
  function phase(ch, t) {
    if (ch.status === 'done') return 'done';
    if (ch.status === 'stopped') return 'stopped';
    if (ch.start > t) return 'planned';
    if (chEnd(ch) < t) return 'ended';
    return 'active';
  }
  function dayIndex(ch, t) { return diff(ch.start, t) + 1; }
  function activeOn(d) { return state.challenges.some(function (ch) { return d >= ch.start && d <= chEnd(ch) && touched(ch, d); }); }
  function weekCount(ch, d) { var ws = weekStart(d), n = 0; for (var i = 0; i < 7; i++) { var x = addDays(ws, i); if (x >= ch.start && x <= chEnd(ch) && isDone(ch, x)) n++; } return n; }
  function sumTotal(ch) { var m = state.checkins[ch.id] || {}, s = 0; Object.keys(m).forEach(function (d) { if (d >= ch.start && d <= chEnd(ch)) s += (+m[d].value || 0); }); return Math.round(s * 10) / 10; }
  function doneDays(ch, upto) { var n = 0, end = chEnd(ch) < upto ? chEnd(ch) : upto; for (var d = ch.start; d <= end; d = addDays(d, 1)) if (isDone(ch, d)) n++; return n; }
  function chProgress(ch, t) {
    if (ch.type === 'summe') { var s = sumTotal(ch); return { label: s + ' / ' + ch.target + ' ' + (ch.unit || ''), pct: Math.min(100, ch.target ? s / ch.target * 100 : 0) }; }
    if (ch.type === 'woche') { var weeks = Math.ceil(ch.days / 7), dd = doneDays(ch, t); return { label: dd + ' / ' + (weeks * (ch.target || 1)) + ' Einheiten', pct: Math.min(100, dd / (weeks * (ch.target || 1)) * 100) }; }
    var n = doneDays(ch, t); return { label: n + ' / ' + ch.days + ' Tage', pct: Math.min(100, n / ch.days * 100) };
  }
  function firstActivity() {
    var first = null;
    state.challenges.forEach(function (ch) { var m = state.checkins[ch.id] || {}; Object.keys(m).forEach(function (d) { if (touched(ch, d) && (!first || d < first)) first = d; }); });
    return first;
  }
  function streakInfo() {
    var t = today(), used = {}, cur = 0, d = activeOn(t) ? t : addDays(t, -1), first = firstActivity();
    if (first) {
      for (var i = 0; i < 3000 && d >= first; i++) {
        if (activeOn(d)) cur++;
        else { var wk = weekStart(d); if (!used[wk] && cur > 0 && activeOn(addDays(d, -1))) { used[wk] = d; } else break; }
        d = addDays(d, -1);
      }
    }
    var best = 0, run = 0, used2 = {};
    if (first) for (var x = first; x <= t; x = addDays(x, 1)) {
      if (activeOn(x)) { run++; if (run > best) best = run; }
      else if (x !== t) { var w2 = weekStart(x); if (!used2[w2] && run > 0 && activeOn(addDays(x, 1))) used2[w2] = x; else run = 0; }
    }
    return { cur: cur, best: Math.max(best, cur), todaySafe: activeOn(t), freezeUsed: !!used[weekStart(t)], savedDays: used };
  }
  function totalCheckins() { var n = 0; state.challenges.forEach(function (ch) { var m = state.checkins[ch.id] || {}; Object.keys(m).forEach(function (d) { if (isDone(ch, d)) n++; }); }); return n; }
  function monthData(k) { return state.months[k] || (state.months[k] = { focus: '', why: '', goals: [], highlight: '', learn: '' }); }
  function findCh(id) { for (var i = 0; i < state.challenges.length; i++) if (state.challenges[i].id === id) return state.challenges[i]; return null; }
  function activeList(t) { return state.challenges.filter(function (c) { return phase(c, t) === 'active'; }); }
  function doneToday(ch, t) { return isDone(ch, t) || (ch.type === 'woche' && weekCount(ch, t) >= ch.target); }

  function sampleData() {
    var s = blank(), t = today();
    s.onboarded = true; s.sample = true;
    var ms = monthKey(t) + '-01', nm = nextMonthStart(t);
    function add(o) { s.challenges.push({ id: uid(), name: o.name, cat: o.cat, type: o.type, target: o.target || 0, unit: o.unit || '', start: o.start, days: o.days, mode: 'soft', rules: o.rules, color: o.color, status: 'active', learn: '' }); }
    add({ name: 'Writing Challenge', cat: 'Kreativität', type: 'jn', start: ms, days: 30, color: 'orange', rules: ['Täglich schreiben, mit eigenem Template'] });
    add({ name: 'Spartober', cat: 'Finanzen', type: 'jn', start: ms, days: 30, color: 'red', rules: ['Nichts online bestellen', 'Keine Kleidung', 'Nichts Unnötiges kaufen'] });
    add({ name: 'Zeichnen', cat: 'Kreativität', type: 'woche', target: 3, start: ms, days: 30, color: 'violet', rules: ['2-3 Zeichnungen pro Woche'] });
    add({ name: 'No-Shave-November', cat: 'Fun', type: 'jn', start: nm, days: 30, color: 'grey', rules: ['Nicht rasieren'] });
    add({ name: '60 km im Monat', cat: 'Fitness', type: 'summe', target: 60, unit: 'km', start: nm, days: 30, color: 'blue', rules: ['Laufen oder Gehen, Kilometer eintragen'] });
    s.periods = [{ id: uid(), name: '1000-Tage-Challenge', start: '2026-08-22', end: '2029-05-18' }, { id: uid(), name: '120-Tage-Finish-2026', start: '2026-09-03', end: '2026-12-31' }];
    s.months[monthKey(t)] = { focus: '', why: '', highlight: '', learn: '', goals: ['Apfelkuchen backen', 'Kürbissuppe kochen', 'Äpfel pflücken', 'Pfälzerwald-Wanderung', 'Blumenzwiebeln pflanzen'].map(function (x) { return { id: uid(), text: x, done: false }; }) };
    return s;
  }

  // ---------- helpers ----------
  function toast(title, sub) {
    var el = document.getElementById('toast');
    el.innerHTML = '<span class="flame">' + ICON.flameFill + '</span><span><strong>' + esc(title) + '</strong>' + (sub ? '<span class="sub">' + esc(sub) + '</span>' : '') + '</span>';
    el.hidden = false; clearTimeout(toast.t);
    toast.t = setTimeout(function () { el.hidden = true; }, 2600);
  }
  function color(c) { return 'var(--c-' + (c || 'grey') + ')'; }
  function bar(pct, warm) { return '<div class="bar' + (warm ? ' warm' : '') + '" role="presentation"><span style="width:' + Math.max(0, Math.min(100, pct)).toFixed(1) + '%"></span></div>'; }
  function chip(label, act, val, on, extra) { return '<button type="button" class="chip" aria-pressed="' + (on ? 'true' : 'false') + '" data-a="' + act + '" data-v="' + esc(val) + '"' + (extra || '') + '>' + label + '</button>'; }
  function isDark() { var th = state.settings.theme; return th === 'dark' || (th === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); }
  function themeBtn() { var d = isDark(); return '<button class="icon-btn" data-a="theme" aria-label="' + (d ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln') + '">' + (d ? ICON.sun : ICON.moon) + '</button>'; }
  function topbar(left, right) { return '<div class="topbar">' + left + '<div class="row" style="gap:8px">' + (right || '') + '</div></div>'; }
  function brand() { return '<span class="brand">' + SIGNET + '<span class="row" style="gap:6px;align-items:baseline"><span class="w1">IKIGAI</span><span class="w2">Rituals</span></span></span>'; }
  function eyebrow(t) { return '<p class="eyebrow num">' + t + '</p>'; }
  function backBtn(label, to) { return '<button class="back" data-a="go" data-v="' + to + '">' + ICON.back + esc(label) + '</button>'; }
  function initial(name) { return esc(String(name || '?').trim().charAt(0).toUpperCase()); }
  function applyTheme() {
    var th = state.settings.theme;
    if (th === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', th);
    var m = document.querySelectorAll('meta[name="theme-color"]');
    var c = isDark() ? '#121110' : '#FAF8F5';
    for (var i = 0; i < m.length; i++) { if (th !== 'system') m[i].setAttribute('content', c); }
  }

  function renderTabs() {
    var tabs = [['heute', 'Heute', 'sun'], ['monat', 'Monat', 'cal'], ['bibliothek', 'Bibliothek', 'lib'], ['profil', 'Profil', 'user']];
    var main = { heute: 'heute', monat: 'monat', bibliothek: 'bibliothek', profil: 'profil', einstellungen: 'profil', setup: 'bibliothek', detail: ui.back === 'monat' ? 'monat' : 'heute', rueckblick: 'heute', teilen: 'heute' }[ui.view];
    document.getElementById('tabs').innerHTML = tabs.map(function (t) {
      return '<button class="tab" data-a="go" data-v="' + t[0] + '"' + (main === t[0] ? ' aria-current="page"' : '') + '><span class="pill">' + t[2] + '</span>' + t[1] + '</button>';
    }).join('');
    document.getElementById('tabbar').hidden = ui.view === 'onboarding';
  }

  function render() {
    if (!state.onboarded && state.challenges.length === 0 && ['bibliothek', 'setup', 'einstellungen'].indexOf(ui.view) < 0) ui.view = 'onboarding';
    var views = { onboarding: vOnboarding, heute: vHeute, monat: vMonat, bibliothek: vBibliothek, setup: vSetup, detail: vDetail, rueckblick: vRueckblick, teilen: vTeilen, profil: vProfil, einstellungen: vEinstellungen };
    document.getElementById('app').innerHTML = (views[ui.view] || vHeute)();
    renderTabs();
    ui.popId = null; ui.popToday = false;
  }


  // ---------- install hint ----------
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredPrompt = e; render(); });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; toast('App installiert', 'Öffne Rituals ab jetzt über das Icon.'); render(); });
  function installInfo() {
    var ua = navigator.userAgent || '';
    var ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var android = /Android/i.test(ua);
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    var otherIosBrowser = ios && /CriOS|FxiOS|EdgiOS|OPiOS|GSA|Instagram|FBAN|FBAV|Line\//.test(ua);
    return { ios: ios, android: android, standalone: standalone, otherIosBrowser: otherIosBrowser, canPrompt: !!deferredPrompt, mobile: ios || android };
  }
  function showInstall() {
    var i = installInfo();
    if (i.standalone) return false;
    if (!i.mobile && !i.canPrompt) return false;
    return true;
  }
  var SHARE_GLYPH = '<span class="glyph">' + ICON.share + '</span>';
  var ADD_GLYPH = '<span class="glyph">' + ICON.plusSq + '</span>';
  function installSteps() {
    var i = installInfo();
    if (i.canPrompt) return '<button class="btn primary block" data-a="install">' + ICON.plus + 'Zum Home-Bildschirm hinzufügen</button>';
    if (i.otherIosBrowser) return '<ol class="steps"><li><span class="n">1</span><span>Link kopieren und in <strong>Safari</strong> öffnen. Nur Safari kann Apps auf den Home-Bildschirm legen.</span></li></ol>';
    if (i.ios) return '<ol class="steps">' +
      '<li><span class="n">1</span><span>Unten in Safari auf <strong>Teilen</strong> ' + SHARE_GLYPH + ' tippen. Falls du es nicht siehst: erst auf <strong>•••</strong></span></li>' +
      '<li><span class="n">2</span><span><strong>Zum Home-Bildschirm</strong> ' + ADD_GLYPH + ' wählen, eventuell weiter unten in der Liste</span></li>' +
      '<li><span class="n">3</span><span>Auf <strong>Hinzufügen</strong> tippen und Rituals ab jetzt über das Icon öffnen</span></li></ol>';
    return '<ol class="steps"><li><span class="n">1</span><span>Im Browser-Menü <strong>⋮</strong> auf <strong>App installieren</strong> oder <strong>Zum Startbildschirm hinzufügen</strong> tippen</span></li>' +
      '<li><span class="n">2</span><span>Rituals ab jetzt über das Icon öffnen</span></li></ol>';
  }
  function installCard(compact) {
    var i = installInfo();
    var why = i.ios ? 'Dann läuft Rituals wie eine App, im Vollbild und offline, und kann dich erinnern. Wichtig: Safari und die App teilen ihre Daten nicht, also am besten vor dem ersten Check-in installieren.' : 'Dann läuft Rituals wie eine App, im Vollbild und offline, und kann dich erinnern.';
    return '<section class="card install" aria-label="App installieren">' +
      '<div class="row" style="gap:12px;align-items:flex-start"><span class="tile" style="background:var(--p);color:var(--onP)"><span style="width:20px;height:20px;display:inline-flex">' + ICON.phone + '</span></span>' +
      '<div class="stack" style="gap:2px;flex:1"><span class="eyebrow" style="font-size:11px;color:var(--pd)">' + (compact ? 'Noch nicht installiert' : 'Erster Schritt') + '</span><strong style="font-size:16px">Leg Rituals auf deinen Home-Bildschirm</strong></div>' +
      (compact ? '<button class="btn ghost sm" data-a="install-later" aria-label="Hinweis ausblenden" style="color:var(--ink3);margin:-6px -8px 0 0">' + ICON.x + '</button>' : '') + '</div>' +
      (compact ? '' : '<p class="small" style="color:var(--ink2)">' + why + '</p>') +
      installSteps() + '</section>';
  }

  // ---------- views ----------
  function vOnboarding() {
    var li = function (ic, t, s) { return '<li><span class="tile">' + ic + '</span><span class="stack" style="gap:2px"><strong>' + t + '</strong><span class="small muted">' + s + '</span></span></li>'; };
    return '<section class="stack ob">' +
      '<span class="ob-signet" style="color:var(--ink)">' + SIGNET + '</span>' +
      '<div class="stack" style="gap:8px"><p class="eyebrow">Ikigai Rituals</p><h1>Jeder Monat ist ein Neuanfang.</h1></div>' +
      '<ul class="stack" style="margin:0;padding:0;list-style:none;gap:14px">' +
      li(ICON.cal, 'Rituale passend zur Saison', 'Fertige 30-Tage-Challenges, vom Spartober bis zum Winter Arc') +
      li(ICON.leaf, 'Monatsziele an einem Ort', 'Challenges und Erlebnisse für den Monat gemeinsam planen') +
      li(ICON.shield, 'Nachsichtig statt streng', 'Ein verpasster Tag wirft dich nicht zurück') + '</ul>' +
      (showInstall() ? installCard(false) + '<p class="eyebrow" style="margin-top:4px">Danach</p>' : '') +
      '<div class="stack"><button class="btn ' + (showInstall() ? '' : 'primary ') + 'block" data-a="ob-lib">Erstes Ritual auswählen</button>' +
      '<button class="btn block" data-a="ob-sample">Mit Beispieldaten ausprobieren</button>' +
      '<p class="xs muted">Beispieldaten: drei laufende Challenges ab Monatsanfang, zwei geplante für nächsten Monat, Monatsziele und zwei Langzeit-Zähler. Ohne erfundene Check-ins.</p></div>' +
      '</section>';
  }

  function vHeute() {
    var t = today(), d = parse(t), st = streakInfo();
    var active = activeList(t);
    var ended = state.challenges.filter(function (c) { return phase(c, t) === 'ended'; });
    var planned = state.challenges.filter(function (c) { return phase(c, t) === 'planned'; }).sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    var doneN = active.filter(function (c) { return doneToday(c, t); }).length;
    var all = active.length > 0 && doneN === active.length;
    var md = state.months[monthKey(t)];
    var h = topbar(brand(), active.length ? '<button class="icon-btn" data-a="go" data-v="teilen" aria-label="Tag teilen">' + ICON.share + '</button>' : '');
    h += '<header class="stack" style="gap:2px">' + eyebrow(WD_LONG[d.getDay()] + ', ' + d.getDate() + '. ' + MONTHS[d.getMonth()]) + '<h1>' + (all ? 'Gut gemacht.' : 'Heute') + '</h1></header>';
    if (showInstall() && !(state.settings.installHideUntil && state.settings.installHideUntil > Date.now())) h += installCard(true);
    if (state.sample) h += '<p class="xs" style="color:var(--rt);font-weight:700">Beispieldaten geladen. Abhaken, ändern und löschen funktioniert echt.</p>';

    // hero
    var C = 2 * Math.PI * 32, frac = active.length ? doneN / active.length : 0;
    var ws = weekStart(t), dots = '';
    for (var i = 0; i < 7; i++) {
      var x = addDays(ws, i), on = activeOn(x), isT = x === t;
      var cls = 'd' + (on ? ' on' : '') + (isT ? ' today' : '') + (st.savedDays[ws] === x ? ' saved' : '') + (isT && on && ui.popToday ? ' pop' : '');
      dots += '<span class="col' + (isT ? ' today' : '') + '"><span class="' + cls + '">' + (isT && on ? ICON.check : '') + '</span>' + WD[i] + '</span>';
    }
    var hint = all ? 'Alle Rituale für heute erledigt' : (st.todaySafe ? 'Heute gesichert · weiter so' : (st.cur ? 'Ein Check-in sichert den heutigen Tag' : 'Dein erster Check-in startet die Streak'));
    h += '<section class="card hero' + (all ? ' all' : '') + '" aria-label="Tagesfortschritt und Streak"><div class="row" style="gap:16px">' +
      '<div class="ring"><svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true"><circle cx="38" cy="38" r="32" fill="none" stroke="var(--surf2)" stroke-width="7"/><circle cx="38" cy="38" r="32" fill="none" stroke="' + (all ? 'var(--r)' : 'var(--p)') + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + (C * frac).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><span class="lbl">' + doneN + '<small>/' + active.length + '</small></span></div>' +
      '<div class="stack" style="gap:4px;flex:1;min-width:0"><div class="row" style="gap:8px"><span class="flame' + (st.todaySafe ? ' on' : '') + '">' + ICON.flame + '</span><span class="streak-title num">' + (st.cur ? st.cur + (st.cur === 1 ? ' Tag' : ' Tage') + ' in Folge' : 'Noch keine Streak') + '</span></div>' +
      '<span class="small' + (st.todaySafe ? ' hint-on' : ' muted') + '">' + hint + '</span></div></div>' +
      '<div class="week">' + dots + '</div>' +
      '<div class="hero-foot"><span class="row" style="gap:6px;font-weight:600;color:var(--ink2)"><span style="width:16px;height:16px;display:inline-flex">' + ICON.shield + '</span>' + (st.freezeUsed ? 'Streak-Schutz diese Woche genutzt' : '1 Streak-Schutz verfügbar') + '</span><span class="muted num">Rekord: ' + st.best + '</span></div></section>';

    ended.forEach(function (ch) {
      h += '<section class="card warm"><div class="between"><div class="stack" style="gap:2px"><span class="eyebrow" style="color:var(--rt)">Zeitraum vorbei</span><strong>' + esc(ch.name) + '</strong></div><button class="btn sm warm" data-a="open-review" data-v="' + ch.id + '">Rückblick</button></div></section>';
    });

    if (!active.length && !ended.length) {
      h += '<section class="card empty"><span class="ic-circle">' + ICON.calPlus + '</span><h2>' + (planned.length ? 'Heute läuft kein Ritual' : 'Starte dein erstes Ritual') + '</h2>' +
        '<p class="muted small">' + (planned.length ? 'Als Nächstes startet ' + esc(planned[0].name) + ' am ' + fmt(planned[0].start) + '.' : 'Wähle eine Vorlage oder erstelle eine eigene. Sie erscheint dann hier zum Abhaken.') + '</p>' +
        '<button class="btn primary block" data-a="go" data-v="bibliothek">Ritual auswählen</button><button class="btn ghost" data-a="new-custom">Eigenes erstellen</button></section>';
    }
    if (active.length) h += '<div class="section-head"><h2>Rituale</h2><span class="small muted num">' + doneN + ' von ' + active.length + ' erledigt</span></div>';
    active.forEach(function (ch) { h += chCard(ch, t); });
    if (planned.length && active.length) h += '<p class="small muted">Geplant: ' + planned.slice(0, 3).map(function (p) { return esc(p.name) + ' ab ' + fmt(p.start); }).join(', ') + '</p>';

    var per = state.periods.filter(function (p) { return p.start <= t && p.end >= t; });
    if (per.length) {
      h += '<div class="section-head"><h2>Zeiträume</h2></div><section class="grid2" aria-label="Langzeit-Zeiträume">' + per.map(function (p) {
        var n = diff(p.start, t) + 1, total = diff(p.start, p.end) + 1;
        return '<div class="card tight"><span class="xs" style="font-weight:600;color:var(--ink3)">' + esc(p.name) + '</span><span class="big">Tag ' + n + '</span><span class="xs muted num">von ' + total + ' · bis ' + fmtY(p.end) + '</span><div style="margin-top:8px">' + bar(n / total * 100) + '</div></div>';
      }).join('') + '</section>';
    }
    if (state.challenges.length || md) {
      var gd = md ? md.goals.filter(function (g) { return g.done; }).length : 0;
      h += '<button class="card soft" style="flex-direction:row;align-items:center;justify-content:space-between;cursor:pointer;text-align:left" data-a="go" data-v="monat"><span class="stack" style="gap:3px"><span class="eyebrow" style="font-size:11px;color:var(--pd)">Monat ' + MONTHS[d.getMonth()] + '</span><span style="font-weight:600">' + (md && md.focus ? 'Fokus: ' + esc(md.focus) : 'Fokus und Monatsziele') + '</span>' +
        (md && md.goals.length ? '<span class="xs muted num">' + gd + ' von ' + md.goals.length + ' Monatszielen erledigt</span>' : '') + '</span><span style="width:20px;height:20px;display:inline-flex">' + ICON.next + '</span></button>';
    }
    if (active.length) h += '<button class="btn dashed block" data-a="go" data-v="bibliothek">' + ICON.plus + 'Challenge hinzufügen</button>';
    return h;
  }

  function chCard(ch, t) {
    var n = dayIndex(ch, t), c = ci(ch, t) || {}, prog = chProgress(ch, t), done = isDone(ch, t), pop = ui.popId === ch.id ? ' pop' : '';
    var meta = 'Tag ' + n + ' von ' + ch.days, ctrl = '', body = '';
    if (ch.type === 'jn') {
      ctrl = '<button class="check' + (done ? pop : '') + '" aria-pressed="' + done + '" aria-label="' + esc(ch.name) + (done ? ' erledigt, rückgängig' : ' abhaken') + '" data-a="toggle" data-v="' + ch.id + '">' + (done ? ICON.check : '') + '</button>';
    } else if (ch.type === 'woche') {
      var wc = weekCount(ch, t); meta += ' · ' + wc + ' von ' + ch.target + ' diese Woche';
      ctrl = '<button class="check plus' + (done ? ' on' + pop : '') + '" aria-pressed="' + done + '" aria-label="' + esc(ch.name) + (done ? ' heute erledigt, rückgängig' : ' heute erledigt') + '" data-a="toggle" data-v="' + ch.id + '">' + (done ? ICON.check : '+1') + '</button>';
      var seg = ''; for (var s = 0; s < ch.target; s++) seg += '<span class="' + (s < wc ? 'on' : '') + '"></span>';
      body = '<div class="segs" style="grid-template-columns:repeat(' + ch.target + ',minmax(0,1fr))">' + seg + '</div>';
    } else if (ch.type === 'zahl' || ch.type === 'summe' || ch.type === 'liste') {
      if (ch.type === 'zahl') meta += ' · heute ' + (c.value || 0) + (ch.target ? ' / ' + ch.target : '') + ' ' + esc(ch.unit);
      if (ch.type === 'summe') meta += ' · ' + prog.label;
      if (ch.type === 'liste') { var it0 = c.items || {}; meta += ' · ' + ch.rules.filter(function (_, i) { return it0[i]; }).length + ' von ' + ch.rules.length + ' heute'; }
      ctrl = '<span class="check plain' + (done ? ' on' : '') + '" aria-hidden="true">' + (done ? ICON.check : '') + '</span>';
    }
    var h = '<section class="card" aria-label="' + esc(ch.name) + '"><div class="ch-head"><span class="tile" style="color:' + color(ch.color) + '">' + initial(ch.name) + '</span>' +
      '<button class="ch-title" data-a="open-detail" data-v="' + ch.id + '"><strong>' + esc(ch.name) + '</strong><span class="small muted num">' + meta + '</span></button>' + ctrl + '</div>';
    if (ch.type === 'zahl' || ch.type === 'summe') {
      h += '<form class="row" data-f="log" data-v="' + ch.id + '"><label class="sr" for="v-' + ch.id + '">Wert für heute</label><input id="v-' + ch.id + '" type="number" inputmode="decimal" step="any" min="0" placeholder="' + (ch.type === 'summe' ? 'Heute dazu (' + esc(ch.unit) + ')' : 'Heute (' + esc(ch.unit) + ')') + '"><button class="btn sm primary" type="submit">' + (ch.type === 'summe' ? 'Hinzufügen' : 'Eintragen') + '</button></form>';
    }
    if (ch.type === 'liste') {
      var it = c.items || {};
      h += '<div>' + ch.rules.map(function (r, i) {
        return '<div class="list-item"><button class="box" aria-pressed="' + !!it[i] + '" aria-label="' + esc(r) + '" data-a="item" data-v="' + ch.id + '" data-i="' + i + '">' + (it[i] ? ICON.check : '') + '</button><span class="' + (it[i] ? 'done-text' : '') + '">' + esc(r) + '</span></div>';
      }).join('') + '</div>';
    }
    h += body || bar(prog.pct);
    if (ui.openNote[ch.id]) {
      h += '<label class="field">Notiz für heute<textarea id="note-' + ch.id + '" data-in="note" data-v="' + ch.id + '" rows="3" placeholder="Was war heute schwer, was hat geholfen?">' + esc(c.note || '') + '</textarea></label><button class="btn sm primary" style="align-self:flex-start" data-a="note-close" data-v="' + ch.id + '">Fertig</button>';
    } else {
      h += '<button class="note-btn" data-a="note-open" data-v="' + ch.id + '">' + ICON.plus + (c.note ? 'Notiz ansehen' : 'Notiz für heute') + '</button>';
    }
    return h + '</section>';
  }

  function vMonat() {
    var t = today(), k = ui.month, md = monthData(k), cur = monthKey(t);
    var ms = k + '-01', me = k + '-' + pad(monthLen(k));
    var list = state.challenges.filter(function (c) { return c.start <= me && chEnd(c) >= ms; }).sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    var kind = k < cur ? 'past' : (k > cur ? 'future' : 'now');
    var mName = MONTHS[+k.slice(5) - 1];
    var h = topbar(eyebrow(kind === 'now' ? 'Aktueller Monat' : kind === 'past' ? 'Vergangen' : 'Geplant'));
    h += '<header class="stack" style="gap:6px"><div class="row"><button class="icon-btn" style="width:40px;height:40px" aria-label="Vorheriger Monat" data-a="month" data-v="-1">' + ICON.back + '</button>' +
      '<h1 style="flex:1;text-align:center;font-size:38px">' + mName + '</h1>' +
      '<button class="icon-btn" style="width:40px;height:40px" aria-label="Nächster Monat" data-a="month" data-v="1">' + ICON.next + '</button></div>' +
      '<p class="small muted num" style="text-align:center">' + k.slice(0, 4) + (kind === 'now' ? ' · Tag ' + parse(t).getDate() + ' von ' + monthLen(k) : '') + '</p>' +
      (kind !== 'now' ? '<button class="btn ghost sm" style="align-self:center" data-a="month-now">Zurück zu ' + MONTHS[parse(t).getMonth()] + '</button>' : '') + '</header>';
    h += '<section class="card soft"><label class="field" style="color:var(--pd)">Fokus-Thema<input type="text" id="focus-' + k + '" data-in="focus" value="' + esc(md.focus) + '" placeholder="z.B. Ankommen in der Routine" style="background:var(--surf)"></label>' +
      '<label class="field" style="color:var(--pd)">Warum ist mir das wichtig?<textarea id="why-' + k + '" data-in="why" rows="2" placeholder="Ein, zwei Sätze mit Bezug zu deiner Vision" style="background:var(--surf)">' + esc(md.why) + '</textarea></label></section>';
    // challenges
    h += '<div class="section-head"><h2>' + (kind === 'future' ? 'Geplante Challenges' : 'Challenges') + '</h2><span class="small muted num">' + list.length + '</span></div><section class="card" aria-label="Challenges">';
    if (!list.length) h += '<p class="muted small">' + (kind === 'past' ? 'In diesem Monat lief keine Challenge.' : 'Noch keine. Der Monatsanfang ist ein guter Moment für einen Neustart.') + '</p>';
    else h += '<div>' + list.map(function (ch) {
      var p = phase(ch, t), badge = { planned: ['Ab ' + fmt(ch.start), 'accent'], active: ['Tag ' + dayIndex(ch, t) + '/' + ch.days, ''], ended: ['Vorbei', 'warm'], done: ['Abgeschlossen', 'ok'], stopped: ['Beendet', ''] }[p];
      return '<button class="list-item" style="width:100%;background:none;border-left:none;border-right:none;border-bottom:none;padding:12px 0;text-align:left;cursor:pointer;flex-direction:column;align-items:stretch;gap:8px;color:inherit" data-a="open-detail" data-v="' + ch.id + '"><span class="row" style="gap:12px"><span class="tile" style="width:36px;height:36px;font-size:18px;color:' + color(ch.color) + '">' + initial(ch.name) + '</span><span style="flex:1;min-width:0"><strong style="font-weight:600">' + esc(ch.name) + '</strong><br><span class="xs muted num">' + fmt(ch.start) + ' bis ' + fmt(chEnd(ch)) + ' · ' + TYPES[ch.type] + '</span></span><span class="badge ' + badge[1] + '">' + badge[0] + '</span></span>' + (p !== 'planned' ? bar(chProgress(ch, t).pct) : '') + '</button>';
    }).join('') + '</div>';
    if (kind !== 'past') h += '<button class="btn sm" style="align-self:flex-start" data-a="plan-month">' + ICON.plus + (kind === 'future' ? 'Für ' + mName + ' planen' : 'Challenge starten') + '</button>';
    h += '</section>';
    // goals
    var gd = md.goals.filter(function (g) { return g.done; }).length, allG = md.goals.length && gd === md.goals.length;
    h += '<div class="section-head"><h2>Monatsziele</h2>' + (md.goals.length ? '<button class="btn sm pill" data-a="share-month">' + ICON.share + 'Teilen</button>' : '') + '</div><section class="card" aria-label="Monatsziele">';
    if (md.goals.length) h += '<span class="small num' + (allG ? ' hint-on' : ' muted') + '">' + (allG ? 'Alle ' + md.goals.length + ' Ziele erreicht' : gd + ' von ' + md.goals.length + ' erledigt') + '</span>' + bar(gd / md.goals.length * 100, allG);
    else h += '<p class="small muted">Sammle Dinge, die du diesen Monat erleben oder schaffen willst, z.B. einen Ausflug, ein Rezept oder einen Besuch.</p>';
    h += '<div>' + md.goals.map(function (g) {
      return '<div class="list-item"><button class="box" aria-pressed="' + g.done + '" aria-label="' + esc(g.text) + '" data-a="goal" data-v="' + g.id + '">' + (g.done ? ICON.check : '') + '</button><span style="flex:1" class="' + (g.done ? 'done-text' : '') + '">' + esc(g.text) + '</span><button class="btn ghost sm" aria-label="' + esc(g.text) + ' löschen" data-a="goal-del" data-v="' + g.id + '" style="color:var(--ink3)">' + ICON.x + '</button></div>';
    }).join('') + '</div>';
    h += '<form class="row" data-f="goal"><label class="sr" for="goal-in">Neues Monatsziel</label><input id="goal-in" type="text" placeholder="Neues Monatsziel"><button class="btn sm primary" type="submit">Hinzufügen</button></form></section>';
    // calendar
    var off = weekday(ms), cells = WD.map(function (w) { return '<span class="head">' + w + '</span>'; }).join('');
    for (var i = 0; i < off; i++) cells += '<span class="empty"></span>';
    for (var dd = 1; dd <= monthLen(k); dd++) {
      var ds = k + '-' + pad(dd), cl = (activeOn(ds) ? ' on' : '') + (ds === t ? ' today' : '') + (ds > t ? ' future' : '');
      cells += '<span class="' + cl.trim() + '">' + dd + '</span>';
    }
    h += '<div class="section-head"><h2>Verlauf</h2></div><section class="card" aria-label="Verlauf"><div class="cal">' + cells + '</div><p class="xs muted">Gefüllt: an diesem Tag mindestens einen Check-in erledigt.</p></section>';
    if (kind !== 'future') {
      h += '<div class="section-head"><h2>Monatsrückblick</h2></div><section class="card" aria-label="Monatsrückblick">' + (kind === 'now' ? '<p class="xs muted">Füll das am Monatsende aus.</p>' : '') +
        '<label class="field">Highlight des Monats<textarea id="hl-' + k + '" data-in="highlight" rows="2" placeholder="Was war richtig gut?">' + esc(md.highlight) + '</textarea></label>' +
        '<label class="field">Lernpunkt<textarea id="ln-' + k + '" data-in="learn" rows="2" placeholder="Was machst du nächsten Monat anders?">' + esc(md.learn) + '</textarea></label></section>';
    }
    return h;
  }

  function seasonHint() {
    var t = today(), d = parse(t), next = (d.getMonth() + 1) % 12 + 1, left = monthLen(monthKey(t)) - d.getDate();
    if (left > 14) return '';
    var tp = TEMPLATES.filter(function (x) { return x.season.indexOf(next) >= 0 && x.season.indexOf(d.getMonth() + 1) < 0; })[0];
    if (!tp) return '';
    return '<button class="card warm" style="flex-direction:row;align-items:center;gap:14px;cursor:pointer;text-align:left;color:inherit" data-a="tpl-next" data-v="' + tp.id + '"><span class="tile" style="background:var(--r);color:var(--onR)"><span style="width:20px;height:20px;display:inline-flex">' + ICON.cal + '</span></span><span class="stack" style="gap:2px;flex:1"><span class="eyebrow" style="font-size:11px;color:var(--rt)">Bald relevant</span><strong>' + esc(tp.name) + ' startet im ' + MONTHS[next - 1] + '</strong><span class="small" style="color:var(--ink2)">Jetzt schon für den 1. ' + MONTHS[next - 1] + ' planen</span></span></button>';
  }

  function vBibliothek() {
    var t = today(), m = parse(t).getMonth() + 1, f = ui.lib, q = ui.q.trim().toLowerCase();
    var running = {}; state.challenges.forEach(function (c) { var p = phase(c, t); if (p === 'active' || p === 'planned') running[c.name] = { p: p, id: c.id }; });
    var list = TEMPLATES.filter(function (x) {
      if (q) return x.name.toLowerCase().indexOf(q) >= 0 || x.cat.toLowerCase().indexOf(q) >= 0;
      return f === 'jetzt' ? (x.season.indexOf(m) >= 0 || (x.season.length === 0 && ['writing', 'plank', 'junk'].indexOf(x.id) >= 0)) : x.cat === f;
    });
    var h = topbar(eyebrow(TEMPLATES.length + ' Vorlagen')) + '<h1>Bibliothek</h1>';
    h += '<label class="search">' + ICON.search + '<span class="sr">Challenges durchsuchen</span><input type="search" id="lib-q" data-in="q" value="' + esc(ui.q) + '" placeholder="Challenge suchen"></label>';
    h += '<div class="chips scroll" role="group" aria-label="Filter">' + chip('Jetzt passend', 'lib', 'jetzt', f === 'jetzt' && !q) + CATS.filter(function (c) { return TEMPLATES.some(function (x) { return x.cat === c; }); }).map(function (c) { return chip(esc(c), 'lib', c, f === c && !q); }).join('') + '</div>';
    h += '<div id="lib-results" class="stack" style="gap:12px">' + libResults(list, running, q, f, m) + '</div>';
    return h;
  }
  function libResults(list, running, q, f, m) {
    var h = q ? '' : seasonHint();
    h += '<div class="section-head"><h2>' + (q ? 'Suche' : f === 'jetzt' ? 'Passend zum ' + MONTHS[m - 1] : esc(f)) + '</h2><span class="small muted num">' + list.length + (list.length === 1 ? ' Vorlage' : ' Vorlagen') + '</span></div>';
    if (!list.length) h += '<p class="muted">Keine Vorlage gefunden. Erstelle einfach eine eigene.</p>';
    h += list.map(function (x) {
      var r = running[x.name];
      return '<section class="card" style="gap:10px;padding:14px 16px"><div class="row" style="gap:14px"><span class="tile" style="width:44px;height:44px;font-size:22px;color:' + color(x.color) + '">' + initial(x.name) + '</span><span style="flex:1;min-width:0" class="stack"><strong style="font-size:16px;line-height:1.2">' + esc(x.name) + '</strong><span class="xs muted num" style="margin-top:-6px">' + x.days + ' Tage · ' + esc(x.cat) + ' · ' + TYPES[x.type] + (x.target ? ' · Ziel ' + x.target + ' ' + esc(x.unit || '') : '') + '</span></span>' +
        (r ? '<button class="btn sm pill" style="background:var(--surf2);border-color:transparent;color:var(--ink2)" data-a="open-detail" data-v="' + r.id + '"><span class="dot" style="width:7px;height:7px;background:var(--ok)"></span>' + (r.p === 'active' ? 'Läuft' : 'Geplant') + '</button>' : '<button class="btn sm pill primary" data-a="tpl" data-v="' + x.id + '">Starten</button>') + '</div>' +
        '<p class="small" style="color:var(--ink2)">' + esc(x.rules.join(', ')) + '</p></section>';
    }).join('');
    h += '<button class="btn dashed block" data-a="new-custom">' + ICON.plus + 'Eigene Challenge erstellen</button>';
    return h;
  }

  function newForm(tpl, startDate) {
    return { id: null, name: tpl ? tpl.name : '', cat: tpl ? tpl.cat : 'Fitness', type: tpl ? tpl.type : 'jn', target: tpl && tpl.target ? tpl.target : '', unit: tpl && tpl.unit ? tpl.unit : '', days: tpl ? tpl.days : 30, start: startDate || today(), mode: 'soft', rules: tpl ? tpl.rules.slice() : [], color: tpl ? tpl.color : 'blue', fromTpl: tpl ? tpl.name : null };
  }

  function vSetup() {
    var f = ui.form, t = today(), tm = addDays(t, 1), nm = nextMonthStart(t);
    var end = addDays(f.start, (+f.days || 1) - 1);
    var h = topbar(backBtn(f.id ? 'Challenge' : 'Bibliothek', f.id ? 'detail' : 'bibliothek'));
    h += '<header class="stack" style="gap:4px">' + (f.fromTpl ? eyebrow('Vorlage · ' + esc(f.cat)) : '') + '<h1 style="font-size:38px">' + (f.id ? 'Anpassen' : 'Einrichten') + '</h1></header>';
    h += '<form class="stack" data-f="setup" style="gap:14px">';
    h += '<section class="card"><label class="field">Name<input id="f-name" type="text" data-in="f" data-k="name" value="' + esc(f.name) + '" placeholder="z.B. Kalt duschen" required></label></section>';
    h += '<section class="card"><h2>Dauer</h2><div class="chips">' + [7, 21, 30, 66, 90].map(function (n) { return chip(n + ' Tage', 'f-days', n, +f.days === n); }).join('') + '</div>' +
      '<label class="field">Eigene Dauer in Tagen<input id="f-days" type="number" min="1" max="1000" data-in="f" data-k="days" value="' + esc(f.days) + '"></label>' +
      '<p class="xs muted">Neue Gewohnheiten brauchen im Schnitt 66 Tage, bis sie automatisch laufen.</p>' +
      '<h2>Start</h2><div class="chips">' + chip('Heute', 'f-start', t, f.start === t) + chip('Morgen', 'f-start', tm, f.start === tm) + chip('Ab 1. ' + MONTHS[parse(nm).getMonth()], 'f-start', nm, f.start === nm) + '</div>' +
      '<label class="field">Startdatum<input id="f-start" type="date" data-in="f" data-k="start" value="' + esc(f.start) + '"></label>' +
      '<p class="badge accent num" id="f-range" style="align-self:flex-start;white-space:normal">Läuft vom ' + fmtY(f.start) + ' bis ' + fmtY(end) + '</p></section>';
    h += '<section class="card"><h2>Wie trackst du?</h2><div class="chips">' + Object.keys(TYPES).map(function (k) { return chip(TYPES[k], 'f-type', k, f.type === k); }).join('') + '</div>';
    if (f.type === 'zahl' || f.type === 'summe' || f.type === 'woche') {
      h += '<div class="grid2"><label class="field">' + (f.type === 'zahl' ? 'Tagesziel' : f.type === 'summe' ? 'Gesamtziel' : 'Mal pro Woche') + '<input id="f-target" type="number" min="0" step="any" data-in="f" data-k="target" value="' + esc(f.target) + '"></label>' +
        (f.type !== 'woche' ? '<label class="field">Einheit<input id="f-unit" type="text" data-in="f" data-k="unit" value="' + esc(f.unit) + '" placeholder="km, Min., Sek."></label>' : '') + '</div>';
    }
    h += '<h2>' + (f.type === 'liste' ? 'Punkte der Checkliste' : 'Regeln') + '</h2><div>' + f.rules.map(function (r, i) {
      return '<div class="list-item"><span class="rule" style="flex:1">' + esc(r) + '</span><button type="button" class="btn ghost sm" aria-label="' + esc(r) + ' entfernen" data-a="f-rule-del" data-v="' + i + '" style="color:var(--ink3)">' + ICON.x + '</button></div>';
    }).join('') + '</div><div class="row"><label class="sr" for="f-rule">Neue Regel</label><input id="f-rule" type="text" placeholder="Neue Regel"><button type="button" class="btn sm" data-a="f-rule-add">Hinzufügen</button></div></section>';
    h += '<section class="card"><h2>Wenn du einen Tag verpasst</h2>' + [['soft', 'Nachsichtig', 'Nachtragen möglich, kein Neustart. Empfohlen.'], ['hard', 'Streng', 'Ein verpasster Tag bietet den Neustart an.']].map(function (m) {
      return '<button type="button" class="opt" aria-pressed="' + (f.mode === m[0]) + '" data-a="f-mode" data-v="' + m[0] + '"><strong>' + m[1] + '</strong><span class="small muted">' + m[2] + '</span></button>';
    }).join('') + '</section>';
    h += '<section class="card"><h2>Farbe</h2><div class="chips">' + COLORS.map(function (c) {
      return chip('<span class="dot" style="background:' + color(c[0]) + '"></span>' + c[1], 'f-color', c[0], f.color === c[0]);
    }).join('') + '</div></section>';
    h += '<button type="submit" class="btn primary block" style="min-height:54px">' + (f.id ? 'Änderungen speichern' : (f.start > t ? 'Challenge planen (Start ' + fmt(f.start) + ')' : 'Challenge starten')) + '</button></form>';
    return h;
  }

  function vDetail() {
    var ch = findCh(ui.detailId); if (!ch) { ui.view = 'heute'; return vHeute(); }
    var t = today(), p = phase(ch, t), end = chEnd(ch), prog = chProgress(ch, t);
    var elapsed = Math.max(0, Math.min(ch.days, diff(ch.start, t) + 1)), dn = doneDays(ch, t);
    var run = 0, best = 0; for (var d = ch.start; d <= end && d <= t; d = addDays(d, 1)) { if (isDone(ch, d)) { run++; best = Math.max(best, run); } else if (d !== t) run = 0; }
    var h = topbar(backBtn(ui.back === 'monat' ? 'Monat' : 'Heute', ui.back || 'heute'));
    h += '<header class="stack" style="gap:12px"><div class="row" style="gap:14px"><span class="tile lg" style="color:' + color(ch.color) + '">' + initial(ch.name) + '</span><div class="stack" style="gap:2px;min-width:0"><h1 style="font-size:36px">' + esc(ch.name) + '</h1>' +
      '<span class="small muted num">' + (p === 'planned' ? 'Startet am ' + fmtY(ch.start) : 'Tag ' + Math.min(dayIndex(ch, t), ch.days) + ' von ' + ch.days) + ' · ' + fmt(ch.start) + ' bis ' + fmt(end) + '</span></div></div>' +
      '<div class="row" style="gap:6px;flex-wrap:wrap"><span class="badge">' + TYPES[ch.type] + '</span><span class="badge">' + (ch.mode === 'hard' ? 'Streng' : 'Nachsichtig') + '</span><span class="badge accent">' + esc(ch.cat || '') + '</span>' + (p === 'done' ? '<span class="badge ok">Abgeschlossen</span>' : p === 'stopped' ? '<span class="badge">Beendet</span>' : '') + '</div></header>';
    if (ch.mode === 'hard' && p === 'active') {
      var miss = null; for (var x = ch.start; x < t; x = addDays(x, 1)) if (!isDone(ch, x) && ch.type !== 'woche' && ch.type !== 'summe') { miss = x; break; }
      if (miss) h += '<section class="card warm"><strong>Verpasster Tag am ' + fmt(miss) + '</strong><p class="small" style="color:var(--ink2)">Im strengen Modus startest du neu, oder du trägst den Tag nach, falls du ihn erledigt hast.</p><button class="btn sm warm" style="align-self:flex-start" data-a="restart" data-v="' + ch.id + '">Ab heute neu starten</button></section>';
    }
    h += '<section class="grid3" aria-label="Kennzahlen"><div class="card tight"><span class="stat">' + (ch.type === 'summe' ? sumTotal(ch) : dn) + '</span><span class="xs muted">' + (ch.type === 'summe' ? 'von ' + ch.target + ' ' + esc(ch.unit) : 'Tage erledigt') + '</span></div>' +
      '<div class="card tight"><span class="stat">' + best + '</span><span class="xs muted">Längste Serie</span></div>' +
      '<div class="card tight"><span class="stat">' + (elapsed ? Math.round(dn / elapsed * 100) : 0) + '%</span><span class="xs muted">Quote bisher</span></div></section>';
    var cells = '';
    for (var i = 0; i < ch.days; i++) {
      var ds = addDays(ch.start, i), on = isDone(ch, ds), fut = ds > t;
      var cls = (on ? 'on' : '') + (ds === t ? ' today' : '') + (!on && !fut && ds !== t ? ' missed' : '') + (ui.editDate === ds ? ' sel' : '');
      cells += '<button class="' + cls.trim() + '" ' + (fut ? 'disabled' : '') + ' data-a="day" data-v="' + ds + '" aria-label="Tag ' + (i + 1) + ', ' + fmtY(ds) + (on ? ', erledigt' : '') + '">' + (i + 1) + '</button>';
    }
    h += '<section class="card"><div class="between"><h2 style="font-size:22px">' + ch.days + ' Tage</h2><span class="xs muted">Tippen zum Nachtragen</span></div>' + bar(prog.pct) + '<div class="days">' + cells + '</div>';
    if (ui.editDate && (ch.type === 'zahl' || ch.type === 'summe' || ch.type === 'liste')) {
      var ce = ci(ch, ui.editDate) || {};
      h += '<div class="card tight" style="background:var(--surf2);box-shadow:none;gap:8px"><strong>' + fmtY(ui.editDate) + '</strong>';
      if (ch.type === 'liste') {
        var it = ce.items || {};
        h += ch.rules.map(function (r, j) { return '<div class="list-item"><button class="box" aria-pressed="' + !!it[j] + '" aria-label="' + esc(r) + '" data-a="item-date" data-v="' + j + '">' + (it[j] ? ICON.check : '') + '</button><span>' + esc(r) + '</span></div>'; }).join('');
      } else {
        h += '<form class="row" data-f="log-date"><label class="sr" for="ld">Wert</label><input id="ld" type="number" step="any" min="0" value="' + esc(ce.value || '') + '" placeholder="' + esc(ch.unit) + '"><button class="btn sm primary" type="submit">Speichern</button></form>';
      }
      h += '</div>';
    }
    h += '</section>';
    h += '<section class="card"><h2 style="font-size:22px">' + (ch.type === 'liste' ? 'Tages-Checkliste' : 'Regeln') + '</h2>' + (ch.rules.length ? '<div class="stack" style="gap:8px">' + ch.rules.map(function (r) { return '<span class="rule">' + esc(r) + '</span>'; }).join('') + '</div>' : '<p class="small muted">Keine Regeln hinterlegt.</p>') + '</section>';
    var notes = [], m = state.checkins[ch.id] || {}; Object.keys(m).sort().reverse().forEach(function (dd) { if (m[dd].note) notes.push([dd, m[dd].note]); });
    if (notes.length) h += '<section class="card"><h2 style="font-size:22px">Notizen</h2>' + notes.slice(0, 10).map(function (n) { return '<div class="stack" style="gap:2px;border-top:1px solid var(--line);padding-top:8px"><span class="xs muted num">' + fmtY(n[0]) + '</span><p class="share-pre">' + esc(n[1]) + '</p></div>'; }).join('') + '</section>';
    if (ui.confirm === 'stop-' + ch.id) {
      h += '<section class="card warm"><strong>' + esc(ch.name) + ' jetzt beenden?</strong><p class="small" style="color:var(--ink2)">Dein Verlauf bleibt erhalten. Danach siehst du den Rückblick.</p><div class="row"><button class="btn sm warm" data-a="stop" data-v="' + ch.id + '">Beenden</button><button class="btn sm" data-a="cancel">Abbrechen</button></div></section>';
    } else if (ui.confirm === 'del-' + ch.id) {
      h += '<section class="card warm"><strong>' + esc(ch.name) + ' löschen?</strong><p class="small" style="color:var(--ink2)">Challenge und alle Check-ins werden entfernt.</p><div class="row"><button class="btn sm danger" data-a="delete" data-v="' + ch.id + '">Endgültig löschen</button><button class="btn sm" data-a="cancel">Abbrechen</button></div></section>';
    } else {
      h += '<div class="grid2"><button class="btn" data-a="edit" data-v="' + ch.id + '">Anpassen</button>' +
        ((p === 'active' || p === 'planned') ? '<button class="btn" style="color:var(--rt)" data-a="ask" data-v="stop-' + ch.id + '">Beenden</button>' : '<button class="btn" data-a="open-review" data-v="' + ch.id + '">Rückblick</button>') + '</div>' +
        '<button class="btn ghost danger" style="align-self:center" data-a="ask" data-v="del-' + ch.id + '">Challenge löschen</button>';
    }
    return h;
  }

  function vRueckblick() {
    var ch = findCh(ui.detailId); if (!ch) { ui.view = 'heute'; return vHeute(); }
    var t = today(), end = chEnd(ch), upto = end < t ? end : t, dn = doneDays(ch, upto), span = Math.max(1, diff(ch.start, upto) + 1);
    var run = 0, best = 0; for (var d = ch.start; d <= upto; d = addDays(d, 1)) { if (isDone(ch, d)) { run++; best = Math.max(best, run); } else run = 0; }
    var vals = []; if (ch.type === 'zahl') { var m = state.checkins[ch.id] || {}; Object.keys(m).sort().forEach(function (x) { if (+m[x].value) vals.push(+m[x].value); }); }
    var rate = Math.round(dn / span * 100), C = 2 * Math.PI * 44;
    var h = topbar(backBtn('Challenge', 'detail'));
    h += '<header class="stack" style="gap:4px">' + eyebrow(ch.status === 'done' ? 'Abgeschlossen' : 'Rückblick') + '<h1 style="font-size:38px">' + esc(ch.name) + '</h1><p class="small muted num">' + ch.days + ' Tage · ' + fmt(ch.start) + ' bis ' + fmt(end) + '</p></header>';
    h += '<section class="card warm" style="flex-direction:row;align-items:center;gap:18px;border-radius:20px"><div class="ring" style="width:104px;height:104px"><svg width="104" height="104" viewBox="0 0 104 104" aria-hidden="true"><circle cx="52" cy="52" r="44" fill="none" stroke="var(--surf)" stroke-width="8"/><circle cx="52" cy="52" r="44" fill="none" stroke="var(--r)" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + (C * rate / 100).toFixed(1) + ' ' + C.toFixed(1) + '"/></svg><span class="lbl" style="font-size:26px">' + rate + '<small>%</small></span></div>' +
      '<div class="stack" style="gap:4px"><span class="streak-title num">' + (ch.type === 'summe' ? sumTotal(ch) + ' ' + esc(ch.unit) : dn + ' von ' + span + ' Tagen') + '</span><span class="small" style="color:var(--ink2)">Längste Serie: ' + best + ' Tage</span></div></section>';
    if (vals.length) h += '<section class="card"><h2 style="font-size:22px">Entwicklung</h2><div class="grid2"><div class="stack" style="gap:2px"><span class="xs muted">Erster Wert</span><span class="big">' + vals[0] + ' ' + esc(ch.unit) + '</span></div><div class="stack" style="gap:2px"><span class="xs muted">Bester Wert</span><span class="big">' + Math.max.apply(null, vals) + ' ' + esc(ch.unit) + '</span></div></div></section>';
    h += '<section class="card"><label class="field">Was nimmst du mit?<textarea id="learn-' + ch.id + '" data-in="ch-learn" data-v="' + ch.id + '" rows="3" placeholder="Was hat geholfen, was war schwer?">' + esc(ch.learn || '') + '</textarea></label></section>';
    h += '<div class="section-head"><h2>Wie geht es weiter?</h2></div><div class="stack">' +
      '<button class="opt" aria-pressed="true" data-a="again" data-v="' + ch.id + '"><strong>Neue Runde starten</strong><span class="small muted">Gleiche Challenge ab heute, Ziel anpassbar</span></button>' +
      '<button class="opt" data-a="extend" data-v="' + ch.id + '"><strong>Um 30 Tage verlängern</strong><span class="small muted">Gleiche Regeln, der Verlauf läuft weiter</span></button>' +
      (ch.status !== 'done' ? '<button class="opt" data-a="finish" data-v="' + ch.id + '"><strong>Abschließen</strong><span class="small muted">Verschwindet von Heute, bleibt im Monat sichtbar</span></button>' : '') +
      '</div><button class="btn block" data-a="share-ch" data-v="' + ch.id + '">' + ICON.share + 'Ergebnis teilen</button>';
    return h;
  }

  function shareText() {
    var s = ui.share, t = today(), lines = [];
    var per = state.periods.filter(function (p) { return p.start <= t && p.end >= t; })[0];
    if (s.tpl === 'tag') {
      var act = activeList(t);
      lines.push((per ? 'Tag ' + (diff(per.start, t) + 1) + '/' + (diff(per.start, per.end) + 1) + ' · ' : '') + fmtY(t));
      lines.push('');
      act.forEach(function (c) { lines.push((doneToday(c, t) ? '✓ ' : '○ ') + c.name); });
      if (s.score) { lines.push(''); lines.push('Score: ' + act.filter(function (c) { return doneToday(c, t); }).length + '/' + act.length); }
      if (s.extra) { lines.push('Bildschirmzeit: '); lines.push('Emotion: '); }
    } else if (s.tpl === 'challenge') {
      var ch = findCh(s.chId) || activeList(t)[0];
      if (ch) {
        lines.push(ch.name + ' · Tag ' + Math.min(dayIndex(ch, t), ch.days) + '/' + ch.days);
        lines.push(''); lines.push('Bisher: ' + chProgress(ch, t).label);
        if (s.score) { var dn = doneDays(ch, t), el = Math.max(1, Math.min(ch.days, diff(ch.start, t) + 1)); lines.push('Quote: ' + Math.round(dn / el * 100) + '%'); }
      } else lines.push('Keine laufende Challenge');
    } else {
      var k = s.month || monthKey(t), md = monthData(k);
      lines.push(MONTHS[+k.slice(5) - 1] + '-Ziele · ' + md.goals.filter(function (g) { return g.done; }).length + '/' + md.goals.length);
      lines.push('');
      md.goals.forEach(function (g) { lines.push((g.done ? '✓ ' : '○ ') + g.text); });
    }
    if (s.tags && state.settings.tags) { lines.push(''); lines.push(state.settings.tags); }
    return lines.join('\n');
  }

  function vTeilen() {
    var s = ui.share;
    if (s.text == null) s.text = shareText();
    var h = topbar(backBtn('Zurück', s.back || 'heute'));
    h += '<header class="stack" style="gap:4px"><h1 style="font-size:38px">Teilen</h1><p class="small muted">Aus deinen Check-ins erzeugt. Vor dem Kopieren frei bearbeitbar.</p></header>';
    h += '<div class="chips" role="group" aria-label="Vorlage">' + chip('Tages-Tracker', 'sh-tpl', 'tag', s.tpl === 'tag') + chip('Challenge', 'sh-tpl', 'challenge', s.tpl === 'challenge') + chip('Monatsziele', 'sh-tpl', 'monat', s.tpl === 'monat') + '</div>';
    if (s.tpl === 'challenge') {
      var t = today(), act = state.challenges.filter(function (c) { return phase(c, t) !== 'planned'; });
      h += '<div class="chips scroll">' + act.map(function (c) { return chip(esc(c.name), 'sh-ch', c.id, (s.chId || (act[0] && act[0].id)) === c.id); }).join('') + '</div>';
    }
    h += '<section class="card"><label class="field">Text<textarea id="share-text" data-in="share" rows="10">' + esc(s.text) + '</textarea></label>' +
      '<div class="chips">' + chip((s.score ? '✓ ' : '') + 'Score', 'sh-opt', 'score', s.score) + chip((s.tags ? '✓ ' : '') + 'Hashtags', 'sh-opt', 'tags', s.tags) + (s.tpl === 'tag' ? chip((s.extra ? '✓ ' : '') + 'Bildschirmzeit + Emotion', 'sh-opt', 'extra', s.extra) : '') + '</div>' +
      '<div class="grid2"><button class="btn primary" data-a="copy">Kopieren</button>' + (navigator.share ? '<button class="btn" data-a="native-share">' + ICON.share + 'Teilen</button>' : '') + '</div></section>';
    h += '<section class="card"><label class="field">Standard-Hashtags<input id="tags" type="text" data-in="tags" value="' + esc(state.settings.tags || '') + '"></label></section>';
    return h;
  }

  function vProfil() {
    var st = streakInfo(), t = today();
    var act = activeList(t).length, fin = state.challenges.filter(function (c) { return c.status === 'done'; }).length;
    var first = firstActivity();
    var h = topbar(eyebrow(first ? 'Seit ' + fmtY(first) : 'Noch kein Check-in'), '<button class="icon-btn" data-a="go" data-v="einstellungen" aria-label="Einstellungen">' + ICON.gear + '</button>');
    h += '<h1>Dein Weg</h1>';
    h += '<section class="grid2" aria-label="Streak"><div class="card tight warm" style="gap:4px"><span class="flame on">' + ICON.flameFill + '</span><span class="stat" style="font-size:28px;margin-top:4px">' + st.cur + '</span><span class="xs" style="color:var(--ink2)">Tage aktuelle Streak</span></div>' +
      '<div class="card tight" style="gap:4px"><span class="flame" style="background:var(--ps);color:var(--pd)">' + ICON.trophy + '</span><span class="stat" style="font-size:28px;margin-top:4px">' + st.best + '</span><span class="xs muted">Tage längste Streak</span></div>' +
      '<div class="card tight"><span class="stat">' + totalCheckins() + '</span><span class="xs muted">Check-ins insgesamt</span></div><div class="card tight"><span class="stat">' + act + ' · ' + fin + '</span><span class="xs muted">Laufend · abgeschlossen</span></div></section>';
    h += '<p class="xs muted">Ein Tag zählt ab dem ersten Check-in. Pro Woche überbrückt ein Streak-Schutz einen verpassten Tag.</p>';
    h += '<div class="section-head"><h2>Langzeit-Zeiträume</h2></div><section class="card"><p class="xs muted">Erscheinen auf Heute als Tageszähler.</p><div>' + state.periods.map(function (p) {
      var n = Math.max(0, Math.min(diff(p.start, t) + 1, diff(p.start, p.end) + 1));
      return '<div class="list-item"><span style="flex:1"><strong>' + esc(p.name) + '</strong><br><span class="xs muted num">Tag ' + n + ' · ' + fmtY(p.start) + ' bis ' + fmtY(p.end) + '</span></span><button class="btn ghost sm" aria-label="' + esc(p.name) + ' löschen" data-a="period-del" data-v="' + p.id + '" style="color:var(--ink3)">' + ICON.x + '</button></div>';
    }).join('') + '</div>';
    if (ui.periodForm) {
      h += '<form class="stack" data-f="period"><label class="field">Name<input id="p-name" type="text" required placeholder="z.B. 100 Tage bis Sommer"></label><div class="grid2"><label class="field">Start<input id="p-start" type="date" value="' + t + '" required></label><label class="field">Ende<input id="p-end" type="date" value="' + addDays(t, 99) + '" required></label></div><div class="row"><button class="btn sm primary" type="submit">Anlegen</button><button type="button" class="btn sm" data-a="period-form">Abbrechen</button></div></form>';
    } else h += '<button class="btn sm" style="align-self:flex-start" data-a="period-form">' + ICON.plus + 'Zeitraum anlegen</button>';
    h += '</section>';
    return h;
  }

  function vEinstellungen() {
    var s = state.settings, perm = ('Notification' in window) ? Notification.permission : 'unsupported';
    var standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    var pushReady = !!CFG.oneSignalAppId;
    var h = topbar(backBtn('Profil', 'profil')) + '<h1 style="font-size:38px">Einstellungen</h1>';
    h += '<div class="section-head"><h2>Darstellung</h2></div><section class="card"><div class="chips" role="group" aria-label="Theme">' + chip('System', 'set-theme', 'system', s.theme === 'system') + chip('Hell', 'set-theme', 'light', s.theme === 'light') + chip('Dunkel', 'set-theme', 'dark', s.theme === 'dark') + '</div></section>';
    h += '<div class="section-head"><h2>Erinnerungen</h2></div><section class="card" style="gap:0">';
    h += '<div class="setting"><span><strong>Tägliche Erinnerung</strong><span class="xs muted">' + (pushReady ? 'Per Push, auch wenn die App geschlossen ist' : 'Push-Dienst noch nicht verbunden') + '</span></span><button class="switch" role="switch" aria-checked="' + !!s.reminder + '" aria-label="Tägliche Erinnerung" data-a="reminder"></button></div>';
    h += '<div class="setting"><span><strong>Uhrzeit</strong><span class="xs muted">Zum Beispiel am Abend, um den Tag zu sichern</span></span><label class="sr" for="rem-time">Uhrzeit der Erinnerung</label><input id="rem-time" type="time" data-in="rem-time" value="' + esc(s.reminderTime) + '" style="width:136px"></div>';
    h += '<div class="setting"><span><strong>Testbenachrichtigung</strong><span class="xs muted">Prüft, ob dein Gerät Benachrichtigungen zeigt</span></span><button class="btn sm" data-a="test-notify">' + ICON.bell + 'Senden</button></div></section>';
    var notes = [];
    if (!standalone) notes.push('Auf dem iPhone funktionieren Benachrichtigungen nur, wenn die App über Teilen › Zum Home-Bildschirm installiert und von dort geöffnet wurde.');
    if (perm === 'denied') notes.push('Benachrichtigungen sind für diese App blockiert. Du kannst sie in den Systemeinstellungen wieder erlauben.');
    if (perm === 'unsupported') notes.push('Dieser Browser unterstützt hier keine Benachrichtigungen.');
    if (!pushReady) notes.push('Für Erinnerungen bei geschlossener App muss in config.js eine OneSignal-App-ID eingetragen werden. Die Anleitung steht im README.');
    if (notes.length) h += '<section class="card soft" style="gap:8px">' + notes.map(function (n) { return '<p class="small" style="color:var(--pd)">' + n + '</p>'; }).join('') + '</section>';
    h += '<div class="section-head"><h2>Daten</h2></div><section class="card"><p class="xs muted">Alles bleibt auf diesem Gerät gespeichert. Über Export und Import kannst du Daten auf ein anderes Gerät übertragen.</p><div class="grid2"><button class="btn" data-a="export">Exportieren</button><button class="btn" data-a="import-toggle">Importieren</button></div>';
    if (ui.importOpen) h += '<form class="stack" data-f="import"><label class="field">Exportierte Daten einfügen<textarea id="imp" rows="5" placeholder="{&quot;v&quot;:1, ...}"></textarea></label><button class="btn sm primary" type="submit" style="align-self:flex-start">Daten übernehmen</button></form>';
    if (ui.confirm === 'reset') h += '<div class="card warm" style="gap:8px"><strong>Alle Daten löschen?</strong><p class="small" style="color:var(--ink2)">Challenges, Check-ins, Monatsziele und Zeiträume werden entfernt.</p><div class="row"><button class="btn sm danger" data-a="reset">Alles löschen</button><button class="btn sm" data-a="cancel">Abbrechen</button></div></div>';
    else h += '<button class="btn ghost danger" style="align-self:flex-start" data-a="ask" data-v="reset">Alle Daten zurücksetzen</button>';
    h += '</section><p class="xs muted" style="text-align:center">Ikigai Rituals · Prototyp</p>';
    return h;
  }

  // ---------- notifications ----------
  var onesignalReady = null;
  function initOneSignal() {
    if (!CFG.oneSignalAppId || onesignalReady) return onesignalReady;
    onesignalReady = new Promise(function (resolve, reject) {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      var sc = document.createElement('script');
      sc.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'; sc.defer = true;
      sc.onerror = function () { reject(new Error('OneSignal konnte nicht geladen werden')); };
      document.head.appendChild(sc);
      window.OneSignalDeferred.push(function (OneSignal) {
        OneSignal.init({ appId: CFG.oneSignalAppId, serviceWorkerPath: 'sw.js', serviceWorkerParam: { scope: './' }, allowLocalhostAsSecureOrigin: true }).then(function () { resolve(OneSignal); }, reject);
      });
    });
    return onesignalReady;
  }
  function syncReminderTags() {
    if (!CFG.oneSignalAppId) return;
    initOneSignal().then(function (OS) {
      var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      OS.User.addTags({ reminder: state.settings.reminder ? '1' : '0', reminder_time: state.settings.reminderTime, timezone: tz });
    }).catch(function () {});
  }
  function enableReminder() {
    if (!('Notification' in window)) { toast('Nicht unterstützt', 'Benachrichtigungen gehen hier nicht.'); return; }
    var ask = CFG.oneSignalAppId
      ? initOneSignal().then(function (OS) { return OS.Notifications.requestPermission().then(function () { return Notification.permission; }); })
      : Notification.requestPermission();
    Promise.resolve(ask).then(function (perm) {
      if (perm === 'granted') { state.settings.reminder = true; save(); syncReminderTags(); toast('Erinnerung aktiviert', CFG.oneSignalAppId ? 'Täglich um ' + state.settings.reminderTime + ' Uhr' : 'Push-Dienst noch nicht verbunden'); }
      else toast('Nicht erlaubt', 'Benachrichtigungen wurden nicht freigegeben.');
      render();
    }).catch(function (e) { toast('Fehler', String(e && e.message || e)); });
  }
  function testNotify() {
    if (!('Notification' in window)) { toast('Nicht unterstützt', 'Benachrichtigungen gehen hier nicht.'); return; }
    Notification.requestPermission().then(function (perm) {
      if (perm !== 'granted') { toast('Nicht erlaubt', 'Benachrichtigungen wurden nicht freigegeben.'); render(); return; }
      var st = streakInfo();
      var body = st.todaySafe ? 'Heute ist gesichert. ' + st.cur + ' Tage in Folge.' : 'Ein Check-in sichert deinen heutigen Tag.';
      var opts = { body: body, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'ikigai-test' };
      if (navigator.serviceWorker && navigator.serviceWorker.ready) navigator.serviceWorker.ready.then(function (reg) { return reg.showNotification('Ikigai Rituals', opts); }).catch(function () { new Notification('Ikigai Rituals', opts); });
      else new Notification('Ikigai Rituals', opts);
      render();
    });
  }

  // ---------- actions ----------
  function go(v) { ui.view = v; ui.confirm = null; ui.editDate = null; window.scrollTo(0, 0); render(); }
  function openShare(o) { ui.share = Object.assign({ tpl: 'tag', score: true, tags: true, extra: false, text: null, back: ui.view }, o || {}); go('teilen'); }
  function checkMilestone(before) {
    var t = today(), act = activeList(t), after = act.filter(function (c) { return doneToday(c, t); }).length;
    var wasSafe = before.safe, nowSafe = activeOn(t);
    if (!wasSafe && nowSafe) ui.popToday = true;
    if (act.length && after === act.length && before.done < act.length) { var st = streakInfo(); toast('Alle Rituale erledigt', 'Ein ruhiger, voller Tag. ' + st.cur + (st.cur === 1 ? ' Tag' : ' Tage') + ' in Folge.'); }
    else if (!wasSafe && nowSafe) { var st2 = streakInfo(); toast('Tag gesichert', 'Deine Streak steht bei ' + st2.cur + (st2.cur === 1 ? ' Tag.' : ' Tagen.')); }
  }
  function snapshot() { var t = today(), act = activeList(t); return { done: act.filter(function (c) { return doneToday(c, t); }).length, safe: activeOn(t) }; }

  var A = {
    go: function (v) { if (v === 'teilen') return openShare({}); if (v === 'detail' && !ui.detailId) v = 'heute'; go(v); },
    theme: function () { state.settings.theme = isDark() ? 'light' : 'dark'; applyTheme(); commit(); },
    'set-theme': function (v) { state.settings.theme = v; applyTheme(); commit(); },
    reminder: function () { if (state.settings.reminder) { state.settings.reminder = false; save(); syncReminderTags(); render(); } else enableReminder(); },
    'test-notify': testNotify,
    install: function () { if (!deferredPrompt) return; deferredPrompt.prompt(); deferredPrompt.userChoice.then(function () { deferredPrompt = null; render(); }); },
    'install-later': function () { state.settings.installHideUntil = Date.now() + 3 * 864e5; commit(); toast('Hinweis ausgeblendet', 'Er kommt in drei Tagen wieder, solange die App nicht installiert ist.'); },
    'ob-lib': function () { state.onboarded = true; save(); go('bibliothek'); },
    'ob-sample': function () { state = sampleData(); applyTheme(); save(); toast('Beispieldaten geladen', 'Du kannst alles echt abhaken und ändern.'); go('heute'); },
    toggle: function (id) { var b = snapshot(), ch = findCh(id), t = today(), was = isDone(ch, t); setCi(ch, t, { done: !was }); if (!was) ui.popId = id; save(); checkMilestone(b); render(); },
    item: function (id, el) { var b = snapshot(), ch = findCh(id), t = today(), c = ci(ch, t) || {}, it = Object.assign({}, c.items || {}), i = el.getAttribute('data-i'); it[i] = !it[i]; setCi(ch, t, { items: it }); save(); checkMilestone(b); render(); },
    'note-open': function (id) { ui.openNote[id] = true; render(); var el = document.getElementById('note-' + id); if (el) el.focus(); },
    'note-close': function (id) { ui.openNote[id] = false; render(); },
    'open-detail': function (id) { ui.detailId = id; ui.back = ui.view === 'monat' ? 'monat' : 'heute'; go('detail'); },
    'open-review': function (id) { ui.detailId = id; go('rueckblick'); },
    month: function (n) { ui.month = monthShift(ui.month, +n); render(); },
    'month-now': function () { ui.month = monthKey(today()); render(); },
    'plan-month': function () { var t = today(), k = ui.month; ui.planFor = k > monthKey(t) ? k + '-01' : null; go('bibliothek'); },
    goal: function (id) { var md = monthData(ui.month), was = md.goals.every(function (g) { return g.done; }); md.goals.forEach(function (g) { if (g.id === id) g.done = !g.done; }); save(); if (!was && md.goals.length && md.goals.every(function (g) { return g.done; })) toast('Alle Monatsziele erreicht', 'Was für ein Monat.'); render(); },
    'goal-del': function (id) { var md = monthData(ui.month); md.goals = md.goals.filter(function (g) { return g.id !== id; }); commit(); },
    'share-month': function () { openShare({ tpl: 'monat', month: ui.month, back: 'monat' }); },
    lib: function (v) { ui.lib = v; ui.q = ''; render(); },
    tpl: function (id) { var tp = TEMPLATES.filter(function (x) { return x.id === id; })[0]; ui.form = newForm(tp, ui.planFor || null); ui.planFor = null; go('setup'); },
    'tpl-next': function (id) { var tp = TEMPLATES.filter(function (x) { return x.id === id; })[0]; ui.form = newForm(tp, nextMonthStart(today())); go('setup'); },
    'new-custom': function () { ui.form = newForm(null, ui.planFor || null); ui.planFor = null; go('setup'); },
    'f-days': function (v) { ui.form.days = +v; render(); },
    'f-start': function (v) { ui.form.start = v; render(); },
    'f-type': function (v) { ui.form.type = v; render(); },
    'f-mode': function (v) { ui.form.mode = v; render(); },
    'f-color': function (v) { ui.form.color = v; render(); },
    'f-rule-del': function (i) { ui.form.rules.splice(+i, 1); render(); },
    'f-rule-add': function () { var el = document.getElementById('f-rule'); var v = el && el.value.trim(); if (v) { ui.form.rules.push(v); render(); var n = document.getElementById('f-rule'); if (n) n.focus(); } },
    day: function (ds) {
      var ch = findCh(ui.detailId);
      if (ch.type === 'jn' || ch.type === 'woche') { setCi(ch, ds, { done: !isDone(ch, ds) }); commit(); }
      else { ui.editDate = ui.editDate === ds ? null : ds; render(); }
    },
    'item-date': function (j) { var ch = findCh(ui.detailId), c = ci(ch, ui.editDate) || {}, it = Object.assign({}, c.items || {}); it[j] = !it[j]; setCi(ch, ui.editDate, { items: it }); commit(); },
    edit: function (id) { var ch = findCh(id); ui.form = { id: ch.id, name: ch.name, cat: ch.cat, type: ch.type, target: ch.target || '', unit: ch.unit || '', days: ch.days, start: ch.start, mode: ch.mode, rules: ch.rules.slice(), color: ch.color, fromTpl: null }; go('setup'); },
    ask: function (v) { ui.confirm = v; render(); },
    cancel: function () { ui.confirm = null; render(); },
    stop: function (id) { findCh(id).status = 'stopped'; ui.confirm = null; save(); go('rueckblick'); },
    delete: function (id) { state.challenges = state.challenges.filter(function (c) { return c.id !== id; }); delete state.checkins[id]; ui.confirm = null; save(); toast('Challenge gelöscht'); go('heute'); },
    restart: function (id) { var ch = findCh(id); ch.start = today(); state.checkins[id] = {}; commit(); toast('Neu gestartet', 'Ab heute läuft eine neue Runde.'); },
    again: function (id) { var ch = findCh(id); ui.form = { id: null, name: ch.name, cat: ch.cat, type: ch.type, target: ch.target || '', unit: ch.unit || '', days: ch.days, start: today(), mode: ch.mode, rules: ch.rules.slice(), color: ch.color, fromTpl: ch.name }; if (ch.status !== 'done') ch.status = 'done'; save(); go('setup'); },
    extend: function (id) { var ch = findCh(id); ch.days += 30; ch.status = 'active'; save(); toast('Um 30 Tage verlängert', 'Neues Ende am ' + fmt(chEnd(ch))); ui.detailId = id; go('detail'); },
    finish: function (id) { var ch = findCh(id); ch.status = 'done'; save(); toast(ch.name + ' abgeschlossen', 'Bleibt im Monat sichtbar.'); go('heute'); },
    'share-ch': function (id) { openShare({ tpl: 'challenge', chId: id, back: 'rueckblick' }); },
    'sh-tpl': function (v) { ui.share.tpl = v; ui.share.text = null; render(); },
    'sh-ch': function (v) { ui.share.chId = v; ui.share.text = null; render(); },
    'sh-opt': function (v) { ui.share[v] = !ui.share[v]; ui.share.text = null; render(); },
    copy: function () {
      var txt = ui.share.text || '', ta = document.getElementById('share-text');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast('Text kopiert'); }, function () { if (ta) { ta.focus(); ta.select(); } toast('Text markiert', 'Jetzt kopieren'); });
      else if (ta) { ta.focus(); ta.select(); toast('Text markiert', 'Jetzt kopieren'); }
    },
    'native-share': function () { if (navigator.share) navigator.share({ text: ui.share.text || '' }).catch(function () {}); },
    'period-form': function () { ui.periodForm = !ui.periodForm; render(); },
    'period-del': function (id) { state.periods = state.periods.filter(function (p) { return p.id !== id; }); commit(); },
    export: function () {
      var txt = JSON.stringify(state);
      if (navigator.share) { navigator.share({ title: 'Ikigai Rituals Daten', text: txt }).catch(function () {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast('Daten kopiert', 'In der Zwischenablage'); }, function () { toast('Kopieren nicht möglich'); });
    },
    'import-toggle': function () { ui.importOpen = !ui.importOpen; render(); },
    reset: function () { var th = state.settings.theme; state = blank(); state.settings.theme = th; ui.confirm = null; save(); toast('Alle Daten gelöscht'); go('heute'); }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-a]'); if (!el) return;
    var a = el.getAttribute('data-a'); if (!A[a]) return;
    e.preventDefault();
    A[a](el.getAttribute('data-v'), el);
  });

  var inputTimer = null;
  document.addEventListener('input', function (e) {
    var el = e.target, k = el.getAttribute('data-in'); if (!k) return;
    var v = el.value;
    if (k === 'f') {
      var key = el.getAttribute('data-k');
      ui.form[key] = (key === 'days' || key === 'target') ? (v === '' ? '' : +v) : v;
      if (key === 'days' || key === 'start') {
        var r = document.getElementById('f-range');
        if (r && ui.form.start && +ui.form.days > 0) r.textContent = 'Läuft vom ' + fmtY(ui.form.start) + ' bis ' + fmtY(addDays(ui.form.start, +ui.form.days - 1));
      }
      return;
    }
    if (k === 'q') {
      ui.q = v;
      var t = today(), m = parse(t).getMonth() + 1, q = v.trim().toLowerCase(), running = {};
      state.challenges.forEach(function (c) { var p = phase(c, t); if (p === 'active' || p === 'planned') running[c.name] = { p: p, id: c.id }; });
      var list = TEMPLATES.filter(function (x) { return q ? (x.name.toLowerCase().indexOf(q) >= 0 || x.cat.toLowerCase().indexOf(q) >= 0) : (ui.lib === 'jetzt' ? (x.season.indexOf(m) >= 0 || (x.season.length === 0 && ['writing', 'plank', 'junk'].indexOf(x.id) >= 0)) : x.cat === ui.lib); });
      document.getElementById('lib-results').innerHTML = libResults(list, running, q, ui.lib, m);
      return;
    }
    if (k === 'share') { ui.share.text = v; return; }
    if (k === 'note') setCi(findCh(el.getAttribute('data-v')), today(), { note: v });
    else if (k === 'focus' || k === 'why' || k === 'highlight' || k === 'learn') monthData(ui.month)[k] = v;
    else if (k === 'ch-learn') findCh(el.getAttribute('data-v')).learn = v;
    else if (k === 'tags') state.settings.tags = v;
    else if (k === 'rem-time') { state.settings.reminderTime = v; syncReminderTags(); }
    clearTimeout(inputTimer); inputTimer = setTimeout(save, 400);
  });

  document.addEventListener('submit', function (e) {
    var f = e.target, k = f.getAttribute('data-f'); if (!k) return;
    e.preventDefault();
    var t = today();
    if (k === 'log') {
      var b = snapshot(), ch = findCh(f.getAttribute('data-v')), inp = f.querySelector('input'), val = parseFloat(String(inp.value).replace(',', '.'));
      if (isNaN(val)) { inp.focus(); return; }
      var c = ci(ch, t) || {};
      setCi(ch, t, { value: ch.type === 'summe' ? Math.round(((+c.value || 0) + val) * 100) / 100 : val });
      save(); toast(ch.type === 'summe' ? val + ' ' + ch.unit + ' hinzugefügt' : 'Eingetragen'); checkMilestone(b); render();
    } else if (k === 'log-date') {
      var ch2 = findCh(ui.detailId), v2 = parseFloat(String(f.querySelector('input').value).replace(',', '.'));
      setCi(ch2, ui.editDate, { value: isNaN(v2) ? 0 : v2 }); ui.editDate = null; commit();
    } else if (k === 'goal') {
      var gi = f.querySelector('input'), txt = gi.value.trim(); if (!txt) return;
      monthData(ui.month).goals.push({ id: uid(), text: txt, done: false }); commit();
      var n = document.getElementById('goal-in'); if (n) n.focus();
    } else if (k === 'setup') {
      var fm = ui.form;
      if (!String(fm.name).trim()) { document.getElementById('f-name').focus(); return; }
      if (!(+fm.days > 0)) { document.getElementById('f-days').focus(); return; }
      var pending = document.getElementById('f-rule'); if (pending && pending.value.trim()) fm.rules.push(pending.value.trim());
      var data = { name: String(fm.name).trim(), cat: fm.cat, type: fm.type, target: +fm.target || 0, unit: fm.unit || '', days: +fm.days, start: fm.start || t, mode: fm.mode, rules: fm.rules, color: fm.color };
      if (fm.type === 'woche' && !data.target) data.target = 3;
      if (fm.type === 'summe' && !data.target) data.target = 1;
      if (fm.id) { var ex = findCh(fm.id); Object.keys(data).forEach(function (kk) { ex[kk] = data[kk]; }); if ((ex.status === 'stopped' || ex.status === 'done') && chEnd(ex) >= t) ex.status = 'active'; ui.detailId = ex.id; save(); toast('Gespeichert'); go('detail'); }
      else {
        data.id = uid(); data.status = 'active'; data.learn = ''; state.challenges.push(data); state.onboarded = true; save();
        if (data.start > t) { ui.month = monthKey(data.start); toast(data.name + ' geplant', 'Start am ' + fmt(data.start)); go('monat'); }
        else { toast(data.name + ' gestartet', 'Viel Erfolg an Tag 1.'); go('heute'); }
      }
    } else if (k === 'period') {
      var nm = document.getElementById('p-name').value.trim(), ps = document.getElementById('p-start').value, pe = document.getElementById('p-end').value;
      if (!nm || !ps || !pe || pe < ps) { toast('Bitte prüfen', 'Name sowie Start vor Ende angeben'); return; }
      state.periods.push({ id: uid(), name: nm, start: ps, end: pe }); ui.periodForm = false; commit();
    } else if (k === 'import') {
      try { var obj = JSON.parse(document.getElementById('imp').value); if (!obj || !Array.isArray(obj.challenges)) throw 0; state = normalize(obj); ui.importOpen = false; applyTheme(); save(); toast('Daten übernommen'); go('heute'); }
      catch (err) { toast('Das passt nicht', 'Das sieht nicht nach exportierten Daten aus.'); }
    }
  });

  // re-render when the day changes or the app comes back to the foreground
  var lastDay = today();
  document.addEventListener('visibilitychange', function () { if (!document.hidden && today() !== lastDay) { lastDay = today(); ui.month = monthKey(lastDay); render(); } });
  if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); var onMq = function () { if (state.settings.theme === 'system') render(); }; if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq); }

  // ---------- boot ----------
  var cached = load();
  if (cached) state = normalize(cached);
  var hash = (location.hash || '').replace('#', '');
  if (['heute', 'monat', 'bibliothek', 'profil'].indexOf(hash) >= 0) ui.view = hash;
  applyTheme();
  render();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {}); });
  }
  if (CFG.oneSignalAppId && state.settings.reminder) syncReminderTags();
})();
