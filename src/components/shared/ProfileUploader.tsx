import {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderprops = {
  fieldChange: (FILES: File[]) => void,
  mediaUrl: string,
}
const ProfileUploader = ({fieldChange, mediaUrl}: FileUploaderprops) => {
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
    <div {...getRootProps()} className='pt-6'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <>
            <p className='text-lg font-semibold text-[#0095F6]'>Click to change your profile photo</p>
            </>

        ) :
        (
            <p className='text-lg font-semibold text-[#0095F6]'>Upload a Profile Photo</p>
        )
      }
    </div>
  )
}

export default ProfileUploader
