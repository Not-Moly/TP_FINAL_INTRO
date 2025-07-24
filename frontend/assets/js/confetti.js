export let startConfetti;
export let stopConfetti;

const Confettiful = function (el) {
    console.log(el);

    this.el = el;
    this.containerEl = null;

    this.confettiRunning = false;

    this.confettiFrequency = 3;
    this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
    startConfetti = () => {
        this._renderConfetti();
        this.confettiRunning = true;
    }
    stopConfetti = () => {
        clearInterval(this.confettiInterval);
        this.confettiRunning = false;
    }
};

Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;

    const confettiStyles = document.createElement('link');
    confettiStyles.rel = "stylesheet";
    confettiStyles.href = "assets/css/confetti.css";

    document.head.appendChild(confettiStyles);

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
        this.el.style.position = 'relative';
    }

    containerEl.classList.add('confetti-container');

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function () {
    this.confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div');
        const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
        const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
        const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

        confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        confettiEl.removeTimeout = setTimeout(function () {
            confettiEl.parentNode.removeChild(confettiEl);
        }, 3000);

        this.containerEl.appendChild(confettiEl);
    }, 25);
};

window.confettiful = new Confettiful(document.getElementById('confetti-wrapper'));