import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

export function photoHandler() {

  const takePhoto = async(): Promise<UserPhoto> => {
    return new Promise((resolve, reject) => {
      Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      }).then(async (photo) => {
        const usrPhoto = await savePicture(photo, new Date().getTime() + '.jpeg');
        if(usrPhoto) resolve(usrPhoto);
        else reject(); 
      }).catch((e) => {
        console.log(e);
        reject();
      })
    }); 
  }

  return {takePhoto};
}

const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto | null> => {
  // Fetch the photo, read as a blob, then convert to base64 format
  if(!photo.webPath) {
    console.log('webPath is undefined, unable to save photo');
    return null;
  }
  const response = await fetch(photo.webPath);
  const blob = await response.blob();
  const base64Data = (await convertBlobToBase64(blob)) as string;
  await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
};
  

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
