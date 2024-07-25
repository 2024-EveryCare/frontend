export const parseXML = (xmlString: string) => {
  return xmlString
    .replace(/<\/?DOC[^>]*>/g, '')
    .replace(/<\/?SECTION[^>]*>/g, '')
    .replace(
      /<ARTICLE title="([^"]*)">/g,
      '<strong class="font-bold">$1</strong>',
    )
    .replace(/<\/ARTICLE>/g, '')
    .replace(/<\/?PARAGRAPH[^>]*>/g, '')
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/([^>])(\d)\./g, '$1\n$2.') // 숫자 앞에 공백 줄 추가, ARTICLE 제목 앞에는 추가하지 않음
    .replace(/\n\n/g, '\n'); // 추가된 공백 제거
};

// 추가된 공백을 제거하고 번호 사이의 공백을 없애기 위해 formatPrecautions 함수 수정
export const formatPrecautions = (data: string) => {
  return data.replace(/(\d\))/g, '\n$1'); // 각 항목 번호 앞에 줄바꿈 추가
};
