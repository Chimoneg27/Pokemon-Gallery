// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import './style.css';
import instagramBrands from './assets/instagram-brands.svg';

function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  return element;
}

const imgElement = document.createElement('img');
imgElement.src = instagramBrands;
imgElement.classList.add('icon1');
document.body.appendChild(imgElement);

document.body.appendChild(component());