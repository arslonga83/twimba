import { tweetsData } from "./data.js";

 const tweetBtn = document.querySelector('#tweet-btn');
 const tweetInput = document.querySelector('#tweet-input');

 tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value)
 })

function getFeedHtml(){
    let feedHtml;
    tweetsData.forEach((tweet) => {
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        `
    })
    return feedHtml;
}

function render() {
    document.querySelector('#feed').innerHTML = getFeedHtml()
}
    
render()
  
    