const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

const regexMap = {
    nameRegex,
    phoneRegex,
    emailRegex,
    urlRegex
};