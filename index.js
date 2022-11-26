import { tweetsData } from "./data.js";

 const tweetBtn = document.querySelector('#tweet-btn');
 const tweetInput = document.querySelector('#tweet-input');

 tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value)
 })