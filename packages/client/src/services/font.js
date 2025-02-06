import apiConfig from './apiConfig';
import Ajax from '../utils/ajax';

const { font, file } = apiConfig;

export async function getList(params) {
  return Ajax.get(font.getList, params);
}

export async function uploadMusic(params) {
  return Ajax.post(file.uploadFont, params);
}
