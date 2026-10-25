import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function AppWithAlerts({ App, props }) {
    const errors = props.initialPage?.props?.errors ?? {};
    const flash = props.initialPage?.props?.flash ?? {};

    useEffect(() => {
        const message = Object.values(errors)[0] || flash.error;
        if (message) {
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan',
                text: message,
                confirmButtonColor: '#128c5e',
            });
        } else if (flash.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: flash.success,
                confirmButtonColor: '#128c5e',
            });
        }
    }, [errors, flash]);

    return <App {...props} />;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<AppWithAlerts App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
