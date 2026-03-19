import Swal from "sweetalert2";

const eliminarTareaGrupo = async () => {
    const result = await Swal.fire({
        title: "¿Eliminar tarea del grupo?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};
const eliminarTarea = async () => {
    const result = await Swal.fire({
        title: "¿Eliminar tarea?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });

    return result.isConfirmed;
};

const completarTarea = async () => {
    const result = await Swal.fire({
        title: "Tarea Completada",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Completar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};

const descompletarTarea = async () => {
    const result = await Swal.fire({
        title: "Se marcará como no completada",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};

const eliminarGrupo = async () => {
    const result = await Swal.fire({
        title: "¿Eliminar grupo?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};

export default eliminarTareaGrupo;

export { eliminarTarea, completarTarea, descompletarTarea, eliminarGrupo };
