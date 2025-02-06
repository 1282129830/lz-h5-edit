import apiConfig from './apiConfig';
import Ajax from '../utils/ajax';

const { music, file } = apiConfig;

export async function getList(params) {
  return Ajax.get(music.getList, params);
}

export async function uploadMusic(params) {
  return Ajax.post(file.uploadMusic, params);
}
