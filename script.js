const config = {
    typeSpeed: 30,
    initialDialogs: [
        "Bună, dragă! ❤️",
        "Am ceva foarte special să-ți spun ... ceva ce simt din adâncul sufletului meu.",
        "Ți-am scris o scrisoare de dragoste nu doar cuvinte, ci cu toată emoția, dorința și pasiunea pe care le simt pentru tine. Fiecare literă e scrisă cu grijă, fiecare propoziție e o bucățică din inima mea care țipe după tine.",
        "Sper din tot sufletul să-ți placă mesajul meu... pentru că e mai mult decât un simplu text—e promisiunea mea că te voi iubi mereu, e recunoștința mea pentru faptul că exiști, și dorința mea nebună de a te ține aproape, chiar și când distanța ne desparte."
    ]
};

const elements = {
    character: document.getElementById('character'),
    dialogContainer: document.getElementById('dialog-container'),
    dialogText: document.getElementById('dialog-text'),
    continuePrompt: document.getElementById('continue-prompt'),
    finalMessage: document.getElementById('final-message'),
    finalParagraphs: document.querySelectorAll('#final-message p')
};

let currentStep = 0;
let isAnimating = false;

function init() {
    elements.finalMessage.style.display = 'none';
    elements.finalParagraphs.forEach(p => p.style.display = 'none');


    showNextDialog();

    document.addEventListener('click', handleClick);
}

async function typeWriter(text, element) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';
        isAnimating = true;

        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                isAnimating = false;
                resolve();
            }
        }, config.typeSpeed);
    });
}

async function showNextDialog() {
    if (isAnimating) return;

    elements.continuePrompt.style.opacity = '0';

    if (currentStep < config.initialDialogs.length) {
        if (currentStep === 0) {
            elements.dialogContainer.className = 'initial';
        } else {
            elements.dialogContainer.className = 'corner';
            elements.character.className = 'corner';
        }

        await typeWriter(config.initialDialogs[currentStep], elements.dialogText);
        currentStep++;
        elements.continuePrompt.style.opacity = '1';
    } else if (currentStep === config.initialDialogs.length) {
        elements.dialogContainer.style.display = 'none';
        elements.character.style.display = 'none';
        elements.finalMessage.style.display = 'block';
        currentStep++;
        showNextParagraph();
    }
}

async function showNextParagraph() {
    if (isAnimating) return;

    const paragraphIndex = currentStep - config.initialDialogs.length - 1;
    const paragraph = elements.finalParagraphs[paragraphIndex];

    if (paragraph) {
        paragraph.style.display = 'block';
        paragraph.style.opacity = '0';
        paragraph.style.animation = 'fadeIn 1s forwards';
        currentStep++;
    } else {
        elements.continuePrompt.style.display = 'none';
    }
}

function handleClick() {
    if (currentStep <= config.initialDialogs.length) {
        showNextDialog();
    } else {
        showNextParagraph();
    }
}

window.addEventListener('load', init);