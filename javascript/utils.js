/**
 * 사용자 정의 marked 렌더러를 생성하는 팩토리 함수입니다.
 * @param {Object.<string, function>} overrides - 오버라이드할 렌더러 메서드.
 *   - 키: 렌더러 메서드 이름 (예: 'table', 'heading')
 *   - 값: 해당 메서드를 대체할 새로운 함수
 * @returns {marked.Renderer} 커스텀 렌더러 인스턴스
 */
function createCustomRenderer(overrides) {
    const renderer = new marked.Renderer();
    // 제공된 모든 메서드를 오버라이드합니다.
    for (const method in overrides) {
        if (Object.hasOwnProperty.call(overrides, method) && typeof renderer[method] === 'function') {
            renderer[method] = overrides[method];
        }
    }
    return renderer;
}

/**
 * layoutType에 따라 렌더링 설정을 반환합니다.
 * @param {string} [layoutType='default'] - 가져올 설정의 레이아웃 타입
 * @returns {{targetSelector: string, rendererOverrides: (Object|null)}}
 */
function getMarkdownLayoutSettings(layoutType = 'default') {
    const settings = {
        default: {
            targetSelector: '.terminal__body',
            rendererOverrides: null
        },
        publications: {
            targetSelector: '.terminal__body',
            // 렌더러를 동적으로 생성하기 위한 오버라이드 규칙
            rendererOverrides: {
                table: (token) => {
                    // marked v5+에서는 렌더러 함수가 토큰 객체를 인자로 받습니다.
                    // 이전 버전의 (header, body) 방식과 다릅니다.
                    // token.header는 셀 토큰의 배열입니다.
                    const header = `<tr>${token.header.map(cell => `<th>${cell.text}</th>`).join('')}</tr>`;

                    // token.rows는 각 행(row)에 대한 셀 토큰들의 배열입니다.
                    const body = token.rows.map(row =>
                        `<tr>${row.map(cell => `<td>${cell.text}</td>`).join('')}</tr>`
                    ).join('');

                    return `<div class="table-publication-list">
                                <table>
                                    <thead>${header}</thead>
                                    <tbody>${body}</tbody>
                                </table>
                            </div>`;
                }
            }
        }
    };

    return settings[layoutType] || settings.default;
}

/**
 * Markdown 파일을 비동기적으로 불러와 HTML로 변환 후, 지정된 요소에 내용을 삽입합니다.
 * 타이핑 효과 및 조건부 레이아웃 렌더링을 지원합니다.
 *
 * @param {string} markdownUrl - 불러올 Markdown 파일의 URL
 * @param {object} [options] - 렌더링 옵션 객체
 * @param {string} [options.layoutType='default'] - 적용할 레이아웃 타입 ('default' 또는 'publications')
 * @param {string} [options.typingMode='none'] - 타이핑 효과 모드 ('none', 'char', 'line')
 * @param {number} [options.speed=20] - 타이핑 속도 (char 모드는 ms, line 모드는 줄당 ms)
 * @param {function} [options.onComplete=null] - 렌더링 완료 후 실행될 콜백 함수
 */
async function loadMarkdownContent(markdownUrl, options = {}) {
    // 옵션 객체를 구조 분해하여 기본값 할당
    const {
        layoutType = 'default',
        typingMode = 'none',
        speed = 20,
        onComplete = null
    } = options;

    // layoutType에 따라 적절한 설정 가져오기
    const { targetSelector, rendererOverrides } = getMarkdownLayoutSettings(layoutType);

    const mainContent = document.querySelector(targetSelector);
    if (!mainContent) {
        console.error(`'${targetSelector}' 요소를 찾을 수 없습니다.`);
        return;
    }

    // 렌더링 완료 후 실행될 공통 함수
    const finishMarkdownRendering = () => {
        // 터미널 프롬프트 추가
        const promptHTML = `<div class="terminal__input-prompt"><span class="text-prompt">keonghun@Dev_Log:</span><span class="text-dir">~</span><span class="text-command">$ </span></div>`;
        mainContent.insertAdjacentHTML('beforeend', promptHTML);

        // 완료 콜백이 있으면 실행
        if (onComplete) {
            onComplete();
        }
    };

    try {
        const response = await fetch(markdownUrl);
        if (!response.ok) {
            throw new Error('파일을 불러오는 데 실패했습니다.');
        }
        const markdownText = await response.text();

        // 1. layout 설정에 따라 Markdown 파싱
        const markedOptions = {};
        if (rendererOverrides) {
            markedOptions.renderer = createCustomRenderer(rendererOverrides);
        }
        const contentHtml = marked.parse(markdownText, markedOptions);

        // 2. typingMode에 따라 렌더링 방식 결정
        if (typingMode === 'char') {
            typeWriter(mainContent, contentHtml, speed, finishMarkdownRendering);
        } else if (typingMode === 'line') {
            typeWriterByLine(mainContent, contentHtml, speed, finishMarkdownRendering);
        } else { // 'none' 또는 정의되지 않은 경우
            mainContent.innerHTML = contentHtml;
            finishMarkdownRendering();
        }

    } catch (error) {
        console.error('콘텐츠 로딩 중 오류 발생:', error);
        mainContent.innerText = '페이지 내용을 불러오는 데 실패했습니다. 파일을 확인해 주세요.';
    }
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