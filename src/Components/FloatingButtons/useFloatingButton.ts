export const useFloatingButton = () :{
    handleOpenWhastapp: () => void;
} => {
    const handleOpenWhastapp = () => {
        const mensaje = encodeURIComponent("Hola NetWorking TIC, quiero información sobre sus servicios.");
        window.open(`https://wa.me/573246365743?text=${mensaje}`, "_blank", "noopener,noreferrer");
    }
    return {
        handleOpenWhastapp
    };
}