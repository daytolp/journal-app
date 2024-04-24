export const fileUpload = async(file) => {
    if (!file) throw new Error('El archivo no existe');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwcy9s9qr/image/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');
    console.log(formData);
    try {
        const resp = await fetch(cloudUrl, { method: 'POST' , body :formData});
        console.log(resp);
        if (!resp.ok) throw new Error('No se pudo subir imagen');
        const cloudResp = await resp.json();
        console.log(cloudResp);
        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}