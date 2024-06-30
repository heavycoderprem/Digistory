import {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderprops = {
  fieldChange: (FILES: File[]) => void,
  mediaUrl: string,
}
const FileUploader = ({fieldChange, mediaUrl}: FileUploaderprops) => {
  const [file, setFile] = useState<File[]>([]);
const [fileUrl, setfileUrl] = useState<string>(mediaUrl);


  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
       setFile(acceptedFiles);
       fieldChange(acceptedFiles);
       setfileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {
    'image/*': ['.png', '.jepg', '.jpg', '.svg']
  }})

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer py-6'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <>
            <div>
              <img src={fileUrl} alt="file_uploader_img" />
             
            </div>
            <div>
            <p className='file_uploader-label'>Click or drag photo to replace</p>
            </div>
            </>

        ) :
        (
            <div className='fle_uploader-box'>
               <img src="/public/icons/file-upload.svg" alt="file upload" width={96} height={77}/>
               <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>

               <p className='text-light-4 small-regular mb-6'> Svg, Png, Jpg</p>

               <Button className='shad-button_dark_4'>Select from computer</Button>
            </div>
        )
      }
    </div>
  )
}

export default FileUploader
