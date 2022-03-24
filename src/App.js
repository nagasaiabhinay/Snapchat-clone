import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';
import Login from './Login';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					login({
						username: authUser.displayName,
						profilePic: authUser.photoURL,
						id: authUser.uid,
					}),
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);
	return (
		<div className='app'>
			<BrowserRouter>
				{!user ? (
					<Login />
				) : (
					<>
						<img
							className='app__logo'
							src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg'
							alt=''
						/>
						<div className='app__body'>
							<div className='app__bodyBackground'>
								<Routes>
									<Route
										path='/chats'
										element={
											<>
												<Chats />
											</>
										}
									/>
									<Route
										path='/chats/view'
										element={
											<>
												<ChatView />
											</>
										}
									/>
									<Route
										path='/preview'
										element={
											<>
												<Preview />
											</>
										}
									/>

									<Route
										path='/'
										element={
											<>
												<WebcamCapture />
											</>
										}
									/>
								</Routes>
							</div>
						</div>
					</>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
