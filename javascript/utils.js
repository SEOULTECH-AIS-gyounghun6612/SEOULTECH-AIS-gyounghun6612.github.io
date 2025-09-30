/**
 * Markdown 파일을 불러와서 HTML로 변환한 후,
 * '.terminal__body' 영역에 내용을 삽입하는 함수
 * @param {string} markdownFile - 불러올 Markdown 파일의 경로
 */
function loadMdContent(markdownFile) {
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

/**
 * 파일 또는 디렉터리 접근 불가 에러 메시지를
 * '.terminal__body' 영역에 표시하는 함수
 * @param {string} targetName - 접근 불가한 파일 또는 디렉터리 이름
 */
function showAccessError(targetName) {
    const mainContent = document.querySelector('.terminal__body');
    if (!mainContent) {
        console.error("'.terminal__body' 요소를 찾을 수 없습니다.");
        return;
    }

    const errorMessageHTML = `
<pre style="white-space: pre-wrap; word-wrap: break-word; color: #f2f2f2;">
[FATAL] System integrity violation.
Error code: 0x0000007B (INACCESSIBLE_BOOT_DEVICE)

An error occurred while trying to access <span class="text-file">'${targetName}'</span>.
The file or directory is corrupted and unreadable.

fsck: I/O error while reading block checksum for inode 789123
dmesg: [   12.345678] Buffer I/O error on device sda1, logical block 123456
kernel: [   12.345680] lost page write due to I/O error on sda1

--------------------------------------------------
ACCESS DENIED: '${targetName}' cannot be accessed.
Please restore from a backup or reformat the drive.
--------------------------------------------------
</pre>
    `;

    mainContent.innerHTML = errorMessageHTML;
}
