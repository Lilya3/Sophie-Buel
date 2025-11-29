export function showSuccessToast() {
    const toast = document.getElementById("successToast");

    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.classList.add("hidden"), 300);
    }, 10000);
}
