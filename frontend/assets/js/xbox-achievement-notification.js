function createXboxToast() {
    const xboxToastStyles = document.createElement('link');
    xboxToastStyles.rel = "stylesheet";
    xboxToastStyles.href = "assets/css/xbox-one-achievement.css";
    const XboxToast = document.createElement('div');
    XboxToast.classList.add('xbox-achievement-toast');
    XboxToast.innerHTML = `
        <div class="animation">
            <div class="circle">
                <div class="img trophy_animate trophy_img">
                    <img class="trophy_1" src="assets/images/xbox-achievement/trophy_full.svg" />
                    <img class="trophy_2" src="assets/images/xbox-achievement/trophy_no_handles.svg" />
                </div>
                <div class="img xbox_img">
                    <img src="assets/images/xbox-achievement/xbox.svg" />
                </div>
                <div class="brilliant-wrap">
                    <div class="brilliant">
                    </div>
                </div>
            </div>
            <div class="banner-outer">
                <div class="banner">
                    <div class="achieve_disp">
                        <span class="unlocked">

                        </span>
                        <div class="score_disp">
                            <div class="gamerscore">
                                <img width="20px"
                                    src="assets/images/xbox-achievement/G.svg" />
                                <span class="achieve_score"></span>
                            </div>
                            <span class="hyphen_sep">-</span>
                            <span class="achiev_name"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(xboxToastStyles);
    document.body.appendChild(XboxToast);
}

createXboxToast();

let xboxAchievementToastSound = new Audio('assets/audio/XboxAchievement.mp3');
export function xboxAchievementToast(achiev_text, achiev_score) {
    // Definición de textos
    document.querySelector('.achiev_name').innerText = achiev_text;
    document.querySelector('.achieve_score').innerText = achiev_score;
    document.querySelector('.unlocked').innerText = 'Logro desbloqueado';

    // Reiniciar audio (probablemente no sea necesario ya que es muy corto)
    xboxAchievementToastSound.pause();
    xboxAchievementToastSound.currentTime = 0;
    xboxAchievementToastSound.play();

    // Conseguir elementos html propios de la animación
    const circle = document.querySelector('.circle');
    const banner = document.querySelector('.banner');
    const achieveDisp = document.querySelector('.achieve_disp');

    // Quitar clases de animación (estén o no)
    circle.classList.remove('circle_animate');
    banner.classList.remove('banner-animate');
    achieveDisp.classList.remove('achieve_disp_animate');

    // Forzar reinicio
    void circle.offsetWidth;

    // Agregar clases para que comience la animación
    circle.classList.add('circle_animate');
    banner.classList.add('banner-animate');
    achieveDisp.classList.add('achieve_disp_animate');
};