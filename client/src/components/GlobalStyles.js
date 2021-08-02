import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
      v2.0 | 20110126
      License: none (public domain)
  */
  
  :root {
    --background-color: rgba(50,50,50,1);
    --background-darken: rgba(0, 0, 0, 0.2);
    --background-lighten: rgba(255,255,255,0.1);
    --main-color: white;
    --main-font: 'Poppins', sans-serif;
    --second-font: 'Roboto', sans-serif;
    --default-card: rgba(200,200,200,0.2);
    --Colorless: rgba(200,200,200,0.2);
    --Darkness: rgba(0,0,100,0.2);
    --Dragon: rgba(200,175,50,0.2);
    --Fairy: rgba(200,75,130, 0.2);
    --Fighting: rgba(200,150,100,0.2);
    --Fire: rgba(220,75,45,0.2);
    --Grass: rgba(170,200,100,0.2);
    --Lightning: rgba(240,210,75,0.2);
    --Metal: rgba(100,100,120,0.2);
    --Psychic: rgba(160,70,130,0.2);
    --Water: rgba(60,140,200,0.2);
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1.5;
    background-color: var(--background-color);
    color: var(--main-color);
    font-family: var(--main-font);
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
