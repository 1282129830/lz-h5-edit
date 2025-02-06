export const convertPcToMobile = (pcTemplate) => {
    return {
      ...pcTemplate,
      elements: pcTemplate.elements
        .filter(element => element.mobileEditable) // 过滤可编辑元素
        .map(element => ({
          ...element,
          position: adjustPosition(element.position), // 位置适配
          fontSize: element.fontSize * 0.8, // 字号调整
          scale: 1 // 重置缩放比例
        }))
    };
  };