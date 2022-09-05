//import { pokemon1 } from './bases/02-objects';
//import { charmander } from './bases/04-injection';
//import { charmander } from './bases/05-decorators';
import { charmander } from './bases/06-decorators2';
import './style.css'
//import typescriptLogo from './typescript.svg'
//import {name, age} from './bases/01-types';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello ${charmander.name}</h1>

  </div>
`;

