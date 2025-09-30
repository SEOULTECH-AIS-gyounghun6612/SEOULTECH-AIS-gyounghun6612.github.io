/**
 * Markdown 파일을 불러와서 HTML로 변환한 후,
 * '.terminal__body' 영역에 내용을 삽입하는 함수
 * @param {string} markdownFile - 불러올 Markdown 파일의 경로
 * @param {object} [options] - 타이핑 효과 등을 위한 옵션
 */
function loadMarkdownContent(markdownFile, options = {}) {
    const mainContent = document.querySelector('.terminal__body');
    if (!mainContent) {
        console.error("'.terminal__body' 요소를 찾을 수 없습니다.");
        return;
    }

    const { typing = false, speed = 20, onComplete = null } = options;

    const finish = () => {
        const promptHTML = `<div class="terminal__input-prompt"><span class="text-prompt">keonghun@Dev_Log:</span><span class="text-dir">~</span><span class="text-command">$ </span></div>`;
        mainContent.insertAdjacentHTML('beforeend', promptHTML);
        if (onComplete) onComplete();
    };

    fetch(markdownFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('파일을 불러오는 데 실패했습니다.');
            }
            return response.text();
        })
        .then(markdownText => {
            const contentHtml = marked.parse(markdownText);
            if (typing) {
                const mode = (typeof typing === 'string') ? typing : 'char';
                const typeSpeed = (mode === 'line') ? (speed || 100) : (speed || 20);

                if (mode === 'line') {
                    typeWriterByLine(mainContent, contentHtml, typeSpeed, finish);
                } else {
                    typeWriter(mainContent, contentHtml, typeSpeed, finish);
                }
            } else {
                mainContent.innerHTML = contentHtml;
                finish();
            }
        })
        .catch(error => {
            console.error('콘텐츠 로딩 중 오류 발생:', error);
            mainContent.innerText = '페이지 내용을 불러오는 데 실패했습니다. 파일을 확인해 주세요.';
        });
}

/**
 * 파일 또는 디렉터리 접근 불가 에러 메시지를
 * '.terminal__body' 영역에 표시하는 함수
 * @param {string} targetName - 접근 불가한 파일 또는 디렉터리 이름
 * @param {object} [options] - 타이핑 효과 등을 위한 옵션
 */
function showAccessError(targetName, options = {}) {
    const mainContent = document.querySelector('.terminal__body');
    if (!mainContent) {
        console.error("'.terminal__body' 요소를 찾을 수 없습니다.");
        return;
    }

    const errorMessageHTML = `
<div>[FATAL] System integrity violation.</div>
<div>Error code: 0x0000007B (INACCESSIBLE_BOOT_DEVICE)</div>
<br>
<div>An error occurred while trying to access <span class="text-file">'${targetName}'</span>.</div>
<div>The file or directory is corrupted and unreadable.</div>
<br>
<div>fsck: I/O error while reading block checksum for inode 789123</div>
<div>dmesg: [   12.345678] Buffer I/O error on device sda1, logical block 123456</div>
<div>kernel: [   12.345680] lost page write due to I/O error on sda1</div>
<br>
<div style="border-top: 1px solid #555; margin-top: 10px; margin-bottom: 10px;"></div>
<div>ACCESS DENIED: '<span class="text-file">${targetName}</span>' cannot be accessed.</div>
<div>Please restore from a backup or reformat the drive.</div>
<div style="border-top: 1px solid #555; margin-top: 10px; margin-bottom: 10px;"></div>
    `;

    const { typing = false, speed = 20, onComplete = null } = options;

    const finish = () => {
        const promptHTML = `<div class="terminal__input-prompt"><span class="text-prompt">keonghun@Dev_Log:</span><span class="text-dir">~</span><span class="text-command">$ </span></div>`;
        mainContent.insertAdjacentHTML('beforeend', promptHTML);
        if (onComplete) onComplete();
    };

    if (typing) {
        const mode = (typeof typing === 'string') ? typing : 'char';
        const typeSpeed = (mode === 'line') ? (speed || 100) : (speed || 20);

        if (mode === 'line') {
            typeWriterByLine(mainContent, errorMessageHTML, typeSpeed, finish);
        } else {
            typeWriter(mainContent, errorMessageHTML, typeSpeed, finish);
        }
    } else {
        mainContent.innerHTML = errorMessageHTML;
        finish();
    }
}

/**
 * HTML 콘텐츠에 한 글자씩 타이핑 효과를 적용하는 유틸리티 함수
 * @param {HTMLElement} element - 효과를 적용할 대상 DOM 요소
 * @param {string} htmlString - 타이핑할 HTML 문자열
 * @param {number} speed - 타이핑 속도 (ms)
 * @param {function} [callback] - 타이핑 완료 후 실행될 콜백 함수
 */
function typeWriter(element, htmlString, speed, callback) {
    element.innerHTML = ''; // Clear the target element
    const sourceContainer = document.createElement('div');
    sourceContainer.innerHTML = htmlString.trim();

    async function typeNodes(source, target) {
        for (const node of Array.from(source.childNodes)) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                for (const char of text) {
                    target.append(char);
                    await new Promise(res => setTimeout(res, speed));
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = node.cloneNode(false);
                target.appendChild(clone);
                await typeNodes(node, clone);
            } else {
                target.appendChild(node.cloneNode(true));
            }
        }
    }

    typeNodes(sourceContainer, element).then(() => {
        if (callback) callback();
    });
}

/**
 * HTML 콘텐츠를 한 줄씩 출력하는 효과를 적용하는 함수
 * @param {HTMLElement} element - 효과를 적용할 대상 DOM 요소
 * @param {string} htmlString - 출력할 HTML 문자열
 * @param {number} speed - 한 줄이 나타나는 속도 (ms)
 * @param {function} [callback] - 완료 후 실행될 콜백 함수
 */
async function typeWriterByLine(element, htmlString, speed, callback) {
    element.innerHTML = ''; // Clear the element
    const sourceContainer = document.createElement('div');
    sourceContainer.innerHTML = htmlString.trim();
    const nodes = Array.from(sourceContainer.childNodes);

    for (const node of nodes) {
        element.appendChild(node);
        await new Promise(res => setTimeout(res, speed));
    }

    if (callback) {
        callback();
    }
}