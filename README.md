# 槿墨H5 - 专业级可视化场景编辑器

![产品截图](http://www.lzuntalented.cn/img/home-log.png)

## 项目背景
一款专为设计师打造的H5模板制作工具，提供简洁高效的创作平台。支持设计师创建动画模板，用户可进行二次创作（修改音乐/文字/图片/布局），最终生成可传播的H5作品。

## 功能架构

设计师端(PC) 用户端(Mobile)
||
├─ 模板设计 ├─ 模板中心
├─ 动画配置 ├─ 多页组合
├─ 素材管理 ├─ 元素编辑
└─ 模板发布 └─ 作品分享

## 核心特性
### 设计师能力
- 可视化拖拽布局系统（支持组合元素/辅助线对齐 `packages/design/src/components/AideLine`）
- 元素动画序列配置（入场/强调/退场动画 `packages/design/src/components/Setting/components/animate`）
- 多图层管理（组合/排序/层级调整 `packages/design/src/store/reduce.js`）
- PSD文件解析导入（`packages/client/src/pages/create`）
- 背景音乐管理系统（内置节日主题曲库 `packages/constants/config.js`）

### 用户创作能力
- 模板混搭（多页自由组合 `packages/design/src/components/PageManage`）
- 元素自由编辑系统：
  - 文本：字体/颜色/动画（`packages/mobile/src/pages/editor/index.js`）
  - 图片：裁剪/替换/滤镜（`packages/mobile/src/pages/editor/components/ImageEditor`）
  - 音乐：在线曲库/音量调节（`packages/utils/src/Music.js`）
- 实时预览系统（`packages/mobile/src/pages/editor/components/Preview`）
- 微信分享集成（带数据统计功能 `packages/mobile/src/pages/editor/index.js#handleShare`）

## 技术栈
| 领域           | 技术方案                          |
|----------------|----------------------------------|
| 核心框架       | React 16 + Redux                 |
| 动画引擎       | animate.css + 自定义动画协议     |
| 可视化交互     | Ant Design + Draggable.js        |
| 工程化         | Lerna + Webpack 4                |
| 移动端适配     | Viewport方案 + 手势库            |

## 快速开始

```bash
# node 版本16+
# npm可使用国内镜像
npm config set registry https://registry.npmmirror.com/
# 首先安装lerna
npm i lerna -g
# 安装依赖
npm run install
# 构建包
npm run build
# 开发
npm start
# 浏览网站
http://localhost:9999/client.html
# 调试核心编辑器
http://localhost:9999/design.html
# 调试作品
http://localhost:9999/opus.html?id=作品编号

// 构建
npm run webpack

// 新增物料
npm run add
```

### 功能

* 编辑器功能
    - [x] 拖拽
    - [x] 缩放
    - [x] 旋转
    - [x] 动画
    - [x] 撤销
    - [x] 重做
    - [x] 组合元素
    - [x] 页面管理
    - [x] 层级管理
    - [x] 辅助线显示

* 物料
    - [x] 文本
    - [x] 图片
    - [x] QQ语言通话
    - [x] 背景
    - [x] 地图
    - [x] 音效
    - [x] 模板
    - [x] 视频
    - [x] 艺术字

* 示例
    - [x] 示例-端午节
    - [x] 示例-儿童节
    - [x] 示例-高考加油
    - [x] 示例-1024
    - [x] 示例-双十一
    - [x] 示例-感恩节

* 用户模块
    - [x] 登录
    - [x] 注册
    - [x] 作品列表
    - [x] PV数据统计
    - [x] 表单数据统计
### 如何新增物料
* 1.在src/resource目录下新建组件
``` js
// index.js 文件的导出需要如下格式
export default {
  edit: 编辑态组件,
  render: 渲染太组件,
  style: 属性面板配置文件（普通对象）,
  size: { height: 物料高度 },
  name: 物料名称(层级管理器显示的名字),
};

```
* 2.在src/components.js文件中使用 registerComponent 注册物料
``` js
// components.js 新增如下调用
import 物料组件 from '../resource/物料组件';

registerComponent(自定义组件唯一标识字符串, 物料组件);
```

### 后续规划
> 集中物料仓库建设
* 字体库建设
* 形状库建设
* 艺术字建设（对文字阴影的绘制）
* 背景图片选择及裁剪
* 图层名称支持自定义
* 支持组动画序列播放
* 作品分享操作
* 翻页动画支持多种方式

> 示例模板规划
* 圣诞节模板
* 元旦节模板
* 2019总结模板


## 贡献指南
欢迎通过以下方式参与：
1. 扩展动画类型（兼容animate.css规范）
2. 开发形状组件（SVG路径解析）
3. 增强PSD解析能力（`packages/client/src/pages/create`）
4. 完善测试用例

## 示例模板
| 模板名称       | 特色功能                          | 代码位置                          |
|---------------|----------------------------------|----------------------------------|
| 端午节        | 龙舟动画 + 粽子元素组合            | packages/constants/config.js     |
| 双十一        | 红包雨效果 + 商品3D旋转            | packages/design/demo/index.js    |
| 企业招聘      | 简历表单 + 地图定位                | packages/resource/FiveTwoLove    |

## 许可证
[MIT License] © 2024 槿墨H5团队