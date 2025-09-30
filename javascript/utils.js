/**
 * Markdown 파일을 불러와서 HTML로 변환한 후,
 * '.terminal__body' 영역에 내용을 삽입하는 함수
 * @param {string} markdownFile - 불러올 Markdown 파일의 경로
 */
function loadContent(markdownFile) {
    // 1. '.terminal__body' 요소를 찾습니다.
    const mainContent = document.querySelector('.terminal__body');
    if (!mainContent) {
        console.error("'.terminal__body' 요소를 찾을 수 없습니다.");
        return;
    }

    // 2. fetch API를 사용해 Markdown 파일을 불러옵니다.
    fetch(markdownFile)
        .then(response => {
            // 응답이 성공적인지 확인합니다.
            if (!response.ok) {
                throw new Error('파일을 불러오는 데 실패했습니다.');
            }
            return response.text();
        })
        .then(markdownText => {
            // 3. marked.js를 사용해 Markdown 텍스트를 HTML로 변환하여 삽입합니다.
            mainContent.innerHTML = marked.parse(markdownText);
        })
        .catch(error => {
            // 4. 오류가 발생하면 콘솔과 화면에 메시지를 표시합니다.
            console.error('콘텐츠 로딩 중 오류 발생:', error);
            mainContent.innerText = '페이지 내용을 불러오는 데 실패했습니다. 파일을 확인해 주세요.';
        });
}