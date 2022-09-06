export function copyURL() {
  const url: string = window.document.location.href
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = url
  textarea.select()
  textarea.setSelectionRange(0, 99999)  // 모바일 브라우저(ios)에서의 동작을 위한 추가코드
  document.execCommand('copy')
  textarea.setSelectionRange(0, 0)      // 모바일 브라우저(ios)에서의 동작을 위한 추가코드
  document.body.removeChild(textarea)
  alert('URL이 복사되었습니다.')
}

// execCommand가 아닌 Clipboard API를 이용한 방식 ↓ (execCommand의 대체 방식이라고 함)
// (Clipboard API는 위에서 언급한 것처럼 Safari 13.1 버전부터 https 환경에서만 지원되기 때문에 인증서가 설치되지 않은 사이트의 경우 사용하기 적합하지 않을 수도 있습니다.)
// export function copyURL() {
//   const url: string = window.document.location.href
//   navigator.clipboard.writeText(url)
//     .then(() => {
//       alert('URL이 복사되었습니다.')
//     })
//     .catch((err) => {
//       alert('error!')
//       console.log('error : ', err)
//     })
//   alert('URL이 복사되었습니다.')
// }