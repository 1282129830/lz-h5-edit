import {
  STYLE_RENDER_TYPE_COLOR, STYLE_RENDER_TYPE_CONTENT_EDIT_DIV,
  STYLE_RENDER_TYPE_SELECT, STYLE_VALUE_TYPE_NUMBER,
  STYLE_RENDER_TYPE_INPUT,
} from '../core/constants';

const config = [
  {
    label: '文本内容',
    key: 'text',
    initValue: '双击输入文本',
    renderType: STYLE_RENDER_TYPE_CONTENT_EDIT_DIV,
  },
  {
    label: '打字速度',
    key: 'typeSpeed',
    initValue: '50',
    renderType: STYLE_RENDER_TYPE_SELECT,
    props: {
      options: [
        {
          key: '10',
          text: '极快',
        },
        {
          key: '30',
          text: '快速',
        },
        {
          key: '50',
          text: '正常',
        },
        {
          key: '70',
          text: '慢速',
        },
        {
          key: '100',
          text: '极慢',
        }
      ],
    },
  },
  {
    label: '延迟(秒)',
    key: 'startDelay',
    initValue: '0',
    renderType: STYLE_RENDER_TYPE_SELECT,
    props: {
      options: [
        { key: '0', text: '不延迟' },
        { key: '1000', text: '1秒' },
        { key: '2000', text: '2秒' },
        { key: '3000', text: '3秒' },
        { key: '4000', text: '4秒' },
        { key: '5000', text: '5秒' },
      ],
    },
  },
  {
    label: '光标样式',
    key: 'cursorChar',
    initValue: '|',
    renderType: STYLE_RENDER_TYPE_INPUT,
    props: {
      placeholder: '请输入光标样式字符',
      maxLength: 1  // 限制只能输入一个字符
    },
  },
  {
    label: '字号',
    key: 'fontSize',
    initValue: 12,
    renderType: STYLE_RENDER_TYPE_SELECT,
    valueType: STYLE_VALUE_TYPE_NUMBER,
    props: {
      options: [
        {
          key: 12,
          text: '12',
        },
        {
          key: 14,
          text: '14',
        },
        {
          key: 16,
          text: '16',
        },
        {
          key: 18,
          text: '18',
        },
        {
          key: 20,
          text: '20',
        },
        {
          key: 24,
          text: '24',
        },
        {
          key: 48,
          text: '48',
        },
      ],
    },
  },
  {
    label: '文字颜色',
    key: 'color',
    initValue: '#000000',
    renderType: STYLE_RENDER_TYPE_COLOR,
  },
  {
    label: '背景颜色',
    key: 'bgColor',
    initValue: '',
    renderType: STYLE_RENDER_TYPE_COLOR,
  },
];

export default config;
