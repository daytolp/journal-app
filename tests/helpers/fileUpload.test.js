import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dwcy9s9qr',
    api_key: '938795242523418',
    api_secret: 'QkVZBTMfgXTCP1X9rK2pQ8Uv7Eo',
    secure: true
})

describe('Pruebas fileUpload' , () => {
    test('debe subir el archivo correctamente a cloudinary', async() => {
        const imagUrl = 'https://www.shutterstock.com/image-illustration/view-waterfall-forest-600nw-2327645439.jpg';
        const resp = await fetch(imagUrl);
        const blob = await resp.blob(); 
        const file = new File([blob], 'test.jpg');
        const url = await fileUpload(file);
       expect(typeof url).toBe('string')
    //    console.log(url)
       const setmens = url.split('/');
       const imageId = setmens[setmens.length -1].replace('jpg', '');
       await cloudinary.api.delete_resources([ 'journal/' + imageId], { resource_type: 'image' });
    });

    test('debe retornar null', async() => {      
        const file = new File([], 'test.jpg');
        const url = await fileUpload(file);
       expect(url).toBeNull();
    });
});
