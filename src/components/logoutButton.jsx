export default function LogoutButton() {
    const logout = async () => {
        await fetch('/api/logout', { method: 'POST' }); // 🔗 Supprime le cookie
        window.location.reload(); // 🔄 Recharge la page sans changer l'URL
    };

    return (
        <button
            type="button"
            onClick={logout}
            className="py-2 cursor-pointer text-secondary"
        >
            <p className="text-lg underline underline-offset-2">Se déconnecter</p>
        </button>
    );
}