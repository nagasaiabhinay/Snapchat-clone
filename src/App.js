import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';

function App() {
	return (
		<div className='app'>
			<BrowserRouter>
				<div className='app__body'>
					<Routes>
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
			</BrowserRouter>
		</div>
	);
}

export default App;
