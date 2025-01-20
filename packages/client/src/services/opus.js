import apiConfig from './apiConfig';
import Ajax from '../utils/ajax';

const { opus } = apiConfig;

export async function getList(params) {
  return Ajax.get(opus.getList, params);
}

export async function saveOrUpdate(params) {
  return Ajax.post(opus.saveOrUpdate, params);
}

export async function getDetail(params) {
  return Ajax.get(opus.getDetail, params);
}

export async function getPictureList(params) {
  return Ajax.get(file.getList, params);
}

export async function uploadPicture(params) {
  return Ajax.get(file.upload, params);
}

export async function cropImage(params) {
  return Ajax.post(file.cropImage, params);
}

export async function getMyPictureList(params) {
  return Ajax.get(file.getMyList, params);
}
