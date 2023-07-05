import { retry } from 'ts-retry-promise';

const myPromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('success');
		}, 1000);
	});
}

 retry(myPromise, {
	delay: 1000,
	retries: 3,
}).then((result) => {
	console.log('success')
}).catch((error) => {
	console.log('error')
})