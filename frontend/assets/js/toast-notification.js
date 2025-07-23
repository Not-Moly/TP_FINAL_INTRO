export function showToast(message, type = 'is-primary', icon = 'fas fa-info-circle', title = 'Notification') {
    const duration = 3000;

    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) { console.error("Contenedor de notificaciones no encontrado"); return; }
    toastContainer.className = '';

    // Crear el elemento de la notificación toast
    const toast = document.createElement('div');
    toast.className = `toast notification ${type}`;
    toast.innerHTML = `
                <button class="delete"></button>
                <div class="toast-content">
                    <div class="toast-icon"><i class="${icon}"></i></div>
                    <div class="toast-body">
                        <div class="toast-title">${title}</div>
                        <div class="toast-message">${message}</div>
                    </div>
                </div>
                <div class="toast-progress">
                    <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
                </div>
            `;
    toastContainer.appendChild(toast);

    // Manejador de cierre
    const deleteBtn = toast.querySelector('.delete');
    deleteBtn.addEventListener('click', () => dismissToast(toast));

    // Cierre automático
    if (duration > 0) {
        setTimeout(() => dismissToast(toast), duration);
    }
}

function dismissToast(toast) {
    toast.classList.add('dismissing');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 400);
}