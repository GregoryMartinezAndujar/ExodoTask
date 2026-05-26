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
        confirmButtonColor: "green",
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

const eliminarTareaDelGrupo = async () => {
    const result = await Swal.fire({
        title: "¿Eliminar tarea del grupo?",
        text: "Puedes volver a agregarla después si lo deseas",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};

const confirmarFinalizarSesion = async () => {
    const result = await Swal.fire({
        title: "¿Finalizar sesión?",
        text: "¿Estás seguro de finalizar esta sesión? Se marcará como finalizada.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Finalizar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};

const confirmarEliminarSesion = async () => {
    const result = await Swal.fire({
        title: "¿Eliminar sesión?",
        text: "Esta acción eliminará la sesión y sus datos asociados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#A90000",
    });
    return result.isConfirmed;
};
export default eliminarTareaGrupo;

export {
    eliminarTarea,
    completarTarea,
    descompletarTarea,
    eliminarGrupo,
    eliminarTareaDelGrupo,
    confirmarFinalizarSesion,
    confirmarEliminarSesion,
};
