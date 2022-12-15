import React from 'react';

import styles from 'assets/css/Avatar.module.css';

type AvatarPropsType = {
  pic?: {
    name: string;
    url: string;
    isPublicUrl: string;
  };
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function Avatar({ pic, setFile }: AvatarPropsType) {
  const [avatar, setAvatar] = React.useState<string | undefined>(pic?.url);

  const avatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className={styles['input_wrapper']}>
      <div className={styles['img_wrapper']}>
        <div className={styles['img_upload']}>
          <input type="file" name="avatar" onChange={avatarUpload} />
          {avatar ? (
            <img src={avatar} className={styles['pic']} />
          ) : (
            <p>Upload Avatar</p>
          )}
        </div>
      </div>
    </div>
  );
}
