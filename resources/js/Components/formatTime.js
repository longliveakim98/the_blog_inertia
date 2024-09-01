export function formatTime(dateString) {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
}
