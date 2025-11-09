// Утилита для добавления fontFamily ко всем текстовым стилям
// Используется для массового обновления стилей

export const addFontFamilyToStyle = (style: any, fontFamily: string) => {
  if (style && typeof style === 'object') {
    return {
      ...style,
      fontFamily,
    };
  }
  return style;
};

