import React, { useEffect, useState } from 'react';
import LzDesign from '@lzshow/design';
import { message } from 'antd';
import {
  getPictureList, cropImage, save, getMyPictureList,
} from '../../services/create';

import {
  saveOrUpdate, getDetail
} from '../../services/opus';
import { getList as getMusicList } from '../../services/music';
import { getList as getFontList } from '../../services/font';
import apiConfig, { getUrlPrefix } from '../../services/apiConfig';
import WithUserAuth from '../../components/WithUserAuth'

function Create(props) {
  const token = localStorage.getItem('token');
  // 库数据
  const libs = {
    psd: {
      upLoadProps: {
        name: 'upFile',
        accept: 'file',
        // showUploadList: false,
        action: `${getUrlPrefix()}${apiConfig.file.parsePsd}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'clientid': '8ae3bc85-ea75-4b78-9ac3-a2cafad8e7d1',
        }
      },
    },
    // 图片库
    picture: {
      initData: [
        // 'http://show.lzuntalented.cn/server/static/pic/1589697724000-oev0vndl370c-1.jpg',
      ],
      fetchPromise: getPictureList,
      fetchMyList: getMyPictureList,
      upLoadProps: {
        name: 'upFile',
        accept: 'audio/*,.mp3,.wav,.ogg,.m4a,.aac',
        action: `${getUrlPrefix()}${apiConfig.file.uploadMusic}`,
        showUploadList: false,
        headers: {
          'Authorization': `Bearer ${token}`,
          'clientid': '8ae3bc85-ea75-4b78-9ac3-a2cafad8e7d1',
        }
      },
      cropImage,
    },
    // 音乐库
    music: {
      fetchMusicList: getMusicList,
      initData: [
        {
          name: 'John Dreamer - Rise',
          url: 'http://www.lzuntalented.cn/assets/music/rise.mp3',
        },
        {
          name: '告白之夜',
          url: 'http://www.lzuntalented.cn/assets/music/sweet.mp3',
        },
        {
          name: 'Jingle Bells(圣诞)',
          url: 'http://www.lzuntalented.cn/assets/music/chirmis.m4a',
        },
        {
          name: '大哥 - 迷人的危险 (女生烟嗓版)',
          url: 'http://www.lzuntalented.cn/assets/music/mirendeweixian.mp3',
        },
        {
          name: '兔子牙 - 大田後生仔 (MV版片段)',
          url: 'http://www.lzuntalented.cn/assets/music/datianhoushengzai.mp3',
        },
        {
          name: '兔子牙 - 悬溺 (片段)',
          url: 'http://www.lzuntalented.cn/assets/music/xuanni.mp3',
        },
        {
          name: '婚礼进行曲',
          url: 'http://www.lzuntalented.cn/assets/music/hljinxingqu.mp3',
        },
        {
          name: '少年',
          url: 'http://www.lzuntalented.cn/assets/music/shaonian.mp3'
        },
        {
          name: '平凡之路',
          url: 'http://www.lzuntalented.cn/assets/music/pingfanzhilu.mp3'
        }
      ],
    },
    font: {
      fetchFontList: getFontList,
      initData: [
        {
          key: 'tianxinyuanyue',
          name: '甜心中文',
          text: '文本示例',
          example: 'http://localhost:9999/assets/example/tianxinyuanyue.ttf',
          url: 'http://localhost:9999/assets/fonts/tianxinyuanyue.ttf',
        },
        {
          key: 'lanlanlanlandan',
          name: '【蛋蛋】懒懒懒懒蛋',
          text: '文本示例',
          example: 'http://localhost:9999/assets/example/lanlanlanlandan.ttf',
          url: 'http://localhost:9999/assets/fonts/lanlanlanlandan.ttf',
        },
        {
          key: 'shanmang1',
          name: '【阿苗】闪吗1',
          text: '文本示例',
          example: 'http://localhost:9999/assets/example/shanmang1.ttf',
          url: 'http://localhost:9999/assets/fonts/shanmang1.ttf',
        },
        {
          key: 'wencangshufang',
          name: '问藏书房',
          text: '文本示例',
          example: 'http://localhost:9999/assets/example/wencangshufang.ttf',
          url: 'http://localhost:9999/assets/fonts/wencangshufang.ttf',
        },
        {
          key: 'Daizen',
          name: 'Daizen',
          text: '文本示例',
          example: 'https://cdn.xiaodingdang1.com/2025/01/20/3909d85519b6412ebdf0c99ffaf63192.ttf',
          url: 'https://cdn.xiaodingdang1.com/2025/01/20/3909d85519b6412ebdf0c99ffaf63192.ttf',
        },
        {
          key: 'Gabriola',
          name: 'Gabriola',
          text: '文本示例',
          example: 'https://cdn.xiaodingdang1.com/2025/01/20/3909d85519b6412ebdf0c99ffaf63192.ttf',
          url: 'https://cdn.xiaodingdang1.com/2025/01/20/3909d85519b6412ebdf0c99ffaf63192.ttf',
        }
      ],
    },
  };

  const onPublish = (data, title) => {

    const params = { content: data, title };
    if (id && id > 0) {
      params.id = id;
    }
    saveOrUpdate(params).then(() => {
      window.location.hash = '#/ucenter/info';
      message.success('保存成功');
    });
  };

  const [data, setData] = useState(null);

  const { params } = props;
  const id = params && +params.id;
  useEffect(() => {
    if (id && id > 0) {
      getDetail({ id }).then((resp) => {
        const { content: res } = resp;
        setData(JSON.parse(res));
      });
    }
  }, []);

  return (
    <LzDesign
      onPublish={onPublish}
      libs={libs}
      data={data}
      onItemClick={() => {
        console.log('onItemClick')
      }}
    />
  );
}
export default WithUserAuth(Create, {
  cb: () => {
    message.error('请先登录');
    window.location.hash = 'login';
  }
})

// const mapStateToProps = (store) => {
//   console.log(store)
//   return store;
// };

// const mapDispatchToProps = dispatch => ({ dispatch });
// export default connect(mapStateToProps, mapDispatchToProps)(Create);