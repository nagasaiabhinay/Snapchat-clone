import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import CropIcon from '@material-ui/icons/Crop';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import NoteIcon from '@material-ui/icons/Note';
import SendIcon from '@material-ui/icons/Send';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TimerIcon from '@material-ui/icons/Timer';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { db, storage } from './firebase';
import './Preview.css';

function Preview() {
	const cameraImage = useSelector(selectCameraImage);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	useEffect(() => {
		if (!cameraImage) {
			navigate('/');
		}
	}, [cameraImage, navigate]);

	const closePreview = () => {
		dispatch(resetCameraImage());
	};

	const sendPost = () => {
		const id = uuid();
		const uploadTask = storage
			.ref(`posts/${id}`)
			.putString(cameraImage, 'data_url');

		uploadTask.on(
			'state_changed',
			null,
			(error) => {
				//ERROR function
				console.log(error);
			},
			() => {
				//COMPLETE function
				storage
					.ref('posts')
					.child(id)
					.getDownloadURL()
					.then((url) => {
						db.collection('posts').add({
							imageUrl: url,
							username: 'Abhinay',
							read: false,
							//profile pic
							timestamp:
								firebase.firestore.FieldValue.serverTimestamp(),
						});
						navigate('/chats');
					});
			},
		);
	};
	return (
		<div className='preview'>
			<CloseIcon onClick={closePreview} className='preview__close' />
			<div className='preview__toolbarRight'>
				<TextFieldsIcon />
				<CreateIcon />
				<NoteIcon />
				<MusicNoteIcon />
				<AttachFileIcon />
				<CropIcon />
				<TimerIcon />
			</div>
			<img src={cameraImage} alt='' />
			<div onClick={sendPost} className='preview__footer'>
				<h2>Send</h2>
				<SendIcon fontSize='small' className='preview__sendIcon' />
			</div>
		</div>
	);
}

export default Preview;
