export function getUploadProps() {
  const token = localStorage.getItem('token');
  const props = {
    name: 'upFile',
    accept: 'image/*',
    action: `${getUrlPrefix()}${apiConfig.file.upload}`,
    showUploadList: false,
    headers: {
      'Authorization': `Bearer ${token}`,
      'clientid': '8ae3bc85-ea75-4b78-9ac3-a2cafad8e7d1',
    }
    // withCredentials: true,
  };
  return props;
}

export default () => {};
