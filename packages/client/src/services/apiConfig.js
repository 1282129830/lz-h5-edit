import { isString } from '@lzshow/utils';

export default {
  create: {
    getList: '/index/getList',
    add: '/index/add',
    getDetail: '/index/getDetail',
  },
  file: {
    getList: '/file/getList',
    upload: '/file/upload',
    cropImage: '/file/cropImage',
    parsePsd: '/file/parsePsd',
    getMyList: '/file/getMyList',
    uploadMusic: '/file/uploadMusic',
  },
  // 商城相关
  mall: {
    getList: '/tmp/getList',
    addTemplate: '/tmp/add',
    removeTemplate: '/tmp/remove',
  },
  user: {
    register: '/user/register',
    login: '/user/login',
    info: '/user/info',
    logout: '/user/logout',
  },
  template: {
    getMyList: '/template/getMyList',
  },
  log: {
    getList: '/log/getList',
  },
  form: {
    getList: '/form/getList',
  },
  activity: {
    getList: '/activity/getList',
  },
  opus: {
    getList: '/opus/getList',
    getDetail: '/opus/getDetail',
    saveOrUpdate: '/opus/saveOrUpdate',
    remove: '/opus/remove',
  },
  music: {
    getList: '/music/getList',
    uploadMusic: '/music/uploadMusic',
  },
  font: {
    getList: '/font/getList',
    uploadFont: '/font/uploadFont',
  },
};

export function isDaily() {
  if (window.location.host.indexOf('localhost') > -1) {
    return true;
  }
  if (window.location.host.indexOf('h5.lz.com') > -1) {
    return 'http://h5.lz.com';
  }
  return false;
}

export function getDomain() {
  let result = 'https://h5.xiaodingdang1.com';
  const dailyHost = isDaily();
  if (isString(dailyHost)) {
    result = 'http://h5.lz.com';
  } else if (dailyHost) {
    result = '';
  }
  return result;
}

export function getUrlPrefix() {
  const doamin = getDomain();
  const urlPrefix = `${doamin}/server`;
  return urlPrefix;
}
